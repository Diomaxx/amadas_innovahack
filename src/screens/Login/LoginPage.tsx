"use client";

import { LoginCard } from "./components/LoginCard";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cv-cream-100 px-4 py-10">
      {/* Atmósfera de fondo */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(141,195,164,0.18),transparent_45%),radial-gradient(circle_at_85%_80%,rgba(200,169,110,0.14),transparent_45%)]" />
      <LoginCard />
    </div>
  );
}
