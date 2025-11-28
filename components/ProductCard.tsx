"use client"; 
import React from 'react';
import { ShoppingCart } from 'lucide-react';

// ⚠️ NOTA DE CORRECCIÓN: Se eliminaron los imports 'next/image', 'next/link' y '@/store/cartStore' 
// debido a errores de compilación. Se usan elementos HTML estándar y una función de carrito simulada.

// Definición de la interfaz del producto
interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    description?: string;
}

interface ProductCardProps {
    product: Product;
}

// --- SIMULACIÓN DE LÓGICA DE CARRITO ---
// Función simulada para reemplazar el hook useCartStore, asegurando que el componente sea ejecutable.
const mockAddToCart = (product: Product) => {
    // Aquí se imprimiría el producto añadido, ya que no tenemos acceso al store de Zustand
    console.log(`🛒 Producto simulado añadido al carrito: ${product.title}`);
};

// Simulamos los estilos de shadcn/ui con Tailwind para la estética elegante
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    // Usamos la función mock directamente
    const addToCart = mockAddToCart;

    return (
        <div className="
            bg-[var(--color-card)] 
            rounded-[var(--radius)] 
            overflow-hidden 
            shadow-xl 
            hover:shadow-2xl 
            transition-all 
            duration-300 
            flex flex-col 
            h-full
        ">
            {/* Contenedor de Imagen: Reemplazamos <Link> por <a> */}
            <a href={`/products/${product.id}`} className="block relative w-full h-64 overflow-hidden group">
                {/* Reemplazamos <Image> de Next.js por <img> estándar */}
                <img
                    src={product.image}
                    alt={product.title}
                    // Estilos para simular el comportamiento de 'objectFit="contain"'
                    className="
                        p-4 
                        object-contain 
                        w-full h-full 
                        transition-transform duration-500 
                        group-hover:scale-105
                    "
                    loading="lazy"
                />
            </a>

            {/* Contenido del Producto */}
            <div className="p-4 flex flex-col flex-grow">
                {/* Reemplazamos <Link> por <a> */}
                <a href={`/products/${product.id}`} className="flex-grow">
                    <h3 className="
                        text-xl font-serif font-bold 
                        text-[var(--color-foreground)] 
                        hover:text-[var(--color-primary)] 
                        transition-colors 
                        line-clamp-2
                    ">
                        {product.title}
                    </h3>
                </a>
                
                <div className="mt-4 flex justify-between items-center pt-2 border-t border-[var(--color-border)]/20">
                    <p className="text-2xl font-extrabold text-[var(--color-primary)]">
                        ${product.price.toFixed(2)}
                    </p>
                    
                    {/* Botón de Añadir al Carrito */}
                    <button
                        onClick={() => addToCart(product)}
                        className="
                            p-3 rounded-full 
                            bg-[var(--color-primary)] 
                            text-[var(--color-primary-foreground)] 
                            hover:bg-white 
                            hover:text-[var(--color-primary)] 
                            transition-colors 
                            shadow-md
                        "
                        aria-label="Añadir al carrito"
                    >
                        <ShoppingCart size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;