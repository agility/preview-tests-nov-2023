import prisma from "../../prisma/client";

// Create a destination
export async function createDestination(data: {
  name: string;
  description: string;
  location?: string;
  imageUrl: string;
}) {
  return prisma.destination.create({
    data,
  });
}

// Get all destinations
export async function getAllDestinations() {
  return prisma.destination.findMany({
    include: {
      destinationImages: true,
    },
  });
}

// Get a destination by ID
export async function getDestinationById(id: number) {
  return prisma.destination.findUnique({
    where: { id },
    include: {
      destinationImages: true,
    },
  });
}

// Update a destination
export async function updateDestination(
  id: number,
  data: Partial<{
    name: string;
    description: string;
    location?: string;
    imageUrl: string;
  }>
) {
  return prisma.destination.update({
    where: { id: Number(id) },
    data,
  });
}

// Delete a destination
export async function deleteDestination(id: number) {
  return prisma.destination.delete({
    where: { id: Number(id) },
  });
}
