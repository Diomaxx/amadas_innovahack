import Link from "next/link";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <Link
        href="/auth"
        style={{
          padding: "0.7rem 1rem",
          borderRadius: "10px",
          background: "#2446cf",
          color: "#fff",
          textDecoration: "none",
          fontWeight: 600,
        }}
      >
        Login
      </Link>
    </main>
  );
}
