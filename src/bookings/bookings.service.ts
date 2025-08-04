import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { UpdateBookingDto } from "./dto/update-booking.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createBookingDto: CreateBookingDto) {
    const { listingId, guestId, guestCount, checkInDate } = createBookingDto;

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
      where: { date: checkInDate },
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
  }

  findAll() {
    return `This action returns all bookings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking`;
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
