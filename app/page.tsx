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

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const { cart, addToCart } = useCart();

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, []);

  const totalValue = cart.reduce((sum, item) => sum + item.price, 0);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "all" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <h2 style={{ padding: "20px" }}>Loading products...</h2>;
  }

  return (
    <main style={{ padding: "20px" }}>
      <h1>🛍️ My B2C Store</h1>

      {/* CART SUMMARY */}
      <div style={{ marginBottom: "10px" }}>
        <h3>🛒 Cart Items: {cart.length}</h3>
        <p>Total Value: ${totalValue.toFixed(2)}</p>
      </div>

      {/* NAVIGATION */}
      <div style={{ marginBottom: "20px" }}>
        <a href="/cart">
          <button style={{ marginRight: "10px" }}>
            Go to Cart
          </button>
        </a>

        <a href="/orders">
          <button>View Orders</button>
        </a>
      </div>

      {/* SEARCH + FILTER */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px",
            marginRight: "10px",
            width: "250px",
          }}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: "8px" }}
        >
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
        </select>
      </div>

      {/* PRODUCTS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "8px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              width="150"
              style={{
                display: "block",
                marginBottom: "10px",
              }}
            />

            <h3>{product.name}</h3>

            <p>{product.description}</p>

            <p>
              <strong>${product.price}</strong>
            </p>

            <p>
              <small>Category: {product.category}</small>
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