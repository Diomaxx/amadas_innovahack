"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AnimatedSelectOption {
  value: string;
  label: string;
}

interface AnimatedSelectProps {
  value?: string;
  onValueChange: (value: string) => void;
  options: AnimatedSelectOption[];
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
}

const triggerStyles =
  "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background transition-colors focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50";

const contentStyles =
  "relative z-50 max-h-72 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md";

const itemStyles =
  "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

export function AnimatedSelect({
  value,
  onValueChange,
  options,
  placeholder = "Seleccionar",
  disabled,
  id,
  className,
}: AnimatedSelectProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <SelectPrimitive.Root
      value={value || undefined}
      onValueChange={onValueChange}
      open={open}
      onOpenChange={setOpen}
      disabled={disabled}
    >
      <SelectPrimitive.Trigger id={id} className={cn(triggerStyles, className)}>
        <SelectPrimitive.Value placeholder={placeholder} />
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="ml-2 shrink-0"
        >
          <ChevronDown className="h-4 w-4 opacity-50" />
        </motion.span>
      </SelectPrimitive.Trigger>

      <AnimatePresence>
        {open ? (
          <SelectPrimitive.Portal forceMount>
            <SelectPrimitive.Content
              asChild
              position="popper"
              sideOffset={4}
              className="z-50"
            >
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className={contentStyles}
              >
                <SelectPrimitive.Viewport className="p-1">
                  {options.map((option) => (
                    <SelectPrimitive.Item
                      key={option.value}
                      value={option.value}
                      className={itemStyles}
                    >
                      <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
                        <SelectPrimitive.ItemIndicator>
                          <Check className="h-4 w-4" />
                        </SelectPrimitive.ItemIndicator>
                      </span>
                      <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                    </SelectPrimitive.Item>
                  ))}
                </SelectPrimitive.Viewport>
              </motion.div>
            </SelectPrimitive.Content>
          </SelectPrimitive.Portal>
        ) : null}
      </AnimatePresence>
    </SelectPrimitive.Root>
  );
}
