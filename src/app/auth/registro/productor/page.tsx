import type { Metadata } from "next";
import ProductorWizard from "@/screens/Register/components/Productores/ProductorWizard";

export const metadata: Metadata = {
  title: "Registro de productor · mati",
  description: "Wizard de alta para productores y asociaciones de la red.",
};

export default function RegistroProductorRoute() {
  return <ProductorWizard />;
}