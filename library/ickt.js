var ickt = (function(){
var ickt = {};
/***由于有些浏览器会将换行符显示成空格，有些不是
 * 这里解决兼容性问题，让所有浏览器显示的一致
 * 让所有浏览器都输出3，忽略换行符。即过滤掉为换行符的文本节点
*/
ickt.dom = function(){
    // 返回所有包含节点的数组
    var arr = [];
    //定义正则
    var reg = /^\s*$/
    // 遍历所有节点过滤掉换行符文本节点
    for(var i = 0; i<dom.childNodes.length;i++){
        // 如果是文本阶段，过滤掉换行符
        if(dom.childNodes[i].nodeType ===3 ){
            // 判断文本的内容，data或者nodevalue
            if(!reg.test(dom.childNodes[i].data)){
                // 不是换行符，存储节点
                arr.push(dom.childNodes[i])
            }
        } else {
            // 其它类型节点，直接存储节点
            arr.push(dom.childNodes[i])
        }
    }
    // 返回结果
    return arr;
}


/***
 * 在元素后面插入元素
 * @parent  父元素
 * @child   插入的子元素
 * @next    参考元素
 */
ickt.insertAfter = function(parent, child, next){
    //插入
    return parent.insertBefore(child, next.nextsibling)
}
/***
 * 在元素前面插入元素
 * @parent  父元素
 * @child   插入的子元素
 */
ickt.insertAfter = function(parent, child){
    //插入
    return parent.insertBefore(child, parent.firstChild);
}

// 在dom2后面插入dom1
ickt.after = function(dom1,dom2){
    // 找到dom2的父元素
    // 找到dom2的下一个兄弟列表
    return dom2.parentNode.insertBefore(dom1,dom2.nextsibling);
}

// 在dom2前面插入dom1
ickt.before = function(dom1,dom2){
    // 找到dom2的父元素
    // 使用insertBefore插入
    return dom2.parentNode.insertBefore(dom1,dom2);
}


/***封装一个设置样式的方法
 * 两种用法 css（dom, width, '200px')  css(dom, {color:'red','width':'200px})
 * 
*/
ickt.css = function(dom, key, value){
    // 判断key是对象还是字符串
    if(typeof key === 'string'){
        // 设置样式
        dom.style[key] = value;
    } else {
        // 遍历每组样式
        for(var name in key){
            //name表示属性名称，key[name]表示样式值
            this.css(dom, name, key[name]);
        }
    }
}




/***
 * 封装一个getStyle方法，可以在不同浏览器下获取样式（解决兼容性问题）。
 * @obj     元素对象
 * @key     属性名称
 * return   获取的样式
 */
ickt.getStyle = function(obj, key){
    // 能力检测，判断浏览器的能力，能做什么就做什么
    // 浏览器是否支持getComponent方法，支持就使用
    if(window.getComputedStyle){
        // 方法一
        return getComputedStyle(obj)[key];
    } else {
        var style = obj.currentStyle;
        //如果有样式，可以获取
        if(style){
            //将横杠法转成驼峰式命名法  border-left-color => borderLeftColor
            key = key.replace(/-([a-z])?/g, function(match, $1){
                return $1.toUpperCase();
            })
            return style[key]
        } else {
            // 没有样式，要提示
            alert('你的浏览器不支持获取计算样式功能。')
        }
    }
}

//基于操作的在最后一次执行,节流防抖
// 封装防抖节流函数
ickt.throttle_event = function(fn){
    // 清除定时器
    clearTimeout(fn.__timebar);
    // 执行定时器
    // 函数也属于对象，因此可以添加属性
    fn.__timebar = setTimeout(fn,200);
}

// 基于时间的在规定时间内执行，节流防抖
//节流器方法
ickt.throttle = function(fn){
    // 在函数自身添加锁
    if(fn.__lock){
        //被锁住了就不能执行了
        return;
    }
    // 在1秒之内，无论触发多少次，只能执行一次
    fn();
    fn.__lock = true;
    setTimeout(function(){
        //解除锁
        fn.__lock = false;
    },1000)
}


//获取属性单位
ickt.p = function(key){
    return key === 'opacity' ? '':'px';
}

 /*** 
  * 实现animate(注意，这里只实现了样式对应值单位为px的那些)
  * 
  * 在规定时间内，完成动画。
  * 以移动一个方块为例：
  *   假设每30ms移动一次(取30ms,是因为人眼的视觉效果)，
  *   每次移动的距离：步长 = 移动的总距离/移动的总次数
  *   移动的总次数 = 总时长/移动的间隔
  * 
  * @dom     操作的元素
  * @obj     样式对象
  * @time    时间
  * @callback 动画执行完毕，执行的回调函数
  * 
  * ***/
 ickt.animate = function(dom, obj, time, callback) {
     // 已经移动的次数
     var count = 0;
     // 计算总次数，不取整不影响结果
     var total = parseInt((time || 1000)/30);
     //总距离的获取必要条件是，最终的样式与当前的样式。
     // 当前样式通过元素获取
     // 最终样式，通过obj参数获取
     // 获取当前样式
     var style = {}
     //遍历需要获取的样式
     for(var key in obj){
         // 存储当前样式
         // 为计算方便，存储数字，而不是字符串
         style[key] = parseInt(this.getStyle(dom, key))
     }
     // 获取每一个样式的步长
     var step = {};
     //遍历所需要的获取步长的样式
     for (var key in obj){
         // 存储步长
         step[key] = (parseInt(obj[key]) - style[key]) / total;
     }
     //执行动画就是执行setInterval,当达到总次数的时候，终止动画的执行
     var me = this;
     
     //启动定时器
     //定义动画句柄
     var timebar = setInterval(function(){
         //更新次数
         count++;
         //修改样式
         for (var key in obj){
             dom.style[key] = style[key] + step[key] * count + me.p(key);
         }
         //判断终止条件
         if(count >= total){
             //修正样式
             for (var key in obj){
                 // 判断属性值是否是字符串,是字符串直接复制，不是则加上单位
                 dom.style[key] = typeof obj[key] === 'string' ? obj[key] : obj[key] + me.p(key);
             }
             clearInterval(timebar);
             // 传递了callback要执行callback
             callback && callback();
         }
     },30)
 }


 /** DOM进阶-事件流程，绑定事件兼容所有浏览器
  *      * 实现bindEvent,不同浏览器下，不同的事件级别下 绑定的事件都一致了。
  *      *   同一事件都可以绑定多个响应函数，this都指向触发事件的元素，都有事件对象
  *      *@dom    元素
  *      *@type   事件类型
  *      *@fn     事件回调函数
  *     **/
ickt.bindEvent  = function(dom, type, fn){
         // 能力检测,判断方法是否存在，存在的话使用，不存在就不使用
        if(dom.addEventListener){
             // dom2级绑定方式,都在冒泡阶段触发
            dom.addEventListener(type, fn, false);
    } else if(dom.attachEvent){
             // 针对ie绑定事件
         //  由于在attachEvent绑定事件this指向是window，因此这里需要改变this指向和DOM2一样指向触发事件的对象
         dom.attachEvent('on' + type, function(e){
                 // 让fn在dom上执行
            fn.call(dom,e) 
        });
    } else {
             // 缓存type事件原有的事件回调函数防止覆盖，再绑定一个新的事件回调函数用来执行原有的事件回调函数和新的回调函数
         var oldFn = dom['on' + type];
         // dom0级绑定方式
         // 在dom0级事件中，IE中并没有将事件对象传递到事件函数中，事件对象存储在window上，所以要传递window.event
         dom['on' + type] = function(){
                 //如果type事件已经绑定过，先执行之前绑定的
             oldFn&&oldFn(window.event);
             //再执行新的
             fn(window.event);
        }
    }
}

 //移除事件
 /** DOM进阶-事件流程，移除事件兼容所有浏览器
 * 实现removeEvent,不同浏览器下，不同的事件级别下 移除事件都一致了。
 *@dom    元素
 *@type   事件类型
 *@fn     事件回调函数
**/
ickt.removeEvent = function(dom, type, fn){
         // 能力检测
    if(dom.removeEventListener){
             //针对DOM2
         dom.removeEventListener(type, fn);
    } else if(dom.detachEvent){
             // 针对IE
         dom.detachEvent('on' + type, fn)
    } else {
             // 针对DOM0
         dom['on' + type] = null;
    }
}
return ickt;
})();


//寄生式继承
ickt.inherit = function(child, parent){
    //定义继承类
    function F(){}
    //让寄生类的原型等于父类的原型
    F.prototype = parent.prototype;
    //用寄生类的实例给子类原型赋值，继承原型数据
    child.prototype = new F();
    //修改构造函数
    child.prototype.constructor = child; 
    //继承静态数据
    for(let key in parent){
        //如果是自身的
        if(parent.hasOwnProperty(key)){
            //存储数据
            child[key] = parent[key];
        }
    }
    return child;
}







