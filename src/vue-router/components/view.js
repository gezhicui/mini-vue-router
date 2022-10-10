// 函数式组件，没有this 没有状态
export default {
  //声明函数式组件
  functional: true,
  render(h, context) {
    //当前router-view的父组件
    let { parent, data } = context;
    let route = parent.$route;
    let matched = route.matched;

    //标识当前组件是一个router-view
    data.routerView = true;
    let depth = 0;

    //设当前路径是/about/a ，则有两个组件需要渲染，一个是/about的组件，一个是/a的组件,[/about组件，/a组件]
    // 首先渲染/about，vue向上找，发现这是第一个router-view，就渲染matched[0]的组件
    // 其次渲染/a,vue向上找，发现/about中有一个router-view，depth++,就渲染matched[1]的组件
    // 以此类推
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
    let component = record.component;
    return h(component, data);
  },
};
