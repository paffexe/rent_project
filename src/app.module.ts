import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { UsersModule } from "./users/users.module";
import { AdminModule } from "./admin/admin.module";
import { AuthModule } from "./auth/auth.module";
import { MailModule } from "./mail/mail.module";
import { DistrictModule } from "./district/district.module";
import { RegionModule } from "./region/region.module";
import { ListingAvailabilityModule } from "./listing_availability/listing_availability.module";
import { ListingModule } from "./listing/listing.module";
import { ListingRulesModule } from './listing_rules/listing_rules.module';
import { ImagesModule } from './images/images.module';
import { HouseOffersModule } from './house_offers/house_offers.module';
import { ListingOffersModule } from './listing_offers/listing_offers.module';
import { MessagesModule } from './messages/messages.module';
import { ChatModule } from './chat/chat.module';
import { PaymentsModule } from './payments/payments.module';
import { BookingsModule } from './bookings/bookings.module';
import { SupportTicketModule } from './support_ticket/support_ticket.module';
import { ReportsModule } from './reports/reports.module';
import { NotificationModule } from './notification/notification.module';
import { FavouritesModule } from './favourites/favourites.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    PrismaModule,
    UsersModule,
    AdminModule,
    AuthModule,
    MailModule,
    DistrictModule,
    RegionModule,
    ListingAvailabilityModule,
    ListingModule,
    ListingRulesModule,
    ImagesModule,
    HouseOffersModule,
    ListingOffersModule,
    MessagesModule,
    ChatModule,
    PaymentsModule,
    BookingsModule,
    SupportTicketModule,
    ReportsModule,
    NotificationModule,
    FavouritesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
