import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  // Use the repository subpath only for production builds. During dev we'll use '/' so
  // absolute links (href="/clases") work locally without the extra prefix.
  base: mode === 'production' ? '/LCC-ANGABE/' : '/',
  plugins: [react()],
}))
