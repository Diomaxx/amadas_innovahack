"use client";

import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/UI/card";
import { staggerItem } from "./intercambioAnimations";

interface RegistroFormSectionProps {
  title: string;
  description?: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

export function RegistroFormSection({
  title,
  description,
  icon: Icon,
  children,
}: RegistroFormSectionProps) {
  return (
    <motion.div variants={staggerItem}>
      <Card className="overflow-hidden border-cv-cream-300 shadow-sm">
        <CardHeader className="border-b border-cv-cream-200 bg-cv-cream-50/60 pb-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cv-green-100">
              <Icon className="h-5 w-5 text-cv-green-700" strokeWidth={1.75} />
            </div>
            <div>
              <CardTitle className="text-base font-bold text-cv-green-900">{title}</CardTitle>
              {description ? (
                <CardDescription className="mt-1 text-sm text-cv-gray-600">
                  {description}
                </CardDescription>
              ) : null}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-5 pt-6">{children}</CardContent>
      </Card>
    </motion.div>
  );
}
