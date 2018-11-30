# TShift

## 环境准备
需要安装nodejs环境，具体安装参考https://nodejs.org/en/
## 项目调试运行

在web目录下执行npm install安装第三方库文件，npm run dll打包依赖vendor(只用执行一次),npm run dev启动webpack server;
```bash
$ npm install
# npm run dll
# npm run dev
```

在浏览中访问http://localhost:9090

## 项目打包发布
```bash测试环境
$ npm run build-test
```
```bash线上环境
$ npm run build-pro
```

打包后的文件在dist目录下

## 目录结构
- `build：`    保存webpack编译文件  
- `dist：`      可发布代码文件  
- `src：`     页面源码  
  - assets：  静态资源  
    -  css： 样式
    -  data： 测试数据
    -  image: 图片
    -  js： 配置文件
  - common：   公共js文件和样式
  - compoents： 公共组件
  - plugins： 引入的插件，axios等
  - router： 路由文件
  - views： 页面目录（此目录下根据配置路由页来创建页面目录，文件js,styl,vue等放在相应页面目录下，不允许直接放在views下）
    - home：home页
    - 。。。
- `static：` 其他静态资源

## 代码规范
>1.文件名采用驼峰命名法，首字母小写；

>2.views下根据配置路由页来创建页面目录，同一页面下文件（.vue，.css，组件等）放在相应页面目录下，不允许直接放在views下；

>3.vue中样式提出来，形成css/styl文件；
```json
<style lang="stylus" scoped>
    @import '../../common/styl/variables.styl'
    @import './index.styl'


</style>

<template>
    ...
</template>
```

>4.webpack打包时，src下的文件打包未一个app.js，第三方库文件（node_modules目录下）打包为一个vender.js文件；



## 本地静态测试数据引入

项目引入mockjs来制作静态数据，接口调入方式与实际一致，如下：  
Mocking a `GET` request

```js
var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');

// This sets the mock adapter on the default instance
var mock = new MockAdapter(axios);

// Mock any GET request to /users
// arguments for reply are (status, data, headers)
mock.onGet('/users').reply(200, {
  users: [
    { id: 1, name: 'John Smith' }
  ]
});

this.$http.get('/users')
  .then(function(response) {
    console.log(response.data);
  });
```

引入方式：
>1.在app.js中引入/assets/data/index.js

```js
`app.js`

//添加测试数据 mockdata
import './assets/data';

```

>2.在/assets/data目录下编写测试数据
```js
`data/index.js`

var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');

// This sets the mock adapter on the default instance
var mock = new MockAdapter(axios);

import mirrors from './myMirrors';

import dockerHub from './dockerHub';


// Mock any GET request to /users
// arguments for reply are (status, data, headers)
mock.onGet('/api/projects?name=default').reply(200, mirrors);

mock.onGet('/api/projects?name=library').reply(200,dockerHub);
```