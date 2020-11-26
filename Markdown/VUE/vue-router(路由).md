## vue-router(路由)

### 1.初识路由

生活中的路由器提供了两种机制: **路由和转送.**

​		**路由是决定数据包从来源到目的地的路径.**
​		**转送将输入端的数据转移到合适的输出端.**
路由中有一个非常重要的概念叫**路由表**.
**路由表本质上就是一个映射表, 决定了数据包的指向.**



后端路由阶段，前后端分离阶段，单页面富应用阶段（前端维护一套路由规则）。

**前端路由的核心是：改变URL，但是页面不进行整体的刷新。**



### 2.前端路由规则

<font color=red>**建议先看看前端的URL由哪几部分组成，每一部分代表什么意思**：</font><https://blog.csdn.net/weixin_45525272/article/details/109586021>

#### 2.1 URL的hash

URL的hash也就是锚点(#), 本质上是改变window.location的href属性.

**我们可以通过直接赋值location.hash来改变href, 但是页面不发生刷新**

![1606393536073](C:\Users\Z\AppData\Roaming\Typora\typora-user-images\1606393536073.png)

#### 2.2HTML5的history模式

**history接口是HTML5新增的, 它有五种模式改变URL而不刷新页面.**

##### history.pushState()

![1606393655107](C:\Users\Z\AppData\Roaming\Typora\typora-user-images\1606393655107.png)

##### history.replaceState()

![1606393683019](C:\Users\Z\AppData\Roaming\Typora\typora-user-images\1606393683019.png)

##### history.go()

![1606393706367](C:\Users\Z\AppData\Roaming\Typora\typora-user-images\1606393706367.png)

##### history.back()

 history.back() 等价于 history.go(-1)

##### history.forward()

history.forward() 则等价于 history.go(1)



history.back(), history.forward(), history.go()这三个接口等同于浏览器界面的前进后退。

### 3.认识vue-router

目前前端流行的三大框架, 都有自己的路由实现:
	Angular的ngRouter	React的ReactRouter	Vue的vue-router

当然, 我们的重点是vue-router
		vue-router是Vue.js官方的路由插件，它和vue.js是深度集成的，适合用于构建单页面应用。
		我们可以访问其官方网站对其进行学习: https://router.vuejs.org/zh/
**vue-router是基于路由和组件的**
		**路由用于设定访问路径, 将路径和组件映射起来.**
		**在vue-router的单页面应用中, 页面的路径的改变就是组件的切换.**

#### 3.1 安装和配置vue-router

因为我们已经学习了webpack, 后续开发中我们主要是通过工程化的方式进行开发的.
		所以在后续, 我们直接使用npm来安装路由即可.		

步骤一: 安装vue-router
npm install vue-router --save

步骤二: 在模块化工程中使用它(因为是一个插件, 所以可以通过Vue.use()来安装路由功能)
	第一步：导入路由对象，并且调用 Vue.use(VueRouter)

​	第二步：创建路由实例，并且传入路由映射配置

router/index.js

```javascript
//router/index.js文件
import Vue from 'vue' 
import VueRouter from 'vue-router' 
//1.注入插件
Vue.use(VueRouter)

//2.定义路由
const routes = []

//3.创建router实例
const router  = new VueRouter({
	routes
})

//4.导入router实例
export default router
```

第三步：在Vue实例中挂载创建的路由实例
src/main.js

```javascript
import Vue from 'vue'
import App from './App'
import router from '.router'

new Vue({
	el: '#app',
	router,
	render: h=>h(App)
})

```

#### 3.2 使用vue-router的步骤:



##### 3.2.1实例讲解

​	第一步: 创建路由组件

```
在/src/components下创建about.vue和home.vue两个组件
```

​	第二步: 配置路由映射: 组件和路径映射关系

```javascript
// router/index.js文件
...
import Home from '../components/home'
import About from '../components/about'
...
//2.定义路由
const routes = [
	{
		path: '/home',
		component: Home
	},
	{
		path: '/about',
		component: About
	}
	]
...
```

第三步: 使用路由: 通过<router-link>和<router-view>

如下例：

```javascript
//App.vue文件
<template>
    <div id="app">
    	<h1>我是网站的标题</h1>
		<router-link to="/home">首页</router-link>
		<router-link to="/home">首页</router-link>
		<router-view></router-view>
		<h2>我是App中一些底部模板信息</h2>
    </div>
</template>
...
```

**<router-link>: 该标签是一个vue-router中已经内置的组件, 它会被渲染成一个<a>标签.**
**<router-view>: 该标签会根据当前的路径, 动态渲染出不同的组件.**
网页的其他内容, 比如顶部的标题/导航, 或者底部的一些版权信息等会和<router-view>处于同一个等级.
**在路由切换时, 切换的是<router-view>挂载的组件, 其他内容不会发生改变.**

效果：

![1606395543685](C:\Users\Z\AppData\Roaming\Typora\typora-user-images\1606395543685.png)

#### 

##### 3.2.2 路由的默认路径

我们这里还有一个不太好的实现:
		默认情况下, 进入网站的首页, 我们希望<router-view>渲染首页的内容.
		但是我们的实现中, 默认没有显示首页组件, 必须让用户点击才可以.
**如何可以让路径默认跳到到首页, 并且<router-view>渲染首页组件呢?**
		非常简单, 我们只需要配置多配置一个映射就可以了.

```javascript
const routes = [
	{
		path: '/',
		redirect: '/home'
	}
]
//配置解析:
//我们在routes中又配置了一个映射. 
//path配置的是根路径: /
//redirect是重定向, 也就是我们将根路径重定向到/home的路径下, 这样就可以得到我们想要的结果了.
```

##### 3.2.3 html5的History模式

我们前面说过改变路径的方式有两种:
	URL的hash		HTML5的history	**默认情况下, 路径的改变使用的URL的hash.**
**如果希望使用HTML5的history模式, 非常简单, 进行如下配置即可:**

```javascript
//  router/index.js文件
//3.创建router实例
const router  = new VueRouter({
	routes,
    mode:'history'
})
```

![1606396536528](C:\Users\Z\AppData\Roaming\Typora\typora-user-images\1606396536528.png)

##### 3.2.4 router-link补充

在前面的<router-link>中, 我们只是使用了一个属性: to, 用于指定跳转的路径.
<router-link>还有一些其他**属性**:
		**tag:** tag可以指定<router-link>之后渲染成什么组件, 比如上面的代码会被渲染成一个<li>元素, 而不是<a>
		**replace**: replace不会留下history记录, 所以指定replace的情况下, 后退键返回不能返回到上一个页面中
		**active-class**: 当<router-link>对应的路由匹配成功时, 会自动给当前元素设置一个router-link-active的class, 设置active-class可以修改默认的名称.
				在进行高亮显示的导航菜单或者底部tabbar时, 会使用到该类.
				但是通常不会修改类的属性, 会直接使用默认的router-link-active即可. 

![1606397511295](C:\Users\Z\AppData\Roaming\Typora\typora-user-images\1606397511295.png)

##### 3.2.5修改linkActiveClass

该class具体的名称也可以通过router实例的属性进行修改 

```javascript
//router/index.js文件
...
//3.创建router实例
const router  = new VueRouter({
	routes,
    mode: 'history',
    linkActiveClass:'active'
})
...
```

exact-active-class**类似于active-class**, 只是在精准匹配下才会出现的class.后面看到嵌套路由时, 我们再看下这个属性.

#### <font color=red>3.3 路由代码跳转</font>

有时候, 页面的跳转可能需要执行对应的JavaScript代码, 这个时候, 就可以使用第二种跳转方式了

比如, 我们将代码修改如下: 

![1606397913650](C:\Users\Z\AppData\Roaming\Typora\typora-user-images\1606397913650.png)

#### <font color=red>3.4动态路由</font>

在某些情况下，一个页面的path路径可能是不确定的，比如我们进入用户界面时，希望是如下的路径：
		/user/aaaa或/user/bbbb
		除了有前面的/user之外，后面还跟上了用户的ID
		这种path和Component的匹配关系，我们称之为动态路由(也是路由传递数据的一种方式)。

```javascript
// router/index.js文件
...
import User from '../components/user'
...
//2.定义路由
const routes = [
	{
		path: '/user/:id',
		component: User
	}
	]
...
```

![1606398082190](C:\Users\Z\AppData\Roaming\Typora\typora-user-images\1606398082190.png)

```html
<div>
    <h2>{{$route.params.id}}</h2>
</div>
```

```html
<router-link to="/user/123">用户</router-link>
```

效果：

![1606398096025](C:\Users\Z\AppData\Roaming\Typora\typora-user-images\1606398096025.png)





### 4.路由懒加载

**官方给出了解释:**
		当打包构建应用时，Javascript 包会变得非常大，影响页面加载。
如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了



**官方在说什么呢?**
		**首先, 我们知道路由中通常会定义很多不同的页面.**
		**这个页面最后被打包在哪里呢? 一般情况下, 是放在一个js文件中.**
		**但是, 页面这么多放在一个js文件中, 必然会造成这个页面非常的大.**
		**如果我们一次性从服务器请求下来这个页面, 可能需要花费一定的时间, 甚至用户的电脑上还出现了短暂空白的情况.**
		如何避免这种情况呢? 使用路由懒加载就可以了.



**路由懒加载做了什么?**
		**路由懒加载的主要作用就是将路由对应的组件打包成一个个的js代码块.**
		**只有在这个路由被访问到的时候, 才加载对应的组件**



路由懒加载效果：

![1606398587755](C:\Users\Z\AppData\Roaming\Typora\typora-user-images\1606398587755.png)



懒加载的方式：

方式一: 结合Vue的异步组件和Webpack的代码分析.

```javascript
const Home = resolve=>{
    require.ensure(['../components/Home.vue'],
                  ()=>
                   {resolve(require('../components/Home.vue'))})
};//resolve和Promise相关
```



方式二: AMD写法

```javascript
const About = resolve => require(['../components/About.vue'],resolve)//resolve和Promise相关
```



方式三: 在ES6中, 我们可以有更加简单的写法来组织Vue异步组件和Webpack的代码分割.

```javascript
const Home = ()=>import('../components/Home.vue')
```



 ### 5.路由嵌套

嵌套路由是一个很常见的功能
		比如在home页面中, 我们希望通过/home/news和/home/message访问一些内容.
		一个路径映射一个组件, 访问这两个路径也会分别渲染两个组件.
路径和组件的关系如下:

![1606399138919](C:\Users\Z\AppData\Roaming\Typora\typora-user-images\1606399138919.png)

实现嵌套路由有两个步骤:
		创建对应的子组件, 并且在路由映射中配置对应的子路由.
		在组件内部使用<router-view>标签.



```
//在定义src/components文件夹下定义message组件和news两个组件
......
```









