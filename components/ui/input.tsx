// @/components/ui/input.tsx

import { forwardRef, InputHTMLAttributes } from "react";

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`
          w-full 
          px-4 py-2 
          rounded-[var(--radius)] 
          
          /* Colores base: bg-[card], border-[primary], text-[foreground] */
          bg-[var(--color-card)] 
          border border-[var(--color-border)] 
          text-[var(--color-foreground)] 
          
          /* Estilo del placeholder */
          placeholder:text-gray-500 
          
          /* Estilo de Focus: anillo dorado */
          focus:outline-none 
          focus:ring-2 
          focus:ring-[var(--color-ring)] 
          focus:border-transparent /* Evita doble borde en focus */
          
          ${className}
        `}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };