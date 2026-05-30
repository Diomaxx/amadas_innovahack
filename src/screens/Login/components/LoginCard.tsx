"use client";

import { useMemo, useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import type { User } from "firebase/auth";
import { loginWithEmail, logout, registerWithEmail } from "@/lib/firebase/auth";
import {
  createUserProfile,
  getUserProfile,
  type AppUserProfile,
} from "@/lib/firebase/firestore";

type LoginCardProps = {
  user: User | null;
};

const cardStyle: CSSProperties = {
  width: "min(100%, 420px)",
  borderRadius: "14px",
  background: "#ffffff",
  padding: "1.5rem",
  boxShadow: "0 14px 36px rgba(9, 24, 61, 0.12)",
  border: "1px solid #e8ebf2",
};

const titleStyle: CSSProperties = {
  margin: "0 0 1rem",
  color: "#15213a",
};

const formStyle: CSSProperties = {
  display: "grid",
  gap: "0.6rem",
};

const labelStyle: CSSProperties = {
  fontSize: "0.9rem",
  color: "#30415f",
};

const inputStyle: CSSProperties = {
  width: "100%",
  border: "1px solid #cad3e0",
  borderRadius: "10px",
  padding: "0.7rem 0.8rem",
  boxSizing: "border-box",
};

const buttonStyle: CSSProperties = {
  marginTop: "0.6rem",
  border: 0,
  borderRadius: "10px",
  padding: "0.75rem 1rem",
  background: "#2446cf",
  color: "#ffffff",
  fontWeight: 600,
  cursor: "pointer",
};

const linkButtonStyle: CSSProperties = {
  marginTop: "0.75rem",
  border: 0,
  background: "transparent",
  color: "#2446cf",
  cursor: "pointer",
  padding: 0,
};

const feedbackStyle: CSSProperties = {
  margin: "0.75rem 0 0",
  color: "#17304d",
  fontSize: "0.92rem",
};

const textStyle: CSSProperties = {
  color: "#1e2b2f",
};

export function LoginCard({ user }: LoginCardProps) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [profile, setProfile] = useState<AppUserProfile | null>(null);

  const title = useMemo(
    () => (mode === "login" ? "Iniciar sesion" : "Crear cuenta"),
    [mode]
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setBusy(true);

    try {
      if (mode === "register") {
        const credential = await registerWithEmail(email.trim(), password);
        await createUserProfile(credential.user.uid, credential.user.email ?? email);
        setMessage("Cuenta creada y perfil guardado en Firestore.");
      } else {
        const credential = await loginWithEmail(email.trim(), password);
        const userProfile = await getUserProfile(credential.user.uid);
        setProfile(userProfile);
        setMessage(
          userProfile
            ? "Sesion iniciada. Perfil cargado desde Firestore."
            : "Sesion iniciada. No existe perfil todavia en Firestore."
        );
      }
    } catch (error) {
      const nextError = error as Error;
      setMessage(nextError.message || "Ocurrio un error autenticando.");
    } finally {
      setBusy(false);
    }
  }

  async function handleLogout() {
    setBusy(true);
    setMessage("");

    try {
      await logout();
      setProfile(null);
      setMessage("Sesion cerrada.");
    } catch (error) {
      const nextError = error as Error;
      setMessage(nextError.message || "No se pudo cerrar sesion.");
    } finally {
      setBusy(false);
    }
  }

  if (user) {
    return (
      <section style={cardStyle}>
        <h1 style={titleStyle}>Sesion activa</h1>
        <p style={textStyle}>Usuario: {user.email}</p>
        {profile && <p style={textStyle}>Rol: {profile.role}</p>}
        {message && <p style={feedbackStyle}>{message}</p>}
        <button style={buttonStyle} onClick={handleLogout} disabled={busy}>
          {busy ? "Cerrando..." : "Cerrar sesion"}
        </button>
      </section>
    );
  }

  return (
    <section style={cardStyle}>
      <h1 style={titleStyle}>{title}</h1>
      <form style={formStyle} onSubmit={handleSubmit}>
        <label style={labelStyle} htmlFor="email">
          Correo
        </label>
        <input
          id="email"
          type="email"
          style={inputStyle}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label style={labelStyle} htmlFor="password">
          Contrasena
        </label>
        <input
          id="password"
          type="password"
          style={inputStyle}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />

        <button style={buttonStyle} type="submit" disabled={busy}>
          {busy ? "Procesando..." : mode === "login" ? "Entrar" : "Crear cuenta"}
        </button>
      </form>

      <button
        type="button"
        style={linkButtonStyle}
        onClick={() => {
          setMode((current) => (current === "login" ? "register" : "login"));
          setMessage("");
        }}
      >
        {mode === "login"
          ? "No tienes cuenta? Registrate"
          : "Ya tienes cuenta? Inicia sesion"}
      </button>

      {message && <p style={feedbackStyle}>{message}</p>}
    </section>
  );
}
