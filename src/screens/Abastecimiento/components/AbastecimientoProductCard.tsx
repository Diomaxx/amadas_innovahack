import Image from "next/image";
import { Badge } from "@/components/UI/badge";
import { Button } from "@/components/UI/button";
import { Card, CardContent, CardFooter } from "@/components/UI/card";

export type AbastecimientoProductCardAction = {
  id: string;
  label: string;
  onClick?: () => void;
  href?: string;
  variant?: "default" | "secondary" | "outline";
};

export type AbastecimientoProductCardProps = {
  imageUrl: string;
  imageAlt: string;
  title: string;
  availableLabel: string;
  description: string;
  priceLabel: string;
  seasonalTag?: string;
  stockTag?: string;
  actions: AbastecimientoProductCardAction[];
};

export function AbastecimientoProductCard({
  imageUrl,
  imageAlt,
  title,
  availableLabel,
  description,
  priceLabel,
  seasonalTag,
  stockTag,
  actions,
}: AbastecimientoProductCardProps) {
  return (
    <Card className="overflow-hidden rounded-2xl border-cv-cream-300 bg-white shadow-sm">
      <div className="relative h-52 w-full bg-cv-cream-200">
        <Image src={imageUrl} alt={imageAlt} fill className="object-cover" />
        <div className="absolute right-3 top-3 flex gap-2">
          {seasonalTag ? (
            <Badge className="border-none bg-cv-green-700 text-cv-cream-50">{seasonalTag}</Badge>
          ) : null}
          {stockTag ? (
            <Badge className="border-none bg-[#B6452D] text-cv-cream-50">{stockTag}</Badge>
          ) : null}
        </div>
      </div>

      <CardContent className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-semibold text-cv-green-900">{title}</h3>
          <span className="text-xs font-semibold text-cv-gold-600">{availableLabel}</span>
        </div>
        <p className="text-sm leading-relaxed text-cv-gray-700">{description}</p>
        <p className="text-2xl font-bold text-cv-gold-600">{priceLabel}</p>
      </CardContent>

      <CardFooter className="grid grid-cols-2 gap-2 p-4 pt-0">
        {actions.slice(0, 2).map((action) => (
          <Button
            key={action.id}
            variant={action.variant ?? "default"}
            onClick={action.onClick}
            asChild={Boolean(action.href)}
            className="w-full"
          >
            {action.href ? <a href={action.href}>{action.label}</a> : <span>{action.label}</span>}
          </Button>
        ))}
      </CardFooter>
    </Card>
  );
}
