import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy, StrategyOptionsWithRequest } from "passport-jwt";
import { Request } from "express";
import { JwtAdminPayload } from "../../types/admin.types/jwt-admin-payload.type";

@Injectable()
export class AdminAccessTokenStrategy extends PassportStrategy(
  Strategy,
  "admin-access-jwt"
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ADMIN_ACCESS_TOKEN_KEY,
      passReqToCallback: true,
    } as StrategyOptionsWithRequest);
  }

  validate(req: Request, payload: JwtAdminPayload): JwtAdminPayload {
    console.log("request", req);
    console.log("payload", payload);
    return payload;
  }
}
