import History from './base';

export default class HashHistory extends History {
  constructor(router) {
    //super就是执行了父类的构造函数
    super(router)
  }
  //获取当前路由hash
  getCurrentLocation() {
    return window.location.hash.slice(1)
  }
  // 监听hashchange事件
  setupHashLister() {
    window.addEventListener('hashchange', () => {
      this.transitionTo(window.location.hash.slice(1))
    })
  }
}
