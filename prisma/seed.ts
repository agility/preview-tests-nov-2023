import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create destinations with multiple images
  await prisma.destination.create({
    data: {
      name: "Fort Jesus",
      description: "A historic fort in Mombasa.",
      location: "Mombasa, KE",
      images: {
        create: [
          { imageUrl: "fort-jesus1.jpg" },
          { imageUrl: "fort-jesus2.jpg" },
          { imageUrl: "fort-jesus3.jpg" },
        ],
      },
    },
  });

  await prisma.destination.create({
    data: {
      name: "Diani Beach",
      description: "A beautiful white sandy beach on the Indian Ocean.",
      images: {
        create: [
          { imageUrl: "diani-beach1.jpg" },
          { imageUrl: "diani-beach2.jpg" },
        ],
      },
    },
  });

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
