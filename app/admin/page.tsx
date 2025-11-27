// app/admin/page.tsx
"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Package, Users, ShoppingCart, PlusCircle } from "lucide-react";

// Componente Tarjeta de Estadísticas reutilizable
interface StatCardProps {
    icon: React.ReactNode;
    title: string;
    value: string;
    description: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, description }) => (
    <div className="bg-[var(--color-card)] p-6 rounded-[var(--radius)] shadow-xl border border-gray-700/50 hover:border-[var(--color-primary)] transition duration-300">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-[var(--color-primary)] font-bold text-xl">{title}</h2>
            {icon}
        </div>
        <p className="text-[var(--color-foreground)] text-4xl font-extrabold mb-1">{value}</p>
        <p className="text-[var(--color-foreground)]/60 text-sm">{description}</p>
    </div>
);

const AdminPage = () => {
  return (
    // ✅ Estilos Boreal: Usando variables CSS
    <div className="min-h-screen px-6 lg:px-20 py-12">
      <header className="mb-12 border-b border-gray-700/50 pb-6">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-[var(--color-primary)] mb-2">
            Admin Dashboard
        </h1>
        <p className="text-[var(--color-foreground)]/80 text-lg">
            Gestiona productos, usuarios y pedidos desde aquí.
        </p>
      </header>

      {/* Sección de Estadísticas */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <StatCard
            icon={<Package size={30} className="text-[var(--color-primary)]" />}
            title="Inventario de Productos"
            value="120"
            description="Total de artículos listados y disponibles."
        />
        
        <StatCard
            icon={<Users size={30} className="text-[var(--color-primary)]" />}
            title="Usuarios Registrados"
            value="45"
            description="Cuentas activas en la plataforma."
        />
        
        <StatCard
            icon={<ShoppingCart size={30} className="text-[var(--color-primary)]" />}
            title="Pedidos Pendientes"
            value="30"
            description="Pedidos en espera de procesamiento."
        />
      </section>

      {/* Sección de Acciones Rápidas */}
      <section className="mt-12 p-6 bg-[var(--color-card)] rounded-[var(--radius)] shadow-lg border border-gray-700/50">
        <h3 className="text-2xl font-bold text-[var(--color-foreground)] mb-4">Acciones Rápidas</h3>
        <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="golden" size="default" className="text-lg">
                <PlusCircle className="mr-2 h-5 w-5" /> Agregar Nuevo Producto
            </Button>
            <Button variant="outline" size="default" className="text-lg">
                <Users className="mr-2 h-5 w-5" /> Ver Lista de Usuarios
            </Button>
        </div>
      </section>

      {/* Placeholder para la Tabla de Pedidos */}
      <section className="mt-12">
        <h3 className="text-2xl font-bold text-[var(--color-foreground)] mb-4 border-b border-gray-800 pb-2">Últimos Pedidos</h3>
        <div className="bg-[var(--color-card)] p-8 rounded-[var(--radius)] text-center text-[var(--color-foreground)]/70 italic">
            [ Aquí iría una tabla de datos dinámica con los pedidos recientes ]
        </div>
      </section>

    </div>
  );
};

export default AdminPage;