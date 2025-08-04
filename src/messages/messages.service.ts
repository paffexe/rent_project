import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateMessageDto } from "./dto/create-message.dto";
import { UpdateMessageDto } from "./dto/update-message.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateMessageDto) {
    const { chatId } = dto;

    const chat = await this.prisma.chat.findUnique({
      where: { id: chatId },
    });

    if (!chat) {
      throw new ConflictException(`Chat with ID ${chatId} does not exist`);
    }

    return this.prisma.message.create({
      data: {
        ...dto,
        sentAt: dto.sentAt ? new Date(dto.sentAt) : new Date(),
        readAt: dto.readAt ? new Date(dto.readAt) : undefined,
      },
    });
  }

  async findAll() {
    return this.prisma.message.findMany({
      include: { chat: true },
    });
  }

  async findOne(id: number) {
    const message = await this.prisma.message.findUnique({
      where: { id },
      include: { chat: true },
    });

    if (!message) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }

    return message;
  }

  async update(id: number, dto: UpdateMessageDto) {
    const existing = await this.prisma.message.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }

    return this.prisma.message.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    const existing = await this.prisma.message.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }

    return this.prisma.message.delete({
      where: { id },
    });
  }
}
