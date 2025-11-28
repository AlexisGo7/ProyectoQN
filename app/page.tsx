"use client";
import { useEffect, useState } from "react";
// ⚠️ Importación de ProductCard (asumiendo que está disponible en tu entorno Canvas/Next.js)
import ProductCard from "@/components/ProductCard"; 
import Link from "next/link";
import React from "react"; 
import { Loader2 } from 'lucide-react';

// --- SIMULACIÓN DE LIBRERÍAS EXTERNAS EN ENTORNO DE ARCHIVO ÚNICO ---

// 1. Simulación de la instancia 'axios' (lib/axios.js)
const mockAxios = {
    get: async (path: string) => {
        const url = `https://fakestoreapi.com${path}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching data from ${url}: ${response.statusText}`);
        }
        return { data: await response.json() };
    }
};

// 2. Definición de la interfaz del producto (completa para la API)
interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    description?: string;
    category: string;
    rating: { rate: number; count: number };
}

// --- COMPONENTE PRINCIPAL DE LA PÁGINA ---

export default function Page() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
        let isMounted = true; 
        setIsLoading(true); 

        const fetchProducts = async () => {
            try {
                // Usamos la simulación de axios para llamar a la API
                const res = await mockAxios.get("/products");
                
                if (isMounted) { 
                    setProducts(res.data as Product[]);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                if (isMounted) { 
                    setIsLoading(false);
                }
            }
        };
        
        fetchProducts();
        
        return () => {
            isMounted = false; 
        };
    }, []); 

    // Solo muestra los primeros 4 productos en la sección destacada
    const featuredProducts = products.slice(0, 4);

    return (
        <div className="min-h-screen px-6 lg:px-20"> 
            
            <header className="text-center py-20 lg:py-24">
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-extrabold text-[var(--color-primary)] tracking-wide leading-tight mb-4">
                    Colección Aethel
                </h1>
                <p className="text-[var(--color-foreground)] text-lg sm:text-xl max-w-2xl mx-auto">
                    Explora nuestra selección noble y minimalista. Cada pieza ha sido elegida por su calidad y diseño atemporal.
                </p>
            </header>

            <section className="container mx-auto pb-20">
                {/* Título de la sección */}
                <h2 className="text-3xl font-serif font-bold mb-8 text-center text-[var(--color-foreground)]">
                    Artículos Destacados
                </h2>

                {isLoading ? (
                    // Skeleton Loader elegante
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 animate-pulse">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-[450px] bg-[var(--color-card)] rounded-[var(--radius)] shadow-lg flex flex-col">
                                {/* Simula la imagen */}
                                <div className="h-64 bg-gray-700/50 p-4 rounded-t-[var(--radius)]"></div>
                                {/* Simula el texto y precio */}
                                <div className="p-4 space-y-3 flex-grow">
                                    <div className="h-6 bg-gray-700 rounded w-3/4"></div>
                                    <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                                </div>
                                {/* Simula el botón */}
                                <div className="p-4 border-t border-[var(--color-border)]/20">
                                     <div className="h-10 w-full bg-[var(--color-primary)] rounded-full"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {featuredProducts.map(product => (
                            // Utiliza el ProductCard que tienes en el Canvas
                            // ⚠️ Asegúrate de que el ProductCard esté accesible en el entorno.
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
                        px-10 py-4 
                        rounded-[var(--radius)] 
                        font-bold text-lg
                        tracking-wider
                        shadow-lg
                        transition duration-300
                        btn-primary-hover
                        inline-flex items-center justify-center
                        border border-transparent
                    "
                >
                    Explorar la Colección Completa
                </Link>
            </div>
        </div>
    );
}