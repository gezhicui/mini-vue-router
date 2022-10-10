import History from './base';

function ensureSlash() {
  if (window.location.hash) {
    return;
  }
  window.location.hash = '/';
}
export default class HashHistory extends History {
  constructor(router) {
    //super就是执行了父类的构造函数
    super(router);

    //页面加载的时候确保路径中有/
    ensureSlash();
  }

  //获取当前路由hash
  getCurrentLocation() {
    return window.location.hash.slice(1);
  }
  // 监听hashchange事件
  setupHashLister() {
    window.addEventListener('hashchange', () => {
      this.transitionTo(window.location.hash.slice(1));
    });
  }
}
