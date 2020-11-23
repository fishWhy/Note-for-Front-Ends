# sass

### 安装sass

和less一样，sass也是一种css预编译语言，由于sass出现的比less晚，因此支持的语法更多，例如循环语句，条件语句等等，sass是通过ruby编译的，因此我们使用sass要首先安装ruby<br>

ruby安装完成，输入gem -v可以查看版本号<br>

sass属于gem的一个模块，我们可以通过gem安装sass： gem install sass<br>

安装完成，提供了sass指令，输入sass -v可以查看版本号，也可以手动安装sass:   gem install 将sass文件拖入进来。<br>

开发的使用，通常写中文注释，但ruby是日本人开发的，因此编码不涵盖中文字符串，所以我们要更改字符串：进入：C:\Ruby22-x64\lib\ruby\gems\2.2.0\gem2\sass-3.4.22\lib\sass目录，打开engine.rb文件，在54行，添加Encoding.default_external = Encoding.find("utf-8")<br>

```javascript
require 'sass/supports'
Encoding.default_external = Encoding.find('utf-8')
module Sass
```

安装教程可参考：<https://www.sass.hk/install/>

中文文档：<https://www.sass.hk/docs/>





### 拓展名

sass支持两种拓展名<br>

一种是.sass<br>

&emsp;&emsp;这种拓展名文件，支持的语法比较新，和css差距很大，因此开发者很少使用<br>

```sass
.box 
	.demo
		p
			color: red;
			font-size: 30px;
```

一种是.scss<br>

&emsp;&emsp;这种拓展名文件，支持的语法和css语法很相似，因此被开发者接受<br>

```scss
.box {
	.demo{
		p{
			color: red;
			font-size: 30px;
		}
	}
}
```



<font color=red>**这里以.scss语法记录笔记**</font><br>

sass和less一样，浏览器不识别，因此需要进行编译。



### 编译

命令行编译：安装完成sass,可以通过sass指令编译代码<br>

```
sass sass文件 css文件 配置
```

&emsp;&emsp;&emsp;配置： -C 避免输出缓存文件		--sourcemap = none避免输出sourcemap文件 （Dart Sass版本的编译器中应为--no-source-map ）<br>

```
sass sass文件 css文件 -C --sourcemap = none
```

scss文件的编译方法相同





### webpack编译

工程化编译sass<br>

&emsp;&emsp;对webpack来说sass文件也是资源，是资源我们就可以模块化打包加载<br>

&emsp;&emsp;我们要装sass-loader，使用方式和less一样

```
style-loader!css-loader!sassloader
```

注意：本地安装sass，sass-loader依赖node-sass<br>

<font color=red>**注意使用npm安装的sass并不是sass的完整版，很多功能是不支持的，还是先使用正版的sass将scss编译成css文件，再使用，而不是使用npm安装的sass配合webpack编译**</font>

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
    //模块
    module:{
        //加载机
        rules: [
             //每一个成员代表一个加载机 !
            //css加载机
            {
                test : /\.scss$/,
                //!级联多个加载机,要先使用npm安装'style-loader','css-loader','sass-loader'
                use: ['style-loader','css-loader','sass-loader']
            }
        ]
    }
}
```



### 嵌套语法与&（同less）

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

### 

### 属性嵌套

在sass中支持符合属性嵌套定义<br>

复合属性：一个属性可以代表多个属性的属性<br>

&emsp;&emsp;margin: margin-top, margin-bottom, margin-right, margin-left<br>

&emsp;&emsp;border: border-width, border-style, border-color, border-top, border-right, border-bottom,.....

复合属性定义的语法：<br>

&emsp;&emsp;parentProps: {childProps: value;}

```scss
div{
    margin:{
        top: 20px;
        right: 30px;
        bottom: 40px;
        left: 30px;
    }
    //等效为：
    //margin-top: 20px;
    //margin-right: 30px;
    //margin-bottom: 40px;
    //margin-left: 30px;
}
```



### 变量

sass支持变量<br>

&emsp;&emsp;语法：$key: value;<br>

&emsp;&emsp;全局的变量，任何模块都能使用；<br>

&emsp;&emsp;局部的变量，只能在当前模块(即{})中使用，模块外部无法使用；<br>

&emsp;&emsp;<font color=red>**不支持声明前置**</font><br>

<font color=red>**工作中，尽量将变量定义在最前面。**</font>

```javascript
$color: rgb(0, 153, 255);
.box {
    .demo{
        p{
            //局部变量
            $size: 30px;
            color: $color;
            font-size: $size;
            margin: {
                top: 20px;
                right: 30px;
                bottom: 40px;
                left: 30px;
            }
        }
    }
}
```

### 运算（加减乘除）

#### 数学运算<br>

&emsp;&emsp;sass支持加减乘除运算，但是运算是有物理意义的。<br>

&emsp;&emsp;加减法：运算的时候会做单位转换，保留是第一个加数或者被减数的单位<br>

&emsp;&emsp;乘法：只能有一个乘数的单位(因为，<font color=red>1cm*1cm=1平方厘米</font>)<br>

&emsp;&emsp;除法：默认不会执行除法。在css中，font属性的属性值可以是字号比行高，所以/默认不执行除法。想执行除法，必须满足三个条件之一。<br>

&emsp;&emsp;1.必须有()<br>

&emsp;&emsp;2.必须出现变量或者方法的返回值<br>

&emsp;&emsp;3.是表达的一部分（除了除法，还有其他的运算）。<br>

&emsp;&emsp;&emsp;单位：10/2	10是被除数，2是除数。如果被除数有单位，除数单位可有可无，有单位单位抵消（例如10m/2s结果为5m/s。）。如果被除数没有单位，除数一定不能有单位。<br>

```scss
.test{
    //加减法
    // width: 1in-1px;//被编译成0.98958in
    // height: 1in -1;//被编译成0in

    //乘法
    // width: 10px*5;//被编译成50px

    //除法
    // width: 20px/5;//被编译成20px/5,因为编译器认为此时也是像font属性属性值那样是字号与行高之比，想执行必须满足三个条件之一
    //除法执行的三个条件

    //width: (20px/5);//被编译成4px

    //$size: 20px;
    //width: $size/5;//被编译成4px
    
    width: 10px/2 + 5px;//被编译成10px
    // width: (20px/5px);//被编译成4
    // width: (20/5px);//报错，无法编译
}
```





#### 色彩运算

&emsp;&emsp;在sass中，色彩可以进行运算。<br>

&emsp;&emsp;必要条件是：色彩的透明度必须一致。<br>

运算的时候，每个通道单独运算的，透明度通道不运算<br>

&emsp;&emsp;运算过程中，通道之间不会进位或者借位<br>

&emsp;&emsp;一个通道的值只能在0-255（00-ff）之间<br>

```scss
//一定要使用正版的sass编译，使用npm安装的sass编译时rgba与颜色运算都识别不了
testColor{

    $color1: #5588aa;
    $color2: #229933;
    $color3: rgba(100,200,30,0.5);
    $color4: rgba(50,100,30,0.5);
    // color: $color4;

    // color: $color4 - $color3;//被编译成rgba(0, 0, 0, 0.5)
    // color: #001100+#220033; //被编译成#221133
    // color: #001100*2;       //被编译成#002200
    color: $color4 + $color3;  //被编译成rgba(150, 255, 60, 0.5);
}
```



#### 字符串运算

&emsp;&emsp;sass允许字符串，就是字符串拼接<br>

### 混合(混合+函数)

#### 基本

sass中的混合也是为了复用一组样式<br>

&emsp;&emsp;语法			@mixin 混合名称{//定义样式}<br>

&emsp;&emsp;使用混合 	@include混合名称<br>

特点：<br>

&emsp;&emsp;1.混合在编译的时候，删除了，当多次使用混合的时候， 并没有混合选择器，是真正的复制。<br>

&emsp;&emsp;<font color=red>2.不支持声明前置，其它模块的混合在当前模块内不能使用。</font><br>

&emsp;&emsp;&emsp;&emsp;所以sass中的混合相当于less中的方法。<br>

<font color=red>**工作中，混合与变量一样，放在全局，定义在最前面。**</font><br>

```scss
//定义混合
@mixin size{
    width: 20px;
    height: 30px;
}
.demo{
    //局部混合，局部混合其它模块不能使用
    @mixin title{
        font-size: 20px;
        color: red;
    }
    //使用混合
    @include size;
    //使用局部混合
    @include: title;
}
.box{
    //使用混合
    @include size;
}

//被编译成如下，@mixin size混合与 @mixin title混合编译后被删除了
.demo{
    width: 20px;
    height: 30px;
    font-size: 20px;
    color: red;
}
.box{
    width: 20px;
    height: 30px;
}
```

#### 带有参数的混合

混合传参

&emsp;&emsp;定义参数的语法，和定义变量的语法是一样的，并且可以传递默认参数<br>

&emsp;&emsp;语法 @mixin 混合名称($arg1:val1,$arg2:val2){//定义样式}，val1与val2是默认值(可有可无)<br>

使用混合@include混合名称(val1,val2);<br>

&emsp;&emsp;如果定义了默认参数，使用混合的时候，可以不用传递参数<br>

&emsp;&emsp;如果是一个参数都不传递，可以省略参数集合<br>

&emsp;&emsp;如果没有定义默认参数，使用混合的时候，必须传递参数。<br>

```scss
//定义混合
@mixin size1($w,$h){
    width: $w;
    height: $h;
}
.demo1 {
    @include size1(100px, 200px);
}

//默认参数
@mixin size2($w: 10px,$h: 20px){
    width: $w;
    height: $h;
}
.demo2 {
    @include size2;
}
```

#### 获取剩余参数

&emsp;&emsp;在less中获取所有参数使用@arguments<br>

&emsp;&emsp;而在sass中获取剩余参数语法和ES6语法相似，使用三个点语法<br>

&emsp;&emsp;&emsp;&emsp;sass中，三个点语法在变量之后<br>

&emsp;&emsp;&emsp;&emsp;@mixin demo($arg1,$arg2,$arg...){}<br>

&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;arg获取从第三个参数后面所有的参数。前面的参数可以正常使用<br>

&emsp;&emsp;<font color=red>**工作中，兼容浏览器，有时候，通常我们为了将css3样式兼容所有浏览器，而添加浏览器前缀，要写很多遍，此时我们可以通过混合复用样式，提高开发效率，通常将混合名称定义为css样式名称，并且在混合中，只设置一个样式。**</font><br>

```scss
@mixin box-shadow($h:100px,$bx...){
    height: $h;
    -webkit-box-shadow: $bx;
    -moz-box-shadow: $bx;
    -ms-box-shadow: $bx;
    -o-box-shadow: $bx;
    box-shadow: $bx;
}

//兼容浏览器
.demo{
    @include box-shadow(500px,2px,4px,red,6px 8px green);
    //@include box-shadow(2px,4px,red,6px 8px green,10px 12px blue);
}
```



### 继承

为了复用选择器的样式，sass提供了继承，和less中的混合是一样的<br>

&emsp;&emsp;less中的方法是sass中的混合<br>

&emsp;&emsp;less中的混合是sass中的继承<br>

定义继承就是定义选择器，sass支持四类继承选择器：<br>

&emsp;&emsp;类选择器，id选择器，元素名称选择器，自定义元素名称选择器<br>

使用继承：@extend继承选择器<br>

&emsp;&emsp;特点：<br>

&emsp;&emsp;&emsp;&emsp;<font color=red>1.继承的选择器在编译的时候会保留。</font><br>

&emsp;&emsp;&emsp;&emsp;<font color=red>2.编译的时候，合并了选择器，而不是复制样式，相对来说效率更高。</font><br>

```scss
//定义选择器
#demo {
    color: red;
}
.test {
    font-size: 20px;
}
div {
    width: 20px;
}
ickt {
    height: 50px;
}
.title {
    @extend #demo;
    @extend .test;
    @extend div;
    @extend ickt;
}

//编译后,原始的#demo, .test, div ickt在编译后都会保留下来
#demo .title{
    color: red;
}
.test .title{
    font-size: 20px;
}
div .title{
    width: 20px;
}
ickt .title{
    height: 50px;
}
```

如果不想在编译的时候保留选择器样式，可以使用选择器占位符%，<font color=red>在选择器前面添加%占位符，此时该选择器在编译的时候会被删除</font>

&emsp;&emsp;<font color=red>注意：只有元素名称和自定义元素名称选择器可以使用%占位符，id选择器和类选择器无法使用。一旦添加占位符，@extend继承选择器的时候，也要添加占位符。</font><br>

sass中的继承支持声明前置，所以工作中，尽量将它们定义在最前面<br>

局部继承，<br>

&emsp;&emsp;当前模块可以使用<br>

&emsp;&emsp;其他模块可以直接使用，但是有意想不到的结果<br>

&emsp;&emsp;<font color=red>**所以工作中不建议使用局部的继承。**</font>

```scss
//定义选择器
#demo {
    color: red;
}
.test {
    font-size: 20px;
}
%div {
    width: 20px;
}
ickt {
    height: 50px;
}
.title {
    @extend #demo;
    @extend .test;
    @extend %div;
    @extend ickt;
}

//编译后,原始的#demo, .test, ickt在编译后都会保留下来，但是div被删除了
#demo .title{
    color: red;
}
.test .title{
    font-size: 20px;
}
.title{
    width: 20px;
}
ickt .title{
    height: 50px;
}
```

局部继承的编译原理

```scss
//局部继承的编译原理
a{
    b{
        c{
            d{
                color: red;
            }
        }
    }
}
e{
    f{
        g{
            h{
                @extend d;
            }
        }
    }
}
//编译后
a b c d,a b c e f g h,e f g a b c h{
    color: red;
}
```



### 插值与引入文件

sass插值语法 #{$key}<br>

&emsp;&emsp;和less一样，sass中的插值语法有三种用法<br>

&emsp;&emsp;&emsp;&emsp;1在字符串中插值<br>

&emsp;&emsp;&emsp;&emsp;2在选择器上插值<br>

&emsp;&emsp;&emsp;&emsp;3在属性名称上插值<br>

```scss
$day: '一';
$num: 10;
$dir:top;
//字符串插值
div:after{
    content: '今天是星期#{$day}';
}
//选择器插值
.demo-#{$num}{
    color:red;
}
p{
    border-#{$dir}-color:blue;
}

//编译后
@charset "UTF-8"
div:after{
    content: '今天是星期一';
}
.demo-10{
    color:red;
}
p{
    border-top-color:blue;
}
```

引入文件由两种方式<br>

&emsp;&emsp;@import url(url)		css引入方式编译的时候这条语句保留下来）<br>

&emsp;&emsp;@import url				sass引入方式（编译的时候这条语句被删除）<br>

<font color=red>**注意：工作中，不要在被引入的文件中书写选择器，否则会被复制多次。为了防止被复制多次，也可以在选择器前加上%，使用%继承。**</font>

```scss
//base.scss文件
$day: '一';
$num: 10;
$dir:top;

//注意：工作中，不要在被引入的文件中书写选择器，否则会被复制多次。如果非要书写选择器，也可以使用%继承。
//div{
//    height:50px;
//    background-color:pink;
//}
%div{
    height:50px;
    background-color:pink;
}
```

```scss
//demo.scss文件
//引入文件
//以scss方式引入
@import './base.scss';

//字符串插值
div:after{
    content: '今天是星期#{$day}';
}
//选择器插值
.demo-#{$num}{
    color:red;
}
p{
    border-#{$dir}-color:blue;
}
```

### 条件语句

sass支持if条件语句，语法和js中的if条件语句类似<br>

&emsp;&emsp;js中条件语句		if {} else {}<br>

&emsp;&emsp;sass中条件语句	@if {} @else {} <br>

对比js语句<br>

&emsp;&emsp;相同点：1.关键字（js:  if, else if, else。	sass:  @if,  @else if, @else  ）;<br>

&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;2.条件提：都是通过 {}定义；	3.比较运算符：>, <, >=, <=, ==<br>

&emsp;&emsp;不同点：1.js中，条件定义在条件集合()中，sass不需要()。直接写条件；<br>

&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;2.逻辑运算符：js中 “与” 用 "&&"表示，“或” 用 "||"表示。	sass中 “与” 用 "and"表示，“或”用“or”表示。<br>

```scss
//实现锐角和钝角三角形
@mixin arrow($w:10px, $c:#000, $dir: top, $l:$w){
    border:$w solid transparent;
    border-#($dir)-color:$c;
}
```

