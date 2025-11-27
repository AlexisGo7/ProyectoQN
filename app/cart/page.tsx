// @/store/cartStore.ts

import { create } from 'zustand';

// 1. Definición de la interfaz base del producto tal como viene de la API
export interface ApiProduct {
    id: number;
    title: string;
    price: number;
    image: string;
    description?: string;
    category?: string;
}

// 2. Definición de la interfaz Product para el estado del carrito
// Incluye la cantidad para saber cuántos tiene el usuario
export interface Product extends ApiProduct {
    quantity: number;
}

// 3. Definición de la interfaz del estado y las acciones (CartState)
export interface CartState {
    items: Product[];
    addToCart: (product: ApiProduct) => void;
    reduceQuantity: (productId: number) => void;
    removeItem: (productId: number) => void;
    clearCart: () => void; // <--- Esta es la acción que faltaba
}

// 4. Creación del store (uso de localStorage para persistencia)
export const useCartStore = create<CartState>((set,) => ({
    items: [],

    addToCart: (apiProduct) => {
        set((state) => {
            const itemIndex = state.items.findIndex(item => item.id === apiProduct.id);

            if (itemIndex > -1) {
                // Producto ya existe: incrementar cantidad
                const newItems = state.items.map((item, index) => 
                    index === itemIndex ? { ...item, quantity: item.quantity + 1 } : item
                );
                return { items: newItems };
            } else {
                // Producto nuevo: añadir con quantity = 1
                const newItem: Product = { ...apiProduct, quantity: 1 };
                return { items: [...state.items, newItem] };
            }
        });
    },

    reduceQuantity: (productId) => {
        set((state) => {
            const itemIndex = state.items.findIndex(item => item.id === productId);

            if (itemIndex > -1) {
                const currentItem = state.items[itemIndex];

                if (currentItem.quantity > 1) {
                    // Si la cantidad es > 1, solo reducirla
                    const newItems = state.items.map((item, index) => 
                        index === itemIndex ? { ...item, quantity: item.quantity - 1 } : item
                    );
                    return { items: newItems };
                } else {
                    // Si la cantidad es 1, eliminar el producto
                    const newItems = state.items.filter(item => item.id !== productId);
                    return { items: newItems };
                }
            }
            return state; // No encontrado, no hacer nada
        });
    },

    removeItem: (productId) => {
        set((state) => ({
            items: state.items.filter(item => item.id !== productId),
        }));
    },

    clearCart: () => { // <--- Implementación de la función 'clearCart'
        set({ items: [] });
    },
}));