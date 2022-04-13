
export default class History {
  constructor(router) {//router指的就是new VueRouter实例对象
    this.router = router

    //默认路由中保存一个当前的路径,后续会更改这个路径
    this.current = createRoute(null, { path: '/' })
  }

  //跳转的核心逻辑，loaction代表跳转的目的地，complete代表跳转成功回调
  transitionTo(location, onComplete) {
    console.log(location);
    console.log('transitionTo', this.router.matcher);
    // /about/a => {path: ' /about/a'，matched: [ about aboutA]}
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
  return {
    ...location,
    matched: res
  }
}