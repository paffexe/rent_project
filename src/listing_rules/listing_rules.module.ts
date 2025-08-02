import { Module } from "@nestjs/common";
import { ListingRulesService } from "./listing_rules.service";
import { ListingRulesController } from "./listing_rules.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [ListingRulesController],
  providers: [ListingRulesService],
})
export class ListingRulesModule {}
