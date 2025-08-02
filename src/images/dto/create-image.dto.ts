import { IsBoolean, IsInt, IsString, IsOptional } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateImageDto {
  @ApiProperty({
    example: "https://example.com/images/apartment1.jpg",
    description: "URL of the image",
  })
  @IsString()
  image_url: string;

  @ApiPropertyOptional({
    example: true,
    description: "Whether this image is the cover photo (optional)",
  })
  @IsOptional()
  @IsBoolean()
  is_cover?: boolean;

  @ApiProperty({
    example: 1,
    description: "ID of the listing this image belongs to",
  })
  @IsInt()
  listing_id: number;
}
