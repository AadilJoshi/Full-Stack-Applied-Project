"use client";

import { useState } from "react";
import { useCart } from "../../context/CartContext";

export default function PaymentPage() {
  const { cart } = useCart();

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [success, setSuccess] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handlePayment = async () => {
    const order = {
      items: cart,
      total,
      date: new Date().toISOString(),
    };

    await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    setSuccess(true);
  };

  if (success) {
    return (
      <main style={{ padding: "20px" }}>
        <h1>✅ Payment Successful</h1>
        <p>Your order has been placed.</p>

        <a href="/orders">
          <button>View Orders</button>
        </a>
      </main>
    );
  }

  return (
    <main style={{ padding: "20px" }}>
      <h1>💳 Payment</h1>

      <h3>Total: ${total.toFixed(2)}</h3>

      <div style={{ marginBottom: "10px" }}>
        <input
          placeholder="Card Holder Name"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <input
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
      </div>

      <button
        onClick={handlePayment}
        disabled={!cardName || !cardNumber}
      >
        Pay Now
      </button>
    </main>
  );
}