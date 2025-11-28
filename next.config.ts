/** @type {import('next').NextConfig} */
const nextConfig = {
    // Configuración para el componente Image de Next.js
    images: {
        // Añade el dominio de la Fake Store API a la lista blanca
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'fakestoreapi.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

module.exports = nextConfig;