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

3.箭头函数中的this指向永远是<font color=red>**定义时的（定义它时的父级作用域）**</font><br>

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

在一个系统中，总要在一个对象中，存储一些数据，对于这些数据，可能有一些是希望我们访问的，但是总有一些是重要的，不希望我们访问的，希望保护起来，一次ES6新增了代理，实现这一特征。<br>

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

