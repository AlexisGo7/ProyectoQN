// @/components/ProductCard.tsx (o Card.tsx)

import Image from "next/image";
import React from "react"; // Necesitas importar React si usas JSX

interface CardProps {
  title: string;
  price: number;
  image: string;
  // Añadimos una prop opcional para la descripción, común en cards
  description?: string; 
  className?: string;
  // Añadimos la prop onAddToCart para mantener la consistencia
  onAddToCart: () => void; 
}

export function Card({ title, price, image, description, className, onAddToCart }: CardProps) {
  return (
    // Aplicamos las variables CSS: Fondo de la tarjeta, Sombra e Interacción
    <div
      className={`
        bg-[var(--color-card)] 
        rounded-[var(--radius)] 
        shadow-xl 
        shadow-black/60 
        p-4 
        h-full 
        flex flex-col 
        transition-all duration-300 ease-in-out 
        hover:scale-[1.02] 
        hover:shadow-[var(--color-primary)]/40 
        border border-transparent hover:border-[var(--color-primary)]/50
        ${className}
      `}
    >
      {/* 1. Imagen del Producto */}
      <div className="relative w-full h-48 mb-4 flex-shrink-0">
        <Image
          src={image}
          alt={title}
          fill
          style={{ objectFit: "contain" }}
          // La imagen se muestra sobre el fondo de la tarjeta
          className="rounded-[calc(var(--radius)-0.1rem)]"
        />
      </div>

      {/* 2. Contenido del Producto */}
      <div className="flex flex-col flex-grow">
        {/* Título: Dorado de Acento */}
        <h3 className="text-[var(--color-primary)] font-bold text-lg truncate mb-1">
          {title}
        </h3>
        {/* Descripción: Texto secundario (si existe) */}
        {description && (
          <p className="text-[var(--color-card-foreground)] text-sm mb-2 line-clamp-2">
            {description}
          </p>
        )}
      </div>

      {/* 3. Pie de la Tarjeta (Precio y Botón) */}
      <div className="mt-auto pt-3 border-t border-gray-600 flex justify-between items-center">
        {/* Precio: Grande y Blanco/Foreground */}
        <p className="text-[var(--color-foreground)] font-extrabold text-xl">
          ${price.toFixed(2)}
        </p>
        
        {/* Botón de Acción (Usando el estilo global de botón) */}
        <button 
          // Utiliza los estilos de tu componente Button.tsx (si lo importas)
          // O la clase global si la hubiéramos mantenido en globals.css
          className="px-4 py-2 text-sm bg-[var(--color-primary)] text-[var(--color-primary-foreground)] rounded-[var(--radius)] font-semibold hover:bg-white hover:text-[var(--color-primary)] transition"
          onClick={onAddToCart}
        >
          Añadir
        </button>
      </div>
    </div>
  );
}