import { JwtAdminPayload } from "./jwt-admin-payload.type";

export type JwtPayloadWithRefreshTokenAdmin = JwtAdminPayload & {
  refreshToken: string;
};
