import type { Metadata } from "next";
import RegisterPage from "@/screens/Register/RegisterPage";

export const metadata: Metadata = {
  title: "Crear cuenta · mati",
  description:
    "Únete a la red de productores de Bolivia: elige tu perfil de participación.",
};

export default function RegistroRoute() {
  return <RegisterPage />;
}
