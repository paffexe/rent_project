import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateSupportTicketDto } from "./dto/create-support_ticket.dto";
import { UpdateSupportTicketDto } from "./dto/update-support_ticket.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class SupportTicketService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSupportTicketDto: CreateSupportTicketDto) {
    const { usersId, adminId } = createSupportTicketDto;

    const user = await this.prisma.users.findUnique({
      where: { id: usersId },
    });

    if (!user) {
      throw new BadRequestException(`User with ID ${usersId} does not exist`);
    }

    const admin = await this.prisma.admin.findUnique({
      where: { id: adminId },
    });

    if (!admin) {
      throw new BadRequestException(`Admin with ID ${adminId} does not exist`);
    }

    return this.prisma.supportTicket.create({
      data: createSupportTicketDto,
    });
  }

  async findAll() {
    return this.prisma.supportTicket.findMany({
      include: {
        Users: true,
        Admin: true,
      },
    });
  }

  async findOne(id: number) {
    const ticket = await this.prisma.supportTicket.findUnique({
      where: { id },
      include: {
        Users: true,
        Admin: true,
      },
    });

    if (!ticket) {
      throw new NotFoundException(`Support ticket with ID ${id} not found`);
    }

    return ticket;
  }

  async update(id: number, updateSupportTicketDto: UpdateSupportTicketDto) {
    const ticket = await this.prisma.supportTicket.findUnique({
      where: { id },
    });

    if (!ticket) {
      throw new NotFoundException(`Support ticket with ID ${id} not found`);
    }

    return this.prisma.supportTicket.update({
      where: { id },
      data: updateSupportTicketDto,
    });
  }

  async remove(id: number) {
    const ticket = await this.prisma.supportTicket.findUnique({
      where: { id },
    });

    if (!ticket) {
      throw new NotFoundException(`Support ticket with ID ${id} not found`);
    }

    return this.prisma.supportTicket.delete({
      where: { id },
    });
  }
}
