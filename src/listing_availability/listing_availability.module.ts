import { Module } from "@nestjs/common";
import { ListingAvailabilityService } from "./listing_availability.service";
import { ListingAvailabilityController } from "./listing_availability.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [ListingAvailabilityController],
  providers: [ListingAvailabilityService],
})
export class ListingAvailabilityModule {}
