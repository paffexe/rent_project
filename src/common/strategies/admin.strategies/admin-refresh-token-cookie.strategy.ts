import { ForbiddenException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import {
  JwtFromRequestFunction,
  Strategy,
  StrategyOptionsWithRequest,
} from "passport-jwt";
import { JwtAdminPayload } from "../../types/admin.types/jwt-admin-payload.type";
import { JwtPayloadWithRefreshTokenAdmin } from "../../types/admin.types/jwt-admin-payload-refresh.";

export const cookeExtractor: JwtFromRequestFunction = (req: Request) => {
  console.log(req.cookies);
  if (req && req.cookies) {
    return req.cookies["refreshToken"];
  }
  return null;
};

@Injectable()
export class AdminRefreshTokenCookieStrategy extends PassportStrategy(
  Strategy,
  "admin-refresh-jwt"
) {
  constructor() {
    super({
      jwtFromRequest: cookeExtractor,
      secretOrKey: process.env.ADMIN_REFRESH_TOKEN_KEY,
      passReqToCallback: true,
    } as StrategyOptionsWithRequest);
  }

  validate(
    req: Request,
    payload: JwtAdminPayload
  ): JwtPayloadWithRefreshTokenAdmin {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      throw new ForbiddenException("Refresh token noto'gri");
    }
    return { ...payload, refreshToken };
  }
}
