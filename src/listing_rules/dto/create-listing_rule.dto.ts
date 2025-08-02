import { IsInt, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateListingRuleDto {
  @ApiProperty({
    example: "No smoking inside the property",
    description: "Rule description or restriction for the listing",
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 1,
    description: "ID of the related listing",
  })
  @IsInt()
  listing_id: number;
}
