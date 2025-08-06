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
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserSelfGuard } from "../common/guards/user.guard/self.guard";
import { RefreshTokenGuard } from "../common/guards/user.guard/refresh-token.guard";
import { AdminRefreshTokenGuard } from "../common/guards/admin.guard/admin-refresh-token.guard";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AdminRefreshTokenGuard)
  @Post()
  @ApiOperation({ summary: "Register a new user" })
  @ApiResponse({ status: 201, description: "User successfully created" })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: 200, description: "List of all users" })
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(RefreshTokenGuard, UserSelfGuard)
  @Get(":id")
  @ApiOperation({ summary: "Get user by ID (protected)" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "User found" })
  @ApiResponse({ status: 401, description: "Unauthorized or forbidden" })
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(RefreshTokenGuard, UserSelfGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Update a user by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "User updated successfully" })
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(RefreshTokenGuard, UserSelfGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Delete a user by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "User deleted successfully" })
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }

  @Get("activate/:activation_link")
  @ApiOperation({ summary: "Activate a user account" })
  @ApiParam({ name: "activation_link", type: String })
  @ApiResponse({ status: 200, description: "User activated successfully" })
  @ApiResponse({
    status: 404,
    description: "Activation link invalid or expired",
  })
  async activateAccount(@Param("activation_link") activation_link: string) {
    return this.usersService.activateUser(activation_link);
  }
}
