import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// Single-file build: the whole microsite ships as one shareable HTML file.
export default defineConfig({
  plugins: [react(), viteSingleFile()],
});
