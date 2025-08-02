import { Module } from "@nestjs/common";
import { HouseOffersService } from "./house_offers.service";
import { HouseOffersController } from "./house_offers.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [HouseOffersController],
  providers: [HouseOffersService],
})
export class HouseOffersModule {}
