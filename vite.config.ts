import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { vitePluginTestHook } from './plugins';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vitePluginTestHook()],
});
