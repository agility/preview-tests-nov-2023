import prisma from "../../prisma/client";

export class DestinationImageService {
  // Add an image to a destination
  async addImage(destinationId: number, imageUrl: string) {
    return prisma.destinationImage.create({
      data: {
        destinationId,
        imageUrl,
      },
    });
  }

  // Get images for a destination
  async getImagesByDestination(destinationId: number) {
    return prisma.destinationImage.findMany({
      where: { destinationId },
    });
  }

  // Delete an image by ID
  async deleteImage(id: number) {
    return prisma.destinationImage.delete({
      where: { id },
    });
  }
}
