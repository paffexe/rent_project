import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class OtherService {
  constructor(private readonly prisma: PrismaService) {}
  findAll() {
    return `This action returns all other`;
  }

  async findByRegion(region: string) {
    const ls_region = await this.prisma.region.findFirst({
      select: {
        name: true,
        Listing: {
          select: {
            title: true,
            pricePerNight: true,
            maxGuest: true,
            location: true,
            host: { select: { full_name: true, phone: true } },
            ListingAvailability: { select: { isAvailable: true, date: true } },
            Images: { select: { image_url: true } },
          },
        },
      },
      where: { name: { contains: region, mode: "insensitive" } },
    });

    if (!ls_region) {
      throw new NotFoundException(
        `Hozircha bunday ${region} nomli region yo'q`
      );
    }
    return ls_region;
  }

  async findAvailable() {
    const listings = await this.prisma.listing.findMany({
      select: {
        title: true,
        pricePerNight: true,
        location: true,
        host: { select: { full_name: true, phone: true, email: true } },
        region: {
          select: { name: true, District: { select: { name: true } } },
        },
        ListingAvailability: {
          select: { isAvailable: true, date: true, priceOverride: true },
          where: { isAvailable: true },
        },
      },
    });
    if (!listings) {
      throw new NotFoundException(`Hozirda ochiq listing yo'q`);
    }
    return listings;
  }

  async findCheapest() {
    const listings = await this.prisma.listing.findFirst({
      orderBy: { pricePerNight: "asc" },
    });
    return listings;
  }

  async findBest() {
    const listing = await this.prisma.reviews.groupBy({
      by: ["listingId"],
      _avg: {
        rating: true,
      },
      orderBy: {
        _avg: {
          rating: "desc",
        },
      },
      take: 1,
    });

    if (listing.length === 0) return null;

    const bestlisting = await this.prisma.listing.findUnique({
      where: {
        id: listing[0].listingId,
      },
      include: {
        Reviews: true,
      },
    });

    return bestlisting;
  }
}
