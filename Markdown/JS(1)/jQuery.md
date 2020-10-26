# jQuery $
## 官网：www.jquery.com
### 写更少的代码，做更多的事情。
### jQuery的最新版本是3.2.1，不兼容IE6,7,8。我们学习的jQuery 是1.12.3版本的，目的是为了兼容IE6,7,8，向VUE和React都不兼容IE6,7,8。 jQuery3和jQuery1.12.3的API完全一样。<br>

## 1.引入jquery的时候需要注意，引入jquery的script标签不能和书写jquery语句的标签是同一个，引入jquery的script标签要写在最前面。
&emsp;&emsp;简化获取元素的方式；<br>
&emsp;&emsp;简化元素的运动；<br>
&emsp;&emsp;jquery操作都是匹配的，不管是更改样式还是添加事件。以后几乎不会用到for循环。<br>
&emsp;&emsp;都是兼容IE的不用再进行能力检测了。而且都是得到的是计算后的样式。<br>
&emsp;&emsp;jquery简化了DOM操作，比如添加，删除，更改节点。

## 2. js对象转jquery对象直接加$(),  jquery对象转js对象直接书写索引值。（jquery对象是一个类数组对象）

## <font color='red'>这里只记载一些比较常用的方法很多方法没记下来，用到什么就去网上查什么。</font>

## 3.常用方法
    size()      //length属性，通过$()函数获取到的jquery对象也具有length。
    css()       //得到的是元素对象计算后的样式
        设置：可以设置单个属性。也可以同时设置多个属性（例如：{background:'pink',width:400}）。
    show()      //终点状态：display:block
    hide()      //终点状态：display:none
    jquery绑定时间：on方法或者直接事件名称定义回调函数
    jquery中的一些方法，可以获取数据，可以设置数据
    .eq(i)方法返回的是jquery对象，因此可以连续打点调用。
    
    html()      //读取元素的内部文本。参数：要设置的文字。还可以添加DOM节点。原理就是元素设置innerHTML属性。
    addClass()和removeClass()
    attr()      // 该方法用于设置元素的原有属性  $(dom).attr(key,value)
    ...

## 4.节点操作
    $(this)     //在事件回调函数中，获取当前元素对应的jq对象。
    parent()
    .....
    
## 5.序号问题

    eq()
    index()
    each()
    ...

## 6.回调函数
异步语句：类似于animate这种需要花费时间的语句，如果后面还有其它的js语句，这些语句不会死等着。
回调函数：异步语句一般都有一个回调函数，当异步语句执行之后要做的事情就是写在回调函数中的。







