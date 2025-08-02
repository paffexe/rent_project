import { IsInt, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateDistrictDto {
  @ApiProperty({ example: "Chilonzor", description: "Name of the district" })
  @IsString()
  name: string;

  @ApiProperty({
    example: 1,
    description: "ID of the region this district belongs to",
  })
  @IsInt()
  regionId: number;
}
