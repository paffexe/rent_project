import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateAdminDto {
  @IsOptional()
  @IsString()
  full_name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  confirm_password?: string;
}
