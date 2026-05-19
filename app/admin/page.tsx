"use client";

import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const addProduct = async () => {
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
      }),
    });

    location.reload();
  };

  const deleteProduct = async (id: number) => {
    await fetch(`/api/products?id=${id}`, {
      method: "DELETE",
    });

    location.reload();
  };

  return (
    <main style={{ padding: "20px" }}>
      <h1>🛠️ Admin Dashboard</h1>

      {/* ADD PRODUCT FORM */}
      <div style={{ marginBottom: "20px" }}>
        <h2>Add Product</h2>

        <input
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Price"
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input
          placeholder="Description"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          placeholder="Category"
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <input
          placeholder="Image URL"
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        <button onClick={addProduct}>Add</button>
      </div>

      {/* PRODUCT LIST */}
      <h2>Existing Products</h2>

      {products.map((p) => (
        <div key={p.id} style={{ border: "1px solid #ccc", padding: "10px" }}>
          <h3>{p.name}</h3>
          <p>${p.price}</p>

          <button onClick={() => deleteProduct(p.id)}>
            Delete
          </button>
        </div>
      ))}
    </main>
  );
}