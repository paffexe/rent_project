import { IsEnum, IsInt, IsString, IsOptional } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SupportCategory, SupportStatus } from "../../../generated/prisma";

export class CreateSupportTicketDto {
  @ApiProperty({ enum: SupportCategory })
  @IsEnum(SupportCategory)
  category: SupportCategory;

  @ApiProperty({ example: "Unable to access account" })
  @IsString()
  subject: string;

  @ApiProperty({
    example: "I get an error when trying to log in with my credentials.",
  })
  @IsString()
  description: string;

  @ApiPropertyOptional({ enum: SupportStatus, default: "PENDING" })
  @IsOptional()
  @IsEnum(SupportStatus)
  status?: SupportStatus;

  @ApiProperty({ example: 1 })
  @IsInt()
  usersId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  adminId: number;
}
