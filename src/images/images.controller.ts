import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ImagesService } from "./images.service";
import { CreateImageDto } from "./dto/create-image.dto";
import { UpdateImageDto } from "./dto/update-image.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";

@ApiTags("images")
@Controller("images")
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @ApiOperation({ summary: "Upload a new image for a listing" })
  @ApiBody({ type: CreateImageDto })
  @ApiResponse({ status: 201, description: "Image successfully created" })
  create(@Body() createImageDto: CreateImageDto) {
    return this.imagesService.create(createImageDto);
  }

  @Get()
  @ApiOperation({ summary: "Retrieve all images" })
  @ApiResponse({ status: 200, description: "List of all images" })
  findAll() {
    return this.imagesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get image details by ID" })
  @ApiParam({ name: "id", type: Number, description: "Image ID" })
  @ApiResponse({ status: 200, description: "Image found" })
  @ApiResponse({ status: 404, description: "Image not found" })
  findOne(@Param("id") id: string) {
    return this.imagesService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update image details" })
  @ApiParam({ name: "id", type: Number, description: "Image ID" })
  @ApiBody({ type: UpdateImageDto })
  @ApiResponse({ status: 200, description: "Image updated successfully" })
  update(@Param("id") id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imagesService.update(+id, updateImageDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete image by ID" })
  @ApiParam({ name: "id", type: Number, description: "Image ID" })
  @ApiResponse({ status: 204, description: "Image deleted successfully" })
  remove(@Param("id") id: string) {
    return this.imagesService.remove(+id);
  }
}
