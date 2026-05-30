import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import fanLogo from "@/assets/images/LOGO-FAN-Achatado-BLANCO.svg";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
  YoutubeIcon,
} from "@/components/UI/BrandIcons";

const footerLinks = [
  { href: "#", label: "Facebook", Icon: FacebookIcon },
  { href: "#", label: "X", Icon: XIcon },
  { href: "#", label: "Instagram", Icon: InstagramIcon },
  { href: "#", label: "LinkedIn", Icon: LinkedinIcon },
  { href: "#", label: "YouTube", Icon: YoutubeIcon },
];

export function AppFooter() {
  return (
    <footer className="relative mt-10 overflow-hidden bg-cv-green-800 text-cv-cream-50">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cv-gold-400/70 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_80%_90%,rgba(200,169,110,0.10),transparent_32%)]" />
      <div className="relative mx-auto grid w-full max-w-6xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1.1fr_0.8fr_0.9fr] lg:items-start lg:px-8">
        <div className="space-y-4">
          <Image
            src={fanLogo}
            alt="Fundacion Amigos de la Naturaleza"
            className="h-auto w-full max-w-[224px]"
            priority
          />

          <p className="max-w-sm text-sm leading-relaxed text-cv-green-100">
            Fundacion Amigos de la Naturaleza impulsa conservacion, restauracion y desarrollo
            sostenible junto a comunidades, instituciones y empresas.
          </p>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-cv-green-100">
            Redes
          </p>
          <nav className="flex flex-wrap gap-2 text-sm">
            {footerLinks.map(({ label, href, Icon }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-cv-green-400/60 bg-cv-green-500/30 transition duration-300 hover:-translate-y-0.5 hover:border-cv-gold-400 hover:bg-cv-gold-400 hover:text-cv-green-900"
              >
                <Icon className="h-4 w-4" />
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-cv-green-100">
            Contacto institucional
          </p>
          <div className="space-y-3 text-sm">
            <p className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cv-green-100" />
              <span>Direccion: Km. 7 1/2 Doble Via La Guardia</span>
            </p>
            <p className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-cv-green-100" />
              <span>Telefono: +591-3-3556800</span>
            </p>
            <p className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-cv-green-100" />
              <span>Correo: fan@fan-bo.org</span>
            </p>
          </div>
        </div>
      </div>

      <div className="relative border-t border-cv-green-500/80">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-4 text-sm text-cv-green-100 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          © 2026 Fundacion Amigos de la Naturaleza (FAN). Todos los derechos reservados.
          <span className="text-cv-green-200">Santa Cruz, Bolivia</span>
        </div>
      </div>
    </footer>
  );
}
