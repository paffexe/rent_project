import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateListingDto } from "./dto/create-listing.dto";
import { UpdateListingDto } from "./dto/update-listing.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ListingService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createListingDto: CreateListingDto) {
    const { title, hostId } = createListingDto;

    const host = await this.prisma.users.findUnique({
      where: { id: hostId },
    });

    if (!host) {
      throw new ConflictException(`Host with ID ${hostId} does not exist`);
    }

    const existingListing = await this.prisma.listing.findFirst({
      where: {
        title,
        hostId,
      },
    });

    if (existingListing) {
      throw new ConflictException(
        `Listing with title "${title}" already exists for this host`
      );
    }

    return this.prisma.listing.create({
      data: createListingDto,
    });
  }

  async findAll() {
    return this.prisma.listing.findMany({
      select: {
        title: true,
        pricePerNight: true,
        Images: { where: { is_cover: true } },
      },
    });
  }

  async findOne(id: number) {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
      select: {
        title: true,
        description: true,
        pricePerNight: true,
        location: true,
        Images: { select: { image_url: true } },
        host: {
          select: {
            full_name: true,
            phone: true,
            email: true,
          },
        },
        Reviews: { select: { comment: true, rating: true } },
        Listing_rules: { select: { description: true } },
        Listing_offers: {
          select: {
            house_offer: { select: { name: true, description: true } },
          },
        },
        region: {
          select: {
            name: true,
            District: { select: { name: true } },
          },
        },
        ListingAvailability: {
          select: { isAvailable: true, date: true, priceOverride: true },
          where: { isAvailable: true },
        },
      },
    });

    if (!listing) {
      throw new NotFoundException(`Listing with ID ${id} not found`);
    }

    return listing;
  }

  async update(id: number, updateListingDto: UpdateListingDto) {
    const existingListing = await this.prisma.listing.findUnique({
      where: { id },
    });

    if (!existingListing) {
      throw new NotFoundException(`Listing with ID ${id} not found`);
    }

    return this.prisma.listing.update({
      where: { id },
      data: updateListingDto,
    });
  }

  async remove(id: number) {
    const existingListing = await this.prisma.listing.findUnique({
      where: { id },
    });

    if (!existingListing) {
      throw new NotFoundException(`Listing with ID ${id} not found`);
    }

    return this.prisma.listing.delete({
      where: { id },
    });
  }
}
