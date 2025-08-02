import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateRegionDto } from "./dto/create-region.dto";
import { UpdateRegionDto } from "./dto/update-region.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class RegionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRegionDto: CreateRegionDto) {
    const { name } = createRegionDto;

    const existingRegion = await this.prisma.region.findFirst({
      where: { name },
    });

    if (existingRegion) {
      throw new ConflictException(`Region "${name}" already exists`);
    }

    return this.prisma.region.create({
      data: { name },
    });
  }

  async findAll() {
    return this.prisma.region.findMany();
  }

  async findOne(id: number) {
    const region = await this.prisma.region.findUnique({
      where: { id },
      include: { District: true },
    });

    if (!region) {
      throw new NotFoundException(`Region with ID ${id} not found`);
    }

    return region;
  }

  async update(id: number, updateRegionDto: UpdateRegionDto) {
    const existingRegion = await this.prisma.region.findUnique({
      where: { id },
    });

    if (!existingRegion) {
      throw new NotFoundException(`Region with ID ${id} not found`);
    }

    return this.prisma.region.update({
      where: { id },
      data: updateRegionDto,
    });
  }

  async remove(id: number) {
    const existingRegion = await this.prisma.region.findUnique({
      where: { id },
    });

    if (!existingRegion) {
      throw new NotFoundException(`Region with ID ${id} not found`);
    }

    return this.prisma.region.delete({
      where: { id },
    });
  }
}
