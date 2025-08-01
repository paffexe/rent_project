import {
  Controller,
  Post,
  Body,
  Res,
  UseGuards,
  HttpCode,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { SignInUserDto } from "../admin/dto/signin-admin.dto";
import { Response } from "express";
import { AdminRefreshTokenGuard } from "../common/guards/admin.guard/admin-refresh-token.guard";
import { GetCurrentUserId } from "../common/decorators/user.decorators/get-current-user-id.decorator";
import { GetCurrentUser } from "../common/decorators/user.decorators/get-current-user.decorator";
import { SignInAdminDto } from "../users/dto/signin-user.dto";
import { RefreshTokenGuard } from "../common/guards/user.guard/refresh-token.guard";
import { GetCurrentAdmin } from "../common/decorators/admin.decorators/get-current-admin.decorator";
import { GetCurrentAdminId } from "../common/decorators/admin.decorators/get-current-admin-id.decorator";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  create(@Body() createUserdto: CreateUserDto) {
    return this.authService.signup(createUserdto);
  }

  @Post("login")
  login(
    @Body() logInUserDto: SignInUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.logIn(logInUserDto, res);
  }

  @UseGuards(RefreshTokenGuard)
  @Post("logout")
  signout(
    @GetCurrentUserId() userId: number,
    @Res({ passthrough: true }) res: Response
  ): Promise<boolean> {
    return this.authService.logout(+userId, res);
  }

  @UseGuards(RefreshTokenGuard)
  @HttpCode(200)
  @Post("refresh/:id")
  refresh(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser("refreshToken") refreshToken: string,
    // @CookieGetter("refreshToken")
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshToken(+userId, refreshToken, res);
  }

  //admin

  @Post("login/admin")
  async loginAdmin(
    @Body() loginAdminDto: SignInAdminDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.logInAdmin(loginAdminDto, res);
  }

  @UseGuards(AdminRefreshTokenGuard)
  @Post("logout/admin")
  signoutAdmin(
    @GetCurrentAdminId() adminId: number,
    @Res({ passthrough: true }) res: Response
  ): Promise<boolean> {
    return this.authService.logoutAdmin(+adminId, res);
  }

  @UseGuards(AdminRefreshTokenGuard)
  @HttpCode(200)
  @Post("refresh/admin/:id")
  refreshAdmin(
    @GetCurrentAdminId() adminId: number,
    @GetCurrentAdmin("refreshToken") refreshToken: string,
    @Res({ passthrough: true })
    res: Response
  ) {
    return this.authService.refreshAdminToken(+adminId, refreshToken, res);
  }
}
