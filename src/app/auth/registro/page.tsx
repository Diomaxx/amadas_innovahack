import type { Metadata } from "next";
import RegisterPage from "@/screens/Register/RegisterPage";

export const metadata: Metadata = {
  title: "Crear cuenta · RESPIRALARA",
  description:
    "Únete a la red del Bosque Chiquitano: elige tu perfil de participación.",
};

export default function RegistroRoute() {
  return <RegisterPage />;
}
