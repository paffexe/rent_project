import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateHouseOfferDto {
  @ApiProperty({
    example: "Free wi-fi",
    description: "Name of the house offer",
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: "Free wi-fi",
    description: "Detailed description of the offer",
  })
  @IsString()
  description: string;
}
