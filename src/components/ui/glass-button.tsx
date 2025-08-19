import { cn } from "@/lib/utils";
import { ReactNode, ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group",
  {
    variants: {
      variant: {
        primary: [
          "glass-card text-foreground hover:scale-105 hover:shadow-lg",
          "before:absolute before:inset-0 before:bg-gradient-primary before:opacity-0 before:transition-opacity before:duration-300",
          "hover:before:opacity-10 hover:text-primary-foreground"
        ],
        hero: [
          "bg-gradient-primary text-primary-foreground font-semibold tracking-wide",
          "hover:scale-105 hover:shadow-2xl transform transition-all duration-300",
          "shadow-lg neon-glow hover:animate-pulse-glow"
        ],
        ghost: [
          "text-foreground hover:bg-secondary/50 backdrop-blur-sm",
          "border border-transparent hover:border-primary/30"
        ],
        outline: [
          "border-2 border-primary/50 text-primary bg-transparent",
          "hover:bg-primary/10 hover:border-primary hover:scale-105"
        ]
      },
      size: {
        sm: "h-9 px-3 text-xs",
        default: "h-11 px-6 py-2",
        lg: "h-14 px-8 text-base",
        xl: "h-16 px-10 text-lg"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "default"
    }
  }
);

interface GlassButtonProps 
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
}

export const GlassButton = ({ 
  className, 
  variant, 
  size, 
  children, 
  ...props 
}: GlassButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </button>
  );
};