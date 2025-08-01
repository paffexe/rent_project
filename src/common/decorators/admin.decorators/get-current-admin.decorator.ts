import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { JwtPayloadWithRefreshTokenAdmin } from "../../types/admin.types/jwt-admin-payload-refresh.";
import { JwtAdminPayload } from "../../types/admin.types/jwt-admin-payload.type";

export const GetCurrentAdmin = createParamDecorator(
  (data: keyof JwtPayloadWithRefreshTokenAdmin, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const admin = request.user as JwtAdminPayload;

    // console.log(request);
    console.log();
    console.log(request.user);
    // console.log(data);

    if (!admin) {
      throw new ForbiddenException("Admin token noto'g'ri22");
    }

    if (!data) {
      return admin;
    }

    return admin[data];
    // return "daaa"
  }
);
