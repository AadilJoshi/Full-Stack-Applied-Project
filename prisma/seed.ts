import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: "Nike Air Force 1",
        description: "Classic sneakers",
        price: 120,
        category: "Shoes",
        image: "https://via.placeholder.com/150",
      },
      {
        name: "iPhone 15",
        description: "Latest Apple phone",
        price: 1500,
        category: "Electronics",
        image: "https://via.placeholder.com/150",
      },
      {
        name: "MacBook Air",
        description: "Lightweight laptop",
        price: 2000,
        category: "Electronics",
        image: "https://via.placeholder.com/150",
      },
    ],
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });