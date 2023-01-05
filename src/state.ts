// 保存定时器ID
let timer: number | null = null;

if (import.meta.hot) {
  // 清除上一次的timer
  import.meta.hot.dispose(() => {
    if (timer) {
      clearInterval(timer);
    }
  });
}

// 负责记录当前的页面状态
export function initState() {
  let count = 0;
  timer = setInterval(() => {
    let countEle = document.getElementById('count');
    countEle!.innerText = ++count + '';
  }, 1000);
}
