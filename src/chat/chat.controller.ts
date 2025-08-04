import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ChatService } from "./chat.service";
import { CreateChatDto } from "./dto/create-chat.dto";
import { UpdateChatDto } from "./dto/update-chat.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";

@ApiTags("Chats")
@Controller("chat")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @ApiOperation({ summary: "Create new chat" })
  @ApiResponse({ status: 201, description: "Chat created successfully" })
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all chats" })
  @ApiResponse({ status: 200, description: "List of all chats" })
  findAll() {
    return this.chatService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get chat by ID" })
  @ApiParam({ name: "id", type: "string" })
  @ApiResponse({ status: 200, description: "Chat found" })
  @ApiResponse({ status: 404, description: "Chat not found" })
  findOne(@Param("id") id: string) {
    return this.chatService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update chat by ID" })
  @ApiParam({ name: "id", type: "string" })
  @ApiResponse({ status: 200, description: "Chat updated successfully" })
  update(@Param("id") id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatService.update(+id, updateChatDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete chat by ID" })
  @ApiParam({ name: "id", type: "string" })
  @ApiResponse({ status: 200, description: "Chat deleted successfully" })
  remove(@Param("id") id: string) {
    return this.chatService.remove(+id);
  }
}
