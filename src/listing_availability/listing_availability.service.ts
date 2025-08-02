import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateListingAvailabilityDto } from "./dto/create-listing_availability.dto";
import { UpdateListingAvailabilityDto } from "./dto/update-listing_availability.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ListingAvailabilityService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateListingAvailabilityDto) {
    const { listingId, date } = dto;

    const listing = await this.prisma.listing.findUnique({
      where: { id: listingId },
    });

    if (!listing) {
      throw new ConflictException(
        `Listing with ID ${listingId} does not exist`
      );
    }

    const existingAvailability =
      await this.prisma.listingAvailability.findFirst({
        where: {
          listingId,
          date: new Date(date),
        },
      });

    if (existingAvailability) {
      throw new ConflictException(
        `Availability already exists for listing ID ${listingId} on date ${date}`
      );
    }

    return this.prisma.listingAvailability.create({
      data: {
        ...dto,
        date: new Date(date),
      },
    });
  }

  async findAll() {
    return this.prisma.listingAvailability.findMany({
      include: { listing: true },
    });
  }

  async findOne(id: number) {
    const availability = await this.prisma.listingAvailability.findUnique({
      where: { id },
      include: { listing: true },
    });

    if (!availability) {
      throw new NotFoundException(`Availability with ID ${id} not found`);
    }

    return availability;
  }

  async update(id: number, dto: UpdateListingAvailabilityDto) {
    const existing = await this.prisma.listingAvailability.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Availability with ID ${id} not found`);
    }

    return this.prisma.listingAvailability.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    const existing = await this.prisma.listingAvailability.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Availability with ID ${id} not found`);
    }

    return this.prisma.listingAvailability.delete({
      where: { id },
    });
  }
}
