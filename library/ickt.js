

/***
 * 封装一个getStyle方法，可以在不同浏览器下获取样式（解决兼容性问题）。
 * @obj     元素对象
 * @key     属性名称
 * return   获取的样式
 */
function getStyle(obj, key){
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
        function animate(dom, obj, time, callback) {

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
                style[key] = parseInt(getStyle(dom, key))
            }
            // 获取每一个样式的步长
            var step = {};
            //遍历所需要的获取步长的样式
            for (var key in obj){
                // 存储步长
                step[key] = (parseInt(obj[key]) - style[key]) / total;
            }
            //执行动画就是执行setInterval,当达到总次数的时候，终止动画的执行
            
            //启动定时器
            //定义动画句柄
            var timebar = setInterval(function(){
                //更新次数
                count++;
                //修改样式
                for (var key in obj){
                    dom.style[key] = style[key] + step[key] * count + 'px';
                }
                //判断终止条件
                if(count >= total){
                    //修正样式
                    for (var key in obj){
                        // 判断属性值是否是字符串,是字符串直接复制，不是则加上单位
                        dom.style[key] = typeof obj[key] === 'string' ? obj[key] : obj[key] + 'px';
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
    function bindEvent(dom, type, fn){
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
function removeEvent(dom, type, fn){
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







