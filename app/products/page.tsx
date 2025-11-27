// app/products/page.tsx

"use client";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import axios from "@/lib/axios";
import React from "react"; 

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true); 

  // 🛠️ CORRECCIÓN DE useEffect: Uso de async/await y cleanup para estabilidad
  useEffect(() => {
    let isMounted = true; 
    setIsLoading(true); 

    const fetchProducts = async () => {
      try {
        const res = await axios.get("/products");
        
        if (isMounted) { 
          setProducts(res.data as Product[]);
        }
      } catch (error) {
        console.error("Error fetching all products:", error);
      } finally {
        if (isMounted) { 
          setIsLoading(false);
        }
      }
    };
    
    fetchProducts();
    
    // Función de cleanup
    return () => {
      isMounted = false; 
    };
  }, []); 

  return (
    // ✅ Estilos corregidos: Eliminamos bg-black/text-white y usamos variables CSS
    <div className="min-h-screen px-6 lg:px-20 py-12">
      
      {/* Título Estilizado */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--color-primary)] text-center mb-12 tracking-wide">
        Explora Nuestro Catálogo
      </h1>

      {/* Estado de Carga */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-96 bg-[var(--color-card)] rounded-[var(--radius)] shadow-lg"></div>
          ))}
        </div>
      ) : (
        /* Grid de Productos */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}