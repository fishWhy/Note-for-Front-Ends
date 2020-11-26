## Webpack

可参考：

官网：<https://webpack.docschina.org/concepts/>

和<https://blog.csdn.net/daodaoke?t=1>

###  1.什么是webpack？

这个webpack还真不是一两句话可以说清楚的。
我们先看看官方的解释：
At its core, webpack is a static module bundler for modern JavaScript applications. 
**从本质上来讲，webpack是一个现代的JavaScript应用的静态模块打包工具。**
但是它是什么呢？用概念解释概念，还是不清晰。
我们从两个点来解释上面这句话：**模块 和 打包**

#### 1.1 前端模块化

目前使用前端模块化的一些方案：AMD、CMD、CommonJS、ES6。
在ES6之前，我们要想进行模块化开发，就必须借助于其他的工具，让我们可以进行模块化开发。
并且在通过模块化开发完成了项目后，还需要处理模块间的各种依赖，并且将其进行整合打包。
而**<font color=red>webpack其中一个核心就是让我们可能进行模块化开发，并且会帮助我们处理模块间的依赖关系。而且不仅仅是JavaScript文件，我们的CSS、图片、json文件等等在webpack中都可以被当做模块来使用</font>**（在后续我们会看到）。
这就是webpack中模块化的概念。

#### 1.2 打包如何理解呢？

理解了webpack可以帮助我们进行模块化，并且处理模块间的各种复杂关系后，打包的概念就非常好理解了。

就是**将webpack中的各种资源模块进行打包合并成一个或多个包(Bundle)**。

并且**在打包的过程中，还可以对资源进行处理**，比如压缩图片，将scss转成css，将ES6语法转成ES5语法，将TypeScript转成JavaScript等等操作。

但是打包的操作似乎grunt/gulp也可以帮助我们完成，它们有什么不同呢？

#### 1.3 和grunt/gulp的对比

**grunt/gulp的核心是Task**
我们可以配置一系列的task，并且定义task要处理的事务（例如ES6、ts转化，图片压缩，scss转成css）
之后让grunt/gulp来依次执行这些task，而且让整个流程自动化。
所以grunt/gulp也被称为前端自动化任务管理工具。
**我们来看一个gulp的task**
下面的task就是将src下面的所有js文件转成ES5的语法。
并且最终输出到dist文件夹中。

![1606375963119](C:\Users\Z\AppData\Roaming\Typora\typora-user-images\1606375963119.png)

**什么时候用grunt/gulp呢？**
如果你的工程模块依赖非常简单，甚至是没有用到模块化的概念。
只需要进行简单的合并、压缩，就使用grunt/gulp即可。
但是如果整个项目使用了模块化管理，而且相互依赖非常强，我们就可以使用更加强大的webpack了。
**所以，grunt/gulp和webpack有什么不同呢？**
**<font color=red>grunt/gulp更加强调的是前端流程的自动化，模块化不是它的核心。
webpack更加强调模块化开发管理，而文件压缩合并、预处理等功能，是他附带的功能。</font>**

#### 1.4 webpack安装

安装webpack首先需要安装Node.js，Node.js自带了软件包管理工具npm
查看自己的node版本：

```
node -v
```



**<font color=red>全局安装webpack(这里我先指定版本号3.6.0，因为vue cli2依赖该版本)</font>**

```
npm install webpack@3.6.0-g
```

局部安装webpack（后续才需要）
--save-dev`是开发时依赖，项目打包后不需要继续使用的。

```
cd 对应目录
npm install webpack@3.6.0 --save-dev
```



**<font color=red>为什么全局安装后，还需要局部安装呢？
在终端直接执行webpack命令，使用的全局安装的webpack
当在package.json中定义了scripts时，其中包含了webpack命令，那么使用的是局部webpack</font>**



### 2. 初次使用webpack

#### 2.1模块化打包

我们创建如下文件和文件夹：

![1606376673231](C:\Users\Z\AppData\Roaming\Typora\typora-user-images\1606376673231.png)

**文件和文件夹解析：**
1.dist文件夹：用于存放之后打包的文件
2.src文件夹：用于存放我们写的源文件
3.main.js：项目的入口文件。具体内容查看下面详情。
4.mathUtils.js：定义了一些数学工具函数，可以在其他地方引用，并且使用。具体内容查看下面的详情。
5.index.html：浏览器打开展示的首页html
6.package.json：通过npm init生成的，npm包管理的文件（暂时没有用上，后面才会用上）

mathUtils.js文件中的代码：

```javascript
function add(num1,num2){return num1+num2}
function mul(num1,num2){return num1*num2}
module.exports = {add,mul}
```

main.js文件中的代码：

```javascript
const math = require('./mathUtils.js')
console.log('hello webpack')
console.log(math.add(1,2))
console.log(math.mul(2,5))
```

现在的js文件中使用了模块化的方式进行开发，他们可以直接使用吗？不可以。
**因为如果直接在index.html引入这两个js文件，浏览器并不识别其中的模块化代码。**
**另外，在真实项目中当有许多这样的js文件时，我们一个个引用非常麻烦，并且后期非常不方便对它们进行管理。**



我们应该怎么做呢？使用webpack工具，对多个js文件进行打包。
**我们知道，webpack就是一个模块化的打包工具，所以它支持我们代码中写模块化，可以对模块化的代码进行处理。**
**另外，如果在处理完所有模块之间的关系后，<font color=red>将多个js打包到一个js文件中，引入时就变得非常方便了</font>**。



使用webpack指令打包

```
webpack src/main.js dist/bundle.js
```

打包后会在dist文件下，生成一个bundle.js文件
文件内容有些复杂，这里暂时先不看，后续再进行分析。
**bundle.js文件，是webpack处理了项目直接文件依赖后生成的一个js文件，我们只需要将这个js文件在index.html中引入即可**

#### 2.2webpack配置（webpack.config.js）

如果每次使用webpack的命令都需要写上入口和出口作为参数，就非常麻烦，有没有一种方法可以将这两个参数写到配置中，在运行时，直接读取呢？
当然可以，就是创建一个webpack.config.js文件

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
    //出口
    output: {
        //文件名称
        filename: './demo.js',
        path: path.resolve(__dirname,'dist')
        //发布位置，绝对路径，process.cwd(), __dirname
        //process.cwd()表示指令执行的位置,__dirname表示文件所在位置
        //path默认是 ./dist
        //path: path.join(__dirname,'../output')
        //path: path.join(process.cwd(),'../output')
    }
}
```

多个入口文件时

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

#### 2.3.局部安装webpack

目前，我们使用的webpack是全局的webpack，如果我们想使用局部来打包呢？
**<font color=red>因为一个项目往往依赖特定的webpack版本，全局的版本可能很这个项目的webpack版本不一致，导出打包出现问题。所以通常一个项目，都有自己局部的webpack。</font>**
第一步，项目中需要安装自己局部的webpack这里我们让局部安装webpack3.6.0
Vue CLI3中已经升级到webpack4，但是它将配置文件隐藏了起来，所以查看起来不是很方便。

```
npm install webpack@3.6.0 --save-dev
```

第二步，通过node_modules/.bin/webpack启动webpack打包

```
node_modules/.bin/webpack
```

#### 2.4 package.json中定义webpack启动

但是，每次执行都敲这么一长串有没有觉得不方便呢？
OK，我们可以在package.json的scripts中定义自己的执行脚本。

```json
{
	"name": "meetwebpack",
	"version": "1.0.0",
	"description": "",
	"main": "index.js",
	"scripts":{
		"build": "webpack"
	},
	....
}
```



**package.json中的scripts的脚本在执行时，会按照一定的顺序寻找命令对应的位置。**
**首先，会寻找本地的node_modules/.bin路径中对应的命令。**
**如果没有找到，会去全局的环境变量中寻找。**
如何执行我们的build指令呢？

```
npm run build
```



### 3.什么是loader

详情见官网：<https://www.webpackjs.com/concepts/#loader>

loader是webpack中一个非常核心的概念。
webpack用来做什么呢？
**在我们之前的实例中，我们主要是用webpack来处理我们写的js代码，并且webpack会自动处理js之间相关的依赖。但是，在开发中我们不仅仅有基本的js代码处理，我们也需要加载css、图片，也包括一些高级的将ES6转成ES5代码，将TypeScript转成ES5代码，将scss、less转成css，将.jsx、.vue文件转成js文件等等。**
**对于webpack本身的能力来说，对于这些转化是不支持的。**
**那怎么办呢？给webpack扩展对应的loader就可以啦。**
loader使用过程：
步骤一：通过npm安装需要使用的loader
步骤二：在webpack.config.js中的modules关键字下进行配置
**大部分loader我们都可以在webpack的官网中找到，并且学习对应的用法。**



#### 3.1 css-loader

项目开发过程中，我们必然需要添加很多的样式，而样式我们往往写到一个单独的文件中。

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

**<font color=red>css-loader只负责加载css文件，但是并不负责将css具体样式嵌入到文档中。这个时候，我们还需要一个style-loader帮助我们处理。</font>**

注意：**style-loader需要放在css-loader的前面。**
疑惑：不对吧？按照我们的逻辑，在处理css文件过程中，应该是css-loader先加载css文件，再由style-loader来进行进一步的处理，为什么会将style-loader放在前面呢？
答案：这次因为webpack在读取使用的loader的过程中，是按照从右向左的顺序读取的。

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
            }
        ]
    }
}
```

#### 3.2 less文件处理

**如果我们希望在项目中使用less、scss、stylus来写样式，webpack是否可以帮助我们处理呢？**
我们这里以less为例，其他也是一样的。
我们还是先创建一个less文件，依然放在css文件夹中

a.less

```less
@fontSize: 50px;
body{
    font-size: @fontSize;
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
require('./modules/a.less')
```

继续在官方中查找，我们会找到less-loader相关的使用说明
首先，还是需要安装对应的loader
注意：我们这里还安装了less，因为webpack会使用less对less文件进行编译

```
npm install --save-dev less-loader less
```

其次，修改对应的配置文件
添加一个rules选项，用于处理.less文件

webpack.config.js配置文件

```javascript
//commonjs规范（因为webpack是在node下运行的）
......
//模块
module:{
    //加载机
    rules: [
         //每一个成员代表一个加载机 !       
        {
            test : /\.less$/,
            //多个加载机
            use: [
                {
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader'
                },
                {
                    loader:'less-loader'
                }
            ]
        }
    ]
}
```

#### 3.3 图片

在webpack看来图片文件也是资源，也可以模块化加载，我们要安装图片加载机，**实现图片模块化加载url-loader(依赖file-loader)**。图片加载有两种方式：<br>

&emsp;&emsp;同步加载：将图片写入js文件中，通过html5提供的图片的base64编码技术实现的<br>

&emsp;&emsp;异步加载：存储图片的地址，在使用图片时候，在异步加载图片。<br>

图片到底采用哪种方式，我们可以通过传递limit参数定义，值表示图片大小，单位是字节(b)<br>

&emsp;&emsp;加载机通过query形式传递参数。例如： url-loader?limit=4096<br>

&emsp;&emsp;&emsp;&emsp;<font color=red>当图片大小小于等于4kb的时候，同步加载。当图片大小大于4kb的时候，异步加载（会打包图片）。目的是为了提高网站的性能。</font><br>

安装：

```
npm install --save-dev file-loader url-loader
```



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

//引入图片资源,根据1.jpeg和2.png图片的路径引入图片
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

style.css

```css
body{
    background: url(../1.jpeg)
}
```

index.html

```html
<script src="./dist/demo.js"></script>
```



我们发现webpack自动帮助我们生成一个非常长的名字
		这是一个32位hash值，目的是防止名字重复
		但是，真实开发中，我们可能对打包的图片名字有一定的要求
		比如，将所有的图片放在一个文件夹中，跟上图片原来的名称，同时也要防止重复 
所以，我们可以在options中添加上如下选项：
		img：文件要打包到的文件夹
		name：获取图片原来的名字，放在该位置
		hash:8：为了防止图片名称冲突，依然使用hash，但是我们只保留8位
		ext：使用图片原来的扩展名

webpack.config.js配置文件:

```javascript]
 ......
 //图片加载机
{
    test: /\.(jpg|png|jpeg)$/,             
    use: [{                 
        loader: 'url-loader',
        options: {
             //limit限制图片大小,4096代表4kb
            limit: 4096
            name: 'img/[name].[hash:8].[ext]'
        }
    }]
}
 ......
```

但是，我们发现图片并没有显示出来，这是因为图片使用的路径不正确
		默认情况下，webpack会将生成的路径直接返回给使用者
		但是，我们整个程序是打包在dist文件夹下的，所以这里我们需要在路径下再添加一个dist/

webpack.config.js配置文件:

```javascript
 ......
//发布
output: {
    //文件名称
    filename: './demo.js',
    //静态资源相对位置
    publicPath: './dist/'
},
......
```

#### 3.4 ES6转ES5

在前面我们说过，如果希望将ES6的语法转成ES5，那么就需要使用babel。而在webpack中，我们直接使用babel对应的loader就可以了。



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

#### 3.5 引入vue.js

后续项目中，我们会使用Vuejs进行开发，而且会以特殊的文件来组织vue的组件。
		所以，下面我们来学习一下**如何在我们的webpack环境中集成Vuejs**
现在，我们希望在项目中使用Vuejs，那么必然需要对其有依赖，所以需要先进行安装
		注：因为我们后续是在实际项目中也会使用vue的，所以并不是开发时依赖

```
npm install vue --save
```



那么，接下来就可以按照我们之前学习的方式来使用Vue了

![1606380962268](C:\Users\Z\AppData\Roaming\Typora\typora-user-images\1606380962268.png)



修改完成后，重新打包，运行程序：
		打包过程没有任何错误(因为只是多打包了一个vue的js文件而已)
		但是运行程序，没有出现想要的效果，而且浏览器中有报错

![1606381034340](C:\Users\Z\AppData\Roaming\Typora\typora-user-images\1606381034340.png)



这个错误说的是我们使用的是runtime-only版本的Vue，什么意思呢？
		这里我只说解决方案：Vue不同版本构建，后续我具体讲解runtime-only和runtime-compiler的区别。

**所以我们修改webpack的配置，添加如下内容即可（为什么能解决上面的问题我也不是很清楚）**

```
//resolve.alias 配置项通过别名来把原导入路径映射成一个新的导入路径。
//参考：https://blog.csdn.net/daodaoke/article/details/107636361
resolve{
	alias:{
		'vue$': 'vue/dist/vue.esm.js'
	}
}
```

![1606381329630](C:\Users\Z\AppData\Roaming\Typora\typora-user-images\1606381329630.png)

**vue组件化开发**

在学习组件化开发的时候，我说过以后的Vue开发过程中，我们都会采用组件化开发的思想。
	那么，在当前项目中，如果我也想采用组件化的形式进行开发，应该怎么做呢？
查看下面的代码：	
	当然，我们也可以将下面的代码抽取到一个js文件中，并且导出。

![1606380600921](C:\Users\Z\AppData\Roaming\Typora\typora-user-images\1606380600921.png)

但是一个组件以一个js对象的形式进行组织和使用的时候是非常不方便的
		一方面编写template模块非常的麻烦
		另外一方面如果有样式的话，我们写在哪里比较合适呢？
现在，我们以一种全新的方式来组织一个vue的组件

![1606380660084](C:\Users\Z\AppData\Roaming\Typora\typora-user-images\1606380660084.png)





**.vue文件封装处理**

**但是，这个时候这个文件可以被正确的加载吗？**
		**必然不可以，这种特殊的文件以及特殊的格式，必须有人帮助我们处理。**
		**谁来处理呢？vue-loader以及vue-template-compiler。**
安装vue-loader和vue-template-compiler

```
npm install vue-loader vue-template-compiler --save-dev
```

修改webpack.config.js的配置文件：

```
......
{
	test: /\.vue$/,
	use: ['vue-loader']
}
......
```

### 4.plugin的使用

**plugin是什么？**
		**plugin是插件的意思，通常是用于对某个现有的架构进行扩展**。
		**webpack中的插件，就是对webpack现有功能的各种扩展，比如打包优化，文件压缩等等。**
**loader和plugin区别**
		**loader主要用于转换某些类型的模块，它是一个转换器。**
		**plugin是插件，它是对webpack本身的扩展，是一个扩展器。**
**plugin的使用过程：**
		步骤一：通过npm安装需要使用的plugins(某些webpack已经内置的插件不需要安装)
		步骤二：在webpack.config.js中的plugins中配置插件。
下面，我们就来看看可以通过哪些插件对现有的webpack打包过程进行扩容，让我们的webpack变得更加好用。

#### 4.1添加版权的Plugin

我们先来使用一个最简单的插件，为打包的文件添加版权声明
		该插件名字叫BannerPlugin，属于webpack自带的插件。
按照下面的方式来修改webpack.config.js的文件：

![1606381863069](C:\Users\Z\AppData\Roaming\Typora\typora-user-images\1606381863069.png)



重新打包程序：查看bundle.js文件的头部，看到如下信息

![1606381869844](C:\Users\Z\AppData\Roaming\Typora\typora-user-images\1606381869844.png)





#### <font color=red>4.2打包html的plugin</font>

目前，我们的index.html文件是存放在项目的根目录下的。
		**我们知道，在真实发布项目时，发布的是dist文件夹中的内容，但是dist文件夹中如果没有index.html文件，那么打包的js等文件也就没有意义了。**
所以，我们**需要将index.html文件打包到dist文件夹中**，这个时候就可以使用**HtmlWebpackPlugin插件**
HtmlWebpackPlugin插件可以为我们做这些事情：
		自动生成一个index.html文件(可以指定模板来生成)
		将打包的js文件，自动通过script标签插入到body中
安装HtmlWebpackPlugin插件

```
npm install html-webpack-plugin --save-dev
```

使用插件，修改webpack.config.js文件中plugins部分的内容如下：

![1606388124507](C:\Users\Z\AppData\Roaming\Typora\typora-user-images\1606388124507.png)		

​		这里的template表示根据什么模板来生成index.html
​		另外，我们**需要删除之前在output中添加的publicPath属性**
​		**否则插入的script标签中的src可能会有问题**

#### 4.3 js压缩的Plugin

在项目发布之前，我们必然需要对js等文件进行压缩处理
		这里，我们就对打包的js文件进行压缩
		我们使用一个第三方的插件**uglifyjs-webpack-plugin**，并且版本号指定1.1.1，和CLI2保持一致

```
npm install uglifyis-webpack-plugin@1.1.1 --save-dev
```

修改webpack.config.js文件，使用插件：

![1606388385629](C:\Users\Z\AppData\Roaming\Typora\typora-user-images\1606388385629.png)


查看打包后的bunlde.js文件，是已经被压缩过了。

### 5.搭建本地服务器

webpack提供了一个可选的本地开发服务器，这个本地服务器基于node.js搭建，内部使用express框架，**可以实现我们想要的让浏览器自动刷新显示我们修改后的结果。**

不过它是一个单独的模块，在webpack中使用之前需要先安装它

```
npm install --save-dev webpack-dev-server@2.9.1
```



devserver也是作为webpack中的一个选项，选项本身可以设置如下属性：
		contentBase：为哪一个文件夹提供本地服务，默认是根文件夹，我们这里要填写./dist
		port：端口号
		inline：页面实时刷新
		historyApiFallback：在SPA页面中，依赖HTML5的history模式
webpack.config.js文件配置修改如下：
我们可以再配置另外一个scripts：
		--open参数表示直接打开浏览器

```
devServer:{
	contentBase:'./dist',
	inline: true
},
```

```
"dev": "webpack-dev-server --open"
```











