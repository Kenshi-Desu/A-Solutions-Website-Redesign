import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6F67BA] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#6F67BA] text-white hover:bg-[#5d57a0] shadow-sm",
        destructive: "bg-red-600 text-white hover:bg-red-700 shadow-sm",
        outline:
          "border border-gray-300 bg-white hover:bg-gray-50 text-[#333333]",
        secondary: "bg-gray-100 text-[#333333] hover:bg-gray-200",
        ghost: "hover:bg-gray-100 text-[#333333]",
        link: "text-[#6F67BA] underline-offset-4 hover:underline",
      },
      size: {
        default: "px-6 py-2.5",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-lg px-8",
        icon: "h-10 w-10 p-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
