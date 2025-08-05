import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ReportsService } from "./reports.service";
import { CreateReportDto } from "./dto/create-report.dto";
import { UpdateReportDto } from "./dto/update-report.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("Reports")
@Controller("reports")
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new report" })
  @ApiResponse({ status: 201, description: "Report created successfully" })
  create(@Body() createReportDto: CreateReportDto) {
    return this.reportsService.create(createReportDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all reports" })
  @ApiResponse({ status: 200, description: "List of all reports" })
  findAll() {
    return this.reportsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a report by ID" })
  @ApiResponse({ status: 200, description: "Report found" })
  @ApiResponse({ status: 404, description: "Report not found" })
  findOne(@Param("id") id: string) {
    return this.reportsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a report by ID" })
  @ApiResponse({ status: 200, description: "Report updated successfully" })
  update(@Param("id") id: string, @Body() updateReportDto: UpdateReportDto) {
    return this.reportsService.update(+id, updateReportDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a report by ID" })
  @ApiResponse({ status: 200, description: "Report deleted successfully" })
  remove(@Param("id") id: string) {
    return this.reportsService.remove(+id);
  }
}
