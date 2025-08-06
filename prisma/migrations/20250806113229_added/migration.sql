-- AlterTable
ALTER TABLE "public"."listing" ADD COLUMN     "regionId" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."listing" ADD CONSTRAINT "listing_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "public"."region"("id") ON DELETE SET NULL ON UPDATE CASCADE;
