# vue-router-source

## Project setup

```
yarn install

yarn serve
```

## 文件介绍

src\router.js 中从我定义的 vue-router 文件夹导入 vue-router

> import Router from '@/vue-router'

src\vue-router\index.js：主入口文件

src\vue-router\install.js：插件 install 方法实现的文件

src\vue-router\create-router-map.js：实现`match`,`addRoutes`方法的文件

src\vue-router\create-matcher.js：实现用户传入的路由配置扁平化文件

## 执行顺序

- Vue.use 执行 install 方法，在每个实例 beforeCreate 中执行路由初始化方法（init)
