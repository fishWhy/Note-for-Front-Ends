## ECMAScript6

### ES6简介

ECMAScript发展历史：

ES1.0 => 1997	ES2.0 => 1998	ES3.0 => 1999	ES4.0 => 2007	ES3.1=>2008	ES5=>2009	ES6=>2015

ES2016		(ES7)=>2016	ES2017=>2017	ES2018=>2018......<br>

&emsp;&emsp;由于ES每年新增的特性非常之多，所以开始以年为单位，定义其版本，从ES6开始，吸取了ES4失败的教训，没有强制浏览器实现这些语法，而是将这些语法编译成ES5（ES3.1）版本，这样浏览器就支持了。所以ES6受到各大浏览器厂商广泛的认可，并开始实现其语法，因此好的浏览器就能支持90%以上的语法了，所以很多语法可以直接用浏览器测试。ES6着眼于未来，是为企业大型项目的开发而设计的。由于还有很多浏览器（IE6,7,8）没有实现ES6语法，所以我们要编译ES6，<font color=red>ES6支持面向对象编程方式</font>(class, extends关键字)，但是又保留了弱类型语言，动态语言的特征。<br>

&emsp;&emsp;ECMA组织为了让制定的规范被编译成可被浏览器支持的版本，<font color=red>提供了babel编译库，ES每次发布版本，babel都会更新一个版本，</font>在新版本中提供的功能，通过babel拓展来实现编译。<br>

&emsp;&emsp;<font color=red>在node.js端，在6.0版本之后，开始支持ES6，所以我们可以在的node课程中直接使用ES6了。(以后node.js中使用ES6开发。)</font><br>

&emsp;&emsp;<font color=red>在浏览器端，为了兼容更多的浏览器，我们需要将ES6的代码，编译成浏览器支持的版本。（可以使用ES6语法，但最终还是会被编译成ES5语法来兼容更多的浏览器）</font><br>

注：当前的语法浏览器支持，因此可以用浏览器直接测试。

### 1.let关键字

用来定义<font color=red>块作用域变量</font>的<br>

&emsp;&emsp;var定义函数级作用域变量<br>

&emsp;&emsp;&emsp;&emsp;在函数内部定义的变量，外部无法访问。<br>

&emsp;&emsp;&emsp;&emsp;在代码块(if , for等)中定义的变量，外部可以访问。<br>

&emsp;&emsp;let 定义代码块作用域变量的：<br>

&emsp;&emsp;&emsp;&emsp;在函数内部定义的变量，外部无法访问。<br>

&emsp;&emsp;&emsp;&emsp;在代码块（if, for等）中定义的变量，外部仍然无法访问。<br>

<font color=red>let与var比较(在工作中建议使用let)：</font><br>

作用域：	var函数级作用域		let块级作用域<br>

重复定义：var可以重复定义变量	let不可以重复定义变量<br>

```javascript
var color = 'red';
var color = 'green';
//而
let color = 'red';
let color = 'green';//报错，这是let的优点，因为重复定义并不好
```

声明前置: var支持声明前置		let不支持声明前置（即不能在变量的声明前访问变量）

for循环中存储数据：var 不能存储数据	let可以存储数据

```javascript
//循环中存储数据
var arr = []
for(var i=0;i<5;i++){
    arr[i] = function(){
        console.log(i);
    }
}
arr[3]()//输出结果为5，因为i是函数级作用域，在上面的循环结束后i变成了5.
//应该改成(利用闭包存储数据)
for(var i=0;i<5;i++){
    arr[i] = (function(i){
        return function(){
        console.log(i);
    }
    })(i)
}
```

```javascript
//循环中存储数据
var arr = []
for(let i=0;i<5;i++){
    arr[i] = function(){
        console.log(i);
    }
}
arr[3]()//输出结果为3,因为i是块级变量，每次循环就是一个块。
```

被window挂载：var 可以被挂载		let不能被挂载

```javascript
//window挂载
var a = 10;
let b = 20;
console.log(window.a)//输出：10；
console.log(window.b)//输出：undefined；
```

### 2.const关键字

const关键字是用于定义常量（一旦定义无法改变的变量，通常是表示一些固定不变的数据，例如Math.PI）。<br>

&emsp;&emsp;使用const关键字的特点：<br>

&emsp;&emsp;&emsp;&emsp;1.无法被修改	<font color=red>2.支持块作用域</font>	3.无法重复定义	4.无法声明前置	5.不能被window挂载	6.不能作为for循环中的变量使用	7.值只能是值类型，如果是引用类型则可以被修改。<br>

工作中，通常是将用大写字母表示，并且横线分割单词，常用于定义配置量。<br>

<font color=red>在ES5中，我们可以通过冻结对象技术，或者设置writable:false特性，来模拟静态变量。但问题是：值如果是引用类型依然会被修改。</font>

<font color=red>在ES3.1中，我们可以通过单例模式来模拟静态变量。在方法中只定义取值方法，而不定义赋值方法即可。</font>

### 3.字符串拓展

#### 多行字符串

单行字符串：由一组单引号或者双引号定义的字符串<br>

&emsp;&emsp;单行字符串的问题：<br>

&emsp;&emsp;&emsp;1.单行字符串不能换行		2.一些特殊的按键要使用转义字符\n  <br>

&emsp;&emsp;&emsp;3.一些特殊的字符要使用转义字符\x20		4.字符串标志符号不能直接嵌套（''不能嵌套''，“”不能嵌套“”）<br>

&emsp;&emsp;&emsp;单引号中不能直接写单引号，要转义\'		双引号中不能直接写双引号，要转义\"  ......

ES6为了解决单行字符串中的问题，提供了多行字符串<br>

&emsp;&emsp;通过\`定义，在多行字符串中，只有 \`需要转义\\'，其他的字符，都可以直接书写。<br>

```javascript
//多行字符串
var str = `hello
""d''dafda4314\``;
```

&emsp;&emsp;并且ES6多行字符串支持插值语法：${key}<br>

&emsp;&emsp;${}提供了js环境，因此我们可以js表达式<br>

&emsp;&emsp;ES6的插值语法，让其他框架的插值语法的重要性，大打折扣。<br>

```javascript
//数据
let size = {
    width: 10,
    height: 20
}
var str = `面积：${size.width}*${size.height}=${size.width*size.height}`;//结果：面积：10*20=200
```

<font color=red>插值语法处理视图模板</font>

```javascript
<div id = 'app'></div>

var app = document.getElementById('app')

//数据
let data =[
    {
    	title:'1313',
        type:'推荐'
    }，
    {
    	title:'1313',
        type:'推荐'
    }，
    {
    	title:'1313',
        type:'推荐'
    }
  ]
  //定义字符串
  let html = '';
//遍历数据
for(let i = 0;i<data.length;i++){
    //字符串拼接
    html + = `<li><span>${data[i].title}</span><span>${data[i].type}</span></li>`
}
app.innerHTML = html
```

#### 原始字符串

在使用转义字符之后，并且在浏览器查看的时候，我们只能看到结果，不能看到原始完整的字符串（包含转义字符），于是ES6中拓展了String.raw方法，用于查看完整的原始字符串。<br>

&emsp;&emsp;使用方式：String.raw``<br>

参数通过多行字符串的形式传递，字符串中的转义字符串不会被转义。<br>

```javascript
//转义字符
let  str1 = `hello\nic\nkt`;
console.log(str1)
//输出:
//hello
//ic
//kt

//原始字符串
let str2 = String.raw`hello\nic\nkt`
console.log(str2)//输出: hello\nic\nkt
```

<font color=red>转义字符是一个整体，要匹配就应该匹配整体</font>

```javascript
//转义字符
let  str1 = `hello\nic\nkt`;
//不让\n生效，要改成\\n
//  \n转义字符是一个整体，要匹配该整体
console.log(str1.replace(/\n/g,'\\n'));
```

#### 重复字符串

ES6中拓展了repeat方法用于重复输出字符串<br>

&emsp;&emsp;参数就是要重复的次数<br>

&emsp;&emsp;返回值就是重复的结果<br>

&emsp;&emsp;<font color=red>对原字符串没有影响</font>

```javascript
let str = `hello ||`;
console.log(str.repeat(3))//输出: hello ||hello ||hello ||
```

实现：

```javascript
let str = `hello ||`;
//实现repeat
String.prototype.icktRepeat = function(num){
    //this代指字符串
    //定义结果字符串
    var result = ``;
    //循环拼接
    for(var i = 0;i<num;i++){
        resut +=this;
    }
    //返回结果
    return result;
}
console.log(str.icktRepeat(3))//输出: hello ||hello ||hello ||
```

#### 判断字符串位置

startsWith(str, pos)	是否以参数字符串开头<br>

&emsp;&emsp;截取<font color=red>后面</font>的部分，并且<font color=red>包含</font>截取位置字符<br>

&emsp;&emsp;str	参数字符串（子字符串）<br>

&emsp;&emsp;pos	字符串截取位置<br>

&emsp;&emsp;返回值都是布尔值<br>

```javascript
//定义字符串
let str =  "这是一个神奇的网站-我们的"；
//判断开头
console.log(str.startsWith('这是'))；//true
//截取后面的部分，并且包含截取位置字符
console.log(str.startsWith('我们',10))；//true
console.log(str.startsWith('我们',9))；//false
```

endsWith(str, pos)	是否以参数字符串结尾<br>

&emsp;&emsp;截取<font color=red>前面</font>的部分，并且<font color=red>不包含</font>截取位置字符<br>

includes(str, pos)	是否包含参数字符串<br>

&emsp;&emsp;截取<font color=red>后面</font>的部分，并且<font color=red>包含</font>截取位置字符<br>

### 4.数组拓展

ES6中为数字拓展了几个方法： isNaN, isFinite, isInteger<br>

全局中有一个isNaN方法，是用于判断是否是NaN（not a Number）<br>

&emsp;&emsp;全局中的isNaN在判断的时候，<font color=red>会进行类型转换</font><br>

&emsp;&emsp;而Number拓展的isNaN, 在判断的时候不会做类型转换。首先必须是数字，其次才去判断是否是NaN，如果是NaN，返回true，如果不是NaN，返回false<br>

```javascript
var num1 = 0/1;		//0
var num2 = 0/-1;	//-0
var num3 = 1/0;		//Infinity
var num4 = -1/0;	//-Infinity
var num5 = 0/0;		//NaN

console.log(isNaN(num4));		//false
console.log(isNaN(num5));		//true
console.log(isNaN(100.00));		//false
console.log(isNaN('100.00'));	//false
console.log(isNaN(+'100abc'));	//true
console.log(isNaN(parseInt('100abc')));		//false
console.log(isNaN(Math.floor('100abc')));		//true
console.log(isNaN(1/3));		//false
console.log(isNaN(Math.PI));	//false


console.log(Number.isNaN(num4));		//false
console.log(Number.isNaN(num5));		//true
console.log(Number.isNaN(100.00));		//false
console.log(Number.isNaN('100.00'));	//false
console.log(Number.isNaN('100abc'));	//false
console.log(Number.isNaN(+'100abc'));	//true
console.log(Number.isNaN(parseInt('100abc')));		//false
console.log(Number.isNaN(Math.floor('100abc')));	//true
console.log(Number.isNaN(1/3));		//false
console.log(Number.isNaN(Math.PI));	//false
```

<font color=red>0与-0是有区别的</font>

#### isFinite

全局中有一个isFinite方法，用于判断是否有限的<br>

&emsp;&emsp;全局中isFinite在判断的时候，会进行类型转换。<br>

&emsp;&emsp;而Number拓展的isFinite，在判断的时候不会做类型转换。首先必须是数字，其次才去判断是否是有限的，如果有限的返回true，如果不是有限的，则返回false。<br>

#### from

from方法是用于遍历类数组对象，或将类数组对象转换成数组，是数组的静态方法。<br>

&emsp;&emsp;<font color=red>类数组对象：可以通过索引值获取属性值，并且要具备length属性的一类对象。</font><br>

<font color=red>类数组对象不能使用数组的迭代器方法，ES6中拓展的from方法可以将类数组对象转为真正的数组，之后就可以使用数组的常用方法。</font><br>

可以使用数组的常用方法<br>

&emsp;&emsp;使用方式：  Array.from(arrLike, fn)<br>

&emsp;&emsp;&emsp;&emsp;arrLike：类数组对象<br>

&emsp;&emsp;&emsp;&emsp;fn: 执行的函数，有两个参数：成员值，索引值。作用域是全局作用域。<br>

&emsp;&emsp;&emsp;&emsp;如果传递的fn参数，此时，fn方法的返回值是函数的执行结果。<br>

总结：<font color=red>from方法不仅可以将类数组转为数组，还可以遍历类数组对象。</font><br>

```html
<div>1-1-1</div>
<div>2-1-1</div>
<div>3-1-1</div>
<div>4-1-1</div>
<div>5-1-1</div>
<script>
//获取div
    let div = document.getElementsByTagName('div');
    let arr = Array.from(div, function(item, index){
        //返回值影响from方法的运行结果
        return index;
    })
    console.log(arr);//输出：[0,1,2,3,4]
</script>
```

实现:

```javascript
//实现from
Array.icktFrom = function(arrLike, fn){
    //定义返回的数组
    var result = [];
    //遍历类数组对象
    for(var i=0;i<arrLike.length;i++){
        if(fn){
            //将参数传递给fn,存储fn的返回值
            result.push(fn(arrLike[i],i))
        }else{
            //没有fn，直接存储成员
            result.push(arrLike[i])
        }
    }
    return result;
}
```

<font color=red>使用</font>

```javascript
//div变量，Array.icktFrom见上面两端代码
var arr = Array.icktFrom(div, function(item, index){
    item.innerHTML = 'ickt'+index;
    return item;
})
```

#### of

of方法用于创建数组的，是数组的一个静态方法。<br>

&emsp;&emsp;之前通过new Array()或者Array()创建数组有一些问题：<br>

&emsp;&emsp;&emsp;&emsp;1.如果没有传递参数，得到的是一个空数组。<br>

&emsp;&emsp;&emsp;&emsp;2.如果传递了一个数字参数，得到的是带有一个长度的空数组。<br>

&emsp;&emsp;&emsp;&emsp;3.如果传递了一个非数字参数，得到的是带有一个成员的数组。<br>

&emsp;&emsp;&emsp;&emsp;4.如果传递了多个非数字参数，得到的就是一个带有多个参数的数组。<br>

<font color=red>ES6中拓展了of方法可以实现将所有传递的参数都作为数组中的成员存在。</font><br>

创建数组的四种方式：<br>

&emsp;&emsp;字面量[],	构造函数new Array(),	工厂方法：Array(),	Array.of()<br>

实现方法：

```javascript
//实现方法
Array.icktOf = function(){
    //slice方法可以转换数组
    return Array.prototype.slice.call(arguments);
}
```

#### 查找数组

在ES5中拓展了查找成员的方法：indexOf, lastIndexOf<br>

在ES6中拓展了查找成员的方式：find, findIndex<br>

&emsp;&emsp;参数就是执行的函数<br>

&emsp;&emsp;&emsp;&emsp;函数中有三个参数：成员值，索引值，原数组。<br>

&emsp;&emsp;&emsp;&emsp;this默认指向window<br>

find方法在查找成员的时候，如果找到了则<font color=red>返回成员</font>，如果没有找到则返回undefined.<br>

findIndex方法在查找成员的时候，如果找到了则<font color=red>返回该成员的索引</font>，如果没有找到返回-1<br>

<font color=red>在查找的过程中，一旦找到则停止遍历</font>

&emsp;

```javascript
var arr = [1,3,4,6,8,9];
//查找成员
var result = arr.find(function(item, index, arr){
    return item%2 === 0;
});
//查找索引值
var result = arr.findIndex(function(item, index, arr){
    return item%2 === 0;
});

```

#### 数组内部复制

ES6为了实现数组内部成员提供了一个方法：copyWithin<br>

使用方式：<br>

&emsp;&emsp;arr.copyWithin(pos, start, end)<br>

&emsp;&emsp;&emsp;&emsp;pos:	要粘贴的位置。<br>

&emsp;&emsp;&emsp;&emsp;start:	要复制的起始位置（包含起始位置）<br>

&emsp;&emsp;&emsp;&emsp;end:	要复制的结束位置（不包含结束位置）<br>

&emsp;&emsp;&emsp;&emsp;<font color=red>返回值就是原数组，并且原数组发生变化。</font><br>

例如：[0, 1,2,3,4,5,6,7,8,9].copyWithin(3,6,9)

结果：[0,1,2,6,7,8,6,7,8,9]

实现：

```javascript
//实现copyWithin
Array.prototype.icktCopyWithin = function(pos, start, end){
    //截取
    var arr = this.slice(start, end);
    ////粘贴
    //for(var i = 0;i<arr.length;i++){
    //    //更新成员
    //    this[i+pos] = arr[i];
    //}    
    this.splice.apply(this,[pos, end-start].concat(arr))
    //返回原数组
    return this;
} 

```

#### 迭代器方法

ES6中为了遍历数组中成员，拓展了三个迭代器方法：keys，values，entries<br>

&emsp;&emsp;keys:	获取索引值<br>

&emsp;&emsp;values:获取成员值<br>

&emsp;&emsp;entries:获取索引值以及成员值：[index, item]<br>

<font color=red>由于实现了数组的迭代器接口方法，就可以使用for of或者是next方法遍历</font><br>

&emsp;&emsp;实现了迭代器接口的数据，都有next方法，可以通过next方法来遍历成员。<br>

&emsp;&emsp;返回值是一个对象<br>

&emsp;&emsp;&emsp;&emsp;value:表示成员值		done:表示是否遍历完成<br>

&emsp;&emsp;如果遍历完成了，此时：done将永远是true		value将永远是undefined

```javascript
var arr = ['a','b','c','d']

//成员值
var result = arr.values();
console.log(result);//Array Iterator{}
console.log(result.next());//{value:"a",done:false}
console.log(result.next());//{value:"b",done:false}
console.log(result.next());//{value:"c",done:false}
console.log(result.next());//{value:"d",done:true}
console.log(result.next());//{value: undefined,done:true}

```





### 5.数学对象拓展

就是对Math对象的拓展，<br>

ES6为了适应大型项目，解决自身运算的问题，拓展了大量的方法。<br>

&emsp;&emsp;Math.cbrt:计算一个数的立方根。<br>

&emsp;&emsp;Math.fround:返回一个数的单精度浮点数型式。<br>

&emsp;&emsp;Math.hypot:返回所有参数的平方和的平方根。<br>

&emsp;&emsp;Math.expm1(x):返回ex-1。<br>

&emsp;&emsp;Math.log1p(x):返回1+x的自然数对数。如果x小于-1，返回NaN。<br>

&emsp;&emsp;Math.log10(x):返回以10为底的x的对数。如果x小于0，则返回NaN。<br>

&emsp;&emsp;Math.log2(x):返回以2为底的x的对数<br>

三角函数方法<br>

&emsp;&emsp;Math.sinh(x)返回x的双曲正弦，Math.cosh(x)返回x的双曲余弦，Math.tanh(x)返回x的双曲正切，Math.asinh(x)返回x的反双曲正弦，Math.acosh(x)返回x的反双曲余弦，Math.atanh(x)返回x的反双曲正切<br>Math.sign返回一个数字的标志，用来判断数字范围的:

(0, Infinity] => 1, 	[-Infinity, 0)=>-1, 	0=>0,	-0=>-0,	 NaN=>NaN<br>

### 6.对象拓展

#### 对象字面量

对象字面量： let obj={}<br>

省略语法：<br>

&emsp;&emsp;1.如果定义的属性名称与属性变量同名，我们可以省略属性名称以及冒号。<br>

&emsp;&emsp;2.可以对属性名称书写表达式，通过[]来动态的设置属性名称。<br>

&emsp;&emsp;3.在对象中定义的方法可以省略冒号以及function关键字。<br>

```javascript
//变量
let color = 'red';
//对象
let obj = {
    //color:color,
    //1.如果定义的属性名称与属性变量同名，我们可以省略属性名称以及冒号
    color,
    //2.可以对属性名称书写表达式，通过[]来动态的设置属性名称
    [color.toUpperCase()+'_hello']:200,
    //3.在对象中定义的方法可以省略冒号以及function关键字
    getColor(){
        return this.color;
    }
}
console.log(obj);
//输出:
//{color: "red", RED_hello: 200, getColor: ƒ}
//RED_hello: 200
//color: "red"
//getColor: ƒ getColor()
//__proto__: Object
```

#### Object.is

Object.is方法用于判断两个参数是否全等（===）<br>

全等判断(===)有几个问题：<br>

&emsp;&emsp;1.	0与 - 0在之前进行全等判断的时候，得到的是true<br>

&emsp;&emsp;&emsp;&emsp;0与-0之间是差了一个符号位，在二进制中，存储的数据是不同的（0：00000000，-0:10000000）。<br>

&emsp;&emsp;2.	NaN与NaN在进行全等判断的时候，得到的是false，所有的NaN表示“不是一个数字”，它们存储的地址是一样<br>

处了上面的两个问题外，Object.is与全等（===）是完全一致的。

对象拓展的is方法：

&emsp;&emsp;在判断0和-0的时候，得到的是false<br>

&emsp;&emsp;在判断NaN的时候，得到的是true<br>

#### assign

ES6拓展的assign是用于复制对象的，和jQuery，undescore中的extend方法类似。<br>

&emsp;&emsp;使用方式：Object.assign(obj, obj1, obj2)<br>

&emsp;&emsp;&emsp;&emsp;obj: 被复制的目标对象		从第二个参数开始，都是复制的对象		返回值是目标对象obj<br>

&emsp;&emsp;<font color=red>注意：后面对象中的同名属性会覆盖前面对象中的属性。</font>

assign方法实现的是一个浅复制：<br>

&emsp;&emsp;<font color=red>浅复制： 值类型是直接复制，而引用类型是复制引用变量存储的地址（指向同一个对象），没有真正的复制</font><br>

&emsp;&emsp;<font color=red>深复制：值类型是直接复制，引用类型也是直接复制，并不是指向同一对象（函数除外），对象嵌套对象时会递归的深复制下去。</font><br>



<font color=red>实现浅复制assign</font>

```javascript
//实现assign(浅复制)
Object.icktAssign = function(target){
    //遍历后面的参数对象
    for(var i =1; i< arguments.length; i++){
        //获取当前参数对象
        var obj = arguments[i];
        //将obj中的属性复制给target
        for(var key in obj){
            //复制
            target[key] = obj[key];
        }
    }
    //返回目标对象
    return target;
}
```

jQuery中的extend方法第一个参数传递true的时候就是深复制(内部会递归调用)。<br>

<font color=red>简单实现深复制：JSON.parse(JSON.stringify)，但是转换json字符串的时候，会过滤掉函数，这种方法的深复制适用于深复制没有函数的对象</font><br>

```javascript
var obj3 = {
    color:'red',
    num: 1,
    object1:{
        a:0,
        b:3
    }
    getColor: function(){
        return this.color;
    }
}

//深复制，会过滤掉函数
var obj = JSON.parse(JSON.stringify(obj3));//obj3中除了getColor没有被复制给obj外，其他的都深复制给了obj，这种方法的深复制适用于深复制没有函数的对象
```

### 7.for of循环

for of循环是ES6专门为实现了迭代器接口的对象设计的循环结构。<br>

&emsp;&emsp;<font color=red>for of是专门为迭代器接口设置的遍历方法。语法：for(let item of data){}</font><br>

&emsp;&emsp;<font color=red>可以像其他循环一样在内部使用continue,break等关键字。</font><br>

&emsp;&emsp;<font color=red>for of也是可以遍历数组的，但是在遍历过程中，无法使用索引值</font><br>

&emsp;&emsp;&emsp;&emsp;遍历数组的时候，item表示数组的每一个成员，没有办法访问索引值，但是我们可以在外部定义一个循环变量，在循环体中手动更新，for of循环遍历数组的时候，不需要通过索引值访问成员，而for循环以及for in循环要通过索引值访问。<br>

&emsp;&emsp;<font color=red>for in也可以遍历数组，但是有一些问题：遍历的时候，key显示的是字符串，不是数字</font>

总结：**<font color=red>for循环用于遍历数组，for in循环用于遍历对象， for of循环遍历实现了迭代器接口的对象（包括数组）</font>**

```javascript
var arr = ['a','b','c','d']

//成员值
var result = arr.values();
console.log(result);//Array Iterator{}
//循环
for(var item of result){
    console.log(item);
}

```











## 新语法

### 解构

所谓解构就是解构聚合数据的结构<br>

&emsp;&emsp;在ES5中的聚合数据有：对象，数组<br>

&emsp;&emsp;在之前，对象中获取数据的方式只能通过点语法或者中括号语法<br>

&emsp;&emsp;在之前，数组中获取数据的方法只能通过中括号语法<br>

在ES6中简化了获取数据的方式，提供了解构语法：对象结构与数组解构。<br>









