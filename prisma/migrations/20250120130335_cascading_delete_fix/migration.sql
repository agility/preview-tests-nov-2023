/*
  Warnings:

  - Made the column `imageUrl` on table `Destination` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "DestinationImage" DROP CONSTRAINT "DestinationImage_destinationId_fkey";

-- AlterTable
ALTER TABLE "Destination" ALTER COLUMN "imageUrl" SET NOT NULL,
ALTER COLUMN "imageUrl" SET DEFAULT 'default-image-url';

-- AddForeignKey
ALTER TABLE "DestinationImage" ADD CONSTRAINT "DestinationImage_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE CASCADE ON UPDATE CASCADE;

UPDATE "Destination"
SET "imageUrl" = 'default-image-url'
WHERE "imageUrl" IS NULL;
