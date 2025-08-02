import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";

import { RegionService } from "./region.service";
import { CreateRegionDto } from "./dto/create-region.dto";
import { UpdateRegionDto } from "./dto/update-region.dto";

@ApiTags("regions")
@Controller("region")
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Post()
  @ApiOperation({ summary: "Create a new region" })
  @ApiBody({ type: CreateRegionDto })
  @ApiResponse({ status: 201, description: "Region created successfully." })
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionService.create(createRegionDto);
  }

  @Get()
  @ApiOperation({ summary: "Retrieve all regions" })
  @ApiResponse({ status: 200, description: "List of regions." })
  findAll() {
    return this.regionService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a region by ID" })
  @ApiParam({ name: "id", type: Number, description: "Region ID" })
  @ApiResponse({ status: 200, description: "The found region." })
  @ApiResponse({ status: 404, description: "Region not found." })
  findOne(@Param("id") id: string) {
    return this.regionService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a region" })
  @ApiParam({ name: "id", type: Number, description: "Region ID" })
  @ApiBody({ type: UpdateRegionDto })
  @ApiResponse({ status: 200, description: "Region updated successfully." })
  update(@Param("id") id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionService.update(+id, updateRegionDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a region" })
  @ApiParam({ name: "id", type: Number, description: "Region ID" })
  @ApiResponse({ status: 204, description: "Region deleted successfully." })
  remove(@Param("id") id: string) {
    return this.regionService.remove(+id);
  }
}
