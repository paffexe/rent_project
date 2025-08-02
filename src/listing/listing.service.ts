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
      include: {
        host: true,
      },
    });
  }

  async findOne(id: number) {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
      include: { host: true },
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
