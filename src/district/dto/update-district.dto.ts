import { IsInt, IsString } from "class-validator";

export class UpdateDistrictDto {
  @IsString()
  name?: string;

  @IsInt()
  regionId?: number;
}
