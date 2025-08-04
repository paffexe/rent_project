import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateListingOfferDto } from "./dto/create-listing_offer.dto";
import { UpdateListingOfferDto } from "./dto/update-listing_offer.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ListingOffersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateListingOfferDto) {
    const { listingId, house_offerId } = dto;

    const listing = await this.prisma.listing.findUnique({
      where: { id: listingId },
    });

    if (!listing) {
      throw new ConflictException(
        `Listing with ID ${listingId} does not exist`
      );
    }

    const offer = await this.prisma.house_offers.findUnique({
      where: { id: house_offerId },
    });

    if (!offer) {
      throw new ConflictException(
        `HouseOffer with ID ${house_offerId} does not exist`
      );
    }

    return this.prisma.listing_offers.create({
      data: dto,
    });
  }

  async findAll() {
    return this.prisma.listing_offers.findMany({
      include: {
        listing: true,
        house_offer: true,
      },
    });
  }

  async findOne(id: number) {
    const offer = await this.prisma.listing_offers.findUnique({
      where: { id },
      include: {
        listing: true,
        house_offer: true,
      },
    });

    if (!offer) {
      throw new NotFoundException(`ListingOffer with ID ${id} not found`);
    }

    return offer;
  }

  async update(id: number, dto: UpdateListingOfferDto) {
    const existing = await this.prisma.listing_offers.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`ListingOffer with ID ${id} not found`);
    }

    return this.prisma.listing_offers.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    const existing = await this.prisma.listing_offers.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`ListingOffer with ID ${id} not found`);
    }

    return this.prisma.listing_offers.delete({
      where: { id },
    });
  }
}
