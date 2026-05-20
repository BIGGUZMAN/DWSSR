// Importo la función de configuración de Vite
import { defineConfig } from "vite";

// Importo un resolvedor de rutas
import { resolve } from "node:path";

// Exporto la configuración de Vite
export default defineConfig({
  // Directorio raíz del proyecto frontend
  root: "src",

  // Configuración del servidor de desarrollo
  server: {
    port: 5173,
    strictPort: true,
  },

  // Configuración del build
  build: {
    // Carpeta de salida
    outDir: "../dist",

    // Limpiar carpeta antes de compilar
    emptyOutDir: true,

    // Generar manifest para Express
    manifest: true,

    // Configuración de entradas
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/main.js"),
      },
    },
  },

  // Desactivar carpeta public
  publicDir: false,
});
