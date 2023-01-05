// 负责渲染文本内容
import './style.css';

/**
 * import.meta.hot对象只有在开发阶段才会被注入到全局，生产环境是访问不到的，
 * 另外增加条件守卫之后，打包时识别到 if 条件不成立，会自动把这部分代码从打包产物中移除，来优化资源体积
 */
// 接受依赖更新 注释掉了
// if (import.meta.hot) {
//   // 接受自身更新
//   import.meta.hot.accept((mod) => {
//     // console.log(mod, 'mod');
//     // 这里的render 其实就是我们下面的 render方法
//     mod?.render();
//   });
// }

export const render = () => {
  const app = document.querySelector<HTMLDivElement>('#app')!;
  app.innerHTML = `
    <h1>Hello Vite!</h1>
    <p target="_blank">This is hmr test.123 这是增加的文本1</p>
  `;
};

/**
 * 修改 innerHTML 页面能刷新, 但是 state 的值会重新从零开始
 *
 * 在我们加上 if (import.meta.hot) { xxx }
 * 之后我们修改 innerHTML 后 state 也不会发生改变了
 */
