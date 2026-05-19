let products = [
  {
    id: 1,
    name: "Laptop",
    description: "High performance laptop",
    price: 1200,
    category: "electronics",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Shoes",
    description: "Running shoes",
    price: 100,
    category: "clothing",
    image: "https://via.placeholder.com/150",
  },
];

// GET products
export async function GET() {
  return Response.json(products);
}

// ADD product (admin)
export async function POST(req) {
  const body = await req.json();

  const newProduct = {
    id: Date.now(),
    ...body,
  };

  products.push(newProduct);

  return Response.json(newProduct);
}


export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));

  products = products.filter((p) => p.id !== id);

  return Response.json({ message: "Deleted successfully" });
}