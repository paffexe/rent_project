import { IsEnum, IsInt, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  ReportReason,
  ReportStatus,
  ReportType,
} from "../../../generated/prisma";

export class CreateReportDto {
  @ApiProperty({
    example: 1,
    description: "ID of the subject being reported (e.g., user, listing)",
  })
  @IsInt()
  reportedSubjectId: number;

  @ApiProperty({
    enum: ReportType,
    description: "Type of the reported subject",
  })
  @IsEnum(ReportType)
  reportType: ReportType;

  @ApiProperty({
    enum: ReportReason,
    description: "Reason for reporting the subject",
  })
  @IsEnum(ReportReason)
  reason: ReportReason;

  @ApiPropertyOptional({
    example: "This user posted inappropriate content.",
    description: "Detailed description of the report (optional)",
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    enum: ReportStatus,
    description: "Initial status of the report (optional)",
  })
  @IsOptional()
  @IsEnum(ReportStatus)
  status?: ReportStatus;

  @ApiProperty({
    example: 1,
    description: "ID of the user who is submitting the report",
  })
  @IsInt()
  reporterId: number;

  @ApiProperty({
    example: 1,
    description: "ID of the admin who is assigned to the report",
  })
  @IsInt()
  adminId: number;
}
