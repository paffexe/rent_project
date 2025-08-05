import { IsInt, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateFavouriteDto {
  @ApiProperty({
    example: "My Dream Apartment",
    description: "Name of the favourite listing",
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 1,
    description: "ID of the guest who marked the favourite",
  })
  @IsInt()
  guestId: number;

  @ApiProperty({
    example: 1,
    description: "ID of the listing being favourited",
  })
  @IsInt()
  listingId: number;
}
