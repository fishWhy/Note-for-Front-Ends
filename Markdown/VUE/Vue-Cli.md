Vue-Cli

如果你在开发大型项目, 那么你需要, 并且必然需要使用Vue CLI
**使用Vue.js开发大型应用时，我们需要考虑代码目录结构、项目结构和部署、热加载、代码单元测试等事情。**
**如果每个项目都要手动完成这些工作，那无疑效率比较低效，所以通常我们会使用一些脚手架工具来帮助完成这些事情。**
**CLI是什么意思?**
CLI是Command-Line Interface, 翻译为命令行界面, 但是俗称脚手架.
Vue CLI是一个官方发布 vue.js 项目脚手架
**使用 vue-cli 可以快速搭建Vue开发环境以及对应的webpack配置.**

在使用脚手架前先配置一下Node和Webpack





### 1.Vue Cli2创建工程详解

#### 创建工程

![1606304040080](C:\Users\Z\AppData\Roaming\Typora\typora-user-images\1606304040080.png)

#### 目录结构

![1606304174519](C:\Users\Z\AppData\Roaming\Typora\typora-user-images\1606304174519.png)





### 2.Runtime-Compiler和Runtime-only的区别

主要参考：<https://www.cnblogs.com/lyt0207/p/11967141.html>

#### 一、选择Runtime-Compiler和Runtime-only不同模式的时候main.js文件的区别

```vue
//runtime-compiler
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

/* eslint-disable no-new*/
new Vue({
	el: '#app',
	components:{App},
	template:'<App/>'
})
```

```vue
//runtime-only
import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false
new Vue({
	render: h=>h(App),
}).$mount('#app')
```

#### 二.vue程序运行过程

(这里不就和虚拟Dom接上了，VUE生命周期树中的渲染好像就是这部分)

![img](https://img2018.cnblogs.com/i-beta/1843694/201912/1843694-20191201190855456-2093061310.png)

 

 

##### 1.解析：

第一步，当把vue模板**template**传给Vue实例的时候，vue内部会保存在**options**里面，第二部，进行解析，解析成**ast**（抽象语法树），第三步会进行编译，编译成**render**函数，第四步render函数会生成**虚拟dom树**，第五步，把虚拟dom树渲染成**真实dom ui**

 

所以：runtime-compiler的执行步骤是**template -> ast -> render -> vdom -> ui**,runtime-only的执行步骤是 **render -> vdom -> ui**,显然runtime-only的性能更高，代码量更少

#### 三、render函数详解

##### 1.render函数的作用

vue在使用模板创建页面的时候，需要先通过一个渲染函数来创建虚拟dom树，这个函数就是render函数。render函数内部有一个回调函数**createElement()**,这个函数的作用就是生成一个 VNode节点（虚拟dom），render 函数得到createElement() 创建的 VNode 节点之后，返回给 Vue.js 的 mount 函数，渲染成真实 DOM 节点，并挂载到根节点上。

##### 2.render函数的用法

 ```javascript
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

/* eslint-disable no-new */
const cpn = {
  template: '<div>{{message}}</div>',
  data () {
    return {
      message: '我是组件的message'
    }
  }
}
new Vue({
  el: '#app',
  // components: { App },
  // template: '<App/>'
  render: function (creatElement) { //回调函数creatElement
    //1.普通用法：creatElement('标签名',{标签属性}, ['标签里面显示的内容'])
    return creatElement ('h2',
    {class: 'box'}, 
    ['hello vue'])
    //2.传入组件
    return creatElement (cpn)
    //这种写法的好处：
    //如果把cpn传给template的话它还要编译成ast，这种写法的话直接让render函数生成虚拟dom，效率更高
  }
})
 ```

##### 3.思考：.vue文件里面的template是由谁处理的？

是由**vue-tempalte-compiler**解析



### 3. Vue-Cli2启动流程

在开发过程运行npm run dev可启动vue项目。在项目开发完成后运行npm run build，进行打包，打包后就可以发布。

对webpack不熟悉的可以看看我之前记录的webpack的笔记，是在 “VUE/webpack” 中的那版。

#### 3.1 npm run dev

![1606311650663](C:\Users\Z\AppData\Roaming\Typora\typora-user-images\1606311650663.png)

下面来自参考：<https://www.cnblogs.com/issupperme/p/11555320.html>

##### 1. package.json

在执行npm run dev的时候，会在当前目录中寻找 package.json 文件, 有点类似 Maven 的 pom.xml 文件，包含项目的名称版本、项目依赖等相关信息。

```
{　# 版本信息
  "name": "kitty-ui",
  "version": "1.0.0",
  "description": "kitty ui project",
  "author": "Louis",
  "private": true,
  "scripts": {
    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
    "start": "npm run dev",
    "build": "node build/build.js"
  },
  "dependencies": { # 项目依赖
    "vue": "^2.5.2",
    "vue-router": "^3.0.1"
  },
  "devDependencies": {  # 项目依赖
    "autoprefixer": "^7.1.2",
    "babel-core": "^6.22.1","vue-template-compiler": "^2.5.2",
    "webpack": "^3.6.0",
    "webpack-bundle-analyzer": "^2.9.0",
    "webpack-dev-server": "^2.9.1",
    "webpack-merge": "^4.1.0"
  },
  "engines": {　　# node、npm版本要求
    "node": ">= 6.0.0",
    "npm": ">= 3.0.0"
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ]
}
```



##### 2. webpack.dev.conf.js

从下图中可以看到， 启动 npm run dev 命令后，会加载 build/webpack.dev.conf.js 配置并启动 webpack-dev-server 。

![img](https://images2018.cnblogs.com/blog/616891/201808/616891-20180817144307679-525629868.png)

##### 3.  config/*.js

 webpack.dev.conf.js 中引入了很多模块的内容，其中就包括 config 目录下服务器环境的配置文件。

![img](https://images2018.cnblogs.com/blog/616891/201808/616891-20180817144812448-1629632495.png)

##### 4.  config/index.js

可以看到，在 index.js 文件中包含服务器 host 和 port 以及入口文件的相关配置，默认启动端口是8080，这里可以进行修改。

 ![img](https://images2018.cnblogs.com/blog/616891/201808/616891-20180817145202440-43744659.png)

##### 5.  index.html

index.html 的内容很简单，主要是提供一个 div 给 vue 挂载。

![img](https://images2018.cnblogs.com/blog/616891/201808/616891-20180817145901723-13870345.png)

##### 6.  main.js

main.js 中， 引入了 vue、App 和 router 模块， 创建了一个 Vue 对象，并把 App.vue 模板的内容挂载到 index.html 的 id 为 app 的 div 标签下， 并绑定了一个路由配置。

![img](https://images2018.cnblogs.com/blog/616891/201808/616891-20180817150042270-2122432032.png)

##### 7.  App.vue

上面 main.js 把 App.vue 模板的内容，放置在了 index.html 的 div 标签下面。查看 App.vue 的内容我们看到，这个页面的内容由一个 logo 和一个待放置内容的 router-view，router-view 的内容将由 router 配置决定。

 ![img](https://images2018.cnblogs.com/blog/616891/201808/616891-20180817150854394-1589320118.png)

##### 8.  index.js

查看 route 目录下的 index.js，我们发现这里配置了一个路由， 在访问路径 / 的时候， 会把 HelloWorld 模板的内容放置到上面的 router-view中。 

![img](https://images2018.cnblogs.com/blog/616891/201808/616891-20180817150719908-691961374.png)

##### 9.  HelloWorld.vue

HelloWorld 中主要是一些 Vue 介绍显示内容。

 ![img](https://images2018.cnblogs.com/blog/616891/201808/616891-20180817151606262-1530914525.png)

##### 10. 页面组成

所以，页面关系组成是 index.html 包含 App.vue，App.vue 包含 HelloWorld.vue 。

 ![img](https://images2018.cnblogs.com/blog/616891/201808/616891-20180817152758723-1616261363.png)

#### 3.2 npm run build

![1606311700852](C:\Users\Z\AppData\Roaming\Typora\typora-user-images\1606311700852.png)

#### 3.3 路径起别名(修改webpack.base.conf.js)

可参考：<https://blog.csdn.net/daodaoke/article/details/107636361>

下面从webpack的角度来讲解怎么在webpack.conf.js中进行配置，在Vue-cli项目的webpack.base.conf.js中的操作类似。

##### 1、resolve.alias

resolve.alias 配置项通过别名来把原导入路径映射成一个新的导入路径。例如使用以下配置：

```javascript
resolve: {
    alias: {
      $css: resolve(__dirname, 'src/css')
    }
 }
12345
```

这样在js文件里面引用的时候可以简写文件路径

```javascript
import '$css/index.css'
1
```

##### 2、extensions

配置省略文件路径的后缀名

```javascript
 resolve: {
    // 配置省略文件路径的后缀名
    extensions: ['.js', '.json', '.jsx', '.css']
  }
1234
```

这样在js文件里面引用的时候可以省略后缀名， 个人不推荐使用，比如同一个目录有不同类型的同名文件，只会匹配第一个

```javascript
import '$css/index'
1
```

##### 3、modules

resolve.modules 配置 Webpack 去哪些目录下寻找第三方模块，默认是只会去 node_modules 目录下寻找。 可指定目录，提升速度，默认就是 modules: [“node_modules”]，一般可不写

##### 完整代码示例

webpack.base.conf.js或webpack.conf.js

```javascript
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/[name].js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin()],
  mode: 'development',
  // 解析模块的规则
  resolve: {
    // 配置解析模块路径别名: 优点简写路径 缺点路径没有提示
    alias: {
      $css: resolve(__dirname, 'src/css')
    },
    // 配置省略文件路径的后缀名
    extensions: ['.js', '.json', '.jsx', '.css'],
    // 告诉 webpack 解析模块是去找哪个目录
    modules: [resolve(__dirname, '../../node_modules'), 'node_modules']
  }
};
```



### 4.Vue Cli3

vue-cli 3 与 2 版本有很大区别

​		 vue-cli 3 是基于 webpack 4 打造，vue-cli 2 还是 webapck 3

​		**vue-cli 3 的设计原则是“0配置”，移除的配置文件根目录下的，build和config等目录**

​		 vue-cli 3 提供了 vue ui 命令，提供了可视化配置，更加人性化

​		 移除了static文件夹，新增了public文件夹，并且index.html移动到public中

#### 创建项目流程

![1606392091586](C:\Users\Z\AppData\Roaming\Typora\typora-user-images\1606392091586.png)

#### 项目目录结构

![1606392113695](C:\Users\Z\AppData\Roaming\Typora\typora-user-images\1606392113695.png)

#### <font color=red>原先一大堆的webpack配置的位置</font>

node_module文件夹下：

![1606392197315](C:\Users\Z\AppData\Roaming\Typora\typora-user-images\1606392197315.png)

#### 自定义配置：起别名

![1606392283449](C:\Users\Z\AppData\Roaming\Typora\typora-user-images\1606392283449.png)



### 5. Vue Cli4

<https://www.cnblogs.com/Super-scarlett/p/12495902.html>

