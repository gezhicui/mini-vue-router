// import install from './install'
import createMatcher from './create-matcher';
import HashHistory from './history/hash'
import RouterView from './components/view'
import RouterLink from './components/link'
let _Vue

export default class VueRouter {
  //router.js中 new Router传入的路由配置对象
  constructor(options) {
    //将用户传入的路由配置扁平化 matcher里包括了 match和addRoutes
    this.matcher = createMatcher(options.routes || []);

    //创建路由系统根据模式来创建不同的路由对象
    this.mode = options.mode || ' hash';
    this.history = new HashHistory(this);
  }


  //在install的时候执行init
  init(app) { // new Vue app指 代的是根实例

    const history = this.history;
    const setupHashLister = () => {
      history.setupHashLister();
    }

    console.log(this);
    history.transitionTo(
      //跳转路径
      history.getCurrentLocation(),
      //跳转路径后要设置监听路径变化
      setupHashLister
    )

    //发布订阅方法
    history.listen((route) => {
      app._route = route; //视图就可以刷新了
    })

  }


  push() {

  }
  replace() {

  }
}

VueRouter.install = function (Vue) {
  _Vue = Vue
  //在这里只是mixin一下，没有执行，在main.js中newVue时才执行
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
        //把History实例中的current变成响应式的  (目标对象，目标对象属性，目标值)
        Vue.util.defineReactive(this, '_route', this._router.history.current)//当前路由信息
      } else {
        //找到父亲的_routerRoot 等价于this.$parent?._routerRoot
        this._routerRoot = this.$parent && this.$parent._routerRoot;
      }
    }
  });

  //$route存的是属性 如path、matched
  Object.defineProperty(Vue.prototype, '$route', {
    get() {
      return this._routerRoot._route
    }
  })
  //$router传的都是方法
  Object.defineProperty(Vue.prototype, '$router', {
    get() {
      return this._routerRoot._router;
    }
  })

  //注册全局组件
  Vue.component('RouterView', RouterView)
  Vue.component('RouterLink', RouterLink)
}