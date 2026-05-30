"use client";

import { useAuth } from "@/context/AuthContext";
import { LoginCard } from "./components/LoginCard";

const mainStyle: React.CSSProperties = {
  minHeight: "100vh",
  display: "grid",
  placeItems: "center",
  padding: "1.5rem",
  background: "linear-gradient(160deg, #f5f7ff 0%, #e9f6ef 100%)",
};

const statusStyle: React.CSSProperties = {
  fontSize: "1rem",
  fontWeight: 600,
  color: "#1e2b2f",
};

export default function LoginPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <main style={mainStyle}>
        <p style={statusStyle}>Cargando sesion...</p>
      </main>
    );
  }

  return (
    <main style={mainStyle}>
      <LoginCard user={user} />
    </main>
  );
}
