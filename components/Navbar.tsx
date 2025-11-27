"use client";
import React from 'react';
import Link from 'next/link';
import { ShoppingCart, LogIn, UserPlus } from 'lucide-react'; 
import { useCartStore } from '@/store/cartStore'; 
import { useUIStore } from '@/store/uiStore'; 

const navLinks = [
    { name: 'Productos', href: '/products' },
];

const authLinks = [
    { name: 'Login', href: '/login', icon: LogIn },
    { name: 'Registro', href: '/register', icon: UserPlus },
];

const Navbar: React.FC = () => {
  const { toggleCart } = useUIStore(); 
  const { items } = useCartStore();
  const cartItemCount = items.length;

  return (
    <nav className="sticky top-0 z-40 w-full backdrop-blur-md bg-[var(--color-card)]/80 shadow-2xl border-b border-[var(--color-border)]/50">
      <div className="container mx-auto px-6 lg:px-20 py-4 flex justify-between items-center">
        
        {/* 1. Logo (Margen ajustado para pantallas grandes) */}
        <Link 
            href="/" 
            className="text-3xl font-extrabold text-[var(--color-primary)] tracking-wider mr-6 lg:mr-12 transition duration-300 hover:opacity-80 focus:outline-none" 
        >
          BOREAL
        </Link>

        {/* 2. Links de Navegación Central (Visible solo en LG) */}
        <div className="hidden lg:flex space-x-10 items-center flex-grow">
            {navLinks.map((link) => (
                <Link 
                    key={link.name} 
                    href={link.href}
                    className="text-lg font-medium text-[var(--color-foreground)] hover:text-[var(--color-primary)] transition duration-200"
                >
                    {link.name}
                </Link>
            ))}
        </div>

        {/* 3. Contenedor de Auth Links y Carrito */}
        <div className="flex items-center space-x-4 sm:space-x-6">

            {/* Links de Login/Registro (Visibles en SM y mayores) */}
            {authLinks.map((link) => (
                <Link 
                    key={link.name} 
                    href={link.href}
                    className="hidden sm:flex items-center text-base font-semibold text-[var(--color-foreground)] hover:text-[var(--color-primary)] transition duration-200"
                >
                    <link.icon size={18} className="mr-1" />
                    {link.name}
                </Link>
            ))}

            {/* Botón del Carrito: Diseño compacto y de icono de acción */}
            <button
              onClick={toggleCart}
              className="relative p-2 h-10 w-10 flex items-center justify-center rounded-full bg-[var(--color-card)] border border-[var(--color-border)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-card)] transition duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" 
              aria-label="Abrir Carrito de Compras"
            >
              <ShoppingCart size={20} strokeWidth={2.5} /> {/* Tamaño 20 */}
              
              {/* Contador de Artículos */}
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center h-4 w-4 text-[10px] font-bold leading-none transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white rounded-full border-2 border-[var(--color-card)]"> 
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </span>
              )}
            </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;