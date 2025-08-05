import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateReportDto } from "./dto/create-report.dto";
import { UpdateReportDto } from "./dto/update-report.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createReportDto: CreateReportDto) {
    const { adminId, reporterId, reportedSubjectId } = createReportDto;

    const admin = await this.prisma.admin.findUnique({
      where: { id: adminId },
    });

    if (!admin) {
      throw new NotFoundException(`Admin with ID: ${adminId} doesn't exsist`);
    }

    const reporter = await this.prisma.users.findUnique({
      where: { id: reporterId },
    });

    if (!reporter) {
      throw new NotFoundException(`User with ID: ${reporter} doesn't exsist`);
    }

    const image = await this.prisma.images.findUnique({
      where: { id: reportedSubjectId },
    });

    if (!image) {
      throw new NotFoundException(
        `Image with ID: ${reportedSubjectId} doesn't exsist`
      );
    }

    const user = await this.prisma.users.findUnique({
      where: { id: reportedSubjectId },
    });

    if (!user) {
      throw new NotFoundException(
        `User with ID: ${reportedSubjectId} doesn't exsist`
      );
    }

    const review = await this.prisma.reviews.findUnique({
      where: { id: reportedSubjectId },
    });

    if (!review) {
      throw new NotFoundException(
        `Review with ID: ${reportedSubjectId} doesn't exsist`
      );
    }

    const listing = await this.prisma.listing.findUnique({
      where: { id: reportedSubjectId },
    });

    if (!listing) {
      throw new NotFoundException(
        `Listing with ID: ${reportedSubjectId} doesn't exsist`
      );
    }

    const report = await this.prisma.report.create({ data: createReportDto });

    return {
      message: "Your report has been sent",
      report: report,
    };
  }

  async findAll() {
    return this.prisma.report.findMany({
      include: {
        admin: true,
        reporter: true,
      },
    });
  }

  async findOne(id: number) {
    const report = await this.prisma.report.findUnique({
      where: { id },
      include: {
        admin: true,
        reporter: true,
      },
    });

    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }

    return report;
  }

  async update(id: number, updateReportDto: UpdateReportDto) {
    const report = await this.prisma.report.findUnique({ where: { id } });

    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }

    return this.prisma.report.update({
      where: { id },
      data: updateReportDto,
    });
  }

  async remove(id: number) {
    const report = await this.prisma.report.findUnique({ where: { id } });

    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }

    return this.prisma.report.delete({
      where: { id },
    });
  }
}
