
export default class History {
  constructor(router) {//router指的就是new VueRouter实例对象
    this.router = router

    //默认路由中保存一个当前的路径,后续会更改这个路径
    this.current = createRoute(null, { path: '/' })
  }

  //跳转的核心逻辑，loaction代表跳转的目的地，complete代表跳转成功回调
  transitionTo(location, onComplete) {
    //获取到的route就是当前路径要匹配哪些路由
    let route = this.router.matcher.match(location)
    console.log(route);
    onComplete && onComplete()
  }
}

export function createRoute(record, location) { // path matched
  let res = [];
  if (record) {
    while (record) {
      res.unshift(record);
      record = record.parent
    }
  }
  console.log(res);
  return {
    ...location,
    matched: res
  }
}