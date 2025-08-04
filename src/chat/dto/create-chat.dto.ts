import { IsInt } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateChatDto {
  @ApiProperty({
    example: 1,
    description: "ID of the user who sends the message",
  })
  @IsInt()
  senderId: number;

  @ApiProperty({
    example: 1,
    description: "ID of the user who receives the message",
  })
  @IsInt()
  receiverId: number;

  @ApiProperty({
    example: 1,
    description: "ID of the listing related to this chat",
  })
  @IsInt()
  listingId: number;
}
