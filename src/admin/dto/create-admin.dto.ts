import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateAdminDto {
  @IsString()
  full_name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @MinLength(6)
  confirm_password: string;
}
