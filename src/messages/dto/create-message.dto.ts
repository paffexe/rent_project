import {
  IsInt,
  IsOptional,
  IsString,
  IsBoolean,
  IsDateString,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateMessageDto {
  @ApiProperty({
    example: "Hello! Is the apartment available this weekend?",
    description: "Content of the message",
  })
  @IsString()
  text: string;

  @ApiPropertyOptional({
    example: false,
    description: "Whether the message has been read or not",
  })
  @IsOptional()
  @IsBoolean()
  isRead?: boolean;

  @ApiPropertyOptional({
    example: "2025-08-02T14:30:00Z",
    description: "Timestamp of when the message was sent",
  })
  @IsOptional()
  @IsDateString()
  sentAt?: string;

  @ApiPropertyOptional({
    example: "2025-08-02T15:00:00Z",
    description: "Timestamp of when the message was read",
  })
  @IsOptional()
  @IsDateString()
  readAt?: string;

  @ApiProperty({
    example: 1,
    description: "ID of the chat this message belongs to",
  })
  @IsInt()
  chatId: number;
}
