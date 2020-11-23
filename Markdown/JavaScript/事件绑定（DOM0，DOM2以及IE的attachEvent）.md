### 1.事件流程

#### <font color=red>整个事件流程分为捕获和冒泡</font><br>

&emsp;&emsp;捕获：事件从最顶层元素开始执行，<font color=red>一层一层往下执行</font>，直到触发事件的元素。<br>
&emsp;&emsp;冒泡：事件从最先触发事件的元素开始执行，<font color=red>一层一层往上执行</font>，直到最顶层的元素。<br>
&emsp;&emsp;当一个元素是触发事件的元素的时候，是不区分捕获和冒泡的。<br>
<font color=red size=4>完整流程： 当事件被触发时，流程是： 事件捕获到元素->触发事件->事件冒泡到最顶层元素。<br>注意：为了让各级别的事件执行顺序统一，我们常常绑定在冒泡阶段（这样那些不支持DOM2级的浏览器就和我们高级浏览器执行顺序是一致的了）。</font>



### 2.事件绑定

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

<font color=red>IE中DOM0级与attachEvent事件绑定方式的区别</font>
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

### 3.事件移除

#### DOM0级事件移除方式：

DOM0级事件是通过元素的属性型式绑定的，因此删除该元素即可取消绑定。例：btn.onclik = null

#### <font color=red>DOM2级事件移除方式:</font>

事件移除方式：使用removeEventListener方式<br>
&emsp;&emsp;该方法适用于移除addEventListener绑定的事件（DOM2）<br>
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

#### <font color=red>IE 中移除事件方式：</font>

事件移除方式: 使用detachEvent方法移除attachEvent绑定的事件<br>
使用方式：<br>
&emsp;&emsp;dom.detachEvent(type,fn)<br>
&emsp;&emsp;&emsp;&emsp;type:要移除的事件类型<br>
&emsp;&emsp;&emsp;&emsp;fn:执行函数<br>
&emsp;&emsp;&emsp;&emsp;使用方式与removeEventListener是一致的，只不过没有了第三个参数而已<br>    

<font color=red>总结：

1.匿名函数无法移除，因此为了能够顺利的移除事件，要为回调函数起名字。<br>
2.当绑定多个事件的时候，移除的事件对其它事件没有影响。<br>
3.detachEvent不能移除DOM0级事件，DOM0级事件可以通过dom.onclick=null形式删除。<br>

4.相同事件回调函数多次绑定，会共存，删除的时候要删除多次。</font>

```html
<div id='box1'>box1
    <div id='box2'>box2
        <div id='box3'>box3</div>
    </div>
</div>
//获取元素
var box1 = document.getElementById('box1');
var box2 = document.getElementById('box2');
var box3 = document.getElementById('box3');
```

​    

```javascript
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
 <button id= 'btn'> 按钮</button>

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


 

   

### 4.DOM事件

#### 事件对象

当事件执行的时候后，会产生一系列的信息，这些信息会被浏览器收集起来并封装为对象传递到事件回调函数中<br>
常见的属性：<br>
&emsp;&emsp;offsetX,offsetY:这两个属性标记的是鼠标位于元素内部的位置（从padding开始计算），会受到子元素的影响<br>
&emsp;&emsp;clientX,clientY:这两个属性标记的是鼠标位于视口中的位置<br>
&emsp;&emsp;pageX,pageY:这两个属性标记的是鼠标位于页面中的距离<br>
&emsp;&emsp;&emsp;&emsp;默认情况下，当打开页面的时候处于首屏，所以这两个属性和clientX与clientY是相同的，当页面出现滚动条的时候并改变滚动条的位置，此时这些值才会产生差异。<br>
&emsp;&emsp;screenX,screenY:这两个属性标记的是鼠标位于屏幕中的位置<br>

#### IE中的事件对象

<font color='red'>在DOM0级事件中，IE中并没有将事件对象传递到事件函数中</font>
<font>

&emsp;&emsp;事件对象存储在window上，获取：window.event<br>
&emsp;&emsp;兼容方式：var e= e|| window.event<br>
&emsp;&emsp;由于在低版本的IE中无法显示内部结构，所以我们要使用for in循环内部结构<br>
</font>

```javascript
//DOM0级
btn.onclick = function(e){
    console.log(e,222,window.event)
}
```

#### 事件总结

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

### 5.阻止冒泡

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
```

​    

```javascript
//IE 阻止事件冒泡
btn.attachEvent('onclick',function(e){
    e.cancelBubble = true;
})
```

### 6.阻止默认行为

一些标签在点击的时候会触发一些默认行为，事件<br>
&emsp;&emsp;比如：<br>
&emsp;&emsp;&emsp;&emsp;submit:默认提交表单<br>
&emsp;&emsp;&emsp;&emsp;a标签：如果有href属性，会默认跳转页面<br>
&emsp;&emsp;&emsp;&emsp;当页面中出现滚动条的时候，此时，滚动鼠标滚轮的时候，会默认改变滚动条的位置，这些都是默认事件，行为<br>
&emsp;&emsp;在高级浏览器中阻止默认事件的方式：e.preventDefault()<br>
&emsp;&emsp;在IE中阻止默认事件的方式e.returnValue = false;<br>
如果使用的是dom0级事件绑定方式，还可以使用return false;

