import { IsInt } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateListingOfferDto {
  @ApiProperty({ example: 1, description: "ID of the listing" })
  @IsInt()
  listingId: number;

  @ApiProperty({ example: 1, description: "ID of the associated house offer" })
  @IsInt()
  house_offerId: number;
}
