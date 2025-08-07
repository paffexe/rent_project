import { IsEnum, IsInt, IsNumber } from "class-validator";
import { PaymentMethod, PaymentStatus } from "../../../generated/prisma";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePaymentDto {
  @ApiProperty({
    enum: PaymentMethod,
    description: "Payment method used for the transaction",
    example: PaymentMethod.CARD,
  })
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @ApiProperty({
    description: "Total payment amount",
    example: 150.75,
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    enum: PaymentStatus,
    description: "Current payment status",
    example: PaymentStatus.CONFIRMED,
  })
  @IsEnum(PaymentStatus)
  status: PaymentStatus;

  @ApiProperty({
    description: "Recieved money time",
    example: "2025-08-02T15:00:00Z",
  })
  paid_at?: string;

  @ApiProperty({
    description: "ID of the related booking",
    example: 1,
  })
  @IsInt()
  bookingId: number;
}
