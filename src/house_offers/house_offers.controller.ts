import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { HouseOffersService } from "./house_offers.service";
import { CreateHouseOfferDto } from "./dto/create-house_offer.dto";
import { UpdateHouseOfferDto } from "./dto/update-house_offer.dto";

@Controller("house-offers")
export class HouseOffersController {
  constructor(private readonly houseOffersService: HouseOffersService) {}

  @Post()
  create(@Body() createHouseOfferDto: CreateHouseOfferDto) {
    return this.houseOffersService.create(createHouseOfferDto);
  }

  @Get()
  findAll() {
    return this.houseOffersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.houseOffersService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateHouseOfferDto: UpdateHouseOfferDto
  ) {
    return this.houseOffersService.update(+id, updateHouseOfferDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.houseOffersService.remove(+id);
  }
}
