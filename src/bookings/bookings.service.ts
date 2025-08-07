import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { UpdateBookingDto } from "./dto/update-booking.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createBookingDto: CreateBookingDto) {
    const {
      listingId,
      guestId,
      guestCount,
      checkInDate,
      checkOutDate,
      hasPet,
      totalPrice,
      status,
    } = createBookingDto;

    const listing = await this.prisma.listing.findUnique({
      where: { id: listingId },
    });

    if (!listing) {
      throw new BadRequestException(
        `Listing with ID: ${listingId} doesn't exsist`
      );
    }

    const guest = await this.prisma.users.findUnique({
      where: { id: guestId },
    });

    if (!guest) {
      throw new BadRequestException(`User with ID: ${guestId} doesn't exsist`);
    }

    if (listing.maxGuest < guestCount) {
      throw new BadRequestException(`Max guest number: ${listing.maxGuest}`);
    }

    const open_date = await this.prisma.listingAvailability.findFirst({
      where: { date: new Date(checkInDate) },
    });

    if (!open_date) {
      throw new NotFoundException(
        `No availability information found for date: ${checkInDate}`
      );
    }

    if (open_date?.isAvailable == false) {
      throw new BadRequestException(
        `On date: ${checkInDate}, service is not available`
      );
    }

    const close_date = await this.prisma.listingAvailability.findFirst({
      where: { date: new Date(checkOutDate) },
    });

    return this.prisma.booking.create({
      data: {
        checkInDate: new Date(checkInDate),
        checkOutDate: new Date(checkOutDate),
        guestCount,
        hasPet,
        totalPrice,
        status,
        listingId,
        guestId,
      },
    });
  }
  async findAll() {
    return this.prisma.booking.findMany({
      include: {
        guest: true,
        listing: true,
      },
    });
  }

  async findOne(id: number) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: {
        guest: true,
        listing: true,
      },
    });

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    return booking;
  }

  async update(id: number, updateBookingDto: UpdateBookingDto) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    return this.prisma.booking.update({
      where: { id },
      data: updateBookingDto,
    });
  }

  async remove(id: number) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    return this.prisma.booking.delete({
      where: { id },
    });
  }
}
