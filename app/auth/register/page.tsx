// app/login/page.tsx
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Importar el componente Button
import { UserPlus } from "lucide-react"; // Cambiado a UserPlus para registro

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Nuevo estado para confirmar contraseña
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    if (!email || !password || !confirmPassword) {
        setMessage("Por favor, rellena todos los campos.");
        setIsSubmitting(false);
        return;
    }
    
    if (password !== confirmPassword) {
        setMessage("Las contraseñas no coinciden.");
        setIsSubmitting(false);
        return;
    }

    // Simulación de una llamada a API asíncrona (registro)
    await new Promise(resolve => setTimeout(resolve, 2000)); 

    // Lógica de registro simulada
    if (email && password === confirmPassword) {
      setMessage(`¡Registro exitoso! Cuenta creada para ${email}.`);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } else {
      // Este mensaje solo se mostraría si falla la validación del servidor (aquí simulado)
      setMessage("Error al registrar el usuario. Inténtalo de nuevo.");
    }

    setIsSubmitting(false);
  };

  return (
    // ✅ Estilos Boreal: Usando variables CSS
    <div className="flex justify-center items-center min-h-screen px-4 py-8">
      <form
        onSubmit={handleRegister}
        // ✅ Estilos Boreal: Usando var(--color-card) y var(--color-primary)
        className="bg-[var(--color-card)] border border-[var(--color-primary)]/50 rounded-[var(--radius)] shadow-lg p-8 w-full max-w-sm transition-all duration-300"
      >
        <h2 className="text-3xl font-extrabold text-[var(--color-primary)] mb-8 text-center flex items-center justify-center">
          <UserPlus className="mr-3" size={28} /> Registrarse
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
          className="w-full mb-4 p-3 rounded-[var(--radius)] border border-[var(--color-border)] bg-gray-800/50 text-[var(--color-foreground)] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition"
          required
        />
        
        {/* Campo Confirmar Contraseña */}
        <label className="block mb-2 text-[var(--color-foreground)]/80 font-semibold text-sm">Confirmar Contraseña</label>
        <input
          type="password"
          placeholder="Repite la contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          // ✅ Estilos Boreal
          className="w-full mb-6 p-3 rounded-[var(--radius)] border border-[var(--color-border)] bg-gray-800/50 text-[var(--color-foreground)] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition"
          required
        />
        
        {/* Mensaje de Feedback */}
        {message && (
            <p className={`mb-4 p-3 rounded-[var(--radius)] text-sm font-medium ${
                message.includes('exitoso') ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'
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
          {isSubmitting ? 'Registrando...' : 'Registrarse'}
        </Button>
        
        {/* Enlace para volver a Login */}
        <div className="mt-6 text-center text-sm">
            <p className="text-[var(--color-foreground)]/80">
                ¿Ya tienes cuenta? 
                <a href="/login" className="text-[var(--color-primary)] hover:text-[var(--color-primary)]/80 transition ml-1 font-semibold">
                    Inicia Sesión
                </a>
            </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;