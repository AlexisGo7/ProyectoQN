"use client";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import axios from "@/lib/axios";
import React from "react"; 

// ⚠️ NOTA: Usamos la interfaz Product del store o la definimos aquí para evitar errores.
interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description?: string;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true); 

  // 🛠️ CORRECCIÓN DE useEffect para evitar 'cascading renders'
  useEffect(() => {
    let isMounted = true; // 👈 1. Flag para la limpieza (cleanup)
    setIsLoading(true); // Empezamos cargando

    const fetchProducts = async () => {
      try {
        // 2. Usamos async/await para manejo síncrono
        const res = await axios.get("/products");
        
        if (isMounted) { // 👈 3. Solo actualizamos si el componente está montado
          setProducts(res.data as Product[]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        if (isMounted) { // 4. Finalmente, quitamos el estado de carga
          setIsLoading(false);
        }
      }
    };
    
    fetchProducts();
    
    // 5. Función de cleanup: se ejecuta al desmontar el componente
    return () => {
      isMounted = false; 
    };
  }, []); 

  const featuredProducts = products.slice(0, 4);

  return (
    // Estilos elegantes consistentes
    <div className="min-h-screen px-6 lg:px-20"> 
      
      <header className="text-center py-20 lg:py-24">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--color-primary)] tracking-wide leading-tight mb-4">
          Bienvenido a Boreal
        </h1>
        <p className="text-[var(--color-foreground)] text-lg sm:text-xl">
          Descubre nuestros productos más destacados
        </p>
      </header>

      <section className="container mx-auto">
        {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 animate-pulse">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-96 bg-[var(--color-card)] rounded-[var(--radius)] shadow-lg"></div>
                ))}
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {featuredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        )}
      </section>

      <div className="text-center mt-12 mb-20">
        <Link
          href="/products"
          className="
            bg-[var(--color-primary)] 
            text-[var(--color-primary-foreground)] 
            px-8 py-3 
            rounded-[var(--radius)] 
            font-bold text-lg
            hover:bg-white 
            hover:text-[var(--color-primary)] 
            transition duration-300
          "
        >
          Ver todos los productos
        </Link>
      </div>
    </div>
  );
}