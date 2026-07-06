import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  // En prod l'app est servie sous https://kdl-tech.fr/prompt-studio/
  base: command === 'build' ? '/prompt-studio/' : '/',
  plugins: [react()],
  server: { port: 5180, open: false },
  test: {
    environment: 'node',
    include: ['test/**/*.test.js'],
  },
}));
