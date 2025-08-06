import { IsString, IsNumber, IsInt, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateListingDto {
  @ApiProperty({
    example: "Cozy Apartment",
    description: "Title of the listing",
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: "A beautiful apartment in the city center",
    description: "Detailed description of the listing",
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 150,
    description: "Price per night in USD",
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  pricePerNight: number;

  @ApiProperty({
    example: "Tashkent, Uzbekistan",
    description: "Location of the listing",
  })
  @IsString()
  location: string;

  @ApiProperty({
    example: 4,
    description: "Maximum number of guests allowed",
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  maxGuest: number;

  @IsInt()
  regionId: number;

  @ApiProperty({
    example: 1,
    description: "ID of the host (foreign key)",
  })
  @IsInt()
  hostId: number;
}
