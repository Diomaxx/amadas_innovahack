import type { Metadata } from "next";
import GastronomicoWizard from "@/screens/Register/components/Gastronomicos/GastronomicoWizard";

export const metadata: Metadata = {
  title: "Registro gastronómico · mati",
  description: "Wizard de alta para restaurantes, chefs y gastronomía.",
};

export default function RegistroGastronomicoRoute() {
  return <GastronomicoWizard />;
}