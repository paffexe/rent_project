import { PartialType } from '@nestjs/swagger';
import { CreateHouseOfferDto } from './create-house_offer.dto';

export class UpdateHouseOfferDto extends PartialType(CreateHouseOfferDto) {}
