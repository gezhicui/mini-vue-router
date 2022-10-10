import createRouteMap from './create-router-map';
import { createRoute } from './history/base';

export default function createMatcher(routes) {
  //routes：用户的路由配置

  /*  
  扁平化路由配置
  pathList： [/ ,/about , / about/a, / about/b],
  pathMap：{/:对应组件,/about:对应组件,/about/a:对应组件 ,/about/b:对应组件}
  */
  let { pathList, pathMap } = createRouteMap(routes);

  //用来匹配路由的方法
  function match(location) {
    //找到当前的记录
    let record = pathMap[location];
    console.log('当前路由匹配的记录', location, record);
    let local = {
      path: location,
    };
    // 1.需要找到对应的记录并且要根据记录产生一个匹配数组
    if (record) {
      //找到了记录
      return createRoute(record, local);
    }
    return createRoute(null, local);
  }

  //动态添加路由的方法
  function addRoutes(routes) {
    createRouteMap(routes, pathList, pathMap);
  }

  return {
    match,
    addRoutes,
  };
}
