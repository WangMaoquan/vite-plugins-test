import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { vitePluginTestHook, loadVirtualModule } from './plugins';
import legacy from '@vitejs/plugin-legacy';
// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [vue(), vitePluginTestHook(), loadVirtualModule()],
  plugins: [
    legacy({
      // 设置目标浏览器，browserslist 配置语法
      // 这个参数在插件内部会透传给@babel/preset-env
      targets: ['ie >= 11'],
    }),
  ],
});
