// import install from './install'
import createMatcher from './create-matcher';

let _Vue

export default class VueRouter {
  //router.js中 new Router传入的路由配置对象
  constructor(options) {
    //将用户传入的路由配置扁平化 matcher里包括了 match和addRoutes
    this.matcher = createMatcher(options.routes || []);
  }

  //在install的时候执行init
  init(app) { // new Vue app指 代的是根实例
    const history = this.history;
    const setupHashLister = () => {
      history.setuplistener();
    }
    history.transitionTo(
      history.getCurrentLocation(),
      //跳转路径后要设置监听路径变化
      setupHashLister
    )
    history.listen((route) => {//发布订阅方法
      app._route = route; //视图就可以刷新了
    })
  }
}

VueRouter.install = function (Vue) {
  _Vue = Vue
  Vue.mixin({
    //深度优先，递归执行
    beforeCreate() {
      //main.js中的new Vue 传入了router，所以main.js中是根实例
      if (this.$options.router) { //根实例
        // _router是路由实例
        this._routerRoot = this;
        this._router = this.$options.router

        // init() 
        this._router.init(this);//初始化方法

        Vue.util.defineReactive(this, 'route', this._router.history.current)//当前路由信息
      } else {
        //找到父亲的_routerRoot 等价于this.$parent?._routerRoot
        this._routerRoot = this.$parent && this.$parent._routerRoot;
      }
    }
  });
}