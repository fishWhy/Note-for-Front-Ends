## webpack

<font color=red>**浏览器同时请求资源的个数是受到限制的，低级浏览器比如IE6能同时加载两个，高级浏览器Chrome能加载6到7个。打开一个网站页面的  检查元素->Network可以看到很多资源的加载时间都放在了等待上了，而webpack将很多个文件打包成一个避免了很多资源的等待，可以起到性能优化的作用。**</font>



webpack是由facebook公司推出并维护的一套工程化工具，最先为react使用，后来应用在其他框架中。<br>

&emsp;&emsp;<font color=red>核心理念：一切文件都是资源，是资源都可以模块化打包加载。</font><br>

&emsp;&emsp;js文件是资源，css文件是资源，模板文件是资源，图片文件是资源等等，所以这些资源我们都可以模块化打包加载，并且webpack推荐使用commonjs规范(目前也推荐ESModule推荐)，所以我们可以像开发node一样来开发webpack项目。<br>

&emsp;&emsp;特点：模块化开发，打包加载。<br>

github:http://github.com/webpack/webpack<br>

官网：http://webpackjs.org/

&emsp;&emsp;这里基于webpack4版本讲解。<br>



#### 安装

需要进行两次安装：<br>

&emsp;&emsp;第一次全局安装（全局安装时为了提供指令）<br>

```npm
npm install webpack -g
npm install webpack-cli -g
npm install webpack-dev-server -g
```

&emsp;&emsp;第二次本地安装（本地安装是为了在项目开发中使用）<br>

```npm
npm install webpack
```

安装完成，输入webpack -v查看版本号<br>

webpack配置文件是**webpack.config.js**，要像定义接口对象一样定义配置。<br>



重要概念：<br>

&emsp;&emsp;入口：所有文件开始打包的地方(引入)			出口：所有文件打包之后的地方(发布)<br>

&emsp;&emsp;加载机：由于webpack只能识别js文件，除了这个类型之外的文件都不能识别，必须要借助加载机。<br>

&emsp;&emsp;插件：webpack本身不具备的功能，我们可以为webpack拓展。<br>



### webpack.config.js

#### 入口文件

我们通过entry配置项定义入口文件（webpack最先引入最先处理的文件）。<br>

```javascript
属性值
	若为一个字符串，表示一个文件地址
	若为一个对象，配置多个入口文件
		key表示文件名称（发布的文件的名称）		value表示文件真实地址
```



#### 发布文件

webpack自身没有实现资源定位，所以我们要配置发布的文件（html中引入的文件），通过output配置。<br>

```javascript
属性值是对象
	filename定义发布后的文件名称
    	如果有一个入口文件，filename直接写发布的文件
        如果有多个入口文件，用[name]表示文件的名称
    path定义文件发布的地址
    	未定义path,默认向dist目录向下发布
		定义了path，将向path目录下发布
运行webpack即可发布，4.0默认发布到dist目录下
```

webpack.config.js文件：

```javascript
//引入path
let path = require('path')
//commonjs规范（因为webpack是在node下运行的）
module.exports = {
    //处理模式
    //development表示开发模式，代码不会压缩
    //producetion表示发布模式，代码会压缩（默认）
    mode:'development',
    //入口
    entry: './main',
    //发布
    output: {
        //文件名称
        filename: './demo.js',
        //发布位置，绝对路径，process.cwd(), __dirname
        //process.cwd()表示指令执行的位置,__dirname表示文件所在位置
        //path默认是 ./dist
        //path: path.join(__dirname,'../output')
        //path: path.join(process.cwd(),'../output')
    }
}
```

main.js文件

```javascript
require('./modules/a.js')
require('./modules/b.js')
require('./modules/c.js')
```

index.html文件引入经过webpack处理过的文件：

```html
<!-- 直接引入发布后的文件 -->
<script src="./dist/demo.js"></script>
<script>
   //  console.log(color)
</script>
```



```javascript
在webpack.config.js文件所在目录中，在命令台中输入webpack后，会自动将webpack.config.js中entry指定的文件打包到webpack.config.js中output指定的位置
```

<font color=red>也可以使用其他配置文件而非webpack.config.js文件（这两个文件的作用是一样的，内容是一样的，只不过换了个文件名），在命令台中输入：webpack --config 配置文件名</font>



<font color=red>**前端模块化开发，一定要使用相对路径，引入模块**</font>



#### 多个入口文件：

```javascript
module.exports = {
    //处理模式
    //development表示开发模式，代码不会压缩
    //producetion表示发布模式，代码会压缩（默认）
    mode:'development',
    //入口
    entry: {
        //多个入口文件
        header: './modules/header/header.js',
        footer: './modules/footer/footer.js'
    },
    //发布
    output: {
        //文件名称
        filename: './[name].js',
    }
}
//最后会生成	 /dist/header.js与/dist/footer.js文件
```

例如，这样可以在footer.html中引入./dist/footer.js，在header.html中引入./dist/header.js。



### 服务器

（代码没跑通，估计是webpack与webpack-dev-server版本不匹配问题）

webpack没有内置服务器，我们需要安装webpack-dev-server模块<br>

和webpack一样，提供了webpack-dev-server指令，所以要安装两次：全局安装，本地安装。<br>

&emsp;&emsp;安装完成，通过webpack-dev-server -v查看版本号<br>

&emsp;&emsp;进入项目，输入webpack-dev-server即可启动服务器<br>

&emsp;&emsp;<font color=red>当我们保存代码的时候，浏览器会自动刷新</font><br>

&emsp;&emsp;启动服务器时，发布的文件地址写绝对路径<br>

&emsp;&emsp;默认启动8080端口号，如果8080端口号被占用，webpack-dev-server端口号会自动加1<br>





### css加载机

<font color=red>**使用加载机要本地安装(即使用npm进行安装)**</font>

webpack中一切资源都要模块化加载，css文件也是资源，所以也要模块化加载。<br>

webpack仅仅内置了对js资源的模块化加载，并没有实现对css资源的模块化加载，所以我们要安装css资源加载机（器）<br>

&emsp;&emsp;在webpack与模块相关的配置，定义在module配置中,<br>

&emsp;&emsp;加载机是加载模块的，所以定义在module配置中，通过rules属性配置加载机<br>

```javascript
属性值是数组，每一个成员代表一个加载机对象
	test表示资源特征（是正则）	loader引入加载机的
    	css资源需要两个加载机：style-loader,	css-loader
		当引入多个加载机的时候，使用加载机要本地安装,想传入配置可以使用use属性引用。
```

style.css文件：

```css
html body{
    background-color: red;
    height: 50%;
    width: 100%;
}
```

main.js

```javascript
//commonjs规范和服务器端开发一样
require('./modules/a.js')
require('./modules/b.js')
require('./modules/c.js')

//注意：前端模块化开发，一定要使用相对路径，引入模块
//引入css
require('./modules/style.css')
```

index.html文件

```javascript
<script src="./dist/demo.js"></script>
```



```javascript
首先使用 npm install css-loader与npm install style-loader进行安装
```

webpack.config.js配置文件

```javascript
//commonjs规范（因为webpack是在node下运行的）
module.exports = {
    //处理模式
    //development表示开发模式，代码不会压缩
    //producetion表示发布模式，代码会压缩（默认）
    mode:'development',
    //入口
    entry: './main.js',
    //发布
    output: {
        //文件名称
        filename: './demo.js'
    },
    //模块
    module:{
        //加载机
        rules: [
             //每一个成员代表一个加载机 !
            //css加载机
            {
                test : /\.css$/,
                //多个加载机
                use: ['style-loader','css-loader']
                //使用use引入加载机，可以传递更多的参数
                // use: [
                //     {
                //         loader: 'style-loader'
                //     },
                //     {
                //         loader: 'css-loader'
                //     }
                // ]
            }
        ]
    }
}
```



### 图片加载机

在webpack看来图片文件也是资源，也可以模块化加载，我们要安装图片加载机，实现图片模块化加载url-loader(依赖file-loader)。图片加载有两种方式：<br>

&emsp;&emsp;同步加载：将图片写入js文件中，通过html5提供的图片的base64编码技术实现的<br>

&emsp;&emsp;异步加载：存储图片的地址，在使用图片时候，在异步加载图片。<br>

图片到底采用哪种方式，我们可以通过传递limit参数定义，值表示图片大小，单位是字节(b)<br>

&emsp;&emsp;加载机通过query形式传递参数。例如： url-loader?limit=4096<br>

&emsp;&emsp;&emsp;&emsp;<font color=red>当图片大小小于等于4kb的时候，同步加载。当图片大小大于4kb的时候，异步加载（会打包图片）。目的是为了提高网站的性能。</font><br>

webpack.config.js配置文件

```javascript
module.exports = {
    //处理模式
    //development表示开发模式，代码不会压缩
    //producetion表示发布模式，代码会压缩（默认）
    mode:'development',
    //入口
    entry: './main.js',
    //发布
    output: {
        //文件名称
        filename: './demo.js',
        //静态资源相对位置
        publicPath: './dist/'
    },
    //模块
    module:{
        //加载机
        rules: [
             //每一个成员代表一个加载机 !
            //css加载机
            {
                test : /\.css$/,
                //多个加载机
                use: ['style-loader','css-loader'],
            },
            //图片加载机
            {
                test: /\.(jpg|png|jpeg)$/,             
                use: [{                 
                    loader: 'url-loader',
                    options: {
                         //limit限制图片大小,4096代表4kb
                        limit: 4096
                    }
                }]
            }

        ]
    }
}
```

main.js文件如下，其他文件和css加载机中的一样

```javascript
/commonjs规范和服务器端开发一样
require('./modules/a.js')
require('./modules/b.js')
require('./modules/c.js')

//注意：前端模块化开发，一定要使用相对路径，引入模块
//引入css
require('./modules/style.css')

//引入图片资源
let src1 = require('./1.jpeg')
let src2 = require('./2.png')
//创建两个img标签，加载图片，并渲染到页面中
let img1 = new Image();
let img2 = new Image();

//加载图片
img1.src = src1.default;
img2.src = src2.default;

console.log(src1)
// console.log(src2)
document.body.appendChild(img1)
document.body.appendChild(img2)
```



### ES Module规范

ES Module是在ES6中提出的，但是被纳入了ES2016（ES7）中。<br>

引入模块：通过import引入（css资源可以直接通过import引入，import 'css地址'）<br>

&emsp;&emsp;import * as M from "			引入所有的接口，并存储在M命名空间下<br>

&emsp;&emsp;import {} from "					引入某些接口，可以直接使用接口<br>

&emsp;&emsp;import M from "				   引入默认接口<br>

暴露接口：通过export 或者 export default暴露：<br>

&emsp;&emsp;export				暴露接口，可以被前两种引入接口的方式引入<br>

&emsp;&emsp;export default	暴露默认接口，可以被第三种引入接口的方式引入<br>

编译ES6 | ES7也需要加载机：babel-loader编译器@babel/presets-es2015, @babel/presets-env<br>



案例如下：

demo.js文件：

```javascript
//定义数据和方法
export let color = 'red'
export let arr = [1,2,3]
export function add(a, b){
    return a+b;
}
//默认接口
export default {
    msg: 'hello',
    num: 100
}
```

style.css文件：

```javascript
body, html{
    height: 100%;
    background-color: yellow;
}
```

main.js文件引入demo.js中的数据与方法，以及引入style.css中的样式

```javascript
//引入所有接口
import * as Demo from './demo'
console.log(Demo);
或
//引入某些接口
import {color, add} from './demo'
console.log(color, add)// 
或
//引入默认接口
import Demo from './demo'
console.log(Demo)	//输出：{ msg: 'hello',num: 100}
或
//引入样式
//import * as Demo from './style.css'; 
//console.log(Demo);//空对象
//由于引入的目的是为了引入样式不作为模块使用，因此可以简写成 import './style.css'让./style.css中定义样式起作用
import './style.css'
```



使用Webpack编译ES6时，webpack.config.js写成如下的型式：

<font color=red>（webpack4.0之前，必须写上进行编译的配置，要不然ES6语法不起作用）</font>

```javascript
let path = require('path')
//commonjs规范（因为webpack是在node下运行的）
module.exports = {
    //处理模式
    //development表示开发模式，代码不会压缩
    //producetion表示发布模式，代码会压缩（默认）
    mode:'development',
    //入口
    entry: './main.js',
    //发布
    output: {
        //文件名称
        filename: './demo.js'
    },
    //模块
    module:{
        //加载机
        rules: [
             //每一个成员代表一个加载机 !
            //css加载机
            {
                test : /\.css$/,
                //多个加载机
                use: ['style-loader','css-loader']
            },
            //编译es6
            //webpack4.0之前，必须写上下面这段话进行编译，要不然ES6语法不起作用
            {
                //test: /\.es$/
                test: /\.js$/,
                loader: 'babel-loader',
                // 编译时包括node_modules文件夹下的文件，不包括 node_modules文件夹下的文件
                include: path.join(process.cwd(),'./modules/'),
                exclude: /node_modules/,
                options: {
                    //presets: [@babel/presets-es2016]
                    presets: [@babel/presets-env]
                }
            }
        ]
    }
}
```



