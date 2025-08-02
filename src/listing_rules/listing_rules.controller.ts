import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ListingRulesService } from './listing_rules.service';
import { CreateListingRuleDto } from './dto/create-listing_rule.dto';
import { UpdateListingRuleDto } from './dto/update-listing_rule.dto';

@Controller('listing-rules')
export class ListingRulesController {
  constructor(private readonly listingRulesService: ListingRulesService) {}

  @Post()
  create(@Body() createListingRuleDto: CreateListingRuleDto) {
    return this.listingRulesService.create(createListingRuleDto);
  }

  @Get()
  findAll() {
    return this.listingRulesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listingRulesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListingRuleDto: UpdateListingRuleDto) {
    return this.listingRulesService.update(+id, updateListingRuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listingRulesService.remove(+id);
  }
}
