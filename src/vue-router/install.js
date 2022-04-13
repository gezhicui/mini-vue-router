export let _Vue;

export default function install(Vue) {
  _Vue = Vue
  Vue.mixin({
    //深度优先
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