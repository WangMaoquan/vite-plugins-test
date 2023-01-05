import { Plugin } from 'vite';

// 如果需要传参的话 自己加上参数
export default function vitePluginTestHook(): Plugin {
  return {
    name: 'vite-plugin-test-hook',
    /**
     * vite 独有
     * 这个方法里面我们可以修改 config
     */
    config(config) {
      // console.log('can_modify_config', config);
      console.log('config');
    },
    /**
     * vite 独有
     * 这个方法里面的config 是最终的config 不推荐修改
     */
    configResolved(config) {
      // console.log('last_config', config);
      console.log('configResolved');
    },
    options(options) {
      // console.log('options', options);
      console.log('options');
    },
    /**
     * vite
     * 可以启动中间件
     */
    configureServer(server) {
      console.log('configureServer');
    },
    buildStart() {
      console.log('buildStart');
    },
    // 通用钩子
    buildEnd() {
      console.log('buildEnd');
    },
    // 通用钩子
    closeBundle() {
      console.log('closeBundle');
    },
  };
}
