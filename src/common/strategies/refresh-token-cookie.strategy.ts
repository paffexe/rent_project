import { ForbiddenException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import {
  JwtFromRequestFunction,
  Strategy,
  StrategyOptionsWithRequest,
} from "passport-jwt";

import { JwtPayload } from "../types/user.types/jwt-payload.type";
import { JwtPayloadWithRefreshToken } from "../types/user.types/jwt-payload-refresh.types";

export const cookeExtractor: JwtFromRequestFunction = (req: Request) => {
  console.log(req.cookies);
  if (req && req.cookies) {
    return req.cookies["refreshToken"];
  }
  return null;
};

@Injectable()
export class RefreshTokenCookieStrategy extends PassportStrategy(
  Strategy,
  "refresh-jwt"
) {
  constructor() {
    super({
      jwtFromRequest: cookeExtractor,
      secretOrKey: process.env.REFRESH_TOKEN_KEY,
      passReqToCallback: true,
    } as StrategyOptionsWithRequest);
  }

  validate(req: Request, payload: JwtPayload): JwtPayloadWithRefreshToken {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      throw new ForbiddenException("Refresh token noto'gri");
    }
    return { ...payload, refreshToken };
  }
}
