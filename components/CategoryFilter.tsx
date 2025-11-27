"use client";
import React from "react";

interface Props {
  selected: string;
  onSelect: (cat: string) => void;
}

// Las categorías de la API Fakestore
const categories = ["all", "electronics", "jewelery", "men's clothing", "women's clothing"];

const CategoryFilter = ({ selected, onSelect }: Props) => (
  <div className="flex justify-center gap-4 mb-10 flex-wrap">
    {categories.map(cat => (
      <button
        key={cat}
        onClick={() => onSelect(cat)}
        className={`
          px-6 py-2 
          rounded-[var(--radius)] // Usa tu variable de redondez
          font-semibold 
          text-sm sm:text-base
          transition-all duration-200 
          
          ${selected === cat 
            // ESTADO SELECCIONADO: Fondo Dorado, Texto Negro
            ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)] shadow-md shadow-[var(--color-primary)]/40" 
            
            // ESTADO NORMAL: Texto Dorado, Fondo Gris de Tarjeta, Borde Dorado en hover
            : "bg-[var(--color-card)] text-[var(--color-primary)] border border-transparent hover:border-[var(--color-primary)] hover:bg-gray-700"
          }`
        }
      >
        {/* Capitalizamos la primera letra para que se vea mejor */}
        {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
      </button>
    ))}
  </div>
);

export default CategoryFilter;