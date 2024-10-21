declare global {
    interface Window {
        dataLayer: unknown[]; // O un tipo más específico si lo prefieres
    }
}

// Si el archivo no tiene exportaciones, asegúrate de incluir esta línea
export {};