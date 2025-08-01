import { IsString, IsEmail, MinLength, isString } from "class-validator";
import { UserRole } from "../../../generated/prisma";

export class CreateUserDto {
  @IsString()
  full_name: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @MinLength(6)
  confirm_password: string;

  role: UserRole;
}
