// app/layout.tsx

import type { Metadata } from "next";
// Importa tus estilos CSS globales
import "../styles/globals.css"; 
// Importa los nuevos componentes
import Navbar from "@/components/Navbar"; 
import CartController from "@/components/CartController"; 

export const metadata: Metadata = {
  title: "Boreal - Elegancia en Compras",
  description: "Una tienda online con diseño premium.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        {/* 1. Barra de Navegación (visible en todas las páginas) */}
        <Navbar />

        {/* 2. Contenido de la Página */}
        <main>
          {children}
        </main>
        
        {/* 3. Controlador del Carrito (flotante) */}
        <CartController />
      </body>
    </html>
  );
}