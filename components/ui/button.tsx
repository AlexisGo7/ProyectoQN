// @/components/ui/button.tsx

import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, ButtonHTMLAttributes } from "react";

// Utilizamos la variable CSS para el radio (rounded-[var(--radius)])
// y las variables para los colores.
const buttonVariants = cva(
  "inline-flex items-center justify-center font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)] focus:ring-offset-2",
  {
    variants: {
      variant: {
        // Variante Principal: DORADO (Primary)
        golden: `
          bg-[var(--color-primary)] 
          text-[var(--color-primary-foreground)] 
          hover:bg-white 
          hover:text-[var(--color-primary)] 
          shadow-lg 
          shadow-[var(--color-primary)]/50
        `,
        // Variante Secundaria: CONTORNO (Outline)
        outline: `
          border border-[var(--color-primary)] 
          text-[var(--color-primary)] 
          hover:bg-[var(--color-primary)] 
          hover:text-[var(--color-primary-foreground)]
          hover:shadow-md
        `,
        // Opcional: Variante Fantasma para enlaces discretos
        ghost: `
          bg-transparent 
          text-[var(--color-primary)] 
          hover:bg-[var(--color-card)]
        `,
      },
      size: {
        default: "px-6 py-2 text-lg rounded-[var(--radius)]",
        sm: "px-4 py-1 text-sm rounded-[var(--radius)]",
      },
    },
    defaultVariants: {
      variant: "golden",
      size: "default",
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button ref={ref} className={buttonVariants({ variant, size, className })} {...props} />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };