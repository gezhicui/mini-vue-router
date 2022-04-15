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

## 执行顺序

- Vue.use 执行 install 方法，在每个实例 beforeCreate 中执行路由初始化方法（init)
