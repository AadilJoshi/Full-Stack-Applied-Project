"use client";

import { useEffect, useState } from "react";

type Order = {
  id: number;
  items: any[];
  total: number;
  date: string;
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
      <h1>📦 Order History</h1>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            style={{
              border: "1px solid #ccc",
              marginBottom: "10px",
              padding: "10px",
            }}
          >
            <h3>Order #{order.id}</h3>
            <p>Total: ${order.total}</p>
            <p>Date: {new Date(order.date).toLocaleString()}</p>

            <h4>Items:</h4>
            <ul>
              {order.items.map((item, index) => (
                <li key={index}>
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