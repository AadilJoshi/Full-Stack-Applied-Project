"use client";

import { useEffect, useState } from "react";

type Order = {
  id: number;
  total: number;
  date: string;
  items: {
    id: number;
    name: string;
    price: number;
  }[];
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <main style={{ padding: "20px" }}>
      <h1>📜 Purchase History</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px",
            }}
          >
            <h2>Order #{order.id}</h2>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(order.date).toLocaleString()}
            </p>

            <p>
              <strong>Total:</strong> ${order.total}
            </p>

            <h4>Items:</h4>

            <ul>
              {order.items.map((item) => (
                <li key={item.id}>
                  {item.name} - ${item.price}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </main>
  );
}