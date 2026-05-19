let orders: any[] = [];

export async function GET() {
  return Response.json(orders);
}

export async function POST(req: Request) {
  const body = await req.json();

  const newOrder = {
    id: Date.now(),
    items: body.items,
    total: body.total,
    date: new Date(),
  };

  orders.push(newOrder);

  return Response.json({
    message: "Order placed successfully",
    order: newOrder,
  });
}