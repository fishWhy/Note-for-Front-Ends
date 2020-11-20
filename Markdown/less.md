# less

### less（css预编译语言）

less一个css预编译语言：<br>

&emsp;&emsp;在我们开发中，使用css的时候往往会遇到一些问题，如无法复用样式，权重问题，无法计算，无法使用语法，没有方法，单位转换等等问题，所以才有了css预编译语言，是解决css开发中遇到的这些问题的。<br>

Github: http://github.com/less/less

官网：http://lesscss.org/

中文官网：http://lesscss.cn/



安装less<br>

```javascript
npm install less -g
//此时得到一个全局的lessc指令，可以通过lessc -v查看版本号
lessc -v
```

浏览器不认识less语言，所以我们要将less编译成css<br>

```javascript
//lessc less文件 编译成css后保存位置，如下：
lessc .\demo.less .\demo.css
```

### webpack编译

&emsp;&emsp;在webpack看来，less文件也是资源，因此也可以模块化加载<br>

&emsp;&emsp;要安装less加载机less-loader, less文件默认拓展名是.less<br>

&emsp;&emsp;&emsp;&emsp;匹配less文件：test:/\.less$/<br>

&emsp;&emsp;由于less最终编译成css，因此也需要css加载机： rules: 'style-loader!css-loader!less-loader'<br>

webpack.config.js文件如下：

```javascript
//commonjs规范（因为webpack是在node下运行的）
module.exports = {
    //处理模式
    //development表示开发模式，代码不会压缩
    //producetion表示发布模式，代码会压缩（默认）
    mode:'development',
    //入口
    entry: './modules/main.js',
    //发布
    output: {
        //文件名称
        filename: './demo.js'
    },
    //模块,表示对模块的处理
    module:{
        //加载机
        rules: [
             //每一个成员代表一个加载机 !
            //less载机
            {
                test : /\.less$/,
                //!级联多个加载机,要先使用npm安装'style-loader','css-loader','less-loader'
                use: ['style-loader','css-loader','less-loader']
            }
        ]
    }
}
```

main.js文件如下：

```javascript
//使用ES Module规范，引入样式
import './demo.less';
```

demo.less文件如下：

```less
div{
    //使用嵌套语法
    p {
        color: red;
        font-size: 30px;
    }
    a {
        color: green;
        font-size: 30px;
        text-decoration: none;
    }
}
```

index.html文件如下：

```html
 <script src="dist/demo.js"></script>
```

### 嵌套语法与&

嵌套语法：<br>

&emsp;&emsp;使用预编译语言最大的特点就是可以使用嵌套式语法，也就是说直接在一个选择器中使用另一个选择器并书写样式。<br>

&emsp;&emsp;编译的时候会在将内外选择器同时保留<br>

&emsp;&emsp;&emsp;&emsp;外部选择器类似命名空间，确保选择器名称不会相互覆盖<br>

&emsp;&emsp;<font color=red>嵌套的时候，我们可以通过&符号获取当前选择器。</font><br>

```less
div{
    //div的样式
    background-color: yellow;
    //通过&访问div选择器
    & {
        height: 200px;
    }
    //使用嵌套语法
    p {
        color: red;
        font-size: 30px;
    }
    a {
        color: green;
        font-size: 30px;
        text-decoration: none;
    }
}
```

### 变量(@key:value;)

less支持变量，定义的语法跟js语法相似<br>

&emsp;&emsp;@key:value;<br>

&emsp;&emsp;@相当于var，是变量的标志<br>

&emsp;&emsp;&emsp;&emsp;key表示变量名称（符合js变量命名规范）<br>

&emsp;&emsp;&emsp;&emsp;:相当于赋值符号，value表示值，;表示语句结束<br>

变量在less编译的时候会删除

```less
//定义变量
// @color: red;
// @bg: #00f;
// @space: 20px;
@color: blue;
@bg: red;
@space: 40px;
//写样式
div{
    //可以使用运算
    padding: @space/2 @space*1.5;
    font-size: @space;
    background: @bg;
    span{
        color: @color;
        margin: 0 @space/2;
    }
}
```

### 运算（加减乘除）

less支持数学运算，并且会做单位转换<br>

&emsp;&emsp;加减法：保留第一个加数或者被减数的单位<br>

&emsp;&emsp;乘法：保留第一个乘数的单位<br>

&emsp;&emsp;除法：保留第一个单位<br>

```less
div{
    //1in = 96px
    
    //加法
    //width: 1in + 1px; //1.01041167in
    //width: 1px + 1in; //97px;
    
    //乘法
    //width: 2px*2in; //4px
    //width: 2in*2px; //4in
    //除法
    //width: 6px/2in; //3px
    //width: 6in*2px; //3in
}
```

### 混合（复用选择器的样式）

混合的作用就是为了复用选择器的样式<br>

在less中，支持两类混合：<font color=red>类混合和id混合</font><br>

&emsp;&emsp;定义混合：定义这些选择器<br>

&emsp;&emsp;使用混合：直接写这些选择器<br>

在选择器内部使用混合的时候，想覆盖继承下来的样式一定要注意选择器的权重。<br>

<font color=red>less中的混合在编译的时候保留（变量会删除），混合继承的样式不会合并选择器。</font><br>

```html
<div class="box1">
    <p class="text">hello a</p>
    <p class="demo">hello b</p>
    <a href="">打卡发</a>
</div>

<div class="box2">
    <p class="text">hello c</p>
    <p class="demo">hello d</p>
    <a href="">大富豪</a>
</div>
```



```less
.box1 {
    background-color: skyblue;
    .text {
        color: red;
        font-size: 30px;
    }
    #demo {
    	color: green;
        font-size: 40px;
	}
    a {
        color: gold;
        font-size: 40px;
    }
}

//利用混合技术，复用整个样式
.box2{
    //直接写选择器
    .box1;
    //等价写法：
   //background-color: skyblue;
   //.text {
   //    color: red;
   //    font-size: 30px;
   //}
   //#demo {
   //	color: green;
   //    font-size: 40px;
	//}
   //a {
   //    color: gold;
   //    font-size: 40px;
   //}
}


或
//利用混合技术，复用某些样式
//混合只支持类选择器，id选择器
.box2{
    .text {
        .box1 .text;
    }
    # demo{
        .box1 #demo;
    }
    //重写样式
    //一定要注意选择器的权重
    .text, #demo{
        color: yellowgreen;
    }
    //等价写法
    //.text {
   //    color: yellowgreen;
   //    font-size: 30px;
   //}
   //#demo {
   //	color: yellowgreen;
   //    font-size: 40px;
   //}
    
    //标签名选择器不能作为混合使用
    //a{
    //	  .box1 a;
	//}//会报错    
}
```

### 方法（复用选择器的样式）

方法跟混合一样，都是为了复用选择器的样式<br>

&emsp;&emsp;混合在编译的时候回保留，方法在编译的时候回删除<br>

<font color=red>如果想将复用的样式，在编译的时候删除，我们可以使用方法。</font>(这一点只能从编译后的css文件看到效果)<br>

如果复用的样式时可变的，我们可以使用方法。<br>



**定义方法**的语法和js中定义方法的语法类似<br>

&emsp;&emsp;.方法名称(@arg1, @arg2){

​			//定义样式

​		}<br>

&emsp;&emsp;.相当于function用来定义方法<br>

&emsp;&emsp;方法名称和js中命名规范一致（但less可以使用-）<br>

&emsp;&emsp;()表示参数集合，可以定义参数<br>

&emsp;&emsp;@arg1, @arg2表示参数<br>

&emsp;&emsp;{}表示方法体，我们可以定义样式。<br>

**使用方法：**.方法名称(arg1, arg2);<br>

**默认参数**：.方法名称(@arg1:value, @arg2: value2){}<br>

&emsp;&emsp;定义默认参数的语法和定义变量的语法类似<br>

&emsp;&emsp;&emsp;&emsp;如果定义了默认参数，使用方法的时候可以不传递参数。<br>

&emsp;&emsp;&emsp;&emsp;如果没有定义默认参数，使用方法的时候，必须传递参数<br>

获取所有参数：我们可以通过@arguments获取所有的参数<br>

!important: 如果对方法使用!important关键字，此时方法中的每一个样式都会提高权重。<br>

```less
//封装在方法中
//让元素设置宽度并居中
.wcenter(@w:auto, @mt:0, @mb:@mt){
    width: @w;
    margin: @mt auto @mb;
    //height: @arguments;// @w @mt @mb
}

//方法来自动添加样式前缀
.border-radius(@r1:0, @r2:@r1,@r3:@r1,@r4:@r1) {
    -webkit-border-radius: @arguments;
    -moz-border-radius: @arguments;
    -ms-border-radius: @arguments;
    -o-border-radius: @arguments;
    border-radius: @arguments;
}

.box1 {
    //此时会将.wcenter设置的所有样式权重提高
    .wcenter(800px, 50px, 20px)!important;
    width: 400px;//正常来说width会覆盖.wcenter中设置的width，但由于.wcenter有!important所以不会覆盖。
    //等效为
    //width: 800px;
    //margin: 50px auto 20px;
    background-color: yellowgreen;
}
.box2 {
    .wcenter(1000px, 0, 0);
    //.border-radius(20px, 40px, 80px, 100px);
    .border-radius(40px, 100px);
    background-color: skyblue;
}
```

<font color=red>**可以将less中的定义的方法放在同一个文件中（这个文件中只能存变量和方法），其他less文件使用方法的时候从这个文件引入方法**</font>

```less
//引入文件
//上例中的.wcenter方法，.border-radius方法都放在 ./base.less文件中
@import url('./base.less')
```



###  less引入文件

less引入文件，和css引入文件相似，有两种方式

1  css方式引入： @import url()			2直接引入： @import 地址

<font color=red>**被引入的文件中，只建议写变量和方法，其他的选择器会被复制多次。**</font>

```javascript
//引入文件
//上例中的.wcenter方法，.border-radius方法都放在 ./base.less文件中
@import url('./base.less')
```



### 插值

插值语法：@{key}<br>

&emsp;&emsp;js中插值：是为了复用字符串		less中插值：为了复用样式<br>

在less中，有三种情况下可以使用插值语法<br>

&emsp;&emsp;1.在字符串中可以使用插值<br>

&emsp;&emsp;2.在选择器上可以使用插值<br>

&emsp;&emsp;3.在样式属性名称上(key)可以使用插值<br>

```less
//插值

//字符串中使用插值
//定义变量
@msg:'星期三';
h1:after{
    content: '今天是@{msg}';
}

//选择器使用插值
@num: 5;
.box@{num}{
    color:red;
}//最终编译成：  .box5{color:red}

//样式属性名称上使用插值
@dir: top;
div {
    border-@{dir}-color: red; //最终编译成：border-top-color: red;
}
```

案例，封装制作三角形的方法

```less
//封装制作三角形的方法
.arrow(@w:10px, @c:#1000, @dir: top){
    border: @w solid transparent;
    border-@{dir}-color: @c;
	font-size: 0,
	width: 0;
}

strong{
    .arrow(50px, green, left)
}
```



### 内置方法

可以从less的官网上，找到less中大量的内置方法<br>

官网：http://lesscss.org/ <br>

中文官网：http://lesscss.cn/ <br>



```less
字符串方法：e避免less编译
数学方法：js中数学对象支持的，less也支持
	ceil, floor, round, max, min, percentage(求百分数)
定义色彩方法： rgb, rgba, hsl(代表hue, saturation,lightness)
	hue色相0-360	saturation饱和度0-100%	lightness亮度0-100%
色彩通道方法red,green,blue,alpha,hue,saturate,ligntness
色彩操作方法 fadeIn, fadeOut, fadeTo, saturate, desaturate, lignten, darken
	最小值0，最大值100%
色彩混合方法：softLight, hardLight
```



```less
div{
    font: 30px/1.2;		//老版本less编译后：font: 25px  
}


div{
    //使用内置方法e
    font: e(30px/1.2);					//老版本less编译后：font：30px/1.2
    //使用内置的数学方法
    width: percentage(1.2);				//				  width:120%
    //色相
    height: hue(green);					//				  height: 120;
    //fadeOut
    color: fadeOut(green,0.2);			//				  color: rgba(0,128,0,0.998)
}
```

### 条件语句

less不支持if条件语句，但是我们可以通过方法来模拟：.方法名称() when (){}<br>

&emsp;&emsp;when关键字就是用来定义该方法的适用条件的<br>

两个变形<br>

&emsp;&emsp;且条件 .方法名称() when () and () {}<br>

&emsp;&emsp;非条件 .方法名称() when not () {}<br>

支持比较运算符（跟js一样，但是'等于'有变化）：>, >=, <, <=, =<br>

&emsp;&emsp;注意： less中的等于比较运算符用'='，比较的时候，不需要带单位<br>

在js中，满足了一个条件就不会执行else后面的了。<br>

<font color=red>在less中，所有的方法，只要条件满足，都会执行，并且后执行的会覆盖先执行的。</font><br>

```less
.wcenter(@w:auto, @mt:0, @mb:@mt){
    width: @w;
    margin: @mt auto @mb;
    color: red;
}
//@w大于500，颜色变成blue
.wcenter(@w:auto, @mt:0, @mb:@mt) when(@w>500){
    width: @w;
    margin: @mt auto @mb;
    color: blue;
}

//@w300到400，颜色变成pink
.wcenter(@w:auto, @mt:0, @mb:@mt) when(@w>=200) when(@w<400){
    width: @w;
    margin: @mt auto @mb;
    color: pink;
}

//@w小于等于200，颜色变成pink
.wcenter(@w:auto, @mt:0, @mb:@mt) when not(@w>200){
    width: @w;
    margin: @mt auto @mb;
    color: skyblue;
}

.box1{
    .wcenter(500px);
    //等价于
    //color: red;
    //width: 600px;
    //margin: 0 auto 0;
}
.box2 {
    .wcenter(600px);//上面的两个wcenter都会运行
    //等价于(因为600px满足2个.wcenter方法)
    //color: red;
    //width: 600px;
    //margin: 0 auto 0;
    //color: blue;				//blue会覆盖red, box2的color最终变成blue
}

.box3 {
    .wcenter(350px);
    //等价于(因为350px满足2个.wcenter方法)
    //color: red;
    //width: 350px;
    //margin: 0 auto 0;
    //color: pink;				//pink会覆盖red, box3的color最终变成pink
}
.box4 {
    .wcenter(200px);
    //等价于(因为200px满足3个.wcenter方法,满足when(@w>=200) 与 when not(@w>200))
    //color: red;
    //color: pink;
    //width: 350px;
    //margin: 0 auto 0;
    //color: skyblue;			//skyblue会覆盖red,pink, box3的color最终变成skyblue
}
```

### 作用域

less提供了块作用域，一对{}定义了一个模块，创建一个作用域<br>

&emsp;&emsp;作用域内部的数据，外部无法访问<br>

选择器表示该模块的名称，我们称之为命名空间<br>

&emsp;&emsp;在外面的我们称之为全局环境<br>

&emsp;&emsp;在{}内部的我们称之为局部环境<br>

<font color=red>**我们讨论变量，混合，方法在全局环境，以及局部环境下的使用情况**</font><br>

变量<br>

&emsp;&emsp;全局的变量，任何模块都能使用<br>

&emsp;&emsp;局部的变量，当前模块可以使用，其他模块无法使用<br>

```less
//全局变量
@color: red; //支持声明前置，即使定义在.box1  .box2后面也能被它们引用

.box1{
    //局部变量
    @num: 200px;
    color: @color;
    //局部变量在当前模块中可以使用
    width： @num;
} 

.box2 {
    color: @color;
    //添加命名空间也无法使用
    //width： box1 @num;
}
```



混合<br>

&emsp;&emsp;全局的混合，任何模块都能使用<br>

&emsp;&emsp;局部的混合，当前模块可以使用，其他模块无法直接使用，但是可以通过命名空间使用<br>

```less
//全局混合可以在任何位置使用  //支持声明前置，即使定义在.box1  .box2后面也能被它们引用
.demo {
    color: red;
}

.box1 {
    //局部混合
    .title {
        font-size: 30px;
    }
    .demo;
    //当前模块下使用局部混合
    .title;
}

//.box1会被编译成
//.box1{
//    color:red;
//    font-size: 30px;  //使用局部混合的效果
//}
//.box1 .title{
//    font-size: 30px;
//}

.box2 {
    .demo;
    //直接使用.box1中的局部混合出错
    //.title;
    //可以通过命名空间使用box1的局部混合
    .box1 .title;
}

```



方法<br>

&emsp;&emsp;全局的方法，任何模块都能使用<br>

&emsp;&emsp;局部的方法，当前模块可以使用，其他模块无法直接使用，但是可以通过命名空间使用<br>

```less
//全局方法  //支持声明前置，即使定义在.box1  .box2后面也能被它们引用
.size(){
    width: 100px;
    height: 20px;
}
.box1{
    //局部的方法
    .demo(){
        font: 20px;
        color: red;
    }
    .size();
    //使用局部方法
    .demo();
}
.box2{
    .size();
    //直接使用.box1中的局部方法出错
    //.demo();
    //可以通过命名空间使用box1的局部方法
    .box1 .demo();
}
```

<font color=red>**less中的变量，混合，方法都支持声明前置，所以工作中，我们尽量将变量，方法定义在最前面。**</font><br><font color=red>**通常我们将它们定义在一个文件（公共模块文件，里面定义配置变量，以及工具方法）中，再引入**</font><br><font color=red>**如果被引入的文件中，定义了混合，会被复制多次（造成资源的浪费）**</font><br>



