"use client";

import { useCart } from "../../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <main style={{ padding: "20px" }}>
      <h1>🛒 Shopping Cart</h1>

      {cart.length === 0 ? (
        <>
          <p>Your cart is empty.</p>

          <a href="/">
            <button>Continue Shopping</button>
          </a>
        </>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ccc",
                marginBottom: "10px",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              <h3>{item.name}</h3>

              <p>{item.description}</p>

              <p>
                <strong>${item.price}</strong>
              </p>

              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  background: "#dc3545",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  cursor: "pointer",
                  borderRadius: "4px",
                }}
              >
                Remove
              </button>
            </div>
          ))}

          <hr />

          <h2>Total: ${total.toFixed(2)}</h2>

          <div style={{ marginTop: "20px" }}>
            <a href="/payment">
              <button
                style={{
                  background: "green",
                  color: "white",
                  border: "none",
                  padding: "12px 20px",
                  cursor: "pointer",
                  borderRadius: "4px",
                  marginRight: "10px",
                }}
              >
                Proceed to Payment
              </button>
            </a>

            <a href="/">
              <button
                style={{
                  padding: "12px 20px",
                  cursor: "pointer",
                }}
              >
                Continue Shopping
              </button>
            </a>
          </div>
        </>
      )}
    </main>
  );
}