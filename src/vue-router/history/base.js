export default class History {
  constructor(router) {
    //router指的就是new VueRouter实例对象
    this.router = router;
    //默认路由中保存一个当前的路径,后续会更改这个路径
    this.current = createRoute(null, { path: '/' });
  }

  //跳转的核心逻辑，loaction代表跳转的目的地，complete代表跳转成功回调
  transitionTo(location, onComplete) {
    //获取到的route就是当前路径要匹配哪些路由
    let route = this.router.matcher.match(location);
    //更新current  初始化时matched会从空数组变成匹配到的组件
    if (this.current.path === location && route.matched.length === this.current.matched.length) {
      //如果是相同路径就不进行跳转了
      return;
    } else {
      this.current = route;
      this.cb && this.cb(route);
    }
    onComplete && onComplete();
  }
  listen(cb) {
    this.cb = cb;
  }
}

export function createRoute(record, location) {
  // path matched
  let res = [];
  if (record) {
    //比如说现在是/about/a,res会产生 [/about组件内容,/a组件内容]
    while (record) {
      res.unshift(record);
      record = record.parent;
    }
  }
  return {
    ...location,
    matched: res,
  };
}
