import { IsBoolean, IsInt, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateNotificationDto {
  @ApiProperty({
    example: "New message received",
    description: "Title of the notification",
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: "You have a new message from John Doe.",
    description: "Content/body of the notification",
  })
  @IsString()
  body: string;

  @ApiPropertyOptional({
    example: false,
    description: "Whether the notification has been read",
  })
  @IsOptional()
  @IsBoolean()
  isRead?: boolean;

  @ApiProperty({
    example: 1,
    description: "ID of the user who receives the notification",
  })
  @IsInt()
  userId: number;
}
