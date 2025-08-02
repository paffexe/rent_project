import { PartialType } from '@nestjs/swagger';
import { CreateListingAvailabilityDto } from './create-listing_availability.dto';

export class UpdateListingAvailabilityDto extends PartialType(CreateListingAvailabilityDto) {}
