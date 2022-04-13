import createRouteMap from './create-router-map'

export default function createMatcher(routes) {
  //routes：用户的路由配置

  /*  
  扁平化路由配置
  pathList： [/ ,/about , / about/a, / about/b],
  pathMap：{/:对应组件,/about:对应组件,/about/a:对应组件 ,/about/b:对应组件}
  */
  let { pathList, pathMap } = createRouteMap(routes)

  //用来匹配路由的方法
  function match(routes) {

  }

  //动态添加路由的方法
  function addRoutes(params) {
    createRouteMap(routes, pathList, pathMap)
  }

  return {
    match,
    addRoutes
  }
}