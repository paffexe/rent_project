import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { FavouritesService } from "./favourites.service";
import { CreateFavouriteDto } from "./dto/create-favourite.dto";
import { UpdateFavouriteDto } from "./dto/update-favourite.dto";

@ApiTags("Favourites")
@Controller("favourites")
export class FavouritesController {
  constructor(private readonly favouritesService: FavouritesService) {}

  @Post()
  @ApiOperation({ summary: "Create a new favourite" })
  @ApiResponse({ status: 201, description: "Favourite successfully created" })
  create(@Body() createFavouriteDto: CreateFavouriteDto) {
    return this.favouritesService.create(createFavouriteDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all favourites" })
  @ApiResponse({ status: 200, description: "List of all favourites" })
  findAll() {
    return this.favouritesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a single favourite by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Favourite found" })
  @ApiResponse({ status: 404, description: "Favourite not found" })
  findOne(@Param("id") id: string) {
    return this.favouritesService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a favourite by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Favourite successfully updated" })
  update(
    @Param("id") id: string,
    @Body() updateFavouriteDto: UpdateFavouriteDto
  ) {
    return this.favouritesService.update(+id, updateFavouriteDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a favourite by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Favourite successfully deleted" })
  remove(@Param("id") id: string) {
    return this.favouritesService.remove(+id);
  }
}
