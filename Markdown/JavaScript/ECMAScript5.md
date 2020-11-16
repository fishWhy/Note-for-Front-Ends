## ECMAScript5

### 1.简介

&emsp;&emsp;javascript最早是由网景公司推出的，极其简单，被很多开发者接受，逐渐流行起来，后来IE为了抢占市场，将IE浏览器内置在windows系统中，所以IE的市场占有率相当的高。IE脚本语言是Jscript(vbscript)。<br>

&emsp;&emsp;网景公司为了推广js，与sun公司合作，为了让js更流行，借助当时极其流行的语言java,将js更名为javascript，所以java与javascript关系就像雷锋与雷峰塔。网景公司做了一件好事，将js的语言规范提交给ECMA组织，所以我们学习ECMAScript规范就是学习javascript规范，所以ECMAScript是js语法的未来。<br>

&emsp;&emsp;微软很有个性，非要研制一套规范，研制的非常不好用，后来自己内部工程师都不干了，非要重新研制新的浏览器，所以微软决定放弃xp系统（放弃IE6,7）。重新研制了IE9浏览器，完全遵循ECMAScript语言规范，所以IE9是微软的第一代高级浏览器（是所有高级浏览器中，最差的一款）。<br>

&emsp;&emsp;在国内，我们还要维护IE6,7,8，原因是国内一些企业决定维护xp系统，所以IE6,7就无法淘汰，所以就苦了国内的前端工程师了，还要维护IE6,7,8。<br>

&emsp;&emsp;好消息是移动端基本都是webkit内核，因此我们可以放心的使用html5,css3，ES5规范等等。<br>

&emsp;&emsp;在pc端，由于高就浏览器都实现了html5,css3,ES5规范等，所以我们可以直接用高级浏览器测试它们。<br>

&emsp;&emsp;ES规范版本ES1，ES2，ES3，ES4，ES3.1，ES5，ES6，ES2016，ES2017，ES2018。<br>



<font color=red size=5>这一节的所有 方法都要会自己手动实现，以应对面试。</font>



### <font color=red>学习方法</font>

1.学会使用（看看传递了什么参数，返回值是什么）。<br>

2.如果参数是函数，要了解其参数以及返回值对结果的影响。<br>
3.如果参数是函数，看this的指向。<br>

4.可以思考方法的实现。





### 1.JSON

#### JSON--parse

将json字符串解析成js对象的<br>

使用方式：parse(str,fn)<br>

&emsp;&emsp;str处理的字符串<br>

&emsp;&emsp;fn回调函数<br>

&emsp;&emsp;&emsp;&emsp;返回值表示这次处理的结果<br>

&emsp;&emsp;&emsp;&emsp;第一个参数表示属性名称<br>

&emsp;&emsp;&emsp;&emsp;第二个参数表示属性值<br>

&emsp;&emsp;&emsp;&emsp;this指向当前遍历的对象<br>

&emsp;&emsp;<font color=red>是从叶子节点到根节点的方向遍历的，从外部向内部遍历的</font><br>

```javascript
var str = '{"a":1, "b":"2", "c":{"d":4}}';
//解析成对象
//从叶子节点到根节点的方向遍历的，从外部向内部遍历
//遍历顺序,a,b,d,c  因为c不是叶子节点。
var obj = JSON.parse(str, function(key, value){
    //console.log(arguments, this);
    //如果可以转成数字，将其转换
    if(typeof value === 'string'){
        return +value;
    }
    return value;
})
```

#### JSON--stringify

将js对象转换成json字符串<br>

使用方式：stringify(obj, fn)<br>

&emsp;&emsp;obj处理的对象<br>

&emsp;&emsp;fn回调函数<br>

&emsp;&emsp;&emsp;&emsp;返回值表示本次处理的结果<br>

&emsp;&emsp;&emsp;&emsp;第一个参数表示属性名称<br>

&emsp;&emsp;&emsp;&emsp;第二个参数表示属性值<br>

&emsp;&emsp;&emsp;&emsp;作用域是当前遍历的对象<br>

<font color=red>是从根节点到叶子节点的方向遍历的，从内部向外部遍历的</font><br>

```javascript
var obj = {
    a:1,
    b:'2',
    c:{
        d:4
    }
}
//json字符串
//遍历顺序，从根节点到叶子节点的方向遍历的，从内部向外部遍历
//遍历顺序,a,b,c,d
var str = JSON.string(obj, function(key, value){
    if(typeof value ==== 'string'){
        return +value;
    }
    return value;
})
console.log(str)
```





### 2.数组

#### 数组--判断数组

第一种方式，判断对象类型是数组<br>

Object.prototype.toString.call(obj)<br>

```javascript
var arr = [];
var obj = {};
console.log(Object.prototype.toString.call(arr));//输出[object Array]
console.log(Object.prototype.toString.call(obj));//输出[object Object]
```



第二种方式，判断构造函数是否是Array<br>

obj.constructor === Array<br>

第三种方式，判断是否是实例化对象<br>

obj instanceof Array<br>

第四种方式，判断数组的静态方法isArray<br>

Array.isArray(obj)<br>



#### 数组--获取数组索引值

ES5为数组拓展了两种方法：indexOf, lastIndexOf来获取数组成员的索引值<br>

&emsp;&emsp;参数就是这个成员，返回值就是索引值，如果成员存在，返回索引值（大于等于0），如果成员不存在，返回-1；<br>

<font color=red>查找成员的时候，不会做数据类型的转换，是真正的全等查找，indexOf是从前向后查找的，lastIndexOf是从后向前查找的</font><br>



lastIndexOf的实现

```javascript
//定义数组
var arr = [1,2,3,4,5,6];
//拓展方法
if(!Array.prototype.lastIndexOf()){
    //定义方法
    Array.prototype.lastIndexOf = function(item){
        //从后往前遍历
        for(var i = this.length-1;i>=0;i--){
            //比较成员
            if(this[i]===item){
                //返回索引值
                return i;
            }
        }
        //没有找到返回-1
        return -1;
    }
}
//测试
alert(arr.lastIndexOf(4));
```



### 由于这些都可以在网上查到，这里就不再详细写它们了，只记录一下，它们的作用

#### 数组--forEach

作用：用来代替for循环，遍历数组，是数组遍历器方法，并没有移除循环，而是将循环封装在遍历器方法forEach的内部。<br>

#### 数组--map

作用：遍历数组并映射结果，与forEach非常类似，区别是它的返回值有意义。map方法返回值就是一个<font color=red>新数组</font>，每个成员就是每一次遍历成员时，回调函数的返回值。

```javascript
//实现map方法(IE6下不能使用自带的map方法，需要自己实现，如下：)
if(!Array.prototype.map){
    Array.prototype.map = function(callback){
        //定义返回的结果
        var result = [];
        //遍历数组
        for(var i = 0; i<this.length; i++){
        //执行回调函数，存储其结果
            result.push(callback(this[i], i, this))
        }
        //返回结果
        return result;
    }     
}
```

#### 数组--fill

填充数组方法，将一个固定值替换数组的元素<br>

作用：我们通过new Array(len)，或者Array(len)创建的数组只有长度，没有成员，所以我们不能用迭代器方法(如forEach, map等等)遍历，为了遍历数组，我们可以向数组中填充成员<br>

参数就是填充的成员，即使是函数也不会执行。<font color=red>fill方法返回值是原数组</font>

```javascript
//实现fill方法(IE6下不能使用自带的map方法，需要自己实现，如下：)
if(!Array.prototype.fill){
    //拓展
    Array.prototype.fill = function(item){
        //遍历成员，设置成员
        for(var i=0;i<this.length;i++){
            //设置成员
            this[i] = item;
        }
        //返回数组
        return this;
        
    }
}
```

#### 数组--filter

实现对数组的过滤，使用方式跟forEach一样，参数是回调函数，回调函数有三个参数：成员值，索引值，原数组，返回值就是过滤的条件。<font color=red>filter方法返回值是由符合条件的成员组成的新数组</font>。

filter方法的实现：

```javascript
//定义数组
var arr = [1,2,3,4,5,6];
if(!Array.prototype.filter){
    //拓展
    Array.prototype.filter = function(fn){
        //遍历数组，执行回调，根据结果存储成员
        //定义结果
        var result = [];
        for(var i=0;i<this.length;i++){
            //根据函数执行结果，存储成员
            if(fn(this[i], i, this)){
                //存储结果
                result.push(this[i])
            }
        }
        //返回数组
        return result;        
    }
}
//找出偶数
alert(arr.filter(function(item){
    return item%2 === 0;
}))
```



#### 数组--some

是数组的断言方法：判断数组中是否有些成员满足条件。<br>

使用方式跟forEach一样，参数是回调函数。回调函数有三个参数：成员值，索引值，原数组。<br>

回调函数的返回值是判断的依据，some方法返回值为true表示至少有一个满足条件，为false表示一个都不满足条件。<br>

<font color=red>some对true敏感，遇到一个满足条件的成员，就停止执行。</font><br>

```javascript
//实现some方法
if(!Array.prototype.some){
    //拓展
    Array.prototype.some = function(callback){
        //遍历数组
        for(var i=0; i<this.length;i++){
            //根据callback执行的结果，判断是否继续查找
            if(callback(this[i], i, this)){
                //有满足条件的
                return true;
            }
            //没有找到的
            return false
        }
    }
}
```

#### 数组--every

是判断的断言方法：判断数组中的所有成员，是否都满足条件<br>

使用方式跟forEach一样<br>

参数是回调函数，回调函数由三个参数：成员值，索引值，原数组，返回值是判断的依据。<br>

every方法返回值，true全部成员都满足条件，false至少有一个成员满足条件。<br>

<font color=red>every对false敏感，遇到一个不满足条件的成员，停止遍历。</font>

```javascript
//实现some方法
if(!Array.prototype.every){
    //拓展
    Array.prototype.every = function(callback){
        //遍历数组
        for(var i=0; i<this.length;i++){
            //根据callback执行的结果，判断是否继续查找
            if(!callback(this[i], i, this)){
                //有一个成员不满足条件，返回false
                return false;
            }
            //所有成员都满足条件
            return true;
        }
    }
}
```

#### 数组--reduce与reduceRight

这两个是累加方法，reduce是从前向后累加，reduceRight是从后向前累加<br>

&emsp;&emsp;对所有成员逐一处理，并将结果返回。<br>

&emsp;&emsp;参数是回调函数<br>

&emsp;&emsp;&emsp;&emsp;四个参数：上一次累积的结果，当前成员值，当前索引值，原数组。<br>

&emsp;&emsp;&emsp;&emsp;返回值是当次累积的结果，会在下一次执行的时候，作为第一个参数传递。<br>

&emsp;&emsp;reduce是从第二个成员开始遍历，第一个成员将在第一次遍历的时候作为第一个参数<br>

&emsp;&emsp;&emsp;&emsp;注意：如果reduce方法传递第二个参数，将从第一个成员遍历，第二个参数就是初始化的值<br>

&emsp;&emsp;reduceRight是从倒数第二个成员开始遍历倒数第一个成员在第一次遍历的时候作为第一个参数。<br>

&emsp;&emsp;&emsp;&emsp;注意：如果reduceRight方法传递了第二个参数，将从倒数第一个成员遍历，第二个参数就是初始化的值。<br>

reduce的实现：

```javascript
//定义数组
var arr = [1,2,3,4,5,6];
if(!Array.prototype.reduce){
    //拓展
    Array.prototype.reduce = function(fn, init){
        //判断是否有第二个参数
        var noInit = init===undefined;
        //定义结果
        var res = noInit?this[0]:init;
        //遍历数组
        for(var i= noInit?1:0;i<this.length;i++){
            //累积结果
            res = fn(res, this[i], i, this)
        }
        //返回数组
        return res;        
    }
}
//求和
alert(arr.reduce(function(res,item){
    return res + item;
},0));
alert(arr.reduce(function(res,item){
    return res + item;
}));
```



### <font color=red>3.函数拓展--函数绑定</font>

ES5对函数拓展了bind方法。<br>

&emsp;&emsp;作用：为函数绑定作用域（当函数执行的时候，改变函数的作用域，并传递参数）。<br>

&emsp;&emsp;目前为止改变作用域的方法|关键字：bind，call，apply，with，eval<br>

&emsp;&emsp;<font color=red>bind方法只改变函数的作用域，并不执行函数。call与apply改变函数作用域的同时执行函数。</font><br>

call与apply的区别：<br>

&emsp;&emsp;它们都是改变函数作用域的方法，都是在调用该方法的时候，执行函数并改变作用域的，第一个参数都是改变的作用域<br>

&emsp;&emsp;call从第二个参数开始，表示传递给函数的参数。<br>

&emsp;&emsp;apply从第二个参数是数组，每一个成员表示传递个函数的参数。<br>

bind通过两项技术实现的<br>

&emsp;&emsp;(1)函数绑定：函数作为参数传递的同时，可以改变函数的this指向。<br>

&emsp;&emsp;&emsp;&emsp;作用：改变this指向<br>

&emsp;&emsp;<font color=red>(2)函数柯理化：一个接收多个参数的函数，我们一个一个的传递参数，在函数执行的时候，传递剩余的参数并得到结果。</font><br>

&emsp;&emsp;作用：增强了函数的适用性。<br>

&emsp;&emsp;&emsp;&emsp;跟函数的重载有点像。<br>

&emsp;&emsp;函数的重载是在函数内部实现的。<br>

&emsp;&emsp;函数的柯理化是在函数外部实现的(没有修改函数内部结构，类似于装饰者模式，是对函数的包装)。

函数柯理化如下：

```javascript
//函数柯理化
/***一个接收多个参数的函数，我们一个一个的传递参数，在函数执行的时候，传递剩余的参数并得到结果。
*@fn	表示函数
*从第二个参数开始，表示传递的参数
***/
function curry(fn){
    //获取参数：
    var args = Array.prototype.slice.call(arguments, 1);
    //返回一个新函数
    return function(){
        //将参数arguments转成数组
        var arr = Array.prototype.slice.call(arguments);
        //合并参数
        var all = [].concat(arr, args)
        //执行原来的函数，传递剩余的参数（新函数中的参数）
        fn.apply(null,all)
    }
}
```

实现bind方法：

```javascript
//在Function类的原型对象上实现，是因为函数作为Function类的实例（原型链）._proto_指向与Function.prototype指向相同，可以通过原型链找到该方法。
Function.prototype.icktBind = function(context){
     //获取参数：
    var args = Array.prototype.slice.call(arguments, 1);
    //this实例，就是方法
    var fn = this;
    //返回一个新函数
    return function(){
        //将参数arguments转成数组
        var arr = Array.prototype.slice.call(arguments);
        //合并参数
        var all = args.concat(arr)
        //执行原来的函数，更改this指向，并传递剩余的参数（新函数中的参数）
        fn.apply(context,all)
    }
}
obj = {t:1,name:'obj'};
function demo(){
    console.log(this, arguments)
}
    
//测试
var fn = demo.icktBind(obj, 1,2,3);
fn(4,5,6)
```

### 4.对象拓展--源子继承(create)

ES5对对象拓展了一个静态方法，叫create，实现对对象的继承。<font color=red>注意是对对象的继承，不是对类的继承</font><br>

&emsp;&emsp;是对寄生式继承的一个拓展，可以看做是寄生工厂模式。<br>

&emsp;&emsp;返回值是一个对象，就是继承了参数对象的新对象。<br>

&emsp;&emsp;继承下来的属性以及方法是可以修改的。<br>

```javascript
//针对对象的继承
var book = {
    title:'javascript设计模式',
    price:'59',
    getTitle:function(){
        return this.title;
    }
};
//继承对象
var book2 = Object.create(book,{
    //构造函数
    constructor:{
        //特性
        value: Array
    }
});
//测试
console.log(book2,book);
```

实现create方法,注意ES5中的Object.create方法本质上是通过特性实现继承的，这里没有用到特性（算是实现的一个缺陷吧）。

```javascript
function create(obj,props){
    //定义寄生类
    function F(){};
    //更改原型
    F.prototype = obj;
    //实例化
    var instance = new F();
    //ES5中的Object.create方法本质上是通过特性实现继承的。
    //重写继承的属性
    if(props){
        //遍历props,实现重写
        for(let key in props){
            instance[key] = props[key];
        }
    }
    //返回实例，寄生工厂模式
    return instance;
}
var book = {
    title:'javascript设计模式',
    price:'59',
    getTitle:function(){
        return this.title;
    }
};
//测试
var book2 = create(book,{
    price:'60'
})
console.log(book2, book);
```

### 5.日期拓展--toJSON

toJSON将日期转化成json格式，（标准化格式）<br>

&emsp;&emsp;它返回UTC失去的ISO格式日期字符串（由后缀Z表示）。<br>

&emsp;&emsp;是ES5新增的方法，增强对日期格式的可读性。<br>

如返回：2020-07-27T04:21:42.190Z



### 6.严格模式

作用：避免错误，优化性能。<br>

在工作中建议使用严格模式。<br>

ES5新增了严格模式，可以使我们写的代码更加的安全可靠<br>

<font color=red>js运行环境就有了两种模式：严格模式，正常模式。</font>

js诞生之初只是为了实现一些简单的交互，随着技术的发展，js需要做的事情越来越多，js其自身的一些糟粕部分就暴露出来了，这些问题，浏览器通常检测不出来，所以常常是隐藏的bug，为了屏蔽这些问题，ES5提出了严格模式，常见的问题诸如：<br>

&emsp;&emsp;定义变量省略var污染全局环境。<br>

&emsp;&emsp;执行eval方法污染全局环境。<br>

&emsp;&emsp;使用arguments.callee无法编译优化。<br>

&emsp;&emsp;........

<font color=red>严格模式不能跨script标签使用。</font>

```html
<script>
'use strict'
//进入严格模式
</script>
<script>
 //不会进入严格模式
</script>
```



进入严格模式：<br>

直接加入一行“use strict”字符串即可<br>

&emsp;&emsp;高级浏览器识别它，会自动进入严格模式。<br>

&emsp;&emsp;低级浏览器不识别，只是当做一行简单的字符串处理。<br>

所以对于高级浏览器以及低级浏览器都没有副作用，所以工作中，建议使用严格模式。<br>

全局与局部：<br>

&emsp;&emsp;如果在js的第一行加入"use strict"此时，代码将处于“全局严格模式”。<br>

&emsp;&emsp;如果在某个函数的第一行加入"use strict"，当函数执行的时候，该函数将处于“局部严格模式”。

```javascript
//局部严格模式。
//如下，只有demo函数内部进入严格模式，可以检测出变量color在定义时没有使用var,有可能污染全局变量。
//		而不能检测全局的num在定义时没有使用var,有可能污染全局变量
function demo(){
    'use strict';
    color = 'red';
}
num = 100;
//执行函数
demo();
```

```javascript
//全部严格模式,全局进入严格模式
//如下,可以检测出变量color与num在定义时没有使用var,有可能污染全局变量。
'use strict';
var color = 'green'
function demo(){
    //可以检测出变量color在定义时没有使用var,有可能污染全局变量
    color = 'red';
}
num = 100;
demo();
```

#### 严格模式规范

(1)全局严格模式<br>

定义变量不能省略var，省略了var就抛出错误。<br>

(2)局部严格模式<br>

在js中执行函数的时候，我们也可以进入严格模式，就是在函数开头添加"use strict"字符串，此时函数内部就是严格模式的，函数外部就是正常模式，<font color=red>只有当函数执行的时候，才能进入严格模式，函数外面仍然是正常模式，知道函数执行完毕，严格模式被解除。</font><br>

(3)全局函数作用域<br>正常模式下，全局函数作用域是window，<font color=red>进入严格模式，**全局函数**作用域是undefined,以前正常模式通过this修改数据会污染全局作用域，严格模式下会抛出错误，就不会污染全局作用域</font>

(4)函数参数<br>

正常模式下，函数可以定义同名参数，但是会产生覆盖问题，前面的参数被覆盖，严格模式下不允许定义同名的参数。<br>

```javascript
function demo(color, color){
    console.log(color)
}
demo('red', 'green')//输出：green。当使用严格模式时，会报出错误。
```



(5)对象属性<br>

严格模式下，在通过对象字面量形式定义对象的时候，不允许定义同名的属性，定义同名的属性，前面的会被覆盖，目前还没有浏览器提示错误。

(6)delete关键字<br>

只能用来删除对象的属性的，正常模式下，可以删除变量，函数等，但是没有删除成功。严格模式下，不允许去删除变量，函数等，只能删除对象的属性，否则会抛出错误。

(7)关键字，保留字，特殊变量

严格模式下不允许用关键字，保留字，特殊性变量来定义变量。<br>

&emsp;&emsp;关键字：具有一定功能的单词：var，function，for，while等<br>

&emsp;&emsp;保留字：当前版本没有使用，将来某个版本将被使用的变量：class，public等等。<br>

&emsp;&emsp;特殊变量：在特定环境下具有一定功能的变量：arguments,eval等。<br>

在严格模式下，用这些单词定义变量会抛出错误。<br>

(8)8进制<br>

&emsp;&emsp;js中以0开头的数字：如果后面的数字出现大于等于8的，就是10进制，如果后面的数字都小于8，就是8进制。所以容易出现混乱，所以严格模式下不允许使用8进制的数（数字不允许以0开头）。<br>

(9)特殊字符<br>

&emsp;&emsp;由于字符集的限制，有些字符，不能书写出来，可以通过特殊字符表达，例如\012表示一个换行，有时候为了避免字符冲突，我们也要转义，例如在单引号定义的字符串中，使用单引号。这样转义后，有的仍然是其自身，有的变成其他字符了，有奇异，因此严格模式不允许使用特殊字符。严格模式下可以使用转义字符，但是不能使用特殊字符。

````javascript
'use strict'
//不能使用特殊字符
//var str = 'hello\012ickt';
//var str= 'hello\1ickt';
//可以使用转义字符
var str1 = 'hello\'ickt';
var str2 = 'hello\nickt';
````

(10)eval<br>

&emsp;&emsp;eval可以将字符串作为语句去执行，但是会污染全局作用域。严格模式下，可以避免对全局作用域的污染。ES5对eval的处理是识别特殊变量，并没有改变其功能，因此仍然想使用原有的功能，我们可以将eval赋值给一个变量，然后通过该变量去执行。

```javascript
'use strict'

eval('var a= 10;console.log(a)')//输出：10
console.log(a);//报错，严格模式下，避免eval污染全局作用域。
```

```javascript
'use strict'
var newEval = eval;
newEval('var a= 10;console.log(a)')//输出：10
console.log(a);//输出：10.因为严格模式下只是识别eval关键字，没有改变其功能。
```

(11)arguments.callee<br>

&emsp;&emsp;在函数内部访问该函数：解决函数的执行时与函数名称耦合的问题(常用在递归中)。在浏览器渲染js的时候，并不是直接执行js语句，而是将js编译，执行编译的代码。但是由于arguments.callee无法被编译引擎编译优化，所以严格模式下不允许使用。js是动态语言，执行时候的作用域，因此在编译的时候js没有执行，因此arguments.callee到底哪个函数名称，编译引擎不知道，所以无法优化。<font color=red>严格模式下，不能使用arguments.calle</font>

arguments.callee是为了解决函数的实现与函数名称耦合的问题：

```javascript
//递归求和
function add(num){
    //如果num是1，直接返回
    if(num<=1){
        return num;
    }
    return num + add(num-1);
}
var ickt = add;
//销毁add变量
add = null;
console.log(ickt(5));//会报错，因为add已经被销毁，在add函数内部还在使用add(num-1)
```

```javascript
//递归求和
function add(num){
    //如果num是1，直接返回
    if(num<=1){
        return num;
    }
    //为了解决函数的实现与函数名称耦合的问题，js提供了arguments.callee
    return num + arguments.callee(num-1);
}
var ickt = add;
//销毁add变量
add = null;
console.log(ickt(5));//输出15
```

在编译过程中没法确定arguments.callee的指向（只有在执行的时候才能确定arguments.callee的指向），严格模式下不能使用arguments.callee

```javascript
'use strict'
//递归求和
function add(num){
    //如果num是1，直接返回
    if(num<=1){
        return num;
    }
    //为了解决函数的实现与函数名称耦合的问题，js提供了arguments.callee
    return num + arguments.callee(num-1);
}
var ickt = add;
//销毁add变量
add = null;
console.log(ickt(5));//报错
```

(12)with<br>

&emsp;&emsp;可以更改代码执行时候的this指向，<font color=red>严格模式下不能使用with</font>，因为with无法让编译引擎编译优化。js在编译的时候，无法执行with语句，也就是说，在with语句内部出现的变量，我们不知道是全局的还是更改的对象中的，因此有歧义，所以严格模式不允许使用。

with的作用：

```javascript
//使用数学对象提供的方法
console.log(Math.max(10, 20, 30));
console.log(Math.PI);
console.log(Math.round(4,5));

//避免每次访问Math
with (Math){
    console.log(PI);
    console.log(abs(-5));
    console.log(random());
}
```

with的问题:

```javascript
var a=10;
var b=20;
var obj = {
    b:30,
    c:40
}
console.log(a+b)//输出：30
with (obj){
    //在obj对象下执行，a是全局的，b是局部的。
    //但在编译时，无法确定a,b是全局的还是局部的，只有在执行的时候才知道，因此存在问题。
    //因此在严格模式下不能使用with
    console.log(a+b);
}
```

### 7.特性(用来说明属性的性质)与属性

#### 特性(Object.defineProperty与Object.defineProperties)

对象是什么，我们用属性来说明<br>

属性是什么，我们用特性来说明<br>

&emsp;&emsp;特性的作用就是用来说明属性。<br>

定义特性<br>

&emsp;&emsp;Object.defineProperty(obj, prop, property)<br>

&emsp;&emsp;&emsp;&emsp;obj				表示对象<br>

&emsp;&emsp;&emsp;&emsp;prop			表示对象的属性<br>

&emsp;&emsp;&emsp;&emsp;property 	表示属性的特性，是个对象。<br>

特性对象有四个属性<br>

&emsp;&emsp;value			表示属性的值<br>

&emsp;&emsp;writable		表示属性是否可以更改<br>

&emsp;&emsp;&emsp;&emsp;true:可以修改		false：不可修改<br>

&emsp;&emsp;enumerable	表示属性是否可以被枚举	例如，是否可以通过for in遍历<br>

&emsp;&emsp;&emsp;&emsp;true：可以遍历		false：不可遍历<br>

&emsp;&emsp;configurable	表示属性是否可以再次被配置

（是否可以再次更改这些特性即value，writable,enumerable,configurable）<br>

&emsp;&emsp;&emsp;&emsp;true:可以配置		false：不能配置<br>

（注意一旦设为false，那么value，writable,enumerable,configurable这些值永远不能被修改。）

&emsp;&emsp;除了value，其余都是布尔值。<br>

特性对象有两个方法，注意：<font color=red>这两个方法不能与value和writable兼容</font><br>

&emsp;&emsp;get获取属性的值<br>

&emsp;&emsp;&emsp;&emsp;没有参数，this指向这个对象，返回值就是这个属性的值。<br>

&emsp;&emsp;&emsp;&emsp;注意：<font color=red>绝对不能在该方法内部获取该属性，否则递归死循环。</font>

&emsp;&emsp;&emsp;&emsp;工作中，通常获取的是这个值的备用值。<br>

&emsp;&emsp;set获取属性的值<br>

&emsp;&emsp;&emsp;&emsp;参数就是修改的新的值，this指向这个对象，返回值无意义。<br>

&emsp;&emsp;&emsp;&emsp;注意：<font color=red>绝对不能在该方法内部获取该属性，否则递归死循环。</font>

&emsp;&emsp;&emsp;&emsp;工作中，通常获取的是这个值的备用值。<br>



```javascript
//定义对象
var obj = {
    num: 100
};
添加属性
Object.defineProperty(obj, 'color',{
    value: 'red',
    //是否可以被修改
    writable:true,
    //是否可以被遍历
    enumerable:true,
    //是否可以被配置
    configurable: false;
})

//可以修改属性
obj.color = 'green';
//可以遍历
for(var key in obj){
    console.log(key, obj[key]);
}
console.log(obj);

Object.defineProperty(obj, 'color',{
    //是否可以被修改
    writable:false,
    //是否可以被遍历
    enumerable:false,
})//会报错，因为在上一个Object.defineProperty中， configurable为false;
```

```javascript
//特性方法
Object.defineProperty(obj, 'msg', {
    //特性方法
    //取值器方法（获取）
    get: function(){
        //绝对不能直接获取该属性，会陷入死循环，因为获取this.msg会再调用get方法。
        //即return this.msg;
        //返回备份数据
        return this._msg;
    },
    //value和writable不能与get和set一起定义
    //value：'abc'//会报错
    
    //赋值器方法(修改)
    set: function(value){
        //绝对不能直接修改当前属性，会陷入死循环，因为修改this.msg会再调用set方法。
        //即 this.msg = value;
        //修改备份数据
        this._msg = value;
    }
    //枚举
    enumerable: true,
    //不能配置
    configurable: false
})
```

定义多个属性特性<br>
Object.defineProperties(obj, propsProperty)<br>

&emsp;&emsp;obj		表示原对象<br>

&emsp;&emsp;propsProperty	表示属性特性对象<br>

&emsp;&emsp;&emsp;&emsp;key		表示属性名称<br>

&emsp;&emsp;&emsp;&emsp;value	表示特性对象<br>

```javascript
//定义对象
var obj = {
    num: 10;
}
//定义多个属性的特性
Object.defineProperties(obj,{
    num:{
        writable: false
    },
    color:{
        value: 'red',
        writable: false
    },
    msg:{
       set: function(value){
           this._msg = value;
       },
       get: function(){
           return this._msg;
       },
       enumerable: true
    }
})
```

#### 判断自身属性

for in循环可以遍历对象的自身属性以及原型属性，有时候需要<font color=red>遍历自身属性，不希望遍历原型方法我们可以使用hasOwnProperty方法</font><br>

&emsp;&emsp;obj.hasOwnProperty(prop)<br>

&emsp;&emsp;&emsp;&emsp;对象调用

&emsp;&emsp;&emsp;&emsp;参数就是个属性

&emsp;&emsp;&emsp;&emsp;返回值：

&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;true表示自身属性

&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;false表示原型属性

例如，原型的属性方法不希望被遍历，可以设置特性：<br>

```javascript
//定义类
function Book(title, price){
    this.title = title;
    this.price = price;
}
//实例化
var book = new Book('javascript', 10)
//如果原型的属性方法不希望被遍历，可以设置特性
Object.defineProperty(Book.prototype,'page'{
	value： 100，
    enumerable: false;
})
for(var key in book){
    console.log(key)//访问不到page属性
}

或者可以这样实现
//定义类
function Book(title, price){
    this.title = title;
    this.price = price;
}
//实例化
var book = new Book('javascript', 10)
for(var key in book){
   //使用hasOwnProperty判断属性是否是自身的
   if(book.hasOwnProperty(key)){
       console.log(key);
   } 
}
```

#### 获取属性名称

有时我们只想获取所有自身属性名称可以使用Object.getOwnPropertyNames<br>

&emsp;&emsp;Object.getOwnPropertyNames<br>

&emsp;&emsp;&emsp;&emsp;参数就是这个对象

&emsp;&emsp;&emsp;&emsp;返回值就是获取的所有属性，是一个数组

&emsp;&emsp;即使属性设置了特性，也可以获取

&emsp;&emsp;不能获取原型上的属性

```javascript
//定义类
function Book(title, price){
    this.title = title;
    this.price = price;
}
//实例化
var book = new Book('javascript', 10)
//如果原型的属性方法不希望被遍历，可以设置特性
Object.defineProperties(book,{
    writer:{},
    color:{},
    time:{
        get:function(){},
        set:function(){}
    }
})
var keys = Object.getOwnPropertyNames(book);
console.log(keys)
```

#### 查看属性特性

ES5新增一个方法，Object.getOwnPropertyDescriptor()可以查看属性的特性<br>

&emsp;&emsp;Object.getOwnPropertyDescriptor(obj, prop)<br>

&emsp;&emsp;&emsp;&emsp;obj表示这个对象		prop表示这个属性

&emsp;&emsp;&emsp;&emsp;返回值是一个特性对象

```javascript
//定义类
function Book(title, price){
    this.title = title;
    this.price = price;
}
//实例化
var book = new Book('javascript', 10)
//如果原型的属性方法不希望被遍历，可以设置特性
Object.defineProperties(book,{
    writer:{},
    color:{},
    time:{
        get:function(){},
        set:function(){}
    }
})
//获取自身属性
var keys = Object.getOwnPropertyNames(book);
//查看每一个属性对应的特性
keys.forEach(function(key){
    //获取特性
    var descriptor = Object.getOwnPropertyDescriptor(book, key)
    console.log(key, descriptor);
})


```

特性总结<br>

&emsp;&emsp;1.对象原有的属性，特性默认值都是true（writable, enumerable, configurable）<br>

```javascript
如上面book对象的title,price属性的writable, enumerable, configurable
```



&emsp;&emsp;2.特性方法为对象新增的属性，特性默认值都是false<br>

```javascript
如上面book对象的writer,color的writable, enumerable, configurable。time属性的enumerable, configurable
```



&emsp;&emsp;3.特性中的set，get与value，writable不兼容。<br>

```javascript
如上面title,price,writer,color属性中都有value，writable属性，而没有set，get。
而time属性有set，get，而没有value，writable属性。
```

&emsp;&emsp;4.属性的特性默认优先设置value和writable.

```javascript
如上面book对象的writer,color中存在value和writable属性，而不存在set,get
```

### 8.对象原型操作

#### isPrototypeOf方法

ES5新增了一个isPrototypeOf方法可以判断对象的原型对象，<br>

&emsp;&emsp;注意：<font color=red>这个方法查找整个原型链。</font><br>

用法：类的原型.isPrototypeOf(对象)<br>

类的原型是否被对象继承了(对象的原型链上是否可以找到这个类)<br>

如下例：

```javascript
var arr = [1, 2, 3];
var obj = {color: 'red'};
//判断原型对象
console.log(Array.prototype.isPrototypeOf(arr));//输出：true
console.log(Array.prototype.isPrototypeOf(obj));//输出：false
console.log(Object.prototype.isPrototypeOf(arr));//输出：true
console.log(Object.prototype.isPrototypeOf(obj));//输出：true
```

#### 让原型属性不可枚举<br>

使用方式：

Object.defineProperty(类的原型对象，property,{

​		enumerable: false		//不可枚举

})

#### 操作原型

获取原型：Object.getPrototypeOf<br>

&emsp;&emsp;以前获取对象的原型用_ proto _，但是 _ proto _属性以 _ 开头，属于私有的属性的写法，是不希望我们使用的。<br>

&emsp;&emsp;因此ES5新增Object.getPrototypeOf方法，用来获取对象的原型的。<br>

&emsp;&emsp;与 _ proto _ 属性是等价的。<br>



修改原型： Object.setPrototypeOf<br>

&emsp;&emsp;该方法用于<font color=red>设置某个对象的原型。（注意是对象）</font><br>

&emsp;&emsp;使用方式： Object.setPrototypeOf(obj, prototype)<br>

&emsp;&emsp;&emsp;&emsp;obj: 要设置新的原型的对象<br>

&emsp;&emsp;&emsp;&emsp;prototype: 要设置的新的原型（可以是null,也可以是一个对象）<br>

如下，让一个对象继承另一个类的原型

```javascript
//定义类
function Book(title, price){
    this.title = title;
    this.price = price;
}
//原型
Book.prototype.getTitle = function(){
    return this.title;
}
Book.prototype.getPrice = function(){
    return this.price;
}
//定义对象
var book = {
    title:'javascript',
    price: 59,
    msg: 'hello'
};
//修改原型，实现对Book类的原型继承
Object.setPrototype(book,Book.prototype);
console.log(book.getTitle());
```

### 9.对象操作

#### 对象禁拓

对象有四个操作：增（拓展，增加）删（删除）该（修改）查（查看）<br>

对象的禁拓（禁止拓展）就是说<br>

&emsp;&emsp;该对象不能拓展属性(新增属性)，<br>

&emsp;&emsp;但是可以删除属性，修改属性和查看属性<br>

Object.preventExtensions方法，用于取消对象的可拓展性<br>

&emsp;&emsp;参数就是这个对象。<br>

&emsp;&emsp;<font color=red>禁拓是不可逆的，一旦禁拓就无法解除</font>

查看是否禁止拓展： Object.isExtensible<br>

&emsp;&emsp;如果返回的是false表示禁拓了		true表示没有被禁拓，可以新增属性。<br>

```javascript
//对象
var obj = {
    color: 'red',
    num: 100
}
//查看禁拓
console.log(Object.isExtensible(obj))//输出：ture;
//禁拓
Object.preventExtensions(obj);
//查看禁拓
console.log(Object.isExtensible(obj))//输出：false;

//拓展属性 增
obj.msg = 'hello'//不能增加属性，因为前面禁拓了
//删除属性 删
delete obj.num;
//修改属性 改
obj.color = 'green';
//查看属性 查
console.log(obj);//输出: {color: "green"}
```

#### 对象封闭

对象的封闭就是说<br>

&emsp;&emsp;不能对对象添加属性，删除属性，<br>

&emsp;&emsp;但是可以修改属性和查看属性<br>

Object.seal方法，来封闭一个对象<br>

&emsp;&emsp;参数就是这个对象<br>

&emsp;&emsp;<font color=red>封闭是不可逆的，一旦封闭就无法解封。</font><br>

查看是否封闭用： Object.isSealed<br>

&emsp;&emsp;如果返回的是true表示被封闭了，反之则没有被封闭。<br>

#### 对象冻结

对象的冻结就是说<br>

&emsp;&emsp;不能对对象添加属性，删除属性，修改属性<br>

&emsp;&emsp;只能查看对象的属性<br>

Object.freeze方法，来冻结一个对象<br>

&emsp;&emsp;参数就是这个对象<br>

&emsp;&emsp;<font color=red>冻结是不可逆的，一旦冻结就无法解冻。</font><br>

查看是否冻结用： Object.isFrozen<br>

&emsp;&emsp;如果返回的是true表示被冻结了，反之则没有被冻结。<br>

