import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ListingOffersService } from "./listing_offers.service";
import { CreateListingOfferDto } from "./dto/create-listing_offer.dto";
import { UpdateListingOfferDto } from "./dto/update-listing_offer.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";

@ApiTags("listing-offers")
@Controller("listing-offers")
export class ListingOffersController {
  constructor(private readonly listingOffersService: ListingOffersService) {}

  @Post()
  @ApiOperation({ summary: "Create a new listing offer" })
  @ApiBody({ type: CreateListingOfferDto })
  @ApiResponse({
    status: 201,
    description: "Listing offer successfully created",
  })
  create(@Body() createListingOfferDto: CreateListingOfferDto) {
    return this.listingOffersService.create(createListingOfferDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all listing offers" })
  @ApiResponse({ status: 200, description: "List of listing offers" })
  findAll() {
    return this.listingOffersService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a listing offer by ID" })
  @ApiParam({ name: "id", type: Number, description: "Listing offer ID" })
  @ApiResponse({ status: 200, description: "Listing offer found" })
  @ApiResponse({ status: 404, description: "Listing offer not found" })
  findOne(@Param("id") id: string) {
    return this.listingOffersService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a listing offer by ID" })
  @ApiParam({ name: "id", type: Number, description: "Listing offer ID" })
  @ApiBody({ type: UpdateListingOfferDto })
  @ApiResponse({
    status: 200,
    description: "Listing offer successfully updated",
  })
  update(
    @Param("id") id: string,
    @Body() updateListingOfferDto: UpdateListingOfferDto
  ) {
    return this.listingOffersService.update(+id, updateListingOfferDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a listing offer by ID" })
  @ApiParam({ name: "id", type: Number, description: "Listing offer ID" })
  @ApiResponse({ status: 204, description: "Listing offer deleted" })
  remove(@Param("id") id: string) {
    return this.listingOffersService.remove(+id);
  }
}
