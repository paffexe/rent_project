import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createReviewDto: CreateReviewDto) {
    const { listingId, guestId } = createReviewDto;

    const guest = await this.prisma.users.findUnique({
      where: { id: guestId },
    });

    if (!guest) {
      throw new NotFoundException(`User with ID ${guestId} does not exist`);
    }

    const listing = await this.prisma.listing.findUnique({
      where: { id: listingId },
    });

    if (!listing) {
      throw new NotFoundException(
        `Listing with ID ${listingId} does not exist`
      );
    }

    const review = await this.prisma.reviews.create({
      data: createReviewDto,
    });

    return {
      message: "Review submitted successfully",
      review,
    };
  }

  async findAll() {
    return this.prisma.reviews.findMany({
      include: {
        guest: true,
        listing: true,
      },
    });
  }

  async findOne(id: number) {
    const review = await this.prisma.reviews.findUnique({
      where: { id },
      include: {
        guest: true,
        listing: true,
      },
    });

    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    return review;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    const existing = await this.prisma.reviews.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    return this.prisma.reviews.update({
      where: { id },
      data: updateReviewDto,
    });
  }

  async remove(id: number) {
    const existing = await this.prisma.reviews.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    return this.prisma.reviews.delete({
      where: { id },
    });
  }
}
