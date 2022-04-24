# vue-router-source

## Project setup

```
yarn install

yarn serve
```

# 前端路由核心原理

## hash

- #号后面的就是 hash 的内容
- 可以通过 location.hash 拿 到
- 可以通过 onhashchange 监听 hash 的改变

## history

- history 即正常路径
- 可以通过 location.pathname 拿到
- 可以用 onpopstate 监听 history 的变化

# 文件介绍

src\router.js 中从我定义的 vue-router 文件夹导入 vue-router

> import Router from '@/vue-router'

```

- vue-router

  - components 存放link view这两个组件的实现
    - link router-link 组件实现
    - view router-view 组件实现

  - history
    - base history基类实现，存放路由使用中通用核心方法
    - hash HashHistory实现，继承于base中的H5History,存放hash路由特定方法

  - create-matcher.js：实现`match`,`addRoutes`方法的文件

  - create-router-map.js：实现用户传入的路由配置扁平化文件

  - index.js：主入口文件 包含install的实现和VueRouter类的实现


```

# Vue-Router 执行顺序

## router.js

1、导入 vue-router

2、Vue.use 执行 install 方法，

- 注册全局组件
- 在每 Vue 个实例 beforeCreate 混入内容，等待 new Vue

3、new VueRouter

- 扁平化处理用户传入的 options,提供 match 方法对扁平化路径进行查找

- 根据 mode 去 new History 对象，初始化 current(当前路由),初始化核心方法

## main.js

1、 main.js 中 new Vue

2、 vue 递归挂载了 beforeCreate 生命周期，触发 install 中混入的东西，并拿到 Vue 实例

3、 在 Vue 递归创建实例时，找到根实例，向根实例添加\_routerRoot(Vue 根实例)，\_router(实例化的路由对象)

4、 执行路由实例中的 init 方法

- init 接收 Vue 根实例作为参数

- 获取到 new VueRouter 时创建的 History 实例对象

- 执行 History 实例对象的核心方法 **transitionTo**,

```
transitionTo中执行内容：
1、执行match方法搜索路由匹配项
2、改变current为匹配的路由项
3、回调listen方法，拿到Vue 根实例，修改Vue根实例中的_route为current
4、监听路由改变，路由改变就重新调用transitionTo方法
```

- 向 listen 方法传入 Vue 根实例,给 transitionTo 作为回调

5、把\_route 设置成响应式对象，值为 current，我们之前做了监听路由改变的操作，当路由改变时重新调用 transitionTo 方法,修改 current，触发响应式操作。

## 各组件中

由于 router-view 的实现用到了 current，触发响应式操作时，会刷新组件。

### router-view 实现原理

采用函数式组件实现

- render 函数中传入组件的上下文 context,context 可以获取到当前 router-view 的父组件(即 router-view 所在的组件)

- 获取 current ,current 中的内容如下：

```
例如路径是/about/a
current={
  path:/about/a,
  matched:[/about组件记录,/about/a组建记录]
```

- 设置 depth = 0

- 接下来就是递归操作，如下

设当前路径是/about/a, 第一次肯定是渲染 app 的 routerview, app 没有父亲，所以 depth = 0,渲染 matched[0]中的组件,打个标记 data.routerView = true。

然后渲染 about 里面的 routerview，就让他往上找父亲，每向上一层,depth 就+1，直到找到被打标记的 router-view，depth 的值即为组件深度。就可以用 matched[depth]渲染当前 router-view 内容

大功告成！！！！这里我们就实现了 Vue-router 的核心逻辑

# 踩坑记录！！

## popstate 无法监听 pushState 和 replaceState 事件

我一直以为`pushState`和`replaceState`可以触发`popstate`事件，但是在监听`history`路由变化时，发现怎么都监听不到路由变化事件，经过各种百度之后才知道：

实际的情况是 `history.pushState/replaceState` 并**不会触发 onpopstate 事件**，onpopstate **只有用户点击浏览器后退和前进按钮时，或者使用 js 调用 back、forward、go 方法时才会触发**。那么我们如何监听 history.pushState/replaceState ？

答案是：**重写 + 自定义事件**

重写 history.pushState/replaceState 使其在执行后触发一个自定义事件，我们通过监听这个自定义事件来接收视图变化通知，上代码：

```js
const bindEventListener = function (type) {
  const historyEvent = history[type];
  return function () {
    const newEvent = historyEvent.apply(this, arguments);
    const e = new Event(type);
    e.arguments = arguments;
    window.dispatchEvent(e);
    return newEvent;
  };
};
history.pushState = bindEventListener('pushState');
history.replaceState = bindEventListener('replaceState');
```

这样就创建了 2 个全新的事件，事件名为 pushState 和 replaceState，我们就可以在全局监听：

```js
window.addEventListener('replaceState', function (e) {
  console.log('THEY DID IT AGAIN! replaceState 111111');
});
window.addEventListener('pushState', function (e) {
  console.log('THEY DID IT AGAIN! pushState 2222222');
});
```
