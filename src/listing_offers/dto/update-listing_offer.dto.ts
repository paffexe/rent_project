import { PartialType } from '@nestjs/swagger';
import { CreateListingOfferDto } from './create-listing_offer.dto';

export class UpdateListingOfferDto extends PartialType(CreateListingOfferDto) {}
