## JavaScript这门语言是由DOM,BOM,ECMAScript组成<br>

**DOM指的是：document object model文档对象模型 体现在代码中是document**<br>

**BOM指的是：browser object model浏览器对象模型 体现在代码中window**<br>

**ECMAScript是核心语法：变量，运算符，表达式，流程控制语句，数据类型**

### 1.DOM是由节点组成的，元素/标签 它们是节点中的某一种，节点一共分为12种

<font color=red>元素节点</font>&emsp;&emsp;Node.ELEMENT_NODE(1)<br>
<font color=red>属性节点</font>&emsp;&emsp;Node.ATTRIBUTE_NODE(2)<br>
<font color=red>文本节点</font>&emsp;&emsp;Node.TEXT_NODE(3)<br>
<font color=red>CDATA节点</font>&emsp;&emsp;Node.CDATA_SECTION_NODE(4)<br>
<font color=red>实体引用名称节点</font>&emsp;&emsp;Node.ENTRY_REFERENCE_NODE(5)<br>
<font color=red>实体名称节点</font>&emsp;&emsp;Node.ENTITY_NODE(6)<br>
<font color=red>处理指令节点</font>&emsp;&emsp;Node.PROCESSING_INSTRUCTION_NODE(7)<br>
<font color=red>注释节点</font>&emsp;&emsp;Node.COMMENT_NODE(8)<br>
<font color=red>文档节点</font>&emsp;&emsp;Node.DOCUMENT_NODE(9)<br>
<font color=red>文档类型节点</font>&emsp;&emsp;Node.DOCUMENT_TYPE_NODE(10)<br>
<font color=red>文档片段节点</font>&emsp;&emsp;Node.DOCUMENT_FRAGMENT_NODE(11)<br>
<font color=red>DTD声明节点</font>&emsp;&emsp;Node.NOTATION_NODE(12)<br>

<font color=red size=4>每一个元素都是一个节点，但是每一个节点不一定是一个元素，元素仅仅是节点的一种。</font>
<br>
通过nodeType属性判断节点的类型。<br>
常用的节点有<font color=red>(必须记住)</font>：<br>
&emsp;&emsp;1    元素类型<br>
&emsp;&emsp;3    文本类型<br>
&emsp;&emsp;8    注释类型<br>
&emsp;&emsp;9    文档类型<br>

childNodes属性：该属性指向一个节点的所有子节点的集合。<br>
    
```html
<div id='app'></div>

<script>
    var app = document.getElementById('app')
    console.log(app.nodeType)//1   
    console.log(document.nodeType)//9
</script>
```


&emsp;&emsp;注意：如下例，我们明明书写了3个节点，但是在有些高级浏览器中却输出5个节点。原因是在高级浏览器中，空白折叠现象形成的空白符会当做一个文本节点存在<br>

```html
<div id='box'>
  你好，爱创课堂
  <div class='one'></div>
  <!--我是一个注释-->
</div>

<script>
    var box = document.getElementById('box');
    // box.childNodes返回的是类数组
    console.log(box.childNodes.length) //高级浏览器中输出5，在低版本IE浏览器中输出3
    
    //解决兼容性问题，让所有浏览器显示的一致
    //让所有浏览器输出3，忽略这些换行符
    function getNode(dom){
        var arr = [];
        var reg = /^\s+$/
        //遍历所有的节点，过滤掉换行符文本节点
        for(var i = 0; i< dom.childNodes.length;i++){
            //如果是文本节点，要过滤掉换行符
            if(dom.childNodes[i].nodeType ===3){
                //判断文本的内容，data或者nodeValue
                if(!res.test(dom.childNodes[i].data)){
                    //不是换行符，存储节点
                    arr.push(dom.childNodes[i])
                }
            }else{
                //其它类型节点，直接存储节点
                arr.push(dom.childNodes[i])
            }
        }
        return arr
    }
    
    console.log(getNode(box));
    
</script>
```

### 2.节点属性

```javascript
节点三个常用属性
nodeType    //节点类型
            //值为1-12，表示是12种节点类型中的哪一种
nodeName    //节点名称
            //元素：元素名称大写    
            //文本：#text
            //注释：#comment
nodeValue   //节点的值
            //元素：null
            //文本：文本内容
            //注释：注释的内容

节点关系：在节点关系中可以分为三种
父子：
    father.childNodes
    father.firstChild
    father.lastChild
子父：
    child.parentNode 
兄弟：
    node.nextSibling
    node.previousSibling
```

### 3.元素操作

<font size=4 color=red>对于一个元素的操作，只能存储在一个容器中，不能同时存储在两个容器中</font>

```javascript
创建元素节点：
    使用方式：document.createElment(type)
        type:创建的类型 是一个字符串
        返回值：创建出来的元素
创建文本节点：
    使用方式：document.createTextNode(content)
        content:表示文本内容
        返回值：创建出来文本节点

节点上树(将节点渲染到页面中)：
    使用方式：father.appendChild(child)
        child:要追加的子元素    father：父元素
        返回值：child
        最终效果：child作为father的最后一个子节点存在

节点下树（从页面中删除节点）：
    使用方式：father.removeChild(child)
        child:要被移除的子元素    father：父元素
        返回值：child
        最终效果：child从father的所有子节点中移除

节点插入：
    使用方式：father.insertBefore(newChild,oldChild)
        newChild:要被插入的元素    
        oldChild：参照元素。如果没有参考元素，会添加到最后面相当于appendChild方法
        返回值：newChild
        最终效果：newChild追加到oldChild的前面作为它的兄弟节点存在
节点替换：
    使用方式：father.replaceChild(newChild,oldChild)
        newChild: 要被替换上的元素  
        oldChild：被替换下的元素
        返回值：oldChild
        最终效果：newChild替换掉oldChild
节点克隆：
    使用方式：node.cloneNode(bool)
        bool:是一个布尔值，默认是一个false只复制自身，如果传递的是true表示连同子节点一起复制  
```


​    例1，创建节点，节点上树，节点下树，节点插入:

```html
 <div id='app'>
        <div>1<div>
        <div>2<div>
        <div>3<div>
        <div>4<div>
    </div>
    <script>
        //创建元素节点
        var h1 = document.createElement('h1')
        var app = document.getElementById('app')
        //元素节点h1上树
        app.appendChild(h1)
        //创建文本节点
    	var text = document.createTextNode('hello <strong>world!</strong>')
    	//文本节点text上树
    	//通过文本节点向h1添加内容时，内容中的标签不能被渲染出来
    	var result = h1.appendChild(text)
    	
    	//通过innerHTML向h1添加内容时，内容中的标签也能被渲染出来
    	h1.innerHTML = 'hello <strong>world!</strong>'
        //将h1从app中移除
        var result = app.removeChild(h1)
        console.log(result);
        //将h1插入到div3的前面
    	var result = app.insertBefore(h1,app.childNodes[2])
    	//可以使用上面的这些添加节点的方法自己封装些函数，用来在 子元素前面插入元素，  在元素后面插入元素
     <script>
```

​	

### 4.jQuery中的节点操作

创建元素：可以利用$函数的功能创建一个元素。<br>
jQuery中的上树方法：在jquery中上树的方式有很多种，可以是父元素选择子元素，可以是子元素选择父元素，还可以是兄弟选择兄弟<br>
<font color=red>注意：这些方法只能通过jQuery对象使用，源生js对象无法直接使用。</font><br>
    

```javascript
父元素选择子元素：
    $(father).append(child)  
    $(father).prepend(child)
子元素选择父元素：
    $(child).appendTo(father)  //将child追加到father的最后去
    $(child).prependTo(father) //将child追加到father的前面去
    
兄弟选择兄弟：
    $(dom).after(element):在dom的后面追加element元素
    $(dom).before(element)：在dom的前面追加element元素
    $(dom).insertBefore(element):在element的前面追加dom元素
    $(dom).insertAfter(element)：在element的后面追加dom元素
    
节点外部包装： wrap与wrapAll        //wrap逐个包装，wrapAll整体包装
去掉外层节点：unwrap与unwrapAll
元素替换：replaceWith与replaceAll  //$(#app1).replaceWith(#app2)前面app1替换后面的app2，
//$(#app1).replaceAll(#app2)后面app2替换前面的app1，
清空后代：empty
删除元素：remove
克隆元素：clone(bool)  //bool是一个布尔值，默认是false，连同子节点一起复制，如果传递true，连同子元素及其事件一起复制
<div id='app'>
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
</div>
```


 
        
```javascript
    //若进行 (逐个元素包装)
    $('#app div').wrap('<div class='dom'/>')
    //有
    <div id='app'>
        <div class='dom'><div>1</div></div>
        <div class='dom'><div>2</div></div>
        <div class='dom'><div>3</div></div>
        <div class='dom'><div>4</div></div>
    </div>
    //若再进行 （去外包装恢复原样）
     $('#app div').upwrap('<div class='dom'/>')
    
    //若进行 （所有元素进行包装）
    $('#app div').wrapAll('<div class='dom'/>')
    //有
    <div id='app'>
        <div class='dom'>
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
        </div>
    </div>
    //若再进行 （去外包装恢复原样）
     $('#app div').upwrapAll('<div class='dom'/>')
```


​    
### 5.更改this指向

call与apply这两个方法都是函数天生可以调用的方法，它们的作用是执行函数并改变函数的上下文对象（this）。<br>
&emsp;&emsp;正常情况下：谁调用函数，函数的this就指向谁<br>
call:该方法用于执行函数并改变函数的上下文对象。该方法接收多个参数<br>
&emsp;&emsp;第一个参数就是要改变的this指向对象<br>
&emsp;&emsp;从第二个参数开始都是传递给原函数的参数<br>
apply:该方法也是执行函数并改变函数的上下文对象，它与call方法之间的区别是参数的区别。<br>
&emsp;&emsp;该方法接收两个参数<br>
&emsp;&emsp;&emsp;&emsp;第一个参数要改变的this指向对象<br>
&emsp;&emsp;&emsp;&emsp;第二个参数是一个数组，数组中的每一项都是传递的参数。<br>

```html
<button id='btn'>按钮</button>
<script>
    function fun(){
        console.log(this,arguments)
    }
    fun()
    //通过call改变this指向
    fun.call(document,1,2,3)
    //通过apply改变this指向
    fun.apply(document,1,2,3)
</script>
```

### 6.事件流程

#### **<font color=red>整个事件流程分为捕获和冒泡</font>**

&emsp;&emsp;捕获：事件从最顶层元素开始执行，<font color=red>一层一层往下执行</font>，直到触发事件的元素。<br>
&emsp;&emsp;冒泡：事件从最先触发事件的元素开始执行，<font color=red>一层一层往上执行</font>，直到最顶层的元素。<br>
&emsp;&emsp;当一个元素是触发事件的元素的时候，是不区分捕获和冒泡的。<br>
<font color=red size=4>完整流程： 当事件被触发时，流程是： 事件捕获到元素->触发事件->事件冒泡到最顶层元素。<br>注意：为了让各级别的事件执行顺序统一，我们常常绑定在冒泡阶段（这样那些不支持DOM2级的浏览器就和我们高级浏览器执行顺序是一致的了）。</font>

### 7.事件绑定

#### DOM0级绑定事件：

   btn.onclick = function(e){
       ...
   }

#### <font color=red>DOM2级事件绑定方式:</font>

事件名称：addEventListener<br>
&emsp;&emsp;该方法是每一个元素都可以使用的方法（像window等对象也可以使用）<br>
&emsp;&emsp;使用方式：dom.addEventListener(type,fn,bool)<br>
&emsp;&emsp;&emsp;&emsp;type:事件的类型 注意：不带on的事件类型<br>   &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;例如：click, mousedown,mouseup<br>
&emsp;&emsp;&emsp;&emsp;fn:执行函数<br>
&emsp;&emsp;&emsp;&emsp;bool:它是一个布尔值，表示是否在捕获阶段绑定<br>
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;默认是false，表示绑定到冒泡阶段，如果是true则表示绑定到捕获阶段。<font color=red size=4>当事件被触发时，完整流程：事件捕获到元素->触发事件->事件冒泡到最顶层元素。</font>

<font color=red>IE中的高级绑定方式：</font><br>
IE是不支持addEventListener方式，支持自己的attachEvent绑定事件方式<br>
&emsp;&emsp;使用方式：dom.attachEvent(type,fn)<br>
&emsp;&emsp;&emsp;&emsp;type:事件类型   是带on的事件类型 例如：onclick， onmousedown, onmouseup<br>
&emsp;&emsp;&emsp;&emsp;fn:要执行的函数<br>
&emsp;&emsp;&emsp;&emsp;没有第三个参数，也就是说不支持捕获

#### <font color=red>DOM2级与DOM0级绑定方式的区别</font>

绑定数量<br>
&emsp;&emsp;dom0级事件：只能给一个元素的一个事件绑定一个函数<br>
&emsp;&emsp;dom2级事件：能够给一个元素的一个事件绑定多个函数<br>
执行顺序<br>
&emsp;&emsp;&emsp;&emsp;按照代码的绑定顺序执行<br>
是否可以同时存在<br>
&emsp;&emsp;&emsp;&emsp;DOM2级可以，不受DOM0级事件影响<br>
this指向<br>
&emsp;&emsp;&emsp;&emsp;都指向触发事件的元素<br>
<br>

#### <font color=red>IE中DOM0级与attachEvent事件绑定方式的区别</font>
绑定数量<br>
&emsp;&emsp;dom0级事件：只能给一个元素的一个事件绑定一个函数<br>
&emsp;&emsp;attachEvent事件：能够给一个元素的一个事件绑定多个函数<br>
执行顺序<br>
&emsp;&emsp;&emsp;&emsp;优先执行dom0级，然后再逆序执行attachEvent事件<br>
是否可以同时存在<br>
&emsp;&emsp;&emsp;&emsp;attachEvent事件可以<br>
this指向<br>
&emsp;&emsp;&emsp;&emsp;dom0级：触发事件的对象。attachEvent：指向window<br>
<br><br>

### 8.事件移除

#### <font color=red>DOM2级事件移除方式:</font>

事件移除方式：使用removeEventListener方式<br>
&emsp;&emsp;该方法用于移除addEventListener绑定的事件<br>
&emsp;&emsp;使用方式：dom.removeEventListener(type,fn,bool)<br>
&emsp;&emsp;&emsp;&emsp;type:事件的类型 注意：不带on的事件类型<br>   &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;例如：click, mousedown,mouseup<br>
&emsp;&emsp;&emsp;&emsp;fn:执行函数<br>
&emsp;&emsp;&emsp;&emsp;bool:它是一个布尔值，表示是否在捕获阶段绑定<br>
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;默认是false，表示绑定到冒泡阶段，如果是true则表示绑定到捕获阶段。<br>
<font color=red size=4> 总结：<br>
1.匿名函数无法移除，因此为了能够顺利的移除事件，要为回调函数起名字。<br>
2.当绑定多个事件的时候，移除的事件对其它事件没有影响。<br>
3.在哪个阶段绑定的就要在哪个阶段移除。（在捕获阶段绑定的在捕获阶段移除，在冒泡阶段绑定的在冒泡阶段移除）。<br>
4.removeEventListener不能移除DOM0级事件。<br>
DOM0级事件是通过元素的属性型式绑定的，因此删除该元素即可取消绑定。例：btn.onclik = null。<br>

5.相同的事件回调函数，多次绑定只能保留一个。<br>
</font>

#### DOM0级事件移除

DOM0级事件可以通过dom.onclick=null形式删除。

#### <font color=red>IE 中移除事件方式：</font>

事件移除方式: 使用detachEvent方法移除attachEvent绑定的事件<br>
使用方式：<br>
&emsp;&emsp;dom.detachEvent(type,fn)<br>
&emsp;&emsp;&emsp;&emsp;type:要移除的事件类型<br>
&emsp;&emsp;&emsp;&emsp;fn:执行函数<br>
&emsp;&emsp;&emsp;&emsp;使用方式与removeEventListener是一致的，只不过没有了第三个参数而已<br>

<font color='red'>总结：</font>
<font color='red'>1.匿名函数无法移除，因此为了能够顺利的移除事件，要为回调函数起名字。</font><br>
<font color='red'>2.当绑定多个事件的时候，移除的事件对其它事件没有影响。</font><br><font color='red'>3.detachEvent不能移除DOM0级事件，DOM0级事件可以通过dom.onclick=null形式删除。</font><br><font color='red'>4.相同事件回调函数多次绑定，会共存，删除的时候要删除多次。</font>


```html
<div id='box1'>box1
    <div id='box2'>box2
        <div id='box3'>box3</div>
    </div>
</div>
<script>
//获取元素
var box1 = document.getElementById('box1');
var box2 = document.getElementById('box2');
var box3 = document.getElementById('box3');
//若为：
//之前学习的事件绑定，属于DOM0级事件绑定。
//DOM0级事件帮定中，是在事件冒泡阶段执行的。
//  点击id='box3'的元素依次会打印'box3'  'box2' 'box1'
//绑定事件
box1.onclick = function(){
    console.log('box1')
}
box2.onclick = function(){
    console.log('box2')
}
box3.onclick = function(){
    console.log('box3')
}

//若为：
//DOM2级事件帮定中，默认绑定在冒泡阶段，在冒泡阶段执行。
//  点击id='box3'的元素依次会打印'box3'  'box2' 'box1'
//绑定事件
 box1.addEventListener('click',function(){
    console.log('box1')
 })
box2.addEventListener('click',function(){
    console.log('box2')
 })
box3.addEventListener('click',function(){
    console.log('box3')
 })
 
 //若为：
 //DOM2级事件帮定中，绑定到捕获阶段，在捕获阶段执行。
//  点击id='box3'的元素依次会打印'box1'  'box2' 'box3'
//绑定事件
 box1.addEventListener('click',function(){
    console.log('box1');
 },true)
box2.addEventListener('click',function(){
    console.log('box2');
 },true)
box3.addEventListener('click',function(){
    console.log('box3');
 },true)
</script>

<script>
    var btn = document.getElementById('btn');
    
    btn.onclick = function(){
        console.log('click1',111)
    }
    //DOM1中后面的绑定会覆盖前面的绑定，因此当点击btn按钮时只会输出 'click2' 222
    // this指向btn
    btn.onclick = function(){
        console.log('click2',222,this)
    }
    
    //DOM2中的绑定，同一元素同一事件能绑定多个，因此当点击btn按钮时会输出 'click1' 111， 'click2' 222
    btn.addEventListener('click',function(){
        console.log('addEventListener1',111)
    })
    // this指向的是btn,你可以理解在addEventListener中使用了call或apply来调用事件的相应函数
    btn.addEventListener('click',function(){
        console.log('addEventListener2',222, this)
    })
 	var obj = {
            fun: function(){
                console.log('123',this)
            }
        }
    obj.fun();
    // 当触发事件时， obj.fun中的this始终指向触发事件的元素btn
    btn.addEventListener('click', obj.fun)
    // 当触发事件时， obj.fun中的this始终指向触发事件的元素btn
    btn.onclick = obj.fun;
</script>
```



        




### 7.DOM事件

##### 事件对象
当事件执行的时候后，会产生一系列的信息，这些信息会被浏览器收集起来并封装为对象传递到事件回调函数中<br>
常见的属性：<br>
&emsp;&emsp;offsetX,offsetY:这两个属性标记的是鼠标位于元素内部的位置（从padding开始计算），会受到子元素的影响<br>
&emsp;&emsp;clientX,clientY:这两个属性标记的是鼠标位于视口中的位置<br>
&emsp;&emsp;pageX,pageY:这两个属性标记的是鼠标位于页面中的距离<br>
&emsp;&emsp;&emsp;&emsp;默认情况下，当打开页面的时候处于首屏，所以这两个属性和clientX与clientY是相同的，当页面出现滚动条的时候并改变滚动条的位置，此时这些值才会产生差异。<br>
&emsp;&emsp;screenX,screenY:这两个属性标记的是鼠标位于屏幕中的位置<br>

##### IE中的事件对象
<font color='red'>在DOM0级事件中，IE中并没有将事件对象传递到事件函数中</font>

&emsp;&emsp;<font color=red>事件对象存储在window上，获取：window.event<br>
&emsp;&emsp;兼容方式：var e= e|| window.event<br>
&emsp;&emsp;由于在低版本的IE中无法显示内部结构，所以我们要使用for in循环内部结构<br>
</font>

```javascript
//DOM0级
btn.onclick = function(e){
    console.log(e,222,window.event)
}
```

##### 事件总结
<font>
dom0级事件：在高级浏览器中可以将事件对象传递进来<br>
&emsp;&emsp;IE中不能将事件对象传递进来<br>
&emsp;&emsp;this指向是触发事件的对象<br>
dom2级事件：可以将事件对象传递到事件函数中<br>
&emsp;&emsp;this指向是触发事件的对象<br>
&emsp;&emsp;执行事件的顺序是代码的绑定顺序<br>
attachEvent事件：可以将事件对象传递到事件函数中<br>
&emsp;&emsp;this指向是window<br>
&emsp;&emsp;执行顺序：优先执行dom0级事件，逆序执行attachEvent事件<br>

</font>


### 8.阻止冒泡

<font>
在高级浏览器中阻止冒泡的方式：<br>
&emsp;&emsp;e.stopPropagation()<br>
在IE中阻止冒泡的方式：<br>
&emsp;&emsp;e.cancelBubble = true<br>
</font>
    

```javascript
btn.addEventListener('click',function(e){
    //阻止事件冒泡
    e.stopPropagation();
})
//IE 阻止事件冒泡
btn.attachEvent('onclick',function(e){
    e.cancelBubble = true;
})
```



   

### 9.阻止默认行为
一些标签在点击的时候会触发一些默认行为，事件<br>
&emsp;&emsp;比如：<br>
&emsp;&emsp;&emsp;&emsp;submit:默认提交表单<br>
&emsp;&emsp;&emsp;&emsp;a标签：如果有href属性，会默认跳转页面<br>
&emsp;&emsp;&emsp;&emsp;当页面中出现滚动条的时候，此时，滚动鼠标滚轮的时候，会默认改变滚动条的位置，这些都是默认事件，行为<br>
&emsp;&emsp;在高级浏览器中阻止默认事件的方式：e.preventDefault()<br>
&emsp;&emsp;在IE中阻止默认事件的方式e.returnValue = false;<br>
如果使用的是dom0级事件绑定方式，还可以使用return false;

