import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET all products
export async function GET() {
  const products = await prisma.product.findMany();
  return NextResponse.json(products);
}

// CREATE product
export async function POST(req: Request) {
  const body = await req.json();

  const product = await prisma.product.create({
    data: {
      name: body.name,
      description: body.description,
      price: Number(body.price),
      category: body.category,
      image: body.image,
    },
  });

  return NextResponse.json(product);
}

// DELETE product
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));

  await prisma.product.delete({
    where: { id },
  });

  return NextResponse.json({ message: "Deleted successfully" });
}