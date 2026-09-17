import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Deployed to GitHub Pages under https://<user>.github.io/eclat-cosmetics/
// so all built asset URLs must be prefixed with this base path.
export default defineConfig({
  base: '/eclat-cosmetics/',
  plugins: [react()],
})
