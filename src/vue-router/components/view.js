// 函数式组件，没有this 没有状态
export default {
  //声明函数式组件
  functional: true,
  render(h, context) {
    //当前router-view的父组件
    let { parent, data } = context
    let route = parent.$route
    let matched = route.matched

    //标识当前组件是一个router-view
    data.routerView = true
    let depth = 0

    //设当前路径是/about/a
    //第一次肯定是渲染app的routerview,但是about里面还有个routerview，就让他往上找福清，
    //找到app，发现是个routerview，就depth++取marched中接下来的组件
    while (parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      parent = parent.$parent;
    }


    let record = matched[depth];
    if (!record) {
      //不存在匹配记录 不渲染
      return h();
    }
    let component = record.component
    return h(component, data);
  }
}