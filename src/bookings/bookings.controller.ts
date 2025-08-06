import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { BookingsService } from "./bookings.service";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { UpdateBookingDto } from "./dto/update-booking.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { RefreshTokenGuard } from "../common/guards/user.guard/refresh-token.guard";
import { UserSelfGuard } from "../common/guards/user.guard/self.guard";

@ApiTags("Bookings")
@Controller("bookings")
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @UseGuards(RefreshTokenGuard)
  @Post()
  @ApiOperation({ summary: "Create a new booking" })
  @ApiResponse({ status: 201, description: "Booking successfully created." })
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.create(createBookingDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all bookings" })
  @ApiResponse({ status: 200, description: "List of all bookings." })
  findAll() {
    return this.bookingsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a booking by ID" })
  @ApiParam({ name: "id", type: "string" })
  @ApiResponse({ status: 200, description: "Booking data." })
  @ApiResponse({ status: 404, description: "Booking not found." })
  findOne(@Param("id") id: string) {
    return this.bookingsService.findOne(+id);
  }

  @UseGuards(RefreshTokenGuard, UserSelfGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Update a booking by ID" })
  @ApiParam({ name: "id", type: "string" })
  @ApiResponse({ status: 200, description: "Booking updated." })
  @ApiResponse({ status: 404, description: "Booking not found." })
  update(@Param("id") id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingsService.update(+id, updateBookingDto);
  }

  @UseGuards(RefreshTokenGuard, UserSelfGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Delete a booking by ID" })
  @ApiParam({ name: "id", type: "string" })
  @ApiResponse({ status: 200, description: "Booking deleted." })
  @ApiResponse({ status: 404, description: "Booking not found." })
  remove(@Param("id") id: string) {
    return this.bookingsService.remove(+id);
  }
}
