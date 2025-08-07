import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { OtherService } from "./other.service";

@Controller("other")
export class OtherController {
  constructor(private readonly otherService: OtherService) {}

  @Get()
  findAll() {
    return this.otherService.findAll();
  }

  @Get("find/:region")
  findOne(@Param("region") region: string) {
    return this.otherService.findByRegion(region);
  }

  @Get("open")
  findAvailable() {
    return this.otherService.findAvailable();
  }

  @Get("cheap")
  findCheapest() {
    return this.otherService.findCheapest();
  }

  @Get("best")
  findBestt() {
    return this.otherService.findBest();
  }
}
