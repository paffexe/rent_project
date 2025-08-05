import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { SupportTicketService } from "./support_ticket.service";
import { CreateSupportTicketDto } from "./dto/create-support_ticket.dto";
import { UpdateSupportTicketDto } from "./dto/update-support_ticket.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";

@ApiTags("Support Tickets")
@Controller("support-ticket")
export class SupportTicketController {
  constructor(private readonly supportTicketService: SupportTicketService) {}

  @Post()
  @ApiOperation({ summary: "Create a support ticket" })
  @ApiResponse({
    status: 201,
    description: "Support ticket successfully created",
  })
  create(@Body() createSupportTicketDto: CreateSupportTicketDto) {
    return this.supportTicketService.create(createSupportTicketDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all support tickets" })
  @ApiResponse({ status: 200, description: "List of support tickets" })
  findAll() {
    return this.supportTicketService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get support ticket by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Support ticket found" })
  @ApiResponse({ status: 404, description: "Support ticket not found" })
  findOne(@Param("id") id: string) {
    return this.supportTicketService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a support ticket" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({
    status: 200,
    description: "Support ticket updated successfully",
  })
  update(
    @Param("id") id: string,
    @Body() updateSupportTicketDto: UpdateSupportTicketDto
  ) {
    return this.supportTicketService.update(+id, updateSupportTicketDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a support ticket" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({
    status: 200,
    description: "Support ticket deleted successfully",
  })
  remove(@Param("id") id: string) {
    return this.supportTicketService.remove(+id);
  }
}
