/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Destination` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Destination` table. All the data in the column will be lost.
  - Made the column `description` on table `Destination` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Destination" DROP COLUMN "imageUrl",
DROP COLUMN "location",
ALTER COLUMN "description" SET NOT NULL;

-- CreateTable
CREATE TABLE "DestinationImage" (
    "id" SERIAL NOT NULL,
    "destinationId" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "DestinationImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DestinationImage" ADD CONSTRAINT "DestinationImage_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
