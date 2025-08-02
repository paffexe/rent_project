import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateHouseOfferDto } from "./dto/create-house_offer.dto";
import { UpdateHouseOfferDto } from "./dto/update-house_offer.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class HouseOffersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateHouseOfferDto) {
    const { name } = dto;

    const existingOffer = await this.prisma.house_offers.findFirst({
      where: {
        name,
      },
    });

    if (existingOffer) {
      throw new ConflictException(`Offer with title "${name}" already exists `);
    }

    return this.prisma.house_offers.create({
      data: dto,
    });
  }

  async findAll() {
    return this.prisma.house_offers.findMany({
      include: { Listing_offers: true },
    });
  }

  async findOne(id: number) {
    const offer = await this.prisma.house_offers.findUnique({
      where: { id },
      include: { Listing_offers: true },
    });

    if (!offer) {
      throw new NotFoundException(`HouseOffer with ID ${id} not found`);
    }

    return offer;
  }

  async update(id: number, dto: UpdateHouseOfferDto) {
    const existingOffer = await this.prisma.house_offers.findUnique({
      where: { id },
    });

    if (!existingOffer) {
      throw new NotFoundException(`HouseOffer with ID ${id} not found`);
    }

    return this.prisma.house_offers.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    const existingOffer = await this.prisma.house_offers.findUnique({
      where: { id },
    });

    if (!existingOffer) {
      throw new NotFoundException(`HouseOffer with ID ${id} not found`);
    }

    return this.prisma.house_offers.delete({
      where: { id },
    });
  }
}
