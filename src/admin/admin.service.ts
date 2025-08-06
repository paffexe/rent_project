import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class AdminService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createAdminDto: CreateAdminDto) {
    const { full_name, email, password, confirm_password } = createAdminDto;

    if (password !== confirm_password) {
      throw new BadRequestException("Passwords must match!");
    }

    const isExists = await this.prismaService.admin.findUnique({
      where: { email: createAdminDto.email },
    });

    if (isExists) {
      throw new BadRequestException("This email already exists!");
    }

    const hashedPassword = await bcrypt.hash(password, 7);

    return this.prismaService.admin.create({
      data: {
        full_name,
        email,
        password: hashedPassword,
      },
    });
  }

  findAll() {
    return this.prismaService.admin.findMany();
  }

  async findOne(id: number) {
    const admin = await this.prismaService.admin.findUnique({
      where: { id },
    });

    if (!admin) {
      throw new NotFoundException(`Admin with id ${id} not found`);
    }

    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.prismaService.admin.findUnique({
      where: { id },
    });

    if (!admin) {
      throw new NotFoundException(`Admin with id ${id} not found`);
    }

    const { confirm_password, password } = updateAdminDto;

    if (password || confirm_password) {
      if (confirm_password !== password) {
        throw new BadRequestException("Passwords must match!");
      }

      if (updateAdminDto.password) {
        updateAdminDto.password = await bcrypt.hash(updateAdminDto.password, 7);
        delete updateAdminDto.confirm_password;
      }
    }

    return this.prismaService.admin.update({
      where: { id },
      data: updateAdminDto,
    });
  }

  async remove(id: number) {
    const admin = await this.prismaService.admin.findUnique({
      where: { id },
    });

    if (!admin) {
      throw new NotFoundException(`Admin with id ${id} not found`);
    }

    return this.prismaService.admin.delete({ where: { id } });
  }
}
