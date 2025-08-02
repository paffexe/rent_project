import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateListingAvailabilityDto {
  @ApiProperty({
    example: "2025-08-10",
    description: "Date for the listing availability (ISO format)",
  })
  @IsDateString()
  date: string;

  @ApiProperty({
    example: true,
    description: "Whether the listing is available on this date",
  })
  @IsBoolean()
  isAvailable: boolean;

  @ApiPropertyOptional({
    example: 200,
    description: "Override price for this date (optional)",
  })
  @IsOptional()
  @IsNumber()
  priceOverride?: number;

  @ApiProperty({
    example: 1,
    description: "ID of the related listing",
  })
  @IsInt()
  listingId: number;
}
