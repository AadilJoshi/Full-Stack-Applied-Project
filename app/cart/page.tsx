"use client";

import { useState } from "react";
import { useCart } from "../../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const checkout = async () => {
    if (cart.length === 0) return;

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          total,
        }),
      });

      const data = await res.json();

      setMessage(data.message || "Order placed successfully!");
    } catch (error) {
      setMessage("Something went wrong during checkout.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: "20px" }}>
      <h1>Shopping Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ccc",
                marginBottom: "10px",
                padding: "10px",
              }}
            >
              <h3>{item.name}</h3>
              <p>${item.price}</p>

              <button onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
            </div>
          ))}

          <h2>Total: ${total}</h2>

          
          <button
            onClick={checkout}
            disabled={loading}
            style={{
              marginTop: "10px",
              padding: "10px",
              background: "green",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            {loading ? "Processing..." : "Checkout"}
          </button>

          
          {message && <p style={{ marginTop: "10px" }}>{message}</p>}
        </>
      )}
    </main>
  );
}