"use client";

import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const { cart, addToCart } = useCart();

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, []);

  const totalValue = cart.reduce((sum, item) => sum + item.price, 0);

  if (loading) {
    return <h2 style={{ padding: "20px" }}>Loading products...</h2>;
  }

  return (
    <main style={{ padding: "20px" }}>
      <h1>🛍️ My B2C Store</h1>

      {/* 🛒 CART SUMMARY */}
      <div style={{ marginBottom: "10px" }}>
        <h3>🛒 Cart Items: {cart.length}</h3>
        <p>Total Value: ${totalValue}</p>
      </div>

      {/* NAVIGATION BUTTONS */}
      <div style={{ marginBottom: "20px" }}>
        <a href="/cart">
          <button style={{ marginRight: "10px" }}>
            Go to Cart
          </button>
        </a>

        <a href="/orders">
          <button>
            View Orders
          </button>
        </a>
      </div>

      {/* PRODUCTS GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <img src={product.image} width="100" />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>
              <b>${product.price}</b>
            </p>

            <button onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}