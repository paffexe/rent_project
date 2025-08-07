import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  Min,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { BookingStatus } from "../../../generated/prisma";

export class CreateBookingDto {
  @ApiProperty({
    example: "2025-08-10",
    description: "Check-in date (YYYY-MM-DD)",
  })
  @IsDateString()
  checkInDate: Date;

  @ApiProperty({
    example: "2025-08-15",
    description: "Check-out date (YYYY-MM-DD)",
  })
  @IsDateString()
  checkOutDate: Date;

  @ApiProperty({ example: 2, description: "Number of guests" })
  @IsInt()
  @Min(1)
  guestCount: number;

  @ApiProperty({
    example: true,
    description: "Whether the guest is bringing a pet",
  })
  @IsBoolean()
  hasPet: boolean;

  @ApiProperty({ example: 450.75, description: "Total price for the stay" })
  @IsNumber()
  @Min(1)
  totalPrice: number;

  @ApiProperty({
    enum: BookingStatus,
    example: BookingStatus.PENDING,
    description: "Current booking status",
  })
  @IsEnum(BookingStatus)
  status: BookingStatus;

  @ApiProperty({ example: 1, description: "ID of the listing being booked" })
  @IsInt()
  listingId: number;

  @ApiProperty({
    example: 1,
    description: "ID of the guest/user making the booking",
  })
  @IsInt()
  guestId: number;
}
