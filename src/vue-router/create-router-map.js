/* 
  routes:用户写的路由配置
  oldPathList:（动态追加路由时传入）:初始化处理过的路由数组，add的时候传进来新增
  oldPathMap：（动态追加路由时传入):初始化处理过的路由对象，add的时候传进来新增
*/
export default function createRouteMap(routes, oldPathList, oldPathMap) {
  //将用户传入的数据进行格式化
  let pathList = oldPathList || [];
  let pathMap = oldPathMap || Object.create(null);


  routes.forEach(route => {
    addRouteRecord(route, pathList, pathMap);
  });
  console.log(pathList, pathMap);
  return {
    pathList,
    pathMap
  }
}

function addRouteRecord(route, pathList, pathMap, parent) {
  let path = parent ? `${parent.path}/${route.path}` : route.path;

  let record = { //记录
    path,
    component: route.component,
    parent
  }
  if (!pathMap[path]) {
    pathList.push(path); // 将路径添加到pathList中
    pathMap[path] = record; //将路径添加到pathMap中
  }
  if (route.children) {
    route.children.forEach(child => {
      //每次循环儿子时，都将父亲传入
      addRouteRecord(child, pathList, pathMap, route)
    })
  }
}