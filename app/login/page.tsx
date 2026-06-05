"use client";

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    const success = await login(username, password);

    setLoading(false);

    if (success) {
      router.push("/");
    } else {
      setError("Invalid credentials. Try admin/admin or user/user");
    }
  };

  return (
    <main style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h1>Login</h1>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ display: "block", marginBottom: "10px", width: "100%" }}
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", marginBottom: "10px", width: "100%" }}
      />

      <button
        onClick={handleLogin}
        disabled={loading}
        style={{
          padding: "8px 12px",
          cursor: "pointer",
          width: "100%",
        }}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {error && (
        <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
      )}

      <hr style={{ margin: "20px 0" }} />

      <p><b>Test Accounts:</b></p>
      <p>admin / admin → Admin Dashboard</p>
      <p>user / user → Normal User</p>
    </main>
  );
}