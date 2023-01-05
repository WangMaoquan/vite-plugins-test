### 自定义 vite 插件

1. Vite 插件与 Rollup 插件结构类似，为一个 `name` 和各种插件 Hook 的对象:

   ```ts
   {
   // 插件名称
   name: 'vite-plugin-xxx',
   load(code) {
    // 钩子逻辑
   },
   }
   ```

   > 如果插件是一个 npm 包，在 package.json 中的包命名也推荐以 vite-plugin 开头

2. 一般情况下因为要考虑到外部传参，我们不会直接写一个对象，而是实现一个返回插件对象的`工厂函数`

   ```ts
   // 自定义插件
   export function myVitePlugin(options) {
     console.log(options);
     return {
       name: 'vite-plugin-xxx',
       load(id) {
         // 在钩子逻辑中可以通过闭包访问外部的 options 传参
       },
     };
   }

   // vite.config.ts
   import { myVitePlugin } from './myVitePlugin';
   export default {
     plugins: [
       myVitePlugin({
         /* 给插件传参 */
       }),
     ],
   };
   ```
