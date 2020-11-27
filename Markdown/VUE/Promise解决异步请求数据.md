## Promise异步请求数据

**关于Promise的具体情况可参考我之前记的笔记。**

ES6中一个非常重要和好用的特性就是Promise
		**Promise是异步编程的一种解决方案。**
那什么时候我们会来处理异步事件呢？
		一种很常见的场景应该就是网络请求了。
		我们封装一个网络请求的函数，因为不能立即拿到结果，所以不能像简单的3+4=7一样将结果返回。
		所以往往我们会传入另外一个函数，在数据请求成功时，将数据通过传入的函数回调出去。
		如果只是一个简单的网络请求，那么这种方案不会给我们带来很大的麻烦。

但是，当网络请求非常复杂时，就会出现**回调地狱。**

我们来考虑下面的场景(有夸张的成分)：
			我们需要通过一个url1从服务器加载一个数据data1，data1中包含了下一个请求的url2
			我们需要通过data1取出url2，从服务器加载数据data2，data2中包含了下一个请求的url3
			我们需要通过data2取出url3，从服务器加载数据data3，data3中包含了下一个请求的url4
			发送网络请求url4，获取最终的数据data4

```javascript
$.ajax('url1',function(data1){
    $.ajax(data1['url2'],function(data2){
        $.ajax(data1['url3'],function(data3){
            $.ajax(data1['url4'],function(data4){
                console.log(data4);
            }
        }
    })
})
```

上面的代码有什么问题吗？
		**正常情况下，不会有什么问题，可以正常运行并且获取我们想要的结果。**
		**但是，这样的代码难看而且不容易维护。**
		我们更加期望的是一种更加优雅的方式来进行这种异步操作。
如何做呢？就是使用Promise。
		Promise可以以一种非常优雅的方式来解决这个问题。

#### Promise链式调用

我们在看Promise的流程图时，发现无论是then还是catch都可以返回一个Promise对象。

所以，我们的代码其实是可以进行链式调用的：

这里我们直接通过Promise包装了一下新的数据，将Promise对象返回了
		Promise.resovle()：将数据包装成Promise对象，并且在内部回调resolve()函数
		Promise.reject()：将数据包装成Promise对象，并且在内部回调reject()函数

```javascript
//链式调用的代码
new Promise((resolve,reject)=>{
    setTimeout(function(){
        resolve('Hello World')
    },1000)
}).then(data=>{
    console.log(data); // =>  Hello World
    return Promise.resolve(data+'111')
}).then(data=>{
    console.log(data); // =>  Hello World111
    return Promise.resolve(data+'222')
}).then(data=>{
    console.log(data); // =>  Hello World111222
    return Promise.reject(data+'error')
}).then(data=>{
    console.log(data); // => 没有输出，这部分代码不会执行
    return Promise.resolve(data+'333')
}).catch(data=>{
    console.log(data); // =>  Hello World111222error
    return Promise.resolve(data+'444')
}).then(data=>{
    console.log(data); // =>  Hello World111222error444
})
```

#### 简化版代码：
如果我们希望数据直接包装成Promise.resolve，那么在then中可以直接返回数据
		注意下面的代码中，**return Promise.resovle(data)改成了return data结果依然是一样的**

```javascript
//链式调用的代码
new Promise((resolve,reject)=>{
    setTimeout(function(){
        resolve('Hello World')
    },1000)
}).then(data=>{
    console.log(data); // =>  Hello World
    return data+'111'
}).then(data=>{
    console.log(data); // =>  Hello World111
    return data+'222'
}).then(data=>{
    console.log(data); // =>  Hello World111222
    return Promise.reject(data+'error')
}).then(data=>{
    console.log(data); // => 没有输出，这部分代码不会执行
    return data+'333'
}).catch(data=>{
    console.log(data); // =>  Hello World111222error
    return data+'444'
}).then(data=>{
    console.log(data); // =>  Hello World111222error444
})
```

