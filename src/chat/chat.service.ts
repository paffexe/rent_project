import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateChatDto } from "./dto/create-chat.dto";
import { UpdateChatDto } from "./dto/update-chat.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateChatDto) {
    const { senderId, receiverId, listingId } = dto;

    const sender = await this.prisma.users.findUnique({
      where: { id: senderId },
    });
    if (!sender) {
      throw new ConflictException(`Sender with ID ${senderId} does not exist`);
    }

    const receiver = await this.prisma.users.findUnique({
      where: { id: receiverId },
    });
    if (!receiver) {
      throw new ConflictException(
        `Receiver with ID ${receiverId} does not exist`
      );
    }

    const listing = await this.prisma.listing.findUnique({
      where: { id: listingId },
    });
    if (!listing) {
      throw new ConflictException(
        `Listing with ID ${listingId} does not exist`
      );
    }

    return this.prisma.chat.create({
      data: dto,
    });
  }

  async findAll() {
    return this.prisma.chat.findMany({
      include: {
        sender: true,
        receiver: true,
        listing: true,
      },
    });
  }

  async findOne(id: number) {
    const chat = await this.prisma.chat.findUnique({
      where: { id },
      include: {
        sender: true,
        receiver: true,
        listing: true,
      },
    });

    if (!chat) {
      throw new NotFoundException(`Chat with ID ${id} not found`);
    }

    return chat;
  }

  async update(id: number, dto: UpdateChatDto) {
    const existing = await this.prisma.chat.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Chat with ID ${id} not found`);
    }

    return this.prisma.chat.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    const existing = await this.prisma.chat.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Chat with ID ${id} not found`);
    }

    return this.prisma.chat.delete({
      where: { id },
    });
  }
}
