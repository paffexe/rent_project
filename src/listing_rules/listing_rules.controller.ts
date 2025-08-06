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
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { ListingRulesService } from "./listing_rules.service";
import { CreateListingRuleDto } from "./dto/create-listing_rule.dto";
import { UpdateListingRuleDto } from "./dto/update-listing_rule.dto";
import { RefreshTokenGuard } from "../common/guards/user.guard/refresh-token.guard";
import { UserSelfGuard } from "../common/guards/user.guard/self.guard";

@ApiTags("Listing Rules") // Swagger group name
@Controller("listing-rules")
export class ListingRulesController {
  constructor(private readonly listingRulesService: ListingRulesService) {}

  @UseGuards(RefreshTokenGuard)
  @Post()
  @ApiOperation({ summary: "Create a new listing rule" })
  @ApiResponse({
    status: 201,
    description: "Listing rule created successfully",
  })
  create(@Body() createListingRuleDto: CreateListingRuleDto) {
    return this.listingRulesService.create(createListingRuleDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all listing rules" })
  @ApiResponse({ status: 200, description: "List of listing rules" })
  findAll() {
    return this.listingRulesService.findAll();
  }

  @UseGuards(RefreshTokenGuard, UserSelfGuard)
  @Get(":id")
  @ApiOperation({ summary: "Get a specific listing rule by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Listing rule found" })
  @ApiResponse({ status: 404, description: "Listing rule not found" })
  findOne(@Param("id") id: string) {
    return this.listingRulesService.findOne(+id);
  }

  @UseGuards(RefreshTokenGuard, UserSelfGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Update a listing rule by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({
    status: 200,
    description: "Listing rule updated successfully",
  })
  update(
    @Param("id") id: string,
    @Body() updateListingRuleDto: UpdateListingRuleDto
  ) {
    return this.listingRulesService.update(+id, updateListingRuleDto);
  }

  @UseGuards(RefreshTokenGuard, UserSelfGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Delete a listing rule by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({
    status: 200,
    description: "Listing rule deleted successfully",
  })
  remove(@Param("id") id: string) {
    return this.listingRulesService.remove(+id);
  }
}
