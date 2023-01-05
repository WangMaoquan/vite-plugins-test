// import fib from 'virtual:fib';
// import env from 'virtual:env';
import { render } from './render';
import { initState } from './state';

render();
initState();

// console.log(env);

// console.log(`结果: ${fib(11)}`);

/**
 * 在这里我们同样是调用 accept 方法，与之前不同的是，
 * 第一个参数传入一个依赖的路径，也就是render模块的路径，这就相当于告诉 Vite:
 * 我监听了 render 模块的更新，当它的内容更新的时候，请把最新的内容传给我。
 * 同样的，第二个参数中定义了模块变化后的回调函数，这里拿到了 render 模块最新的内容，然后执行其中的渲染逻辑，让页面展示最新的内容
 */
if (import.meta.hot) {
  import.meta.hot.accept('./render.ts', (newModule) => {
    newModule?.render();
  });
}
