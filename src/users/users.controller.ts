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
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserSelfGuard } from "../common/guards/user.guard/self.guard";
import { AuthGuard } from "@nestjs/passport";
import { AdminAccessTokenGuard } from "../common/guards/admin.guard/admin-access.token.guard";
import { AccessTokenGuard } from "../common/guards/user.guard/access.token.guard";
import { RefreshTokenGuard } from "../common/guards/user.guard/refresh-token.guard";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(RefreshTokenGuard, UserSelfGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }

  @Get("activate/:activation_link")
  async activateAccount(@Param("activation_link") activation_link: string) {
    return this.usersService.activateUser(activation_link);
  }
}
