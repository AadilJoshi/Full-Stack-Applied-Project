"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  // 🔐 PROTECT ADMIN ROUTE
  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/login");
    }
  }, [user]);

  // 📦 LOAD PRODUCTS
  const loadProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // ➕ ADD PRODUCT
  const addProduct = async () => {
    if (!form.name || !form.price) return;

    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
      }),
    });

    setForm({
      name: "",
      price: "",
      description: "",
      category: "",
      image: "",
    });

    loadProducts();
  };

  // ❌ DELETE PRODUCT
  const deleteProduct = async (id: number) => {
    await fetch(`/api/products?id=${id}`, {
      method: "DELETE",
    });

    loadProducts();
  };

  return (
    <main style={{ padding: "20px" }}>
      <h1>🛠️ Admin Dashboard</h1>

      {/* ADD PRODUCT FORM */}
      <div
        style={{
          marginBottom: "30px",
          padding: "15px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <h2>Add Product</h2>

        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
        />

        <input
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        <button
          onClick={addProduct}
          style={{
            marginTop: "10px",
            background: "green",
            color: "white",
            padding: "8px 12px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Add Product
        </button>
      </div>

      {/* PRODUCT LIST */}
      <h2>Existing Products</h2>

      <div style={{ display: "grid", gap: "10px" }}>
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h3>{p.name}</h3>
              <p>${p.price}</p>
              <small>{p.category}</small>
            </div>

            <button
              onClick={() => deleteProduct(p.id)}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "6px 10px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}