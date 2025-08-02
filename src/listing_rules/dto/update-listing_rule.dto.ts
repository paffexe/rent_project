import { PartialType } from '@nestjs/swagger';
import { CreateListingRuleDto } from './create-listing_rule.dto';

export class UpdateListingRuleDto extends PartialType(CreateListingRuleDto) {}
