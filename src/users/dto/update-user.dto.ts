import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";
import { UserRole } from "../../../generated/prisma";

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  full_name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  confirm_password?: string;

  role?: UserRole;
}
