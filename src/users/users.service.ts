import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const { full_name, email, password, confirm_password, phone, role } =
      createUserDto;

    if (password != confirm_password) {
      throw new BadRequestException("Passwords must match!");
    }

    const isExsists = await this.prismaService.users.findUnique({
      where: { email: createUserDto.email },
    });

    if (isExsists) {
      throw new BadRequestException("This email already exists!");
    }

    const hpassword = await bcrypt.hash(confirm_password, 7);

    return this.prismaService.users.create({
      data: { full_name, email, phone, role, password: hpassword },
    });
  }

  findAll() {
    return this.prismaService.users.findMany();
  }

  async findOne(id: number) {
    const user = await this.prismaService.users.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(`Data with this ${id} not found`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prismaService.users.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(`Data with this ${id} not found`);
    }

    const { confirm_password, password } = updateUserDto;

    if (password || confirm_password) {
      if (confirm_password !== password) {
        throw new BadRequestException("Passwords must match!");
      }

      if (updateUserDto.password) {
        updateUserDto.password = await bcrypt.hash(updateUserDto.password, 7);
        delete updateUserDto.confirm_password;
      }
    }

    return this.prismaService.users.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    const user = await this.prismaService.users.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(`Data with this ${id} not found`);
    }

    return this.prismaService.users.delete({ where: { id } });
  }

  async updateRefreshToken(id: number, refresh_token: string) {
    const updatedUser = await this.prismaService.users.update({
      where: {
        id: id,
      },
      data: {
        refresh_token: refresh_token,
      },
    });
    return updatedUser;
  }

  async activateUser(activation_link: string) {
    if (!activation_link) {
      throw new BadRequestException("Activation link not found");
    }

    const user = await this.prismaService.users.findFirst({
      where: { activation_link },
    });

    if (!user || user.is_active) {
      throw new BadRequestException("User already activated or invalid link");
    }

    await this.prismaService.users.update({
      where: { id: user.id },
      data: { is_active: true },
    });

    return {
      message: "User activated successfully",
    };
  }
}
