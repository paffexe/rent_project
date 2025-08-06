import { IsInt, IsString, Min, Max } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateReviewDto {
  @ApiProperty({
    example: 4,
    description: "Rating given by the guest (1 to 5)",
    minimum: 1,
    maximum: 5,
  })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({
    example: "Great place to stay!",
    description: "Comment or feedback from the guest",
  })
  @IsString()
  comment: string;

  @ApiProperty({
    example: 1,
    description: "ID of the listing being reviewed",
  })
  @IsInt()
  listingId: number;

  @ApiProperty({
    example: 1,
    description: "ID of the guest leaving the review",
  })
  @IsInt()
  guestId: number;
}
