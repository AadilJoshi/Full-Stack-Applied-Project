"use client";

import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useAuth();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-black text-white">
      {/* LEFT SIDE */}
      <h1 className="text-xl font-bold">🛍️ B2C Store</h1>

      {/* CENTER LINKS */}
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

        {/* ADMIN ONLY LINK */}
        {user?.role === "admin" && (
          <a href="/admin" className="hover:underline text-yellow-400">
            Admin
          </a>
        )}
      </div>

      {/* RIGHT SIDE (AUTH SECTION) */}
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <span className="text-sm">
              👤 {user.username} ({user.role})
            </span>

            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <a href="/login">
            <button className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600">
              Login
            </button>
          </a>
        )}
      </div>
    </nav>
  );
}