// app/products/[id]/page.tsx

"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import axios from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { ShoppingCart, PackageOpen } from "lucide-react"; 

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category?: string; 
}

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCartStore(); 

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id || Array.isArray(id)) return;
    
    let isMounted = true;
    setIsLoading(true);

    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/products/${id}`);
        if (isMounted) {
          setProduct(res.data as Product);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
        if (isMounted) {
          setProduct(null); 
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchProduct();
    
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) 
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <p className="text-xl font-semibold text-[var(--color-foreground)] animate-pulse">
          Cargando producto...
        </p>
      </div>
    );
    
  if (!product) 
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
        <PackageOpen className="w-20 h-20 text-red-500 mb-4" />
        <h2 className="text-3xl font-bold text-red-500 mb-2">
          Producto No Encontrado
        </h2>
        <p className="text-xl text-[var(--color-foreground)]/80">
            Lo sentimos, el producto con ID **{id}** no existe o no está disponible.
        </p>
       </div>
    );
    
  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="min-h-screen px-4 sm:px-8 lg:px-20 py-16 flex justify-center"> 
      
      <div className="flex flex-col lg:flex-row max-w-7xl w-full bg-[var(--color-card)] p-6 sm:p-10 lg:p-12 rounded-xl shadow-2xl border border-[var(--color-border)]/50 lg:gap-10">
        
        <div className="w-full lg:w-5/12 p-4 flex items-center justify-center mb-8 lg:mb-0">
          <div className="flex justify-center items-center w-full max-w-xs sm:max-w-sm bg-white/5 rounded-xl border border-[var(--color-primary)]/50 p-6 shadow-2xl shadow-[var(--color-primary)]/20">
            <Image
              src={product.image}
              alt={product.title}
              width={300} 
              height={300} 
              style={{ objectFit: "contain" }}
              className="transition-all duration-300 hover:scale-[1.02]"
            />
          </div>
        </div>

        {/* Columna de Detalles: Ahora con TEXTO y TÍTULOS centrados */}
        <div className="w-full lg:w-7/12 pt-4 sm:pt-0 **text-center**"> 
          <h1 className="text-4xl sm:text-5xl font-black text-[var(--color-primary)] mb-3 leading-tight">
            {product.title}
          </h1>

            {product.category && (
                <span className="inline-block bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-sm font-medium px-3 py-1 rounded-full mb-6">
                    {product.category.toUpperCase()}
                </span>
            )}
            
          <p className="text-lg text-[var(--color-foreground)]/90 mb-8 leading-relaxed">
            {product.description}
          </p>

          {/* Sección de Precio: Usa 'items-center' para centrar las líneas apiladas */}
          <div className="flex flex-col border-t border-b border-[var(--color-border)] py-6 **items-center**"> 
            <span className="text-xl font-semibold text-[var(--color-foreground)] mb-2">
              Precio:
            </span>
            <span className="text-5xl font-extrabold text-[var(--color-primary)]">
              ${product.price.toFixed(2)}
            </span>
          </div>

          {/* El botón está centrado porque ocupa el w-full */}
          <Button 
            variant="golden" 
            size="default" 
            className="w-full text-xl py-6 mt-6 mb-8 shadow-lg shadow-[var(--color-primary)]/40 transition-all duration-300 hover:shadow-xl"
            onClick={handleAddToCart}
          >
                <ShoppingCart className="w-6 h-6 mr-3" />
            Añadir al Carrito
          </Button>

          {/* Información Adicional (Centrado) */}
          <div className="text-[var(--color-foreground)]/70 text-base space-y-2 border-t border-[var(--color-border)] pt-6">
            <p>✅ Envío gratuito a partir de $100.</p>
            <p>🛡️ Garantía de devolución de 30 días.</p>
                <p>📦 Disponible para envío inmediato.</p>
          </div>

        </div>
      </div>
    </div>
  );
}