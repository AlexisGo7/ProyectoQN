// @/store/cartStore.ts

import { create } from "zustand";
export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number; // La cantidad es manejada por el store
}

// Creamos un alias para el tipo esperado por addToCart
type ProductToAdd = Omit<Product, 'quantity'>;

interface CartState {
  items: Product[];
  
  addToCart: (product: ProductToAdd) => void; 
  reduceQuantity: (id: number) => void; 
  removeItem: (id: number) => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  
  // Tipificación explícita añadida: (product: ProductToAdd)
  addToCart: (product: ProductToAdd) => set(state => { 
    const exists = state.items.find(item => item.id === product.id);
    
    if (exists) {
      return { 
        items: state.items.map(item => 
          item.id === product.id ? {...item, quantity: item.quantity + 1} : item
        ) 
      };
    }
    return { 
      items: [...state.items, { ...product, quantity: 1 }] 
    };
  }),

  // Tipificación explícita añadida: (id: number)
  reduceQuantity: (id: number) => set(state => { 
    const existingItem = state.items.find(item => item.id === id);

    if (existingItem) {
      if (existingItem.quantity > 1) {
        return {
          items: state.items.map(item =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
        };
      } else {
        return {
          items: state.items.filter(item => item.id !== id)
        };
      }
    }
    return state;
  }),
  
  // Tipificación explícita añadida: (id: number)
  removeItem: (id: number) => set(state => ({ 
    items: state.items.filter(item => item.id !== id) 
  })),
}));