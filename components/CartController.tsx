// @/components/CartController.tsx

"use client";
import React from 'react';
import CartSidebar from './CartSidebar'; // Ajusta la ruta si es necesario
import { useUIStore } from '@/store/uiStore';

const CartController: React.FC = () => {
    // 1. Leer el estado y la función de cierre del UI Store
    const { isCartOpen, closeCart } = useUIStore();

    // No renderizar nada si está cerrado
    if (!isCartOpen) return null;

    return (
        <>
            {/* 2. Overlay Oscuro: Cierra el carrito al hacer clic fuera */}
            <div 
                className="fixed inset-0 bg-black/50 z-40 transition-opacity"
                onClick={closeCart} 
            />

            {/* 3. Renderiza el Sidebar y le pasa la función de cierre */}
            <CartSidebar closeAction={closeCart} /> 
        </>
    );
};

export default CartController;