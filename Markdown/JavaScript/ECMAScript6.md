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

#### 判断是否有限(isFinite)

全局中有一个isFinite方法，用于判断是否有限的<br>

&emsp;&emsp;全局中isFinite在判断的时候，会进行类型转换。<br>

&emsp;&emsp;而Number拓展的isFinite，在判断的时候不会做类型转换。首先必须是数字，其次才去判断是否是有限的，如果有限的返回true，如果不是有限的，则返回false。<br>

#### 将类数组对象转换成数组(from)

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

#### 创建数组(of)

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

#### 查找数组(find, findIndex)

在ES5中拓展了查找成员的方法：indexOf, lastIndexOf<br>

在ES6中拓展了查找成员的方式：find, findIndex<br>

&emsp;&emsp;参数就是执行的函数<br>

&emsp;&emsp;&emsp;&emsp;函数中有三个参数：成员值，索引值，原数组。<br>

&emsp;&emsp;&emsp;&emsp;this默认指向window<br>

find方法在查找成员的时候，如果找到了则<font color=red>返回成员</font>，如果没有找到则返回undefined.<br>

findIndex方法在查找成员的时候，如果找到了则<font color=red>返回该成员的索引</font>，如果没有找到返回-1<br>

<font color=red>在查找的过程中，一旦找到则停止遍历</font>

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

实现find：

```javascript
Array.prototype.icktFind = function(fn){
    //从左往右寻找成员
    for(var i=0;i<this.length;i++){
        //fn返回值就是判断的条件
        if(fn(this[i], i, this)){
            //找到了终止循环，返回成员值
            return this[i]
        }
    }
    return undefined;
}

var arr = [1,3,5,2,4,6]
var result = arr.icktFind(item=>{
    //console.log(item);
    return item%2 === 0;
})
console.log(result)
```

实现findIndex：

```javascript
Array.prototype.icktFindIndex = function(fn){
    //从左往右寻找成员
    for(var i=0;i<this.length;i++){
        //fn返回值就是判断的条件
        if(fn(this[i], i, this)){
            //找到了终止循环，返回成员值
            return i;
        }
    }
    return -1;
}

var arr = [1,3,5,2,4,6]
var result = arr.icktFindIndex(item=>{
    //console.log(item);
    return item%2 === 0;
})
console.log(result)
```







#### 数组内部复制(copyWithin)

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

#### 迭代器方法(keys,values,entries)

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

**<font color=red>assign的应用</font>**

给原型赋值

```JavaScript
function Player(x,y){
    this.x = x;
    this.y = y;
}

Object.assign(Player.prototype,{
    getPositionX(){
        return this.x;
    },
    getPositionY(){
        return this.y;
    },
    ...
})
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

### 8.函数拓展

#### 默认参数

在之前适配默认参数的方式：<br>

1.可以通过||运算符适配参数的默认值<br>

&emsp;&emsp;但是使用||运算符会忽略6个值为false的参数：0 '' undefined null false NaN<br>

2.可以使用三元运算符：? : 。如果参数过多，书写比较麻烦<br>

3.使用extend | assign方法适配对象，对于值类型的参数不适用。<br>

```javascript
function demo(color){
    //1 || 适配默认值  会忽略6个值为false的参数：0 '' undefined null false NaN
    //color= color || 'red';
    //2 三元运算符适配，如果参数很多，会很麻烦
    color = color===undefined?'red':color;
    console.log(color);
}
```



在ES6中为了解决这样的问题，提供了适配默认参数的方式，直接在参数集合中为形参赋值即可<br>

&emsp;&emsp;如果传递了参数，则使用传递的参数<br>

&emsp;&emsp;如果没有传递参数，则使用默认参数<br>

ES6拓展的适配默认参数的方式与三元运算符的方式是等价的。<br>

```javascript
function demo(color='pink'){
    //1 || 适配默认值
    //color= color || 'red';//会忽略6个值为false的参数：0 '' undefined null false NaN
    //2 三元运算符适配，如果参数很多，会很麻烦
    //color = color===undefined?'red':color;//如果参数过多，书写比较麻烦
    console.log(color);
}
```

#### 获取剩余参数(建议先看下面的解构再看这个)

在之前我们可以通过arguments来获取所有参数，但是arguments是一个类数组对象，不能使用数组的常用方法，于是ES6拓展了获取剩余参数语法，获取的剩余参数是一个数组，所以可以直接使用数组的常用方法。<br>

语法：function demo(arg1, arg2, ...args){}，其中arg1表示第一个参数，arg2表示第二个参数，args表示剩余的参数。<br>

获取剩余参数的语法：<br>

&emsp;&emsp;1.如果有剩余的参数，获取到的是一个有所有剩余参数组成的数组。<br>

&emsp;&emsp;2.如果没有剩余的参数，获取到的是一个空数组。<br>

&emsp;&emsp;3.前面参数可以正常使用，前面的参数如果没有对应的参数则是undefined。<br>

&emsp;&emsp;4.在箭头函数中广泛的应用。<br>

```javascript
//求参数之和
function add(){
    //根据argument求和
    var result = 0;
    for(var i=0;i<arguments.length;i++){
        result+=arguments[i]
    }
    return result;
}
或
function add(...nums){
    return nums.reduce(function(res,item){
        return res+item
    })
}
console.log(add(1,2,3,4,5,6,7,8,9));
```

<font color=red>获取剩余参数的语法逆应用：</font>

语法：demo(..args)<br>

&emsp;&emsp;我们可以将一个数组中的成员，作为参数传递到一个方法中<br>

&emsp;&emsp;在之前我们可以通过apply方法，将数组中的每一项数据传递到一个方法中。<br>

&emsp;&emsp;&emsp;&emsp;但是使用apply需要考虑this的指向问题。<br>

&emsp;&emsp;我们可以使用获取剩余参数的语法，就不需要考虑this指向的问题了，正常执行函数。<br>

```javascript
function add(...nums){
    return nums.reduce(function(res,item){
        return res+item
    })
}
var arr = [1,2,3,4,5];
//通过apply
var result = add.apply(null, arr);
或
//三点语法传递
let result = add(...arr);
console.log(result);
```

实现copyWithin<br>

```javascript
Array.prototype.icktCopyWithin = function(pos, start, end){
    //return this.splice.apply(this,[pos,end-start].concat(this.slice(start,end))), this;
    return this.splice(...[pos,end-start,...this.slice(start,end)]),this;
}
//测试
var result = arr.icktCopyWithin(2,5,8);
console.log(result, arr, result===arr);
```

#### 箭头函数

在ES5中定义函数的方式：1.函数定义式，2.函数表达式，3.构造函数式<br>

在ES6中又拓展了一种方式：箭头函数<br>

语法：let demo = ()=>{}<br>

&emsp;&emsp;():表示参数集合	=>:是箭头函数的标志	{}：是函数体<br>

几点省略语法：<br>

&emsp;&emsp;1.如果参数集合中只有一个参数，即可省略参数集合。<br>

&emsp;&emsp;&emsp;&emsp;如果使用三个点语法获取剩余参数或者是解构语法，不能省略参数集合。<br>

```javascript
//1.省略参数集合
let print1 = (msg)=>{
    console.log(msg);
}
//只有一个参数省略参数集合
let print2 = msg=>{
    console.log(msg);
}
print2('hello')
//获取剩余参数语法不能省略
let print3 = (...args)=>{
    //三个点语法逆运用
    console.log(...args);
}
print(100, 'hello', true)
//解构语法不能省略
let print4 = ({msg})=>{
    console.log(msg);
}
print4({color:'red',msg:'hello'})//输出：hello
```



&emsp;&emsp;2.如果函数中只有一句话，或者只有返回值的时候，可以省略return以及函数体。<br>

```javascript
let arr=[1,3,5,7,9]
let result = arr.map(item=>item*item)
console.log(result)
```



箭头函数的特点：<br>

1.无法使用arguments，但是我们可以使用三个点语法获取剩余参数。

```javascript
let add1 =(...args)=>{
    //console.log(arguments);
    //console.log(args);
    return args.reduce((res,item)=>res+item);
}
//简化
let add2 = (...args)=>args.reduce((res,item)=>res+item)
console.log(add2(1,2,3,4,5))
```

2.无法作为构造函数来使用。之所以不行是因为下面的第3点中this的问题。

```javascript 
//箭头函数不能作为构造函数
let Player = (x,y)=>{
    this.x = x;
    this.y = y;
}
let p = new Player(100,200);//报错
```

3.箭头函数中的this指向永远是<font color=red>**定义时的（定义它时的父级作用域，也就是说其外部函数的this对象（你也可以这么理解箭头函数没有this，所以它当中的this是它父级的））**</font><br>

&emsp;&emsp;在普通函数中，this是<font color=red>执行时的</font>上下文对象，谁调用指向谁。

&emsp;&emsp;<font color=red>无论使用call, apply或者是bind方法都无法改变箭头函数的this指向</font><br>

&emsp;&emsp;<font color=red>改变箭头函数的this指向的唯一的方式就是改变其宿主环境this</font><br>

&emsp;&emsp;<font color=red>也就是说改变其外部函数的this对象</font><br>

&emsp;&emsp;<font color=red>**普通模式与严格模式最外层的this始终指向window**</font>



```javascript
function demo1(){
    console.log(this)//this指向window
}
demo1()//输出：window对象

var demo2 = ()=>{
    console.log(this)//this指向window
}
demo2()//输出：window对象
```

```javascript
function demo1(){
    console.log(this)//this指向undefined
}
demo1()//输出：undefined
var demo2 = ()=>{
    console.log(this)//this指向window
}
demo2()//输出：window对象
```

```javascript
//使用'use strict'与不使用，在本例中，结果是一样的。
function fn1(){
    console.log('fn1',this)
}
var obj = {
    msg:'outer',
    fn1,
    fn2:function(){
        console.log('fn2',this);
    },
    fn3(){
        console.log('fn3',this);
    },
    fn4:()=>{
        console.log('fn4',this);
    },
    fn5:function(){
        console.log('fn5',this);
        var fn6 = ()=>{
            console.log('fn6', this)
        }
        fn6();
    },
    ickt:{
        msg:'inner',
        fn7:function(){
            console.log('fn7',this);
        },
        fn8:()=>{
            console.log('fn8',this);
        }
    }
}

//执行函数,					this指向
obj.fn1();//    			obj
obj.fn2();//				obj
obj.fn3();//				obj
obj.fn4();//				window
obj.fn5();//				'fn5' obj  'fn6' obj
obj.ickt.fn7();//			ickt
obj.ickt.fn8();//			window
obj.ickt.fn8.call(demo);//	window
```



切记JS中普通模式嵌套函数中this指向window，严格模式下嵌套函数中this指向undefined;

```javascript
var obj ={
    fn1(){
    	console.log('fn1',this)
    	function fn2(){
    	     console.log('fn2',this)
    	}
    	fn2()
	}
}
obj.fn1()//输出：  fn1 obj对象   fn2 window对象
```

```javascript
'use strict'
var obj ={
    fn1(){
    	console.log('fn1',this)
    	function fn2(){
    	     console.log('fn2',this)
    	}
    	fn2()
	}
}
obj.fn1()//输出：  fn1 obj对象   fn2 undefined对象
```









## 新语法

### 1.解构

所谓解构就是解构聚合数据的结构<br>

&emsp;&emsp;在ES5中的聚合数据有：对象，数组<br>

&emsp;&emsp;在之前，对象中获取数据的方式只能通过点语法或者中括号语法<br>

&emsp;&emsp;在之前，数组中获取数据的方法只能通过中括号语法<br>

在ES6中简化了获取数据的方式，提供了解构语法：对象结构与数组解构。<br>

#### 对象解构

<font color=red>对象解构，属性名称匹配</font>

语法：let {key1,key2, ...keys}=obj;<br>

key1相当于obj.key1		key2相当于obj.key2<br>

keys获取的是剩余的属性，如果没有剩余的属性，获取到的就是一个空对象。<br>

注意：<font color=red>解构出来的属性，变量一定是和对象中的属性是同名的。</font><br>

解构问题：<br>

1.如果使用var解构，会污染全局对象（window），我们可以使用let关键字解决。<br>

2.解构出来的方法，方法中的this将发生变化。<br>

3.对于引用类型来说，知识指向的改变，对于值类型来说，是真正的复制。<br>

<font color=red>逆应用：我们可以通过三个点语法，将一个对象中的所有数据传递给一个对象字面量中：{..., keys}。</font><br>

<font color=red>**由于解构出来的数据会创建全局变量，因此工作中，常常配合模块化开发去使用（相当于局部变量）**</font>

```javascript
//定义对象
var obj = {
    num:100,
    color:'red',
    arr:[1,2,3],
    size:{
        width:100,
        height:200
    },
    demo(){
        console.log(this, 'demo');
    },
    
    
}
//解析值类型的是复制，解析引用类型的是指向改变（引用同一个）
let {num, color, demo,...ickt} = obj;
console.log(num, color, ickt);//obj对象的arr,size都存储在ickt中
console.log(window.num)//undefined,因为使用了let，但如果使用的是var则可以访问的到
demo()//输出：window，'demo'。因为demo中的this发生改变，正常模式下指向window，严格模式下指向undefined。
```

解构语法的应用<br>

```javascript
let {num, color, demo, ...ickt} = obj;
//注意，num和color是对象字面量的省略语法，...ickt是结构的逆应用
var newObj = {num, color, ...ickt};
console.log(newObj, ickt);
```

#### 数组解构

<font color=red>数组解构，索引值匹配（位置对应）</font><br>

语法：let [item1, item2, ...items] = arr;<br>

&emsp;&emsp;item1表示第一个成员	item2表示第二个成员	items表示剩余的成员<br>    <font color=red>注意：item1和item2有对应的成员返回该成员，没有返回undefined</font><br>

注意：如果使用var解构，也会污染全局对象（window），我们可以通过let关键字解决。<br>

获取剩余成员的语法：<br>

&emsp;&emsp;1.如果数组有剩余的成员，获取到的是数组中所有的剩余成员。<br>

&emsp;&emsp;2.如果没有剩余的成员，获取到的是一个空数组。<br>

&emsp;&emsp;3.前面结构的变量，可以正常使用。<br>

逆运用：我们可以通过三个点语法，将一个数组中的所有数据传递到一个数组字面量中，[...arr] (复制数组)。<br>

```javascript
var arr = ['red','green','blue','pink','orange','gold','yellow','gray']
//解构
let [a1, a2, ...items] = arr;
console.log(a1)//red
console.log(a2)//green
console.log(items)//'blue','pink','orange','gold','yellow','gray'	
//复制数组
var newArray = [..items];
console.log(newArray,items,newArray===items);
//输出：'blue','pink','orange','gold','yellow','gray'		'blue','pink','orange','gold','yellow','gray'
//false
```

#### 解构总结

解构指的是等号左侧的部分，逆应用是等号右侧的部分（例如：复制数据）。<br>

解构：<br>

&emsp;&emsp;对象解构，属性名称匹配<br>

&emsp;&emsp;数组解构，索引值匹配（位置对应）<br>



### 2.表示独一无二的数据Symbol

在js中有6中数据类型：数字，字符串，布尔值，undefined，null，对象<br>

在ES6中又添加了一种数据类型：Symbol数据类型，<font color=red>表示独一无二的数据</font><br>

```javascript
let s1 = Symbol('ickt');
let s2 = Symbol('ickt');
console.log(s1===s2)//false
```

&emsp;&emsp;我们可以通过Symbol方法创建Symbol数据，参数就是对Symbol数据的描述，但是结果不受影响。<br>

&emsp;&emsp;我们可以通过typeof查看Symbol数据类型。如果参数传递的是对象，默认会调用其toString方法。<br>

```javascript
let obj = {
    color:'red',
    //重写toString
    toString(){
        return 'hello'
    }
}
let s5 = Symbol(obj)
console.log(s5)//Symbol(hello)
```

<font color=red>Symbol数据类型的出现是为了避免对象中同名属性被覆盖的问题：</font><br>

```javascript
let s1 = Symbol();
let s2 = Symbol();
let objS = {
    color:'red',
    num: 100
}
//添加Symbol属性
objS[s1] = 'green'
objS[s2] = 'blue'
console.log(objS);//{color: "red", num: 100, Symbol(): "green", Symbol(): "blue"}
```

&emsp;&emsp;我们通过Symbol创建的数据类型，就可以避免对象中同名属性被覆盖的问题。<br>

&emsp;&emsp;Symbol创建的数据不能通过for in的方式查看，也不能通过Object.keys查看数据。<br>

```javascript
for(let key in objS){
	console.log(key, objS[key])
}
//输出：color red
```

&emsp;&emsp;只能通过Object.getOwnPropertySymbols查看数据(Object.keys用来获取对象中所有的属性数据的)<br>

```javascript
console.log(objS[s1])//输出：green
console.log(objS[s2])//输出：blue
```

&emsp;&emsp;还可以通过变量，查看对应的数据类型。<br>

```javascript
var keys = Object.getOwnPropertySymbols(obj);
console.log(keys)//[Symbol(), Symbol()]
```

<font color=red>对象中三种获取属性方法</font>

**Object.keys											    //获取自身属性（不包括，不能枚举的，以及symbol数据）**

**Object.getOwnPropertySymbols			//获取自身Symbol属性（不包括，普通属性以及设置了特性的属性）**

**Object.getOwnPropertyNames		  //获取自身属性,可以获取不能枚举的属性（不包括symbol数据）**



### 3.代理Proxy

在一个系统中，总要在一个对象中，存储一些数据，对于这些数据，可能有一些是希望我们访问的，但是总有一些是重要的，不希望我们访问的，希望保护起来，因此ES6新增了代理，实现这一特征。<br>

语法 通过Proxy实现：new Proxy(obj, {set, get})<br>

&emsp;&emsp;第一个参数： obj表示被代理的对象。<br>

&emsp;&emsp;第二个参数： {set, get}表示操作被代理对象的对象。<br>

&emsp;&emsp;&emsp;&emsp;get(obj, key)表示取值方法：<br>

&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;obj表示被代理的对象			key表示获取的属性<br>

&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;返回值很重要：就是获取的数据			this指向操作对象<br>

&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<font color=red>注意：绝对不能在get中获取代理对象(proxy)的key属性(否则死循环)。</font>

&emsp;&emsp;set(obj, key, value)表示赋值方法：<br>

&emsp;&emsp;&emsp;&emsp;obj表示被代理的对象		key表示修改的属性		value表示修改的属性值<br>

&emsp;&emsp;&emsp;&emsp;this指向操作对象		不需要返回值。<br
&emsp;&emsp;&emsp;&emsp;<font color=red>注意：绝对不能在set里面修改代理对象（proxy）的key属性</font><br>

代理跟特性很像<br>

&emsp;&emsp;**特性是对同一个对象的操作，数据不能在当前属性下存储，存储在备份中。**<br>

&emsp;&emsp;**代理是对不同的对象的操作，数据可以直接存储在当前属性下，原对象属性可以发生改变。**<br>

**代理就是通过操作一个对象来保护另一个对象**

```javascript
//定义对象
let star = {
    name: '赵丽颖',
    boyFriend:'冯绍峰'
}
//代理人
var proxy = new Proxy(star, {
    color:'red',
    //取值器方法
    get(obj, key, proxy){
        //不能获取敏感信息
        if(key === 'boyFriend'){
            return '这是个秘密'
        }
        //返回信息
        return obj[key];
    },
    //赋值器方法
    set(obj, key, value, proxy){
        //敏感的信息拦截掉
        if(key === 'boyFriend'){
            return
        }
        //公开数据可以修改
        obj[key] = value;
    }
})
//修改数据
proxy.name = '小美女'
proxy.boyFriend = '来了'
//获取信息
console.log(proxy.name);
console.log(proxy.boyFriend);
```

### 4.Reflect

Reflect是对对象中一些操作方法的封装<br>

在之前，对象中的所有方法都给了Object，这些方法都属于内部语言方法，于是将这些方法拿出来给了Reflect，因此以后调用这些方法的时候，就可以通过Relect来调用了。<br>

所以，在未来对象中的方法可能被移除，给了Reflect，例如：<br>

&emsp;&emsp;之前定义特性的方式：Object.defineProperty，现在定义特性的方式：Reflect.defineProperty<br>

Reflect允许对一些操作符当做方法去执行：<br>

&emsp;&emsp;has:代替in运算符，检查某个属性是否存在		deleteProperty:删除对象中某一个属性<br>

&emsp;&emsp;getOwnPropertyDescriptor:获取某个属性的描述特性对象<br>

&emsp;&emsp;get:获取数据			set设置数据

```javascript
console.log(Reflect);
//apply: ƒ apply()
//construct: ƒ construct()
//defineProperty: ƒ defineProperty()
//deleteProperty: ƒ deleteProperty()
//get: ƒ ()
//getOwnPropertyDescriptor: ƒ getOwnPropertyDescriptor()
//getPrototypeOf: ƒ getPrototypeOf()
//has: ƒ has()
//isExtensible: ƒ isExtensible()
//ownKeys: ƒ ownKeys()
//preventExtensions: ƒ preventExtensions()
//set: ƒ ()
//setPrototypeOf: ƒ setPrototypeOf()
//__proto__: Object
```

### 5.聚合数据

在ES5中的聚合数据有： 对象和数组。<br>

在ES6中又添加了四种聚合数据：Set,  WeakSet,  Map,  WeakMap<br>

<font color=red>**所以在ES6中总共有六中聚合数据：对象，数组，Set，WeakSet，Map，WeakMap**</font>

#### 聚合数据set

Set是实现了迭代器接口的去重数据<br>

&emsp;&emsp;在去重的时候不会做类型转换。<br>

&emsp;&emsp;由于Set对象实现了数组迭代器接口，所以可以使用for of 语句遍历该对象。<br>

内部提供了大量的方法用于操作该对象，属性以及方法如下:<br>

&emsp;&emsp;size:	获取数据的长度（属性）		has:		判断是否包含某个属性<br>

&emsp;&emsp;add:	添加数据								  delete：删除某项数据<br>

&emsp;&emsp;clear: 清空数据								forEach:用于遍历数据<br>

&emsp;&emsp;keys, values, entries是用于获取迭代器接口<br>

**数组去重**：

```javascript 
//数组去重

var arr = [1,2,2,3,1,2,3];
//创建set对象
var s1 = new Set(arr);
//将set对象转成数组，使用三个点语法
console.log([...s1])
```



#### 聚合数据-WeakSet

WeakSet对象是弱set对象，<font color=red>**成员只能是引用类型数据**</font><br>

&emsp;&emsp;注意：不能添加空对象null<br>

由于是弱set对象，因此存在的方法较少，只有添加add, 删除delete，判断has是否用于三个方法。

其它size属性，forEach，clear， keys， entries， values等方法都不存在了<br>

内部提供的方法：<br>

&emsp;&emsp;delete: 删除数据<br>

&emsp;&emsp;has: 判断是否包含某个属性<br>

&emsp;&emsp;add:添加数据<br>

<font color=red>**由于weakset不能被垃圾回收机制自动回收，因此要慎用**</font>

```javascript
//创建weakset对象
let ws1 = new WeakSet([window,[],[],{},function(){}])
console.log(ws1);
//输出：WeakSet {{…}, Array(0), Array(0), ƒ, Window}
//数组没有被去重，原因是这两个数组都是引用类型的数据，不是同一个数组，不能去重

let arr = []
let ws2 = new WeakSet([window,arr,arr,{},function(){}])
console.log(ws2);//输出:WeakSet {ƒ, Array(0), Window, {…}}  这样数组去重了

```



#### 聚合数据-Map

Map是一个超级对象<br>

&emsp;&emsp;传统的对象所有属性名称都必须是字符串<br>

&emsp;&emsp;但是Map对象中，<font color=red>**定义的属性名称可以是任意类型（7中类型都可以）**</font><br>

&emsp;&emsp;通过new  map创建map对象，实现了迭代器接口对象，因此可以使用 for of循环遍历<br>

内部也提供了单量的方法用于操作该对象，属性以及方法如下：

```javascript
size: 获取数据的长度（属性）	has：判断是否包含某个属性	delete：删除某项数据	clear：清空数据
get： 获取数据				set：设置数据			forEach：用于遍历数据
keys,values,entries是用于获取迭代器接口
```

```javascript
//定义对象
var obj = {
    null:100,
    window:200,
    [null]:300,
    [window]:400
}
console.log(obj)
//结果：下面的null, window, [object window]都是字符串。
// null对应 null   window对应window  [null]添加不了  [window]对应[object window]
//{null: 300, window: 200, [object Window]: 400


//超级对象
let m = new Map();
//添加属性
m.set(window, 100)
m.set(true, 200)
m.set(undefined, 300)
m.set(null, 400)
m.set(()=>{},500)
console.log(m);
//结果：
//[[Entries]]
//0: {Window => 100}
//1: {true => 200}
//2: {undefined => 300}
//3: {null => 400}
//4: {()=>{} => 500}
//size: (...)
//__proto__: Map
```

#### 聚合数据-WeakMap

WeakMap对象是弱map对象，属性名称智能是引用类型的数据<br>

&emsp;&emsp;注意：不能添加空对象null<br>

由于是弱map对象，因此少了很多方法，只有set, get, delete, has方法，其余的size属性，forEach,keys, values, entries, clear等方法都不存在了<br>

内部提供操作该对象的方法：<br>

```javascript 
has：判断是否包含某个属性	delete：删除某项数据
get： 获取数据				set：设置数据
```

<font color=red>**由于weakmap不能被垃圾回收机制自动回收，因此要慎用**</font>

### 6.迭代器接口

 在ES6中，只实现了迭代器接口（Symbol.iterator），并没有实现迭代器接口类，有四种情况会实现迭代器接口。<br>

&emsp;&emsp;1 使用迭代器接口方法的时候，如keys, values, entries等。<br>

&emsp;&emsp;2. 在解构的时候。<br>

&emsp;&emsp;3.在创建map，set对象的时候。<br>

&emsp;&emsp;4.在使用for of循环的时候。<br>

迭代器的作用：<br>

&emsp;&emsp;1.定义了我们访问数据的次序。	2.为for of提供了访问数据的方式。<br>

&emsp;&emsp;3.让所有数据具备统一的接口，可以方便而快捷的获取数据。<br>

<font color=red>注意：类数组对象实现了迭代器接口(但自定义的类数组对象没有迭代器接口)，对象没有实现迭代器接口。</font><br>

```html
<div>1</div>
<div>2</div>
<div>3</div>
<div>4</div>
<script>
//类数组对象实现了迭代器接口
//获取div
    var divs = document.getElementsByTagName('div');
    console.log(divs);
    //遍历
    for(let item of divs){
        console.log(item);
    }
    
    //定义函数
    function demo(){
        console.log(arguments);
        for(let item of arguments){
        	console.log(item);
    	}
    }
    demo(1,2,3)
</script>
```

类数组对象：可以通过索引值访问数据，有length属性。但自定义的类数组对象只有实现了迭代器接口才能使用for of遍历等，否则不行。

<font color=red>**定义有迭代器接口的类数组对象**</font>

```javascript
//自定义类数组对象
var arrLike1 = {
    0:'red',
    1:'green',
    2:'blue',
    length:3,
    //为了使用for of 循环，实现迭代器接口
    //引用数组迭代器接口
    [Symbol.iterator]:Array.prototype[Symbol.iterator]
}

//自定义类数组对象
var arrLike2 = {
    0:'red',
    1:'green',
    2:'blue',
    length:3,
    //为了使用for of 循环，实现迭代器接口
    //引用数组迭代器接口
    [Symbol.iterator](){
        //定义当前的索引值
        let index=0;
        //返回一个具有next方法的对象
        return {
            //利用箭头函数，让内外this相等
            next:()=>{
                //判断是否超出长度
                if(index<this.length){
                    //正确返回，没有遍历完成
                    //每次迭代都要更改this
                    return {value:this[index++],done:false}
                }else{
                    //遍历完成done是true，value是undefined
                    return {done:true,value:undefined}
                }
            }
        }
    }
}

//遍历
for(let item of arrLike2){
    console.log(item);
}
```

### 7.Promise规范

#### 规范

Promise是将异步写法变成同步写法的规范<br>

&emsp;&emsp;只是写法的改变，操作并没有改变<br>

&emsp;&emsp;异步操作：在回调函数中，一层嵌套一层。<br>

&emsp;&emsp;同步操作：将方法写在外部<br>

三个状态：<br>

&emsp;&emsp;pending 表示等待状态		resolved 表示操作执行成功	rejected 表示操作执行失败<br>

状态的流向：在Promise中状态有两个方向的流向：<br>

&emsp;&emsp;状态由pending流向resolved，说明操作执行成功完毕<br>

&emsp;&emsp;状态由pending流向reject，说明操作执行失败完毕<br>

<font color=red>**对Promise的理解可以类比成事件的机制，resolved, reject触发事件，then捕获事件**</font>

#### 语法

语法： new Promise((resolve,reject)=>{回调函数中执行异步操作})<br>

&emsp;&emsp;如果操作执行成功执行resolve方法   如果操作执行失败执行reject方法<br>

在外部通过then方法监听状态的改变<br>

&emsp;&emsp;then(success, fail)该方法接收两个参数<br>

&emsp;&emsp;&emsp;&emsp;success:表示成功的时候执行的回调函数，参数是由resolve方法执行的时候传递的参数（只能传递一个）。<br>

&emsp;&emsp;&emsp;&emsp;fail:表示失败时候执行的回调函数，参数时由reject方法执行的时候传递的参数（只能传递一个）<br>

<font color=red>**then方法的 返回值是Promise对象，因此，可以链式调用该方法**</font><br>

&emsp;&emsp;上一个then方法的输出，将作为下一个then方法参数的输入。<br>

&emsp;&emsp;如果操作已经执行完毕，then方法也会立即执行。<br>

```javascript
//同步
function demo(){
    console.log('demo run');
}
demo();
console.log('next');

//异步
setTimeout(()=>{
    console.log('异步demo1 run');
    setTimeout(()=>{
          console.log('异步demo2 run');
    },1000)
},1000)
console.log('next1')
```

异步存在的问题，异步会嵌套的很深

```javascript
//异步存在的问题，异步会嵌套的很深
setTimeout(()=>{
    console.log('异步demo1 run');
    setTimeout(()=>{
          console.log('异步demo2 run');
          setTimeout(()=>{
              //继续嵌套异步操作
              ...
          }
    },1000)
},1000)
```

<font color=red>**Promise将异步写法变成同步写法。**</font>

```javascript
//将console.log写在异步操作的后面
let p = new Promise((resolve, reject)=>{
    //处理异步(同步也可以安装Promise的写法)
    setTimeout(()=>{
        //成功,传递的参数需要是单个参数，可以将多个参数方在一个数组或对象
        resolve(['操作成功', 100, 200])
        //失败,传递的参数需要是单个参数，可以将多个参数方在一个数组或对象
        //reject({'执行失败',200,false})
    },1000)
})
//操作后面监听结果
p
	.then(
        //成功时候的回调函数
        (...args)=>{
            console.log('success',args);
            return 200
        },
        //失败的时候的回调函数
        (...args)=>{
            console.log('fial',args);
        }
    )
	//链式调用
	.then(
        (...args)=>{
            console.log('第二次执行了',args)
        }
    )
//结果：
//success [Array(3)]
//第二次执行了 [200]
```

**简单实现Promise（有瑕疵，但足以应付面试）**

```javascript
//实现Promise
function IcktPromise(callback){
    //维护状态
    this.status = 'pending';
    //存储回调函数
    this.successArray = [];
    this.failArray = [];
    
    //定义resolve和reject方法
    //成功
    let resolve = value=>{
        //改变状态
        this.status = 'resolved';
        //执行回调函数
        this.successArray.forEach(fn=>value=fn(value));
        //清空函数队列
        this.successArray = [];
        //存储新的value
        this.value = value;
    }
    //失败
    let reject = value=>{
        //改变状态
        this.status = 'rejected';
        //执行函数
        this.failArray.forEach(fn=>value=fn(value));
        //清空队列
        this.failArray = [];
        //存储新的value
        this.value = value;
    };
    
    //执行回调函数
    try {
        callback(resolve, reject)
    }catch(e){
        //有错误就失败了
        reject(e)
    }
}

//原型方法
IcktPromise.prototype.then = function(success, fail){
    //判断当前状态
    if(this.status==='pending'){
        //存储回调函数
        success&&this.successArray.push(success);
        fail&&this.failArray.push(fail);
    } else if(this.status==='resolved'){
        //立即执行
        success&&success(this.value);
    } else{        
        fail&&fail(this.value);
    }
    //链式调用
    return this;
}

//测试，将console.log写在异步操作的后面
let p = new IcktPromise((resolve, reject)=>{
    //处理异步(同步也可以安装Promise的写法)
    setTimeout(()=>{
        //成功,传递的参数需要是单个参数，可以将多个参数方在一个数组或对象
        resolve(['操作成功', 100, 200])
        //失败,传递的参数需要是单个参数，可以将多个参数方在一个数组或对象
        //reject({'执行失败',200,false})
    },1000)
    //由then的定义可以看出，这里正是有setTimeout，p才会先加载后面then中方法，再执行这些方法，then中函数的参数是之前then中函数的返回值。如果没有setTimeout，会直接执行then中的方法，传递给这些函数的参数永远只是['操作成功', 100, 200]。
})
//操作后面监听结果
p
	.then(
        //成功时候的回调函数
        (...args)=>{
            console.log('success，第一次执行了',args);
            return 200
        },
        //失败的时候的回调函数
        (...args)=>{
            console.log('fial，第一次执行了',args);
        }
    )
	//链式调用
	.then(
        (...args)=>{
            console.log('success，第二次执行了',args)
        },
    	(...args)=>{
    	        console.log('fial，第二次执行了',args)
    	 }
    )
//结果：
//success，第一次执行了 [Array(3)]
//success，第二次执行了 [200]
```

#### 监听状态

有三个方法可以监听Promise状态:

&emsp;&emsp;then:可以监听状态成功或者是失败的方法<br>

&emsp;&emsp;&emsp;&emsp;定义多个then方法，此时后一个then方法可以监听前一个then的成功与失败。<br>

&emsp;&emsp;catch:可以监听状态失败时候的方法<br>

&emsp;&emsp;&emsp;&emsp;失败只能被监听一次,但是还可以被后面的then继续监听。<br>

&emsp;&emsp;finally:无论成功还是失败都会执行的方法<br>

&emsp;&emsp;&emsp;&emsp;无法接收数据, 后面的then还可以监听<br>

```javascript
//将console.log写在异步操作的后面
let p = new Promise((resolve, reject)=>{
    //处理异步(同步也可以安装Promise的写法)
    setTimeout(()=>{
        //失败,传递的参数需要是单个参数，可以将多个参数方在一个数组或对象
        reject('执行失败',200,false)
    },1000)
})
//操作后面监听结果
p
	//catch方法监听事变
	//.catch(err=>console.log('失败',err))//可以被下面then中的sucess回调函数监听到
	.catch((err)=>{
    		console.log('catch err')
    		throw new Error('抛出了一个错误')
			})//可以被下面then中的fial回调函数监听到
	.catch(err=>console.log('第二次监听失败',err))
	//链式调用
	.then(
        (...args)=>{
            console.log('success，第一次执行了',args)
        },
    	(...args)=>{
    	        console.log('fial，第一次执行了',args)
    	 }
    )
	.finally(data=>console.log('finally',data))
//结果：
//catch err
//第二次监听失败 Error: 抛出了一个错误
//    at <anonymous>:14:13
//success，第一次执行了 [undefined]
//finally undefined
```

#### all

all方法用于监听多个Promise对象<br>

&emsp;&emsp;参数是一个数组，数组中的每一项都是一个Promise对象。<br>

我们可以通过then方法监听状态的改变<br>

&emsp;&emsp;如果所有操作都执行成功，才会执行success方法。<br>

&emsp;&emsp;如果有一个请求失败，则会执行fail方法。<br>

&emsp;&emsp;不论是成功还是失败，返回值是 数组，数组中的每一个成员对应每一个promise返回的数据。<br>

```javascript
 <button id='btn'>按钮</button>
 <script>
     let btn = document.getElementById('btn')
     var p1 = new Promise((resolve,reject)=>{
     setTimeout(()=>{
             console.log('第一个异步操作执行完毕')
             //成功
             resolve('first')
         },1000)
     })
     var p2 = new Promise((resolve,reject)=>{
         setTimeout(()=>{
             console.log('第二个异步操作执行完毕')
             //成功
             resolve('second')
         },2000)
     })
     var p3 = new Promise((resolve,reject)=>{
         setTimeout(()=>{
             console.log('第三个异步操作执行完毕')
             btn.onclick = function(){
                 console.log('click btn')
                 resolve('third')
             }
            
         },2000)
     })
     //都执行完毕，打印success
     Promise.all([p2,p1,p3])//p1,p2,p3的先后顺序决定了传给then的数据的顺序
     	//监听结果
     	.then(
     		//成功的回调函数
         	data=>console.log('success',data),
         	//失败的回调函数
         	err=>console.log('fail',err)
</script>
输出：
//第一个异步操作执行完毕
//第二个异步操作执行完毕
//第三个异步操作执行完毕
点击按钮后才会显示
//click btn
//success (3) ["second", "first", "third"]
```

#### race

race方法用于监听多个Promise对象<br>

&emsp;&emsp;参数是一个数组，数组中的每一项都是一个Promise对象<br>

我们可以通过then方法监听状态的改变（监听第一次promise对象状态的改变）<br>

&emsp;&emsp;如果有一个请求执行成功，就会执行success方法<br>

&emsp;&emsp;如果有一个请求失败，则会执行fail方法<br>

&emsp;&emsp;返回值是状态改变的时候传递的数据<br>

```javascript
 <button id='btn'>按钮</button>
 <script>
     let btn = document.getElementById('btn')
     var p1 = new Promise((resolve,reject)=>{
     setTimeout(()=>{
             console.log('第一个异步操作执行完毕')
             //成功
             resolve('first')
         },1000)
     })
     var p2 = new Promise((resolve,reject)=>{
         setTimeout(()=>{
             console.log('第二个异步操作执行完毕')
             //成功
             resolve('second')
         },2000)
     })
     var p3 = new Promise((resolve,reject)=>{
         setTimeout(()=>{
             console.log('第三个异步操作执行完毕')
             btn.onclick = function(){
                 console.log('click btn')
                 resolve('third')
             }
            
         },2000)
     })
     //都执行完毕，打印success
     Promise.race([p2,p1,p3])//p1,p2,p3的先后顺序决定了传给then的数据的顺序
     	//监听结果
     	.then(
     		//成功的回调函数
         	data=>console.log('success',data),
         	//失败的回调函数
         	err=>console.log('fail',err)
</script>
输出：
//第一个异步操作执行完毕
//success first
//第二个异步操作执行完毕
//第三个异步操作执行完毕
点击按钮后才会显示
//click btn

```

#### resolve与reject

resolve是Promise的静态方法，<font color=red>返回一个可以监听resolved状态的promise对象</font><br>

&emsp;&emsp;参数有三种：<br>

&emsp;&emsp;&emsp;&emsp;js数据(数组，对象，数字等)，此时then方法会立即执行（then方法接收的数据就是该数据）<br>

&emsp;&emsp;&emsp;&emsp;promise对象<br>

&emsp;&emsp;&emsp;&emsp;thenable参数（带有then方法的对象）<br>

```javascript
var p1 = Promise.resolve(100);
//监听结果
p1.then(
	//成功
    data=>console.log('success',data),
    //失败
    err=>console.log('fail',err)
)
//success 100
```

```javascript
var p1 = Promise.resolve(
			new Promise((resolve,reject)=>{
                //setTimeout(()=>resolve(200),1000)
                setTimeout(()=>reject(200),1000)
            })
		);
//监听结果
p1.then(
	//成功
    data=>console.log('success',data),
    //失败
    err=>console.log('fail',err)
)
//fail 200

或
let test = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('success')
    }, 1000)
})
let p = Promise.resolve(test)
console.log(p === test)   //true
从结果上看：将一个promise对象传递给Promise.resolve()方法会被直接返回。
```

```javascript
var p1 = Promise.resolve({
    color:'red',
    //then方法
    then(resolve,reject){
        //异步操作
        setTimeout(()=>{
            //resolve(500)
            reject(600)
        },1000)
    }
});
//监听结果
p1.then(
	//成功
    data=>console.log('success',data),
    //失败
    err=>console.log('fail',err)
)
//fail 600
```

reject是Promise的静态方法，<font color=red>返回一个可以监听rejected状态的对象</font><br>

&emsp;&emsp;then方法监听失败时候，回调函数的参数就是reject方法参数（错误的描述信息）<br>

&emsp;&emsp;<font color=red>不论reject方法是什么数据，then都将执行失败的回调函数。</font><br>

```javascript
var p1 = Promise.reject(100);
//监听结果
p1.then(
	//成功
    data=>console.log('success',data),
    //失败
    err=>console.log('fail',err)
)
//fail 100
```

```javascript
var p1 = Promise.reject(
			new Promise((resolve,reject)=>{
                setTimeout(()=>resolve(200),1000)
                //setTimeout(()=>reject(200),1000)
            })
		);
//监听结果
p1.then(
	//成功
    data=>console.log('success',data),
    //失败
    err=>console.log('fail',err)
)
)
//fail Promise {<pending>}
//				__proto__: Promise
//				[[PromiseStatus]]: "fulfilled"
//				[[PromiseValue]]: 200
```

```javascript
var p1 = Promise.reject({
    color:'red',
    //then方法
    then(resolve,reject){
        //异步操作
        setTimeout(()=>{
            resolve(500)
            //reject(600)
        },1000)
    }
});
//监听结果
p1.then(
	//成功
    data=>console.log('success',data),
    //失败
    err=>console.log('fail',err)
)
//fail 	{color: "red", then: ƒ}
//		color: "red"
//		then: then(resolve,reject){ //异步操作 setTimeout(()=> {…}
//		__proto__: Object
```

### 8.generator函数

#### generator函数

generator函数<font color=red>为处理异步编程提供了解决方法（异步函数）</font>，内部封装了大量的状态，允许我们逐条遍历<br>语法：function *demo(){函数中定义状态}<br>（注意：不能作为构造函数使用）

&emsp;&emsp;在函数内部通过yield关键字定义状态，yield表示暂停的意思<br>

&emsp;&emsp;&emsp;&emsp;注意：yield关键字只能出现在generator函数中<br>

&emsp;&emsp;&emsp;&emsp;通过return定义最后一个状态，return后面的状态不会执行<br>

generator函数的返回值实现了next方法，因此可以通过next方法逐条遍历内部的状态。<br>

&emsp;&emsp;next方法的返回值是一个对象<br>

&emsp;&emsp;&emsp;&emsp;done属性：表示是否遍历完成<br>

&emsp;&emsp;&emsp;&emsp;value属性：表示状态值<br>

&emsp;&emsp;next方法返回的状态对象<br>

&emsp;&emsp;&emsp;&emsp;如果有状态的情况下，done是false，value是状态值。<br>

&emsp;&emsp;&emsp;&emsp;如果没有状态，此时done是true，value是undefined<br>

generator函数的返回值也实现了迭代器接口，因此也可以通过for of方式遍历内部的状态<br>

&emsp;&emsp;<font color=red>但是不要同时使用两种方式去遍历内部的状态(即尽量不要混合使用next和for of)</font><br>

&emsp;&emsp;因此，一方遍历完成，另一方就得不到状态了<br>

当generator函数遍历完成之后，此时它的状态变成为closed<br>

当generator函数没有遍历完成的时候，此时它的状态变为suspended<br>

```javascript
//function与函数名之间的*放的位置以下四种都可以
//function* demo()
//function * demo()
//function*demo()
function *demo(){
    console.log('demo')
    //定义状态
    yield '起床';
    yield '吃饭';
    yield '学习';
    yield '吃饭';
    yield '自习';
    yield '睡觉';
    return '进入梦乡';  
}
//执行
var g = demo();//generator函数的执行相当于将其初始化，内部的语句还没有执行
//通过next方法遍历状态
console.log(g.next());//	demo  {value: "起床", done: false}
console.log(g.next());//	{value: "吃饭", done: false}
console.log(g.next());//	{value: "学习", done: false}
console.log(g.next());//	{value: "吃饭", done: false}
console.log(g.next());//	{value: "自习", done: false}
console.log(g.next());//	{value: "睡觉", done: false}
console.log(g.next());//	{value: "进入梦乡", done: true}
console.log(g.next());//	{value: undefined, done: true}
console.log(g.next());//	{value: undefined, done: true}
console.log(g.next());//	{value: undefined, done: true}


//实现了迭代器接口，通过for of循环遍历
//注意：for of循环无法遍历return 语句
//想再次遍历要重新执行
var g2 = demo();//generator函数的执行相当于将其初始化，内部的语句还没有执行
for(let item of g2){
    console.log('t')
    console.log(item);
}
//输出如下：
//demo
//t
//起床
//t
//吃饭
//t
//学习
//t
//吃饭
//t
//自习
//t
//睡觉

//想再次遍历要重新执行
var g3 = demo()//generator函数的执行相当于将其初始化，内部的语句还没有执行
//通过next方法遍历状态
console.log(g3.next());
//输出：	demo  {value: "起床", done: false}
for(let item of g3){
    console.log('t')
    console.log(item);
}
//输出如下
//t
//吃饭
//t
//学习
//t
//吃饭
//t
//自习
//t
//睡觉
```

<font color=red>**用途：异步变成同步**</font>

```javascript
//异步变成同步
function *ickt(){
    yield setTimeout(function(){
        console.log(111)
    },1000)
    yield setTimeout(function(){
        console.log(222)
    },2000)
    yield setTimeout(function(){
        console.log(333)
    },3000)
}
//执行
var g = ickt();//generator函数的执行相当于将其初始化，内部的语句还没有执行
g.next();//输出： {value: 1, done: false}     再过1s种输出：111
g.next();//输出： {value: 2, done: false}     再过2s种输出：222
```

#### generator函数的数据传递

在generator函数中数据传递有两个方向：<br>

&emsp;&emsp;1数据由generator函数的内部流向外部<br>

&emsp;&emsp;2.数据由generator函数的外部流向内部<br>

数据由内部流向外部<br>

&emsp;&emsp;1.通过yield表达式定义状态值。<br>

&emsp;&emsp;2.在外部通过next方法返回的对象中的value属性获取。<br>

```javascript
//数据由内部流向外部
//定义generator函数
function *demo(){
    yield 'red';
    yield 'green';
    yield 'blue';
}
//创建
var g = demo();//generator函数的执行相当于将其初始化，内部的语句还没有执行
//获取内部状态值
console.log(g.next());	//{value: "red", done: false}
console.log(g.next());	//{value: "green", done: false}
console.log(g.next());	//{value: "blue", done: false}
```

<font color=red>数据由外部流向内部</font><br>

&emsp;&emsp;1.在外部通过next方法传递数据。<br>

&emsp;&emsp;2.在内部通过yield表达式接收数据。<br>

```javascript
//数据由外部流向内部
//定义generator函数
function *demo(num1){
    console.log(1,num1)
    var num2 = yield 'red';
    console.log(2,num2)
    var num3 = yield 'green';
    console.log(3,num3)  
    var num4 = yield 'blue';
    console.log(4,num4)
}
//创建。给方法传递数据，可以在内部接收
var g = demo(000);//generator函数的执行相当于将其初始化，内部的语句还没有执行
//第一次执行next方法，相当于从函数开始执行到第一个yield关键字并暂停。
//注意，第一次执行next方法表示启动，所以传递的数据是无效的，（工作中第一次执行next方法，不需要传递数据，数据可以由demo方法传递）
console.log(g.next(111));	// 1 0  {value: "red", done: false}
//第二次执行next方法，相当于函数从第一个yield执行到第二个yield，并暂停
console.log(g.next(222));	//2 222 {value: "red", done: false}
console.log(g.next(333));	//3 333 {value: "green", done: false}
console.log(g.next(444));	//4 444	{value: "blue", done: false}
console.log(g.next(555));	//{value: undefined, done: true}
//1.demo执行相当于初始化   2.第一个next方法执行相当于启动   3.第二个next方法就可以正常的运行了(从上次停止的位置到下一个yield)
```

<font color=red>第一个next(111)从函数开始到yield ’red‘停止。<br>第二个next(222)从 上一次停止的位置开始，var num2 = 222，到yield 'green'停止。<br>第三个next(333)从 上一次停止的位置开始，var num3 = 333，到yield 'blue'停止。<br>第四个next(444)从 上一次停止的位置开始，var num4 = 444，到函数结束。<br>第五个next(555)直接返回{value: undefined, done: true}。</font>



#### return,throw

return<br>

&emsp;&emsp;在generator函数的原型中提供了return 方法，用于在外部停止内部状态的遍历

```javascript
//generator函数
function *demo(){
    try{
        yield 1;
        yield 2;
    } catch(e){
        yield 3;
        yield 4;
    } finally{
        yield 5;
        yield 6;
    }
    yield 7;
    yield 8
    //return 表示内部语句运行完毕，不会在继续原型了
    return 9;
    //后面的yield无意义，不可能通过next来访问到
    yield 10;
    yield 11;
}
var g = demo();
console.log(g.next());	//{value: 1, done: false}
console.log(g.next());	//{value: 2, done: false}
//打断执行，打断后就结束了，后面的yield与return等不起作用了。
//传递的数据，就是打断时候的value值
console.log(g.return(100));	//{value: 100, done: true}
console.log(g.next());	//{value: undefined, done: true}
```

&emsp;&emsp;如果在函数体中出现了finally语法，return语句将延后执行

```javascript
//generator函数
function *demo(){
    try{
        yield 1;
        yield 2;
    } catch(e){
        yield 3;
        yield 4;
    } finally{
        yield 5;
        yield 6;
    }
    yield 7;
    yield 8
    //return 表示内部语句运行完毕，不会在继续原型了
    return 9;
    //后面的yield无意义，不可能通过next来访问到
    yield 10;
    yield 11;
}
var g = demo();
console.log(g.next());	//{value: 1, done: false}
console.log(g.next());	//{value: 2, done: false}
//打断执行，打断后就结束了，后面的yield与return等不起作用了。
//传递的数据，就是打断时候的value值
console.log(g.return(100));	//{value: 5, done: true}
console.log(g.next());	//{value: 6, done: false}
console.log(g.next());	////{value: 100, done: true}
console.log(g.next());	//{value: undefined, done: true}
```

throw<br>

&emsp;&emsp;在generator函数的原型中提供了throw方法，允许在外部抛出错误<br>

```javascript
//generator函数
function *demo(){
    yield 1;
	yield 2;
	yield 3;
    yield 4;
	yield 5;
    //return 表示内部语句运行完毕，不会在继续原型了
    return 6;
    //后面的yield无意义，不可能通过next来访问到
    yield 10;
}
var g = demo();
console.log(g.next());	//{value: 1, done: false}
console.log(g.next());	//{value: 2, done: false}
//爬出错误 与throw new Error(111);作用一样抛出错误打断程序运行
console.log(g.throw(new Error('这是第一个错误')));
//
```

&emsp;&emsp;为了代码正常执行，我们可以在状态函数体中通过try catch语句去捕获错误<br>

```javascript
//generator函数
function *demo(){
    try{       
    	yield 1;
		yield 2;
		yield 3;
    }catch{
    	yield 4;
		yield 5;
    }finally{
        yield 6;
		yield 7;
    }
    //return 表示内部语句运行完毕，不会在继续原型了
    return yield 8;
    //后面的yield无意义，不可能通过next来访问到
    yield 9;
}
var g = demo();
console.log(g.next());	//{value: 1, done: false}
console.log(g.next());	//{value: 2, done: false}
//爬出错误 与throw new Error(111);作用一样抛出错误打断程序运行
//区别是throw方法抛出的错误会被内部catch语句接收，throw关键字抛出的错误，不能被内部接收
console.log(g.throw(new Error('这是第一个错误')));//{value: 4, done: false}
console.log(g.next());	//{value: 5, done: false}
console.log(g.next());	//{value: 6, done: false}
console.log(g.next());	//{value: 7, done: false}
console.log(g.next());	//{value: 8, done: true}
console.log(g.next());	//{value: undefined, done: true}
```

&emsp;&emsp;如果外部抛出两个错误：<br>

&emsp;&emsp;&emsp;&emsp;第一个错误在状态函数体中通过try catch语句去捕获第一个错误。<br>

&emsp;&emsp;&emsp;&emsp;第二个错误在状态函数体外部通过try catch语句去捕获第二个错误。<br>

```javascript
//generator函数
function *demo(){
    try{       
    	yield 1;
		yield 2;
		yield 3;
    }catch{
    	yield 4;
		yield 5;
    }finally{
        yield 6;
		yield 7;
    }
    //return 表示内部语句运行完毕，不会在继续原型了
    return yield 8;
    //后面的yield无意义，不可能通过next来访问到
    yield 9;
}
var g = demo();
console.log(g.next());	//{value: 1, done: false}
console.log(g.next());	//{value: 2, done: false}
//爬出错误 与throw new Error(111);作用一样抛出错误打断程序运行
//区别是throw方法抛出的错误会被内部catch语句接收，throw关键字抛出的错误，不能被内部接收
console.log(g.throw(new Error('这是第一个错误')));//{value: 4, done: false}
//在遍历catch语句状态的时候，再次抛出错误，会打断状态遍历，但是会将finally语句的状态遍历
console.log(g.throw(new Error('这是第一个错误')));//{value: 6, done: false}
console.log(g.next());	//{value: 7, done: false}
console.log(g.next());	//报错：Uncaught Error: 这是第一个错误
```

```javascript
//generator函数
function *demo(){
    try{       
    	yield 1;
		yield 2;
		yield 3;
    }catch{
    	yield 4;
		yield 5;
    }finally{
        yield 6;
		yield 7;
    }
    //return 表示内部语句运行完毕，不会在继续原型了
    return yield 8;
    //后面的yield无意义，不可能通过next来访问到
    yield 9;
}

//第一次抛出被内部catch捕获，第二次抛出被外部catch语句捕获，error后面的语句不会再执行了，但是catch后面的语句可以正常的执行。
//catch语句只能捕获一个错误，再次抛出错误无法捕获
var g = demo();
try{
	console.log(g.next());	//{value: 1, done: false}
	console.log(g.next());	//{value: 2, done: false}
	//爬出错误 与throw new Error(111);作用一样抛出错误打断程序运行
	//区别是throw方法抛出的错误会被内部catch语句接收，throw关键字抛出的错误，不能被内部接收
	console.log(g.throw(new Error('这是第一个错误')));//{value: 4, done: false}
	//在遍历catch语句状态的时候，再次抛出错误，会打断状态遍历，但是会将finally语句的状态遍历
	console.log(g.throw(new Error('这是第二个错误')));//{value: 6, done: false}
	console.log(g.next());	//{value: 7, done: false}
    //一定要再有一个next，否则捕获不到错误
    console.log(g.next());//
    console.log(g.next());//
    console.log(g.next());//
}catch(e){
    console.log('outer',e)	//捕获错误并输出：outer Error: 这是第一个错误
}
console.log(g.next());//{value: undefined, done: true}
```

#### yield*

yield*语法<br>

&emsp;&emsp;可以将函数内部的状态复制到另一个函数体中执行<br>

```javascript
//定义状态
function *demo(){
    yield 1;
    yield 2;
}
//状态函数
function *ickt1(){
    yield 3;
    var d = demo();
    for(var state of d){
        yield state;
    }
    yield 4;
}
//ickt1状态函数等价于ickt2
function *ickt2(){
    yield 3;
    //yield *demo();  yield * demo();  yield*demo();
    yield* demo();
    yield 4;
}
//测试
var g = ickt2();
console.log(g.next());//{value: 3, done: false}
console.log(g.next());//{value: 1, done: false}
console.log(g.next());//{value: 2, done: false}
console.log(g.next());//{value: 4, done: false}
console.log(g.next());//{value: undefined, done: true}
```

三个点语法<br>

&emsp;&emsp;使用三个点语法解构的时候，可以将一个状态函数体中的所有状态值获取到。<br>

```javascript
//定义状态
function *demo(){
    yield 1;
    yield 2;
}
//执行demo
var d = demo();
//查看状态，next，for of
console.log(...d)//输出：1 2
```

generator函数的this<br>

&emsp;&emsp;在generator函数中的this指向window<br>

&emsp;&emsp;所以，不能通过this去添加任何的属性以及方法<br>

&emsp;&emsp;如果想要添加属性或者方法，我们可以在函数执行的时候，使用call或者是apply方法改变其作用域，将指向函数的原型<br>

```javascript
function *demo(){
    console.log(this)
    this.num = 100;
    yield 1;
    yield 2;
}
//拓展方法
//generator函数虽然不能当做构造函数创建对象，但generator函数的原型方法，可以被generator函数创建的对象(执行generator函数返回的对象)直接使用,这点是比较特殊的
demo.prototype.hello = function(){
    console.log('hello',this)
}
var d = demo();
console.log(d.next());//输出：window对象		{value: 1, done: false}
console.log(d.next());//输出：{value: 2, done: false}
console.log(d.next());//输出：{value: undefined, done: true}
d.hello()	//hello demo对象
console.log(d);//demo对象
console.log(d.num)//undefined

//为了让this指向generator函数创建的对象(执行generator函数返回的对象),可以在原型对象上执行
var d = demo.call(demo.prototype);
console.log(d.next());//输出：window对象		{value: 1, done: false}
console.log(d.num)//100
```

<font color=red>**总结：<br>创建：	generator返回状态对象，不能使用new创建		普通函数没有返回值，必须通过new关键字创建<br>相同点：	创建的对象都可以访问原型的属性和方法。<br>为了让generator函数内部的this存储数据，可以让generator函数在原型对象执行。例如：var d = demo.call(demo.prototype);**</font>





### <font color=red>9.异步操作</font>

<font color=red>**1.并行，让异步操作一起执行，彼此之间没有依赖关系，我们可以通过Promise.all以及Promise.race来处理，用时为最慢的一个操作所用的时长**</font>(详情请看 第7小节Promise中的all与race)<br>

<font color=red>**2.串行，异步操作要一个接一个的执行，彼此之间有依赖关系（后一个执行依赖前一个执行的结果，管道），用时为所有操作的时长总和**</font><br>代码如下

````javascript
//定义三个异步操作
var task1 = data=>new Promise((resolve, reject)=>{
    setTimeout(()=>{
        console.log('111',data);
        resolve('第一个执行完毕');
    },1000)
})
var task2 = data=>new Promise((resolve, reject)=>{
    setTimeout(()=>{
        console.log('222',data);
        reject('第二个执行失败');
    },2000)
})
var task3 = data=>new Promise((resolve, reject)=>{
    setTimeout(()=>{
        console.log('333',data);
        resolve('第三个执行完毕');
    },3000)
})
````



```javascript
//借助generator函数
function *demo(result){
    //定义暂停状态，执行异步操作
    console.log('start')
    //执行第一个异步操作
    result = yield task1(result);
    console.log('inner 111',result);
    //执行第二个异步操作
    result = yield task2(result);
    console.log('inner 222',result);
    //执行第三个异步操作
    result = yield task3(result);
    console.log('inner 333',result);
    console.log('end');
    return result;
}
```

```javascript
//执行
//初始化
var d = demo('操作开始了')
//监听第一个操作的执行完毕
d.next().value.then(
    (data)=>{
    	console.log('outer 监听第一个操作结果',data);
        
    	//将第一个操作的结果，传递给第二个操作去运行
    	d.next(data).value.then(
            //成功
            (data)=>{
    	    	console.log('outer 监听第二个操作结果',data);
                
    			//将第二个操作的结果，传递给第三个操作去运行
    			d.next(data).value.then(
            		(data)=>{
    	    			console.log('outer 监听第三个操作结果',data);
                        
                        //将第三个操作结果继续传递下去
                        d.next(data);
   					}
        		)
   			},
            //失败
            (err)=>{
                console.log('outer 监听第二个操作失败',err);
                
    			//执行第三个操作，并传递数据
    			d.next(data).value.then(
                	(data)=>{
                        console.log('outer 监听第三个操作结果',data);
                        
                         //将第三个操作结果继续传递下去
                        d.next(data);
                    }
                )
            }
        )
	}
)

//start
//Promise {<pending>}对象
//111 操作开始了
//outer 监听第一个操作结果 第一个执行完毕
//inner 111 第一个执行完毕
//222 第一个执行完毕
//outer 监听第二个操作失败 第二个执行失败
//inner 222 第一个执行完毕
//333 第一个执行完毕
//outer 监听第三个操作结果 第三个执行完毕
//inner 333 第三个执行完毕
//end
```

上面的写法实在是太复杂了，不是很实用，可以通过co工具（网上有开源的代码）快速启动，并监听结果，简化了启动以及监听的过程。

实现co如下：

```javascript

function co(gen, ...args){
    //获取参数
    return new Promise((resolve, reject)=>{
        //初始化
        var g = gen(...args);
        //定义next
        function doNext(res){
            //定义本地执行结果
            let result;
            //安全执行
            try{
                //执行next方法，获取数据
                result = g.next(res)
            }catch(e){
                //中断执行
                return reject(e);
            }
            //当遍历完成，就结束递归
            if(result.done){
                //结束
                return resolve(result.value);
            }
            //监听结果递归调用
            result.value.then(
            	//成功
                (data)=>{
                    //递归
                    doNext(data);
                },
                //失败,就直接中断继续执行
                (err)=>{
                    reject(err);
                }
            )
        }
        //执行next
        doNext();
    })
}
//通过co工具快速启动，并监听结果
co(demo, '操作开始了')
	//监听结果
	.then(
		//成功
    	data=>console.log('success',data),
    	err=>console.log('fail',err)
	)
```



### 10.async与await

async和await是ES2016（E7）中提出的<br>

&emsp;&emsp;可以认为是generator函数的语法糖。<br>

语法糖：对一些复杂操作的简化，可以使我们用更简单的方式去操作，提高了开发效率。<br>

&emsp;&emsp;async表示函数中异步操作，代表了*语法<br>

&emsp;&emsp;await表示等一等的意思，只有当前程序执行完毕之后，后续代码才会执行，代表了yield关键字。<br>

<font color=red>特点：</font><br>

&emsp;&emsp;1.提高了代码的语义化<br>
&emsp;&emsp;2.await返回值是Promise对象（若async修饰的函数返回值不是一个Promise，函数会使用Promise.resolve(返回值)  生成一个Promise对象返回;如果函数没有返回值，会使用 Promise.resolve(undefined)生成返回值）	<br>	3.await后面允许是任何数据	<br>	&emsp;4.generator表示状态机，async定义的是异步函数<br>

&emsp;&emsp;5.在函数中内置状态函数的启动，直接执行函数即可，不需要通过next方法执行。

```javascript
//定义函数
function demo(){
    console.log('start')
    new Promise(resolve=>{
        setTimeout(()=>{
            console.log('success')
            resolve();
        },1000)
    })
    console.log('red')
}
demo();
//输出：
//start
//red
//success

//异步函数
//async表示函数中有异步操作
async function demo(){
    console.log('start')
    //等一等，等异步操作执行完毕，再向下执行。
    await new Promise(resolve=>{
        setTimeout(()=>{
            console.log('success')
            resolve();
        },1000)//先执行 new Promise再await
    })
    console.log('red')
    return {a:1,b:2}
}
//demo();
//console.log('1',demo());
demo().then(data=>console.log('h',data))
//输出：
//start
//success
//red
//h {a: 1, b: 2}
```



用异步函数代替状态函数（*写成async，yield写成await）

```javascript
//定义三个异步操作
var task1 = data=>new Promise((resolve, reject)=>{
    setTimeout(()=>{
        console.log('111',data);
        resolve('第一个执行完毕');
    },1000)
})
var task2 = data=>new Promise((resolve, reject)=>{
    setTimeout(()=>{
        console.log('222',data);
        resolve('第二个执行成功');
    },2000)
})
var task3 = data=>new Promise((resolve, reject)=>{
    setTimeout(()=>{
        console.log('333',data);
        resolve('第三个执行完毕');
    },3000)
})

//用异步函数代替状态函数（*写成async，yield写成await）
async function demo(result){
    //定义暂停状态，执行异步操作
    console.log('start')
    //执行第一个异步操作
    result = await task1(result);
    console.log('inner 111',result);
    //执行第二个异步操作
    result = await task2(result);
    console.log('inner 222',result);
    //执行第三个异步操作
    result = await task3(result);
    console.log('inner 333',result);
    console.log('end');
    return result;
}

//异步函数的执行跟普通函数一样
//generator函数需要手动启动，手动执行，	async异步函数会自动化的执行
//之后demo函数完全执行完，.then才会监听。
demo()
	//监听结果
	.then(
		//成功
    	data=>console.log('outer',data),
    	//失败
    	err=>console.log('outer',err)
	)

//start
//111 undefined
//inner 111 第一个执行完毕
//222 第一个执行完毕
//inner 222 第二个执行成功
//333 第二个执行成功
//inner 333 第三个执行完毕
//end
//outer 第三个执行完毕
```

当程序执行到await的时候，会交出程序的控制权，只有当异步操作完毕之后，后续的代码才会执行。<br>

&emsp;&emsp;如果await后面出现了其他数据，会返回一个监听resolved状态的promise对象<br>

&emsp;&emsp;如果函数中出现了错误，会将错误信息追加到错误对列中。<br>

返回对象<br>

&emsp;&emsp;await返回值是一个promise对象<br>

&emsp;&emsp;&emsp;&emsp;可以使用then方法监听成功时候状态。<br>

&emsp;&emsp;&emsp;&emsp;可以通过catch方法监听失败时候的状态。<br>

&emsp;&emsp;await与yield一样：<br>

&emsp;&emsp;&emsp;&emsp;await只能出现在async中		yield只能出现在generator函数中<br>

```javascript
//await返回结果
async function demo1(){
    console.log('start')
    //var result = await 100，等价方式 var result = await Promise.resolve(100)
    var result = await 100
    console.log(result);
    console.log('end')
}
demo1();
//输出：
//start
//100
//end

async function demo2(){
    console.log('start')
    var result = await new Promise(resolve=>{
        setTimeout(()=>{
            console.log('success');
            resolve('hello')
        },1000)
    })
    console.log(result);
    console.log('end')
}
demo2();
//start
//success
//hello
//end
```

<font color=red>await会交出程序控制权，类似异步，后面的语句会继续执行</font>

```javascript
//await会交出程序控制权，类似异步，后面的语句会继续执行
async function demo(){
    console.log('start')
    await 100;
    console.log('end')
}
demo()
console.log('outer');
//start
//outer
//end
```

### 面试题

<font color=red>**首先执行同步的， 再执行伪异步的(交出控制权的)，最后执行异步操作（例如setTimeout，即使setTimeout是0秒也是最后执行的）。**</font>

我认为：在同步的执行完后，伪异步的（交出控制权的）执行顺序，按照在执行时交出控制权的顺序执行，一般先交出控制权的先执行。在碰到async中的await, new Promise中的resolve与reject执行时都会交出控制权。

这些交出控制权的(伪异步的)内部也是通过同步的方法实现的(很像观察者模式)，对应部分执行完了才会执行它们。

```javascript
setTimeout(function(){
    console.log(111);
},0)
var p = new Promise(resolve=>{
    console.log(222);
    resolve();
})
//监听
p.then(data=>{
    console.log(333)
})
let demo = async function(){
    console.log(444);
    await 100;
    console.log(555);
}
demo().then(data=>{
    console.log(666);
})
console.log(777);
//输出：
//222
//444
//777
//333
//555
//666
//111

//首先执行同步的， 再执行交出控制权的(伪异步)，最后执行setTimeout这种异步。
//new Promise(...)时其中的代码是同步执行的，async await, p.then与demo.then是伪异步的。
//p.then只有new Promise对象执行完成后才会执行。
//demo.then只有demo函数执行完后才会执行 async await会交出程序的控制权。
```

```javascript
setTimeout(function(){
    console.log(111);
},0)

let demo = async function(){
    console.log(444);
    await 100;
    console.log(555);
    await 200;
    console.log(888);
    await 300;
    console.log(999);
}
demo().then(data=>{
    console.log(666);
})


var p = new Promise(resolve=>{
    console.log(222);
    resolve();
})
//监听
p.then(data=>{
    console.log(333)
}).then(data=>{
    console.log('a')
}).then(data=>{
    console.log('b')
})
console.log(777);
//输出：
//444
//222
//777
//555
//333
//888
//a
//999
//b
//666
//111
```

```javascript
//3 1 7 9      4 2 8    5 6 
function testSomething(){
    console.log(111,'执行testSomething')
    return 'testSomething'
}
async function testAsync(){
    console.log(222,'执行testAsync');
    return Promise.resolve('hello async')
}
async function test(){
    console.log(333,'test start...');
    const v1 = await testSomething();
    console.log(444,v1);
    const v2 = await testAsync();
    console.log(555,v2);
    console.log(666,v1,v2);
}
test();
var promise = new Promise((resolve)=>{
    console.log(777,'promise start..');
    resolve('promise');
});
promise.then((val)=>console.log(888,val));
console.log(999,'test and...')

//3 1 7 9 4 2 8 2 a 5 6
```





### 11.类

在ES6中实现了类。语法：class类名{}<br>

&emsp;&emsp;ES6之前定义类的方式：functio People(title){this.title=title;}<br>

在类中可以定义三类数据:<br>

&emsp;&emsp;第一种实例数据：<br>

&emsp;&emsp;&emsp;&emsp;可以通过constructor构造函数定义自身属性或者方法，这类数据会被当前实例化对象所访问。<br>

&emsp;&emsp;第二种原型数据：<br>

&emsp;&emsp;&emsp;&emsp;我们直接在类体中定义原型方法即可。<br>

&emsp;&emsp;&emsp;&emsp;如果要定义原型属性数据，则必须要使用get,set设置特性的方式来定义：get取值器，set赋值器<br>

&emsp;&emsp;&emsp;&emsp;由于对数据设置了特性，在查看对象的时候，这些数据将展示在自身。<br>

&emsp;&emsp;第三种数据：静态数据（通过类直接访问，而实例化对象是不能访问的）<br>

&emsp;&emsp;&emsp;&emsp;定义静态数据的方式有两种：<br>

&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;1.直接在类体中，在数据的前面加上static关键字即可。<br>

&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;2.在类体的外部，直接为类添加数据。<br>

&emsp;&emsp;&emsp;&emsp;区别:<br>

&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;在类体中添加的静态数据			设置了特性<br>

&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;在类体外部添加的静态数据		没有设置特性<br>

```javascript
//定义类
class Book{
    //构造函数
    constructor(title,price){
        //存储数据
        //实例数据
        this.title = title;
        this.price = price;
        this.color = ['red', 'green', 'blue']
    }
    
    //原型数据
    //原型方法
    getTitle(){
        console.log(this.title);
    }
    getPrice(){
        console.log(this.price)
    }
    //原型属性，设置了特性，因此在实例对象自身可以看到
    get num(){
        return this._num;
    }
    set num(val){
        this._num = val;
    }
    
    get arr(){
        return this._arr;
    }
    set arr(val){
        this._arr = val;
    }
    
    //静态数据
    static get writer(){
        return 'Mr Yang';
    }
    static getWriter(){
        return this.writer;
    }
}
//在类的外部，静态数据通过点语法定义
Book.msg = 'hello';
Book.getMsg = function(){
    return this.msg;
}

//实例化
var b1 = new Book('javascript设计模式', 59)
var b2 = new Book('面试题', 60)
b1.num = 200;
b1.arr = [1,2,3]
b2.arr = [1,2,3]
console.log(b1, b2)
console.log(b1.color === b2.color);			//false
console.log(b1.getTitle === b2.getTitle);	//true
console.log(b1.arr === b2.arr);				//false

//实例对象无法访问静态属性,例如b1.writer返回undefined.
//静态属性通过类来访问
console.log(Book.writer, Book.msg, Book.getWriter(), Book.getMsg());
```

### 12.继承



```javascript
//定义类
class Book{
    //构造函数
    constructor(title,price){
        //存储数据
        //实例数据
        this.title = title;
        this.price = price;
        this.color = ['red', 'green', 'blue']
    }
    
    //原型数据
    //原型方法
    getTitle(){
        console.log(this.title);
    }
    getPrice(){
        console.log(this.price)
    }
    //原型属性，设置了特性，因此在实例对象自身可以看到
    get num(){
        return this._num;
    }
    set num(val){
        this._num = val;
    }
    
    get arr(){
        return this._arr;
    }
    set arr(val){
        this._arr = val;
    }
    
    //静态数据
    static get writer(){
        return 'Mr Yang';
    }
    static getWriter(){
        return this.writer;
    }
}
//在类的外部，静态数据通过点语法定义
Book.msg = 'hello';
Book.getMsg = function(){
    return this.msg;
}


//继承
class JsBook extends Book{
    //重写属性和方法
    //重写构造函数
    constructor(title,price,score){
        //通过super关键字实现构造函数继承
        super(title,price);
        //新的属性
        this.score = score;
    }
    //重写原型属性
    get time(){
        return 2020;
    }
    getTime(){
        return '2020-1'
    }
}
//创建js书
var jb = new JsBook('数学书',60,100)
jb.getPrice()
console.log(jb);
console.log(jb.time)
jb.getTime()
```

### 13.编译ES6

<font color=red>随着es6，es6+等新标准的出现，为了有更好的开发体验而要使用这些新特性，但是在浏览器中又不能直接运行，所以**我们就需要一个编译工具来将代码变异成浏览器支持的版本，这就需要babel编译器。**</font><br>

安装node之后，可以全局安装babel指令：npm install -g babel-cli<br>

配置.babelrc文件：<br>

&emsp;&emsp;通过presets配置项定义编译器<br>

```javascript
//ES6=>2015
{
    "presets":["es2015"],
    "plugins":[]
}
```

&emsp;&emsp;安装es6的babal插件： npm install babel-preset-es2015 (在项目目录中运行)<br>

编译文件：<br>

&emsp;&emsp;输出到控制台 babel文件<br>

&emsp;&emsp;输出到文件中 babel文件 --out-file文件名<br>



如下例

原始：

```javascript
//  .\01.js文件		ES6语法 
var add = (...args) =>{
    console.log(arguments);
}
```

编译文件

```javascript
babel .\01.js --out-file ./dist/01.js
```

编译后：

编译后的代码也说明了在ES6中不能在函数中使用类数组arguments的原因(因为编译后将arguments变成了_arguments， _arguments是函数外部的)。而在ES6中使用的三个点语法，将args转成了一个数组。

```javascript
//	/dist/01.js文件		ES5语法
"use strict"
var _arguments = arguments;
var add = function add(){
    for(var _len = arguments.length, args=Array(_len),_key=0;_key<_len;_key++){
        args[_key] = arguments[_key];
    }
    console.log(_arguments)
}
```



通过将ES6中定义类的代码编译成ES5中的，查看ES5中对应代码，可以总结以下几点：

1.ES6中的类在编译后是一个  闭包  安全  特性类。<br>2.在类的内部和外部定义静态属性的区别，类的外部没有设置特性，类的内部设置了特性。<br>

3.ES6中的继承是一个  特性  寄生  组合式  继承<br>

