### Vite 语法降级与 Polyfill 注入

Vite 官方已经为我们封装好了一个开箱即用的方案: `@vitejs/plugin-legacy`，我们可以基于它来解决项目语法的浏览器兼容问题。这个插件内部同样使用 @babel/preset-env 以及 core-js 等一系列基础库来进行语法降级和 Polyfill 注入

```
pnpm i @vitejs/plugin-legacy -D
```

在 `vite.config.ts` 使用

```
pnpm run build
```

通过官方的 `legacy` 插件， Vite 会分别打包出 `Modern` 模式和 `Legacy` 模式的产物，然后将两种产物插入同一个 HTML `里面，Modern` 产物被放到 `type="module"`的 script 标签中，而 `Legacy` 产物则被放到带有 `nomodule` 的 `script` 标签中

### 插件执行原理

// todo 回头看源码
