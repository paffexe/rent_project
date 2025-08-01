import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from "../prisma/prisma.module";
import { UsersModule } from "../users/users.module";
import { AdminModule } from "../admin/admin.module";
import { MailModule } from "../mail/mail.module";
import {
  AccessTokenStrategy,
} from "../common/strategies/access-token.strategy";
import {
  RefreshTokenCookieStrategy,
} from "../common/strategies/refresh-token-cookie.strategy";
import { AdminAccessTokenStrategy } from "../common/strategies/admin.strategies/admin-access-token.strategy";
import { AdminRefreshTokenCookieStrategy } from "../common/strategies/admin.strategies/admin-refresh-token-cookie.strategy";

@Module({
  imports: [
    JwtModule.register({}),
    PrismaModule,
    UsersModule,
    AdminModule,
    MailModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenCookieStrategy,
    AdminAccessTokenStrategy,
    AdminRefreshTokenCookieStrategy,
  ],
})
export class AuthModule {}
