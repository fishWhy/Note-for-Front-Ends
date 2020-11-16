## TypeScript

### 1.TypeScript简介

typescript简称ts，是js语法的超集，很多js新的语法就借鉴了ts语法。ts是由微软团队维护的。<br>

在过去，js的出现是为了解决页面中的一些简单交互，因此js被设计的非常简单，被很多开发者接受。<br>

js特点：<br>

&emsp;&emsp;<font color=red>弱类型：定义变量没有具体的类型，可以存储任何类型的数据</font><br>

&emsp;&emsp;<font color=red>动态的：变量存储的数据需要开辟多少内存空间，不是在定义时候说的算，而是运行时候动态开辟的</font><br>

&emsp;&emsp;......

由于js是弱类型的，因此变量存储的是什么样式的数据，需要多少的内存空间，我们在定义的时候无法获知，只能在js运行的时候，动态的分配，<font color=red>**所以js运行的时候，一边处理业务逻辑，一边分配内存空间，对于小项目来说，运行时临时分配空间的性能消耗是可以接受的，在大型项目中，这种消耗是无法接受的。**</font>

&emsp;&emsp;所以在一些强类型语言中，为变量在定义的时候指明类型，这样运行前就可以针对变量的类型分配内存空间，这样在程序运行的时候就不需要分配空间了，可以减少不必要的资源消耗，所以ts是一个强类型语言在大型项目中，为了提高代码可维护性，我们通常采用面向对象编程方式，但是在面向对象编程中，我们势必要使用类，继承，接口，私有属性，共有属性等等，但是这些关键字，诸如：class, extends, implement, interface, private, public等等js都不支持，但是js为了实现这些功能，自身模拟了这些功能，但是为了模拟这些功能势必会产生一些不必要的开销，在大型项目中，这些开销是无法接受的。所以TS基于面向对象编程方式，实现了这些关键字。<br>

&emsp;&emsp;<font color=red>**ts语法着眼于未来与大型项目。遗憾的是，这些功能并没有一个浏览器实现，也没有一个浏览器宣传要实现（并且IE浏览器都没有实现），所以我们就要将其编译成js语言（ES3.1版本或者是ES5版本，但这样ts语法的优点不就都没了吗？这也是它没有被推广的这么广的原因）**</font>

TypeScript是一个大集合，JavaScript是其子集。

TS官网：<http://www.typescriptlang.org/>

TS中文网站：<https://www.tslang.cn/>

TS的GitHub地址：<https://github.com/Microsoft/typescript>

ts文件的拓展名是.ts

### 2.编译TS

安装tsc指令：

```javascript
npm install typescript -g
```

安装完成，查看版本号：tsc -v<br>

在开发目录中，执行"tsc  文件名"指令，即可编译ts文件。<br>

监听并发布<br>

&emsp;&emsp;1.通过tsc-init创建tsconfig.json配置文件。(详情可参考：<https://www.cnblogs.com/guojiabing/p/12548507.html>)<br>

```json
{
  "compilerOptions": {
    /* Basic Options */
    "target": "es5",  		/* target用于指定编译之后的版本目标 version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017','ES2018' or 'ESNEXT'. */
    "module": "commonjs",   /* 用来指定要使用的模块标准: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */
    "lib": [
      "es6",
      "dom"
    ],   
    ...
}
```

&emsp;&emsp;&emsp;&emsp;outDir定义js文件发布的位置<br>

&emsp;&emsp;2.<font color=red>执行tsc -w监听并发布文件。</font><br>

注：在后面课程中，会使用工程化工具来自动化的编译ES6与TS (webpack)。<br>



### 3.数据类型

数据类型：

在js中所有的数据都要指明类型<br>

在js中的数据类型，ts中都支持<br>

并且还拓展了：any(任意类型)，void，never这些类型<br>

```typescript
let num2:number = true//不能将布尔型的数据赋给number类型的
let num3:any = 10;//可以将任意类型的数据赋值给num3
num3 = true;
num3 = 'ddafa'
```

<br><br>

类型猜想:<br>

如果定义的数据没有指定类型，此时程序运行的时候根据赋值的数据进行类型猜想<br>

<font color=red>但是，不要让ts去猜想类型：</font><br>

&emsp;&emsp;1.程序执行的时候，会对数据进行猜想，会临时分配内存空间，造成消耗性能。<br>

&emsp;&emsp;2.类型猜测往往不是我们要的结果。<br>

```typescript
//我们在定义时猜测的是数字类型，但后来我们赋成布尔类型，这样会有各种问题
let num = 100;
num = true;
```

类型推断：<br>

当我们比程序更了解数据类型的时候，此时可以使用类型推断技术。让计算机按照某种类型去运行语法。<br>

第一种语法：<type>  数据<br>

第二种语法：数据 as 类型<br>

<font color=red>类型推断并没有改变数据类型，不同于类型转换。</font><br>

```typescript
//类型推断
let ickt4:any = 'hello';
//类型推断，人为的让数据作为某种类型来处理
console.log((<String>ickt4).toUpperCase());
console.log(ickt4 as String).toUpperCase());

//注意：类型推断并没有改变数据类型，不同于类型转换
let ickt5:any = true;
//类型推断，人为的让数据作为某种类型来处理
console.log((<String>ickt5).toUpperCase());//会报错
console.log(ickt5 as String).toUpperCase());//会报错
```

### 4.数组与元组

#### 数组

在ts中定义数组也要指定类型<br>

&emsp;&emsp;语法：let arr:type[] = []<br>

&emsp;&emsp;此时：<br>

&emsp;&emsp;&emsp;&emsp;我们向数组中传递数据的时候，必须和初始化定义的数据类型是一致的<br>

&emsp;&emsp;&emsp;&emsp;如果类型不确定，我们可以将type改变any。<br>

```typescript
//定义数组
//let arr:number[] = [1,2,3]
let arr:any[] = [1,2,3]
//只能添加数字类型
arr.push(true)
arr.push(20)
```

#### 元组

定义元素的方式与定义数组很相像<br>

只不过在定义的时候，要指定类型以及指定个数<br>

&emsp;&emsp;语法：let arr:[type1, type2] = [item1, item2];<br>

&emsp;&emsp;此时：<br>

&emsp;&emsp;&emsp;&emsp;1.传递数据的时候，必须和初始化的类型是一致的。<br>

&emsp;&emsp;&emsp;&emsp;2.传递数据的时候，必须和初始化的数据个数一致。<br>

&emsp;&emsp;&emsp;&emsp;3.在后面向元组中添加新成员的时候，必须在指定的类型范围之内。<br>



```javascript
//元组
let arr5:[string, number] = ['hello', 100]
//添加新成员
arr5.push(200)
arr5.push('msg')
//添加新成员的时候，必须在指定的类型范围内
//arr5.push(false) //报错
```



### 5.类型级联

如果定义的数据没有确定的类型，我们可以将数据的类型改成any<br>

但是，any类型表示的数据范围太大了，为了缩小数据类型的范围，要使用类型级联技术<br>

&emsp;&emsp;语法：type1 | type2 | type3 <br>

&emsp;&emsp;此时，定义的数据类型只能在该范围之内。<br>

```javascript
//缩小范围
var ickt:number|boolean = 100;
ickt = true;
//其他类型的
//ickt = 'hello'   //报错
```

### 6.枚举类型

枚举类型是介于对象和数组之间的数据类型<br>

&emsp;&emsp;语法：enum枚举类型{}<br>

&emsp;&emsp;特点：<br>

&emsp;&emsp;&emsp;&emsp;既可以像数组那样，通过索引值获取属性名称。<br>

&emsp;&emsp;&emsp;&emsp;又可以像对象那样，通过属性名称获取索引值。<br>

注意：<br>

&emsp;&emsp;1.枚举类型数据的首字母要大写。<br>

&emsp;&emsp;2.每一个成员之间用逗号分隔。<br>

&emsp;&emsp;3.我们可以为某个成员改变索引值。此时，后面的成员索引值要递增，前面的不变。<br>

```typescript
enum Color{red,green,blue}
console.log(Color)
//通过索引值访问成员
console.log(Color[0])
console.log(Color[1])
console.log(Color[2])
//通过成员访问索引值
console.log(Color.red)
console.log(Color.green)
console.log(Color.blue)
```

### 7.函数

在js中定义函数的方式有：1.构造函数式 	2.函数定义式	3.函数表达式		4.箭头函数<br>

只有函数定义式，不需要定义var或者是变量来接收。<br>

在ts中要为每一个函数指明类型<br>

&emsp;&emsp;语法：function demo(arg:type, arg1?:type):type{}<br>

&emsp;&emsp;&emsp;&emsp;传递参数：<br>

&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;1.传递的数据类型要一致。<br>

&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;2.传递的数据个数要一致。<br>

函数注意事项：<br>

1.函数中参数以及返回值要定义类型。<br>

2.如果参数可有可无，后面加上问好即可。<br>

函数的返回值通常有三类结果<br>

1.返回数据，此时函数的返回值类型就是数据类型<br>

2.没有返回数据，函数的类型是void<br>

3.如果函数中出现了错误，此时函数的类型是never<br>

```typescript
//定义函数
function add(num1:number, num2?number):number{
    if(num2){
        return num1+num2;
    }else{
        return 10+num1
    }
}
console.log(add(5));
```



## 下面的泛型，类，继承，模块，接口感觉越来越像java语言中的，这部分视频中讲解的太简单，在我需要使用到的时候我会去详细的去看看，下面就不再详细的记录了。

### 8.泛型

如果参数的类型是任意的，返回的结果也可以能是任意的，此时我们可以将类型定义成any。<br>

如果希望参数与返回值的类型是一致的，any类型就不适用。此时可以使用泛型<br>

&emsp;&emsp;语法function demo<T>(arg:T):T{}<br>

&emsp;&emsp;这样的话，参数与返回值的类型就一致了，都是T变量表示的类型。<br>

使用函数的时候，有两种方式<br>

&emsp;&emsp;第一种 demo\<type>(数据)；<br>

&emsp;&emsp;第二种 demo(数据)<br>

&emsp;&emsp;&emsp;&emsp;此时将猜测类型，常用。

### 9.类

语法：class类名{}<br>

&emsp;&emsp;注：类名首字母要大写。<br>

构造函数：我们也是通过constructor定义构造函数<br>

&emsp;&emsp;我们只能定义参数类型，不能定义返回值的类型。参数可有可无，后面添加？<br>

属性：在ts中，我们要将属性在类体中声明类型。<br>

&emsp;&emsp;声明的时候可以赋值，但必须要设置类型。<br>

&emsp;&emsp;在构造函数中，也可以为声明的属性赋值。没有声明属性，在构造函数中，是不能使用。<br>

&emsp;&emsp;我们用构造函数的参数为属性赋值，实现数据由外流入内部。<br>

&emsp;&emsp;属性必须在声明的时候赋值或者构造函数内部赋值。<br>



### 10.继承

### 11.模块

### 12.接口















