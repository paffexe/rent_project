/*
  Warnings:

  - You are about to drop the `Root` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."Root";

-- CreateTable
CREATE TABLE "public"."rootuser" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(40) NOT NULL,
    "password" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "is_creator" BOOLEAN NOT NULL DEFAULT true,
    "refresh_token" TEXT,

    CONSTRAINT "rootuser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rootuser_email_key" ON "public"."rootuser"("email");
