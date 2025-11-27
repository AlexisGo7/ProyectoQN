// app/login/page.tsx
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Importar el componente Button
import { LogIn } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // Estado para el mensaje de feedback
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(""); // Limpiar mensajes anteriores
    setIsSubmitting(true);

    // Simulación de una llamada a API asíncrona (como si fuera a Firebase Auth)
    await new Promise(resolve => setTimeout(resolve, 1500)); 

    if (email && password) {
      // Usar un mensaje en pantalla en lugar de alert()
      setMessage(`¡Bienvenido! Iniciando sesión como ${email}...`);
      // Lógica de navegación o autenticación real iría aquí
    } else {
      setMessage("Por favor, introduce tu email y contraseña.");
    }

    setIsSubmitting(false);
  };

  return (
    // ✅ Estilos Boreal: Usando variables CSS
    <div className="flex justify-center items-center min-h-screen px-4 py-8">
      <form
        onSubmit={handleLogin}
        // ✅ Estilos Boreal: Usando var(--color-card) y var(--color-primary)
        className="bg-[var(--color-card)] border border-[var(--color-primary)]/50 rounded-[var(--radius)] shadow-lg p-8 w-full max-w-sm transition-all duration-300"
      >
        <h2 className="text-3xl font-extrabold text-[var(--color-primary)] mb-8 text-center flex items-center justify-center">
          <LogIn className="mr-3" size={28} /> Entrar
        </h2>

        {/* Campo Email */}
        <label className="block mb-2 text-[var(--color-foreground)]/80 font-semibold text-sm">Email</label>
        <input
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          // ✅ Estilos Boreal
          className="w-full mb-4 p-3 rounded-[var(--radius)] border border-[var(--color-border)] bg-gray-800/50 text-[var(--color-foreground)] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition"
          required
        />

        {/* Campo Contraseña */}
        <label className="block mb-2 text-[var(--color-foreground)]/80 font-semibold text-sm">Contraseña</label>
        <input
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          // ✅ Estilos Boreal
          className="w-full mb-6 p-3 rounded-[var(--radius)] border border-[var(--color-border)] bg-gray-800/50 text-[var(--color-foreground)] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition"
          required
        />
        
        {/* Mensaje de Feedback */}
        {message && (
            <p className={`mb-4 p-3 rounded-[var(--radius)] text-sm font-medium ${
                message.includes('Bienvenido') ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'
            }`}>
                {message}
            </p>
        )}

        {/* Botón de Submit (usando componente Button) */}
        <Button
          type="submit"
          variant="golden" // Usando el estilo 'golden' de Boreal
          size="default" 
          className="w-full py-3 text-lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Cargando...' : 'Entrar'}
        </Button>
        
        {/* Enlace de Registro (Placeholder) */}
        <div className="mt-6 text-center text-sm">
            <a href="#" className="text-[var(--color-primary)]/80 hover:text-[var(--color-primary)] transition">
                ¿Olvidaste tu contraseña?
            </a>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;