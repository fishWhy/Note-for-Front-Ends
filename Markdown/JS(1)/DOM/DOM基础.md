# DOM
DOM (Document Object Model,文档对象模型)描述了一个层次化的节点树，允许开发人员添加，移除和修改页面的某一部分。这使得JavaScript操作HTML，不是在操作字符串，而是在操作节点，极大地降低了编码难度。DOM对很多东西做了抽象提供了丰富的API：取得元素，css样式，事件，运动，元素尺寸位置，节点操作等等。

    <div id='app'>hello ickt</div>
    
    <script>
        //操作dom
        var app = document.getElementById('app');
        //修改内容
        app.innerHTML = '好好学习';
    </script>
    /*这样前台就会显示'好好学习'，而不再显示'hello ickt'*/

## 1.HTML操作
document:<font color=red>表示文档（表示整个页面）对象。document对象具有页面几乎所有的方法或者属性。</font><br>
&emsp;&emsp;读取：document.title页面的标题。<br>
&emsp;&emsp;赋值： 使用=进行赋值。<br>
一般操作元素都是从获取元素开始的。
&emsp;&emsp;获取元素的方式:getElementById()&emsp;&emsp;通过id属性获取元素对象(<font color=red>注意数据类型是一个对象</font>）。<br>
&emsp;&emsp;通过元素对象操作属性：<br>
&emsp;&emsp;&emsp;&emsp;读取：可以通过对象点属性名方法获取属性值。<br>
&emsp;&emsp;&emsp;&emsp;设置：用=进行赋值<br>
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;点语法<font color=red>只能读取或设置元素的自带有属性不能设置读取元素的自定义属性</font>（例如：可以对id属性进行这样的设定，不能对class属性，因为class是关键字它在document对象中对应className，不能对color属性因为color属性不是自带的。）。

## 2.属性操作
属性操作方法：
&emsp;&emsp;读取：getAttribute()<font color=red>可以读取元素自带属性或者自定义属性</font><br>
&emsp;&emsp;设置： setAttribute()<font color=red>设置元素自带属性或者是自定义属性</font><br>
### 点语法和getAttribute()，setAttribute区别：
&emsp;&emsp;1.点语法只能读取或者设置元素的自带有属性，getAttribute(),setAttribute()可以读取元素自带属性或者是自定义属性。
&emsp;&emsp;2.点语法操作有些属性名需要改名字，getAttribute(),setAttribute()不用该名，是什么就直接书写什么。
&emsp;&emsp;class -> className &emsp;&emsp; for -> htmlFor<br>
&emsp;&emsp;rowspan -> rowSpan&emsp;&emsp;colspan->colSpan<br>
&emsp;&emsp;3.通过点语法得到的style对象，而getAttribute得到的是字符串。<br>
&emsp;&emsp;4.点语法得到style可以继续打点。而getAttribute()得到的是字符串不能继续打点调用属性。<br>
#### 总结：<font color=red>除了自定义属性使用getAttribute(),其他所有情况都使用点语法。</font>
<br>

## 3.样式操作
css操作就是更改元素的样式。<br>
&emsp;&emsp;<font color=red>通过点语法的style得到对象（包含css所有的样式）。能够继续打点调用style属性。</font><br>
&emsp;&emsp;&emsp;&emsp;属性名需要改为驼峰命名法（删除横线，将横线后面的单词首字母大写）。<br>
&emsp;&emsp;&emsp;&emsp;读取：通过点语法直接获取style对象中的css样式<br>
&emsp;&emsp;&emsp;&emsp;设置:使用=进行设置，将新的属性值写在=右侧。必须用双引号包裹。<br>
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;属性值的写法：原来css属性值怎么写，js就怎么写。<br>
&emsp;&emsp;&emsp;&emsp;<font color=red>使用点语法设置css样式，是书写行内的样式。</font><br>
&emsp;&emsp;<font color=red>还可以通过setAttribute方法修改样式，会覆盖原有的行内式样式，属性值是css字符串（遵循css规则）。</font>

## 4.DOM事件
事件监听：我们计算机在解析我们JS代码时候，会去看某一些元素身上是否添加了事件。并监听这些事件有没有被触发，如果触发就立即执行相应的行为。

    onclick  ondblclick  onmouseenter  onmouseleave
    onmousedown  onmouseup  onfocus onblur  onload

元素绑定事件：元素.事件名=fn。可以绑定匿名函数或者函数名（千万不要在函数名后面书写小括号）。<br>
注意：<br>
### &emsp;&emsp;<font color=red>我们在body中书写js时，需要将js书写在所有html元素之后。当html元素加载完毕之后再执行js。<br>
### &emsp;&emsp;如果js书写在head标签中，必须书写onload事件，window.onload表示当html元素加载完毕之后执行内部的语句。</font>

## 5.getElementsByTagName
getElementById()和getElementsByTagName()都是兼容IE低版本。全线兼容。
&emsp;&emsp;getElementsByClassName()不兼容IE低版本。<br>
&emsp;&emsp;getElementsByTageName()通过元素的标签名得到元素。<br>
&emsp;&emsp;&emsp;&emsp;得到的是页面上所有的同种标签组成的<font color=red>类数组对象。(哪怕只有一个元素也是类数组对象。想得到该元素对象，仍然需要书写索引值。)</font><br>
&emsp;&emsp;&emsp;&emsp;&emsp;可以通过数组的索引值得到任何一个对象。<br>
&emsp;&emsp;&emsp;&emsp;&emsp;类数组中保存的每一个数据也是元素对象。<br>
&emsp;&emsp;&emsp;&emsp;&emsp;得到的类数组对象具有length属性。表示保存标签的元素个数。<br>
&emsp;&emsp;不管元素嵌套多深，getElementsByTagName("p")也可以查找。<br>
&emsp;&emsp;<font color=red>类数组对象保存数据的顺序和标签之间的嵌套没有关系，和标签首次出现的顺序有关。</font>


## 6.连续打点与批量操作事件
<font color=red>不但document可以打点调用getElementsByTagName(),其它元素对象也都可以打点调用该方法。（但只有getElementsByTagName()可以这样，getElementById()等都不可以这样。）</font>

    //下面的代码是正确的
    <div id = 'app'>
        <div></div>
    </div>
    <script>
        var app = document.getElementById('app');
        var divs = app.getElementByTagName('div');
    </script>
    
    //下面的代码是错误的
    <div id = 'app'>
        <div id='div3'></div>
    </div>
    <script>
        var app = document.getElementById('app');
        //错在这里
        var divs = app.getElementById('div3');
    </script>

批量操作事件：<br>
&emsp;&emsp;<font color=red>通过getElementByTagName()得到的类数组对象，我们可以通过批量操作的方式给数组每一个元素添加相同事件。</font><br>
&emsp;&emsp;案例：给元素批量添加点击事件，触发事件弹出该元素对象的索引值<br>
&emsp;&emsp;注意：事件回调函数中，存储索引值的两种方式<br>
&emsp;&emsp;&emsp;&emsp;1.利用IIFE和闭包实现对数据的存储。<br>
&emsp;&emsp;&emsp;&emsp;2.通过this访问元素自身存储的数据,再获取数据。


## 7.对应与排它
<font color=red>根据对应与排它思想可以实现一些交互功能，例如：选项卡的实现。</font>
&emsp;&emsp;我们一般习惯用一个元素去控制其它元素。根据它们之间的联系（例：索引值相同）进行书写。<br>

    <div id="app1">
        <p>item1</p>
        <p>item2</p>
        <p>item3</p>
        <p>item4</p>
    </div>
    <div id="app1">
        <p>item1</p>
        <p>item2</p>
        <p>item3</p>
        <p>item4</p>
    </div>
    
    <script>
        var p1 = document.getElementById('app1').getElementByTagName('p')
        var p2 = document.getElementById('app2').getElementByTagName('p')
        
        // 对应思想
        for (var i = 0,len = p1.length;i<len;i++){
            p1[i].index = i;
            p1[i].onclick = function(){
                //点击第几个p1，对应的p2背景变成pink色
                p2[this.index].style.backgroundColor = 'pink';
            }
        }
        
        
        //排它思想
         for (var i = 0,len = p1.length;i<len;i++){
            p1[i].index = i;
            p1[i].onclick = function(){
                // 其他的都清除样式
                 for (var j = 0,len = p2.length;j<len;j++){
                     p2[this.index].style.backgroundColor = 'transparent'
                 }
                //设置选中的p2背景变成pink色
                p2[this.index].style.backgroundColor = 'pink';
            }
        }
        //使用排它思想的前提条件是，两个容器的元素个数要一致。
        
        
    </script>
    



&emsp;&emsp;排它：选中的元素改变其它元素，让其它元素变成原状。<br>

    
    <div id="app1">
        <p>item1</p>
        <p>item2</p>
        <p>item3</p>
        <p>item4</p>
    </div>
    <div id="app1">
        <p>item1</p>
        <p>item2</p>
        <p>item3</p>
        <p>item4</p>
    </div>
    
    <script>
        var p1 = document.getElementById('app1').getElementByTagName('p')
        var p2 = document.getElementById('app2').getElementByTagName('p')
       
        //排它思想
         for (var i = 0,len = p1.length;i<len;i++){
            p1[i].index = i;
            p1[i].onclick = function(){
                // 其他的都清除样式
                 for (var j = 0,len = p2.length;j<len;j++){
                     p2[this.index].style.backgroundColor = 'transparent'
                 }
                //设置选中的p2背景变成pink色
                p2[this.index].style.backgroundColor = 'pink';
            }
        }
        //使用排它思想的前提条件是，两个容器的元素个数要一致。
        
        
    </script>

## 8.样式的计算
&emsp;&emsp;<font color=red>计算后的样式：指的是HTML元素在CSS各种选择器综合作用下，得到的最终样式。</font><br>
高级浏览器的方法：window.getComputedStyle(),该方法接收一个要进行样式计算的元素，并返回一个可以进行属性查询的接口。返回接口提供了一个名为getPropertyValue()的方法，用于检索特定样式属性的计算样式。getPropertyValue方法接收css属性名称，而不是驼峰式的名称。getPropertyValue()可以不写，直接用方括号检索属性也可以。<br>
getComputedStyle:得到的样式是一个对象，包含了所有css样式。是window对象的方法<br>
注：也可以直接使用[]继续得到具体的计算后的属性值。(中括号可以使用驼峰也可以使用短横)<br>
getPropertyValue:得到的是具体的某一属性的值。参数和css书写一样，不能使用驼峰。<br>
IE 6, 7,8方法:<br>
&emsp;&emsp;低版本浏览器不认识getComputedStyle。IE低版本计算后的方法，currentStyle.(对象打点调用currentStyle,继续打点调用具体的某个计算后的样式属性)。currentStyle也可以直接使用[]得到计算后的样式属性。注意：不管是中括号还是点语法都只能用驼峰命名法。（使用方法和style非常类似）。<br>
    
    #app{
        color:red;
        width:200px;
        height:200px;
        background-color:green;
    }
    
    <div id='app'></div>
    
    <script>
        var app = document.getElementById('app')
        
        //获取样式
        //通过style属性只能获取行内式样式，不能获取css中的样式
        console.log(app.style.color);
        console.log(app.style.width);
        console.log(app.style.height);
        
        //通过getComputedStyle方法获取计算后的样式
        var result = getComputedStyle(app);
        console.log(result.getPropertyValue('width'));
        console.log(result.getPropertyValue('height'));
        //getPropertyValue不能使用驼峰式命名
        console.log(result.getPropertyValue('background-color'));
        //还可以使用[]语法获取
        console.log(result['color']);
        console.log(result['height']);
        console.log(result['background-color']);
        console.log(result['backgroundColor']);
        
    </script>


## 8.能力检测
不管是低版本还是高版本浏览器都可以正常输出计算后的样式。需要进行能力检测（就是判断认不认识window.getComputedStyle）。<br>

    #app{
        color:red;
        width:200px;
        height:200px;
        background-color:green;
    }
    
    <div id='app'></div>
    
    <script>
        function getStyle(obj,key){
            //能力检测：判断浏览器的能力，能做什么就做什么
            //浏览器是否支持getComponent方法，支持就使用
            // 注意：一定要使用window.getComputedStyle方式，否则在不支持getComputedStyle的情况下会报错，因为这个函数不存在
            if(window.getComputedStyle){
                
                return getComputedStyle(obj)[key]
            } else {
                var style = obj.currentStyle;
                if(style){
                    key = key.replace(/-([a-z])?/g,function(match,$1){
                        return ($1||'').toUpperCase();
                    })
                    //返回样式
                    return style[key]
                } else {
                    //没有样式，要提示
                    alert('你的浏览器不支持获取计算样式功能.')
                }
            }
        }
    
    </script>

    






