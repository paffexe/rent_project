import { Module } from "@nestjs/common";
import { ListingOffersService } from "./listing_offers.service";
import { ListingOffersController } from "./listing_offers.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [ListingOffersController],
  providers: [ListingOffersService],
})
export class ListingOffersModule {}
