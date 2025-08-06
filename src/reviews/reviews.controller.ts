import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("Reviews")
@Controller("reviews")
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new review" })
  @ApiResponse({ status: 201, description: "Review created successfully" })
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all reviews" })
  @ApiResponse({ status: 200, description: "List of all reviews" })
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a review by ID" })
  @ApiResponse({ status: 200, description: "Review found" })
  @ApiResponse({ status: 404, description: "Review not found" })
  findOne(@Param("id") id: string) {
    return this.reviewsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a review by ID" })
  @ApiResponse({ status: 200, description: "Review updated successfully" })
  update(@Param("id") id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a review by ID" })
  @ApiResponse({ status: 200, description: "Review deleted successfully" })
  remove(@Param("id") id: string) {
    return this.reviewsService.remove(+id);
  }
}
