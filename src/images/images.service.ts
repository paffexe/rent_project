import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateImageDto } from "./dto/create-image.dto";
import { UpdateImageDto } from "./dto/update-image.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ImagesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateImageDto) {
    const { listing_id } = dto;

    const listing = await this.prisma.listing.findUnique({
      where: { id: listing_id },
    });

    if (!listing) {
      throw new ConflictException(
        `Listing with ID ${listing_id} does not exist`
      );
    }

    return this.prisma.images.create({
      data: dto,
    });
  }

  async findAll() {
    return this.prisma.images.findMany({
      include: { listing: true },
    });
  }

  async findOne(id: number) {
    const image = await this.prisma.images.findUnique({
      where: { id },
      include: { listing: true },
    });

    if (!image) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }

    return image;
  }

  async update(id: number, dto: UpdateImageDto) {
    const existingImage = await this.prisma.images.findUnique({
      where: { id },
    });

    if (!existingImage) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }

    return this.prisma.images.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    const existingImage = await this.prisma.images.findUnique({
      where: { id },
    });

    if (!existingImage) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }

    return this.prisma.images.delete({
      where: { id },
    });
  }
}
