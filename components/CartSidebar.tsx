// @/components/CartSidebar.tsx

import React from "react";
// Importamos ShoppingCart para el título, X para el botón de cierre
import { Minus, Plus, Trash2, ShoppingCart, X } from "lucide-react"; 
// Importamos el tipo Product y el store
import { useCartStore, Product } from "@/store/cartStore"; 
import { Button } from "@/components/ui/button";

// Componente individual para cada artículo en el carrito
const CartItem: React.FC<{ item: Product }> = ({ item }) => {
  const { addToCart, reduceQuantity, removeItem } = useCartStore();

  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-700/50 last:border-b-0">
      {/* Información del Producto */}
      <div className="flex items-center space-x-3 flex-grow">
        <div className="w-12 h-12 flex-shrink-0 rounded-md overflow-hidden bg-[var(--color-card)] border border-gray-600">
          {/* Espacio para la imagen del producto */}
          <div className="flex items-center justify-center w-full h-full text-xs text-[var(--color-foreground)] opacity-50">
            {item.title.substring(0, 3)}
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-[var(--color-foreground)] font-semibold text-sm line-clamp-1">
            {item.title}
          </span>
          <span className="text-[var(--color-primary)] font-bold text-base">
            ${item.price.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Controles de Cantidad y Eliminación */}
      <div className="flex items-center space-x-2 flex-shrink-0">
        <div className="flex items-center border border-[var(--color-border)] rounded-md text-sm">
          <button
            onClick={() => reduceQuantity(item.id)}
            className="p-1 text-[var(--color-primary)] hover:bg-[var(--color-card)] rounded-l-md transition"
          >
            <Minus size={16} />
          </button>
          <span className="px-2 text-[var(--color-foreground)] bg-gray-700/50">
            {item.quantity}
          </span>
          <button
            // La llamada a addToCart con el objeto item (tipo Product) incrementa la cantidad existente.
            onClick={() => addToCart(item)}
            className="p-1 text-[var(--color-primary)] hover:bg-[var(--color-card)] rounded-r-md transition"
          >
            <Plus size={16} />
          </button>
        </div>

        <button
          onClick={() => removeItem(item.id)}
          className="text-red-500 hover:text-red-400 transition"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

// 1. ✅ MODIFICACIÓN CLAVE: Acepta la prop closeAction
const CartSidebar: React.FC<{ closeAction: () => void }> = ({ closeAction }) => {
  const { items, removeItem } = useCartStore();
  const cartTotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    // Se mantiene el diseño premium del sidebar
    <div className="fixed top-0 right-0 w-full sm:w-96 h-screen bg-[var(--color-card)] z-50 shadow-2xl border-l border-gray-700 p-6 overflow-y-auto">
      
      {/* Encabezado del Carrito */}
      <div className="flex items-center justify-between border-b pb-4 border-[var(--color-primary)]/50 mb-6">
        <h2 className="text-3xl font-bold text-[var(--color-primary)] flex items-center">
          <ShoppingCart className="mr-2" size={28} /> 
          Mi Carrito
        </h2>
        {/* 2. ✅ INTEGRACIÓN DEL BOTÓN DE CIERRE */}
        <button 
          onClick={closeAction} // Usa la prop pasada por el controlador
          className="text-[var(--color-foreground)] hover:text-white transition p-1 rounded-full hover:bg-[var(--color-primary)]/20"
          aria-label="Cerrar Carrito"
        >
          <X size={24} />
        </button>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 text-[var(--color-foreground)]/70">
          <ShoppingCart size={48} className="mx-auto mb-4 text-[var(--color-primary)]/80" />
          <p className="text-lg font-semibold">Tu carrito está vacío.</p>
          <p className="text-sm mt-2">¡Añade algunos artículos elegantes!</p>
        </div>
      ) : (
        <>
          {/* Lista de Artículos */}
          <div className="divide-y divide-gray-800">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Resumen y Botones */}
          <div className="mt-8 pt-6 border-t border-[var(--color-primary)]/50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold text-[var(--color-foreground)]">
                Total:
              </span>
              <span className="text-3xl font-extrabold text-[var(--color-primary)]">
                ${cartTotal.toFixed(2)}
              </span>
            </div>

            <Button variant="golden" size="default" className="w-full mt-4">
              Proceder al Pago
            </Button>

            <Button
              variant="outline"
              size="default"
              className="w-full mt-2"
              onClick={() => {
                // Elimina todos los items del carrito
                items.forEach((item) => removeItem(item.id));
              }}
            >
              Vaciar Carrito
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartSidebar;