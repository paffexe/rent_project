import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateFavouriteDto } from "./dto/create-favourite.dto";
import { UpdateFavouriteDto } from "./dto/update-favourite.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class FavouritesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFavouriteDto: CreateFavouriteDto) {
    const { name, guestId, listingId } = createFavouriteDto;

    const guest = await this.prisma.users.findUnique({
      where: { id: guestId },
    });

    if (!guest) {
      throw new NotFoundException(`User with ID ${guestId} doesn't exist`);
    }

    const listing = await this.prisma.listing.findUnique({
      where: { id: listingId },
    });

    if (!listing) {
      throw new NotFoundException(`Listing with ID ${listingId} doesn't exist`);
    }

    const existing = await this.prisma.favourite.findFirst({
      where: {
        name,
        guestId,
      },
    });

    if (existing) {
      throw new BadRequestException(
        `Favourite with name "${name}" already exists for this user`
      );
    }

    const favourite = await this.prisma.favourite.create({
      data: createFavouriteDto,
    });

    return {
      message: "Favourite created successfully",
      favourite,
    };
  }

  async findAll() {
    return this.prisma.favourite.findMany({
      include: {
        guest: true,
        listing: true,
      },
    });
  }

  async findOne(id: number) {
    const favourite = await this.prisma.favourite.findUnique({
      where: { id },
      include: {
        guest: true,
        listing: true,
      },
    });

    if (!favourite) {
      throw new NotFoundException(`Favourite with ID ${id} not found`);
    }

    return favourite;
  }

  async update(id: number, updateFavouriteDto: UpdateFavouriteDto) {
    const favourite = await this.prisma.favourite.findUnique({ where: { id } });

    if (!favourite) {
      throw new NotFoundException(`Favourite with ID ${id} not found`);
    }

    return this.prisma.favourite.update({
      where: { id },
      data: updateFavouriteDto,
    });
  }

  async remove(id: number) {
    const favourite = await this.prisma.favourite.findUnique({ where: { id } });

    if (!favourite) {
      throw new NotFoundException(`Favourite with ID ${id} not found`);
    }

    return this.prisma.favourite.delete({
      where: { id },
    });
  }
}
