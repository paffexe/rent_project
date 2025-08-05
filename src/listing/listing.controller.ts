import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { ListingService } from "./listing.service";
import { CreateListingDto } from "./dto/create-listing.dto";
import { UpdateListingDto } from "./dto/update-listing.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";

@ApiTags("listings")
@Controller("listing")
export class ListingController {
  constructor(private readonly listingService: ListingService) {}

  @Post()
  @ApiOperation({ summary: "Create a new listing" })
  @ApiBody({ type: CreateListingDto })
  @ApiResponse({ status: 201, description: "Listing successfully created" })
  create(@Body() createListingDto: CreateListingDto) {
    return this.listingService.create(createListingDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all listings" })
  @ApiResponse({ status: 200, description: "List of all listings" })
  findAll() {
    return this.listingService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a listing by ID" })
  @ApiParam({ name: "id", type: Number, description: "Listing ID" })
  @ApiResponse({ status: 200, description: "The found listing" })
  @ApiResponse({ status: 404, description: "Listing not found" })
  findOne(@Param("id") id: string) {
    return this.listingService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a listing by ID" })
  @ApiParam({ name: "id", type: Number, description: "Listing ID" })
  @ApiBody({ type: UpdateListingDto })
  @ApiResponse({ status: 200, description: "Listing successfully updated" })
  update(@Param("id") id: string, @Body() updateListingDto: UpdateListingDto) {
    return this.listingService.update(+id, updateListingDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a listing by ID" })
  @ApiParam({ name: "id", type: Number, description: "Listing ID" })
  @ApiResponse({ status: 204, description: "Listing successfully deleted" })
  remove(@Param("id") id: string) {
    return this.listingService.remove(+id);
  }
}
