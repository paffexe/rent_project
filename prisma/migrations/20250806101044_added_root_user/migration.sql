-- AlterTable
ALTER TABLE "public"."Root" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_creator" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "refresh_token" TEXT;
