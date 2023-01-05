## HMR 简介

HMR 的全称叫做 `Hot Module Replacement`，即`模块热替换`或者`模块热更新`
即页面模块更新的时候，直接把页面中发生变化的模块替换为新的模块，同时不会影响其它模块的正常运作

## 深入 HMR API

Vite 作为一个完整的构建工具，本身实现了一套 HMR 系统，值得注意的是，这套 HMR 系统基于原生的 ESM 模块规范来实现，在文件发生改变时 Vite 会侦测到相应 ES 模块的变化，从而触发相应的 API，实现局部的更新

Vite 的 HMR API 设计也并非空穴来风，它基于一套完整的 [ESM HMR 规范](https://github.com/FredKSchott/esm-hmr)来实现

```ts
interface ImportMeta {
  readonly hot?: {
    readonly data: any;
    accept(): void;
    accept(cb: (mod: any) => void): void; // 自身
    accept(dep: string, cb: (mod: any) => void): void; // 某个
    accept(deps: string[], cb: (mods: any[]) => void): void; // 多个
    prune(cb: () => void): void;
    dispose(cb: (data: any) => void): void;
    decline(): void;
    invalidate(): void;
    on(event: string, cb: (...args: any[]) => void): void;
  };
}
```

这里稍微解释一下，`import.meta` 对象为现代浏览器原生的一个内置对象，Vite 所做的事情就是在这个对象上的 hot 属性中定义了一套完整的属性和方法。因此，在 Vite 当中，你就可以通过 `import.meta.hot` 来访问关于 HMR 的这些属性和方法

### 模块更新时逻辑: hot.accept

在 `import.meta.hot` 对象上有一个非常关键的方法 `accept`，因为它决定了 Vite 进行热更新的边界，那么如何来理解这个 accept 的含义呢？

从字面上来看，它表示接受的意思。没错，它就是用来接受模块更新的。 一旦 Vite 接受了这个更新，当前模块就会被认为是 HMR 的边界。那么，Vite 接受谁的更新呢？这里会有三种情况

- 接受`自身模块`的更新
- 接受`某个子模块`的更新
- 接受`多个子模块`的更新

1. 接受自身更新
   当模块接受自身的更新时，则当前模块会被认为 HMR 的边界。也就是说，除了当前模块，其他的模块均未受到任何影响
   见 `render.ts`
2. 接受依赖模块的更新
   main 模块依赖 `render` 模块，也就是说，main 模块是 `render` 父模块，那么我们也可以在 main 模块中接受 `render` 模块的更新，此时 HMR 边界就是 main 模块了
3. 接受多个子模块的更新
   这里的意思是父模块可以接受多个子模块的更新，当其中任何一个子模块更新之后，父模块会成为 HMR 边界

### 模块销毁时逻辑: hot.dispose

这个方法相较而言就好理解多了，代表在模块更新、旧模块需要销毁时需要做的一些事情
见 `state.ts`

### 共享数据: hot.data 属性

这个属性用来在不同的模块实例间共享一些数据
见 `state.ts`

### import.meta.hot.decline()

这个方法调用之后，相当于表示此模块不可热更新，当模块更新时会强制进行页面刷新

### import.meta.hot.invalidate()

这个方法就更简单了，只是用来强制刷新页面

### 自定义事件 import.meta.hot.on

- `vite:beforeUpdate` 当模块更新时触发
- `vite:beforeFullReload` 当即将重新刷新页面时触发
- `vite:beforePrune` 当不再需要的模块即将被剔除时触发
- `vite:error` 当发生错误时（例如，语法错误）触发

**怎么触发**

```ts
// 插件  handleHotUpdate钩子
handleHotUpdate({ server }) {
  server.ws.send({
    type: 'custom',
    event: 'custom-update',
    data: {}
  })
  return []
}
// 前端代码
import.meta.hot.on('custom-update', (data) => {
  // 自定义更新逻辑
})
```
