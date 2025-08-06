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
import { HouseOffersService } from "./house_offers.service";
import { CreateHouseOfferDto } from "./dto/create-house_offer.dto";
import { UpdateHouseOfferDto } from "./dto/update-house_offer.dto";
import { RefreshTokenGuard } from "../common/guards/user.guard/refresh-token.guard";
import { UserSelfGuard } from "../common/guards/user.guard/self.guard";

@ApiTags("House Offers")
@Controller("house-offers")
export class HouseOffersController {
  constructor(private readonly houseOffersService: HouseOffersService) {}

  @UseGuards(RefreshTokenGuard)
  @Post()
  @ApiOperation({ summary: "Create a new house offer" })
  @ApiResponse({ status: 201, description: "House offer successfully created" })
  create(@Body() createHouseOfferDto: CreateHouseOfferDto) {
    return this.houseOffersService.create(createHouseOfferDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all house offers" })
  @ApiResponse({ status: 200, description: "List of all house offers" })
  findAll() {
    return this.houseOffersService.findAll();
  }

  @UseGuards(RefreshTokenGuard, UserSelfGuard)
  @Get(":id")
  @ApiOperation({ summary: "Get a single house offer by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "House offer found" })
  @ApiResponse({ status: 404, description: "House offer not found" })
  findOne(@Param("id") id: string) {
    return this.houseOffersService.findOne(+id);
  }

  @UseGuards(RefreshTokenGuard, UserSelfGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Update a house offer by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "House offer successfully updated" })
  update(
    @Param("id") id: string,
    @Body() updateHouseOfferDto: UpdateHouseOfferDto
  ) {
    return this.houseOffersService.update(+id, updateHouseOfferDto);
  }

  @UseGuards(RefreshTokenGuard, UserSelfGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Delete a house offer by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "House offer successfully deleted" })
  remove(@Param("id") id: string) {
    return this.houseOffersService.remove(+id);
  }
}
