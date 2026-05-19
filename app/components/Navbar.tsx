"use client";

import { useCart } from "../../context/CartContext";
export default function Navbar() {
  const { cart } = useCart();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-black text-white">
      <h1 className="text-xl font-bold">🛍️ B2C Store</h1>

      <div className="flex gap-4 items-center">
        <a href="/" className="hover:underline">
          Home
        </a>

        <a href="/cart" className="hover:underline">
          Cart ({cart.length})
        </a>

        <a href="/orders" className="hover:underline">
          Orders
        </a>
      </div>
    </nav>
  );
}