// @/components/ProductCard.tsx

"use client"; // Es necesario porque usamos hooks de Zustand
import { Card } from "@/components/ui/card"; // Importamos la Card visual que creamos
import { useCartStore } from "@/store/cartStore"; // Importamos el store de Zustand
import React from "react"; // Necesario para usar hooks

// ⚠️ NOTA: Asegúrate de que la interfaz Product esté exportada en tu archivo de API o store.
// Aquí la definimos localmente para evitar errores de importación circular, si es necesario.
interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description?: string; // Asumimos que podría tener una descripción
}

export default function ProductCard({ product }: { product: Product }) {
  // 1. Hook de Zustand: Obtener la función para añadir al carrito
  const { addToCart } = useCartStore();

  // 2. Función para manejar la adición (Omite 'quantity' antes de pasar a la Card)
  const handleAddToCart = () => {
    // El store espera un objeto Product sin la propiedad 'quantity'
    const productToAdd = { 
      id: product.id, 
      title: product.title, 
      price: product.price, 
      image: product.image,
      description: product.description,
    };
    
    // Llamada al store
    addToCart(productToAdd);
  };
  
  return (
    // 3. Pasar las props y la función de añadir al componente visual Card
    <Card
      title={product.title}
      price={product.price}
      image={product.image}
      description={product.description} // Opcional
      onAddToCart={handleAddToCart} // Pasamos el manejador
    />
  );
}