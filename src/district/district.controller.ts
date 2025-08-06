import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { DistrictService } from "./district.service";
import { CreateDistrictDto } from "./dto/create-district.dto";
import { UpdateDistrictDto } from "./dto/update-district.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";
import { AdminRefreshTokenGuard } from "../common/guards/admin.guard/admin-refresh-token.guard";

@ApiTags("districts")
@Controller("district")
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @UseGuards(AdminRefreshTokenGuard)
  @Post()
  @ApiOperation({ summary: "Create a new district" })
  @ApiBody({ type: CreateDistrictDto })
  @ApiResponse({ status: 201, description: "District successfully created" })
  create(@Body() createDistrictDto: CreateDistrictDto) {
    return this.districtService.create(createDistrictDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all districts" })
  @ApiResponse({ status: 200, description: "List of districts" })
  findAll() {
    return this.districtService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a district by ID" })
  @ApiParam({ name: "id", type: Number, description: "District ID" })
  @ApiResponse({ status: 200, description: "The found district" })
  @ApiResponse({ status: 404, description: "District not found" })
  findOne(@Param("id") id: string) {
    return this.districtService.findOne(+id);
  }

  @UseGuards(AdminRefreshTokenGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Update a district by ID" })
  @ApiParam({ name: "id", type: Number, description: "District ID" })
  @ApiBody({ type: UpdateDistrictDto })
  @ApiResponse({ status: 200, description: "District successfully updated" })
  update(
    @Param("id") id: string,
    @Body() updateDistrictDto: UpdateDistrictDto
  ) {
    return this.districtService.update(+id, updateDistrictDto);
  }

  @UseGuards(AdminRefreshTokenGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Delete a district by ID" })
  @ApiParam({ name: "id", type: Number, description: "District ID" })
  @ApiResponse({ status: 204, description: "District successfully deleted" })
  remove(@Param("id") id: string) {
    return this.districtService.remove(+id);
  }
}
