import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // --------------------
  // PRODUCTS
  // --------------------
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

  // --------------------
  // USERS 
  // --------------------
  const adminPassword = await bcrypt.hash("admin", 10);
  const userPassword = await bcrypt.hash("user", 10);

  await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: "adminPassword",
      role: "admin",
    },
  });

  await prisma.user.upsert({
    where: { username: "user" },
    update: {},
    create: {
      username: "user",
      password: userPassword,
      role: "user",
    },
  });

  console.log("✅ Seed complete: products + users created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });