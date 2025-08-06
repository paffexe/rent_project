-- AlterTable
ALTER TABLE "public"."admin" ALTER COLUMN "is_active" SET DEFAULT false;

-- CreateTable
CREATE TABLE "public"."Root" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(40) NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Root_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Root_email_key" ON "public"."Root"("email");
