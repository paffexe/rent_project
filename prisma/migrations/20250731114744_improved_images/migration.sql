/*
  Warnings:

  - You are about to drop the `Images` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Images" DROP CONSTRAINT "Images_listing_id_fkey";

-- DropTable
DROP TABLE "public"."Images";

-- CreateTable
CREATE TABLE "public"."images" (
    "id" SERIAL NOT NULL,
    "image_url" TEXT NOT NULL,
    "is_cover" BOOLEAN NOT NULL DEFAULT true,
    "listing_id" INTEGER NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."images" ADD CONSTRAINT "images_listing_id_fkey" FOREIGN KEY ("listing_id") REFERENCES "public"."listing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
