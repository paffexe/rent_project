import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { JwtAdminPayload } from "../../types/admin.types/jwt-admin-payload.type";

export const GetCurrentAdminId = createParamDecorator(
  (_: undefined, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest();
    const admin = request.user as JwtAdminPayload;

    console.log(request);
    console.log(admin);
    if (!admin) {
      throw new ForbiddenException("Admin token noto'g'ri11");
    }
    console.log("admin", admin);

    return admin.id;//
  }
);
