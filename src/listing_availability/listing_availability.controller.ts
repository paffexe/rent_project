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
import { ListingAvailabilityService } from "./listing_availability.service";
import { CreateListingAvailabilityDto } from "./dto/create-listing_availability.dto";
import { UpdateListingAvailabilityDto } from "./dto/update-listing_availability.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";
import { RefreshTokenGuard } from "../common/guards/user.guard/refresh-token.guard";
import { UserSelfGuard } from "../common/guards/user.guard/self.guard";

@ApiTags("listing-availability")
@Controller("listing-availability")
export class ListingAvailabilityController {
  constructor(
    private readonly listingAvailabilityService: ListingAvailabilityService
  ) {}

  @Post()
  @ApiOperation({ summary: "Create availability for a listing" })
  @ApiBody({ type: CreateListingAvailabilityDto })
  @ApiResponse({ status: 201, description: "Availability record created" })
  create(@Body() createListingAvailabilityDto: CreateListingAvailabilityDto) {
    return this.listingAvailabilityService.create(createListingAvailabilityDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all listing availability records" })
  @ApiResponse({ status: 200, description: "List of availability records" })
  findAll() {
    return this.listingAvailabilityService.findAll();
  }

  @UseGuards(RefreshTokenGuard, UserSelfGuard)
  @Get(":id")
  @ApiOperation({ summary: "Get a specific availability record by ID" })
  @ApiParam({ name: "id", type: Number, description: "Availability record ID" })
  @ApiResponse({ status: 200, description: "Availability record found" })
  @ApiResponse({ status: 404, description: "Record not found" })
  findOne(@Param("id") id: string) {
    return this.listingAvailabilityService.findOne(+id);
  }

  @UseGuards(RefreshTokenGuard, UserSelfGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Update a listing availability record" })
  @ApiParam({ name: "id", type: Number, description: "Availability record ID" })
  @ApiBody({ type: UpdateListingAvailabilityDto })
  @ApiResponse({
    status: 200,
    description: "Availability updated successfully",
  })
  update(
    @Param("id") id: string,
    @Body() updateListingAvailabilityDto: UpdateListingAvailabilityDto
  ) {
    return this.listingAvailabilityService.update(
      +id,
      updateListingAvailabilityDto
    );
  }

  @UseGuards(RefreshTokenGuard, UserSelfGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Delete a listing availability record" })
  @ApiParam({ name: "id", type: Number, description: "Availability record ID" })
  @ApiResponse({ status: 204, description: "Availability record deleted" })
  remove(@Param("id") id: string) {
    return this.listingAvailabilityService.remove(+id);
  }
}
