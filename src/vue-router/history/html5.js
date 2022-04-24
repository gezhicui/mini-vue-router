import History from './base';

const bindEventListener = function (type) {
  const historyEvent = history[type];
  return function () {
    const newEvent = historyEvent.apply(this, arguments);
    const e = new Event(type);
    e.arguments = arguments;
    window.dispatchEvent(e);
    return newEvent;
  };
};


export default class HTML5History extends History {
  constructor(router) {
    //super就是执行了父类的构造函数
    super(router)
    //添加对 pushState和replaceState的监听
    window.history.pushState = bindEventListener('pushState');
    window.history.replaceState = bindEventListener('replaceState');
  }
  getCurrentLocation() {
    return window.location.pathname
  }

  // 监听路由变化事件
  setupHashLister() {
    window.addEventListener('load', () => {
      this.transitionTo(window.location.pathname)
    });
    //当浏览器前进后退的时候，要将对应的路径放到this.history中
    window.addEventListener('popstate', () => {
      this.transitionTo(window.location.pathname)
    });
    window.addEventListener('replaceState', () => {
      this.transitionTo(window.location.pathname)
    });
    window.addEventListener('pushState', () => {
      this.transitionTo(window.location.pathname)
    });
  }
}
