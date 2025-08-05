import { Module } from "@nestjs/common";
import { SupportTicketService } from "./support_ticket.service";
import { SupportTicketController } from "./support_ticket.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [SupportTicketController],
  providers: [SupportTicketService],
})
export class SupportTicketModule {}
