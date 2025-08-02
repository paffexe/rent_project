import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateListingRuleDto } from "./dto/create-listing_rule.dto";
import { UpdateListingRuleDto } from "./dto/update-listing_rule.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ListingRulesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateListingRuleDto) {
    const { listing_id, description } = dto;

    const listing = await this.prisma.listing.findUnique({
      where: { id: listing_id },
    });

    if (!listing) {
      throw new ConflictException(
        `Listing with ID ${listing_id} does not exist`
      );
    }

    const existingRule = await this.prisma.listing_rules.findFirst({
      where: {
        listing_id,
        description,
      },
    });

    if (existingRule) {
      throw new ConflictException(
        `Rule "${description}" already exists for listing ID ${listing_id}`
      );
    }

    return this.prisma.listing_rules.create({
      data: dto,
    });
  }

  async findAll() {
    return this.prisma.listing_rules.findMany({
      include: { listing: true },
    });
  }

  async findOne(id: number) {
    const rule = await this.prisma.listing_rules.findUnique({
      where: { id },
      include: { listing: true },
    });

    if (!rule) {
      throw new NotFoundException(`ListingRule with ID ${id} not found`);
    }

    return rule;
  }

  async update(id: number, dto: UpdateListingRuleDto) {
    const existingRule = await this.prisma.listing_rules.findUnique({
      where: { id },
    });

    if (!existingRule) {
      throw new NotFoundException(`ListingRule with ID ${id} not found`);
    }

    return this.prisma.listing_rules.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    const existingRule = await this.prisma.listing_rules.findUnique({
      where: { id },
    });

    if (!existingRule) {
      throw new NotFoundException(`ListingRule with ID ${id} not found`);
    }

    return this.prisma.listing_rules.delete({
      where: { id },
    });
  }
}
