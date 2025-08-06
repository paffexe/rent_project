import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { UpdateNotificationDto } from "./dto/update-notification.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { AdminRefreshTokenGuard } from "../common/guards/admin.guard/admin-refresh-token.guard";

@ApiTags("Notifications")
@Controller("notification")
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @UseGuards(AdminRefreshTokenGuard)
  @Post()
  @ApiOperation({ summary: "Create a new notification" })
  @ApiResponse({
    status: 201,
    description: "Notification created successfully.",
  })
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.create(createNotificationDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all notifications" })
  @ApiResponse({ status: 200, description: "List of all notifications." })
  findAll() {
    return this.notificationService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a notification by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Notification details." })
  @ApiResponse({ status: 404, description: "Notification not found." })
  findOne(@Param("id") id: string) {
    return this.notificationService.findOne(+id);
  }

  @UseGuards(AdminRefreshTokenGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Update a notification" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({
    status: 200,
    description: "Notification updated successfully.",
  })
  update(
    @Param("id") id: string,
    @Body() updateNotificationDto: UpdateNotificationDto
  ) {
    return this.notificationService.update(+id, updateNotificationDto);
  }

  @UseGuards(AdminRefreshTokenGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Delete a notification" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({
    status: 200,
    description: "Notification deleted successfully.",
  })
  remove(@Param("id") id: string) {
    return this.notificationService.remove(+id);
  }
}
