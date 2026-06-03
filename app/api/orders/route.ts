import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET all orders
export async function GET() {
  const orders = await prisma.order.findMany();
  return NextResponse.json(orders);
}

// CREATE order (checkout)
export async function POST(req: Request) {
  const body = await req.json();

  const newOrder = await prisma.order.create({
    data: {
      items: body.items,
      total: body.total,
    },
  });

  return NextResponse.json({
    message: "Order placed successfully",
    order: newOrder,
  });
}