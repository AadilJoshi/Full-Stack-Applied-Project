let orders: any[] = [];

export async function GET() {
  return Response.json(orders);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.items || !body.total) {
      return Response.json(
        { message: "Invalid order data" },
        { status: 400 }
      );
    }

    const newOrder = {
      id: Date.now(),
      items: body.items,
      total: Number(body.total),
      date: new Date().toISOString(),
    };

    orders.push(newOrder);

    return Response.json({
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    return Response.json(
      { message: "Server error while placing order" },
      { status: 500 }
    );
  }
}