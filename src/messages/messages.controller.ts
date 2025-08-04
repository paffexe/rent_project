import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { MessagesService } from "./messages.service";
import { CreateMessageDto } from "./dto/create-message.dto";
import { UpdateMessageDto } from "./dto/update-message.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";

@ApiTags("Messages")
@Controller("messages")
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @ApiOperation({ summary: "Create a new message" })
  @ApiResponse({ status: 201, description: "Message created successfully" })
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all messages" })
  @ApiResponse({
    status: 200,
    description: "List of messages returned successfully",
  })
  findAll() {
    return this.messagesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get message by ID" })
  @ApiParam({ name: "id", type: "string" })
  @ApiResponse({ status: 200, description: "Message found" })
  @ApiResponse({ status: 404, description: "Message not found" })
  findOne(@Param("id") id: string) {
    return this.messagesService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update message by ID" })
  @ApiParam({ name: "id", type: "string" })
  @ApiResponse({ status: 200, description: "Message updated successfully" })
  update(@Param("id") id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(+id, updateMessageDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete message by ID" })
  @ApiParam({ name: "id", type: "string" })
  @ApiResponse({ status: 200, description: "Message deleted successfully" })
  remove(@Param("id") id: string) {
    return this.messagesService.remove(+id);
  }
}
