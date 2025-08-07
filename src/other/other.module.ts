import { Module } from "@nestjs/common";
import { OtherService } from "./other.service";
import { OtherController } from "./other.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [OtherController],
  providers: [OtherService],
})
export class OtherModule {}
