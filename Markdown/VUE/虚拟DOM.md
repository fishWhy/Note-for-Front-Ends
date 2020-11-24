## 虚拟DOM



### 前言

Vue.js 2.0引入Virtual DOM,比Vue.js 1.0的初始渲染速度提升了2-4倍，并大大降低了内存消耗。那么，什么是Virtual DOM？为什么需要Virtual DOM？它是通过什么方式去提升页面渲染效率的呢？这是本文所要探讨的问题。

### 模板转换成视图的过程

在正式介绍 Virtual Dom之前，我们有必要先了解下模板转换成视图的过程整个过程（如下图）：

- Vue.js通过编译将template 模板转换成渲染函数(render ) ，执行渲染函数就可以得到一个虚拟节点树
- 在对 Model 进行操作的时候，会触发对应 Dep 中的 Watcher 对象。Watcher 对象会调用对应的 update 来修改视图。这个过程主要是将新旧虚拟节点进行差异对比，然后根据对比结果进行DOM操作来更新视图。

简单点讲，在Vue的底层实现上，Vue将模板编译成虚拟DOM渲染函数。结合Vue自带的响应系统，在状态改变时，Vue能够智能地计算出重新渲染组件的最小代价并应到DOM操作上。

![img](https://image.fundebug.com/2019-06-26-01.png)

我们先对上图几个概念加以解释:

- **渲染函数**：渲染函数是用来生成Virtual DOM的。Vue推荐使用模板来构建我们的应用界面，在底层实现中Vue会将模板编译成渲染函数，当然我们也可以不写模板，直接写渲染函数，以获得更好的控制。
- **VNode 虚拟节点**：它可以代表一个真实的 dom 节点。通过 createElement 方法能将 VNode 渲染成 dom 节点。简单地说，vnode可以理解成**节点描述对象**，它描述了应该怎样去创建真实的DOM节点。
- **patch(也叫做patching算法)**：虚拟DOM最核心的部分，它可以将vnode渲染成真实的DOM，这个过程是对比新旧虚拟节点之间有哪些不同，然后根据对比结果找出需要更新的的节点进行更新。这点我们从单词含义就可以看出， patch本身就有补丁、修补的意思，其实际作用是在现有DOM上进行修改来实现更新视图的目的。Vue的Virtual DOM Patching算法是基于**Snabbdom**的实现，并在些基础上作了很多的调整和改进。

### Virtual DOM 是什么？

Virtual DOM 其实就是一棵以 JavaScript 对象( VNode 节点)作为基础的树，用对象属性来描述节点，实际上它只是一层对真实 DOM 的抽象。最终可以通过一系列操作使这棵树映射到真实环境上。

简单来说，可以把Virtual DOM 理解为一个简单的JS对象，并且最少包含标签名( tag)、属性(attrs)和子元素对象( children)三个属性。不同的框架对这三个属性的命名会有点差别。

对于虚拟DOM，咱们来看一个简单的实例，就是下图所示的这个，详细的阐述了`模板 → 渲染函数 → 虚拟DOM树 → 真实DOM`的一个过程

![img](https://image.fundebug.com/2019-06-26-02.png)

### Virtual DOM 作用是什么？

**虚拟DOM的最终目标是将虚拟节点渲染到视图上**。但是如果直接使用虚拟节点覆盖旧节点的话，会有很多不必要的DOM操作。例如，一个ul标签下很多个li标签，其中只有一个li有变化，这种情况下如果使用新的ul去替代旧的ul,因为这些不必要的DOM操作而造成了性能上的浪费。

为了避免不必要的DOM操作，虚拟DOM在虚拟节点映射到视图的过程中，将虚拟节点与上一次渲染视图所使用的旧虚拟节点（oldVnode）做对比，找出真正需要更新的节点来进行DOM操作，从而避免操作其他无需改动的DOM。

其实虚拟DOM在Vue.js主要做了两件事：

- 提供与真实DOM节点所对应的虚拟节点vnode
- 将虚拟节点vnode和旧虚拟节点oldVnode进行对比，然后更新视图

**给大家推荐一个好用的BUG监控工具Fundebug，欢迎免费试用！**

### 为何需要Virtual DOM？

- 具备跨平台的优势

由于 Virtual DOM 是以 JavaScript 对象为基础而不依赖真实平台环境，所以使它具有了跨平台的能力，比如说浏览器平台、Weex、Node 等。

- 操作 DOM 慢，js运行效率高。我们可以将DOM对比操作放在JS层，提高效率。

因为DOM操作的执行速度远不如Javascript的运算速度快，因此，把大量的DOM操作搬运到Javascript中，运用patching算法来计算出真正需要更新的节点，最大限度地减少DOM操作，从而显著提高性能。

Virtual DOM 本质上就是在 JS 和 DOM 之间做了一个缓存。可以类比 CPU 和硬盘，既然硬盘这么慢，我们就在它们之间加个缓存：既然 DOM 这么慢，我们就在它们 JS 和 DOM 之间加个缓存。CPU（JS）只操作内存（Virtual DOM），最后的时候再把变更写入硬盘（DOM）

- 提升渲染性能

Virtual DOM的优势不在于单次的操作，而是在大量、频繁的数据更新下，能够对视图进行合理、高效的更新。

为了实现高效的DOM操作，一套高效的虚拟DOM diff算法显得很有必要。**我们通过patch 的核心----diff 算法，找出本次DOM需要更新的节点来更新，其他的不更新**。比如修改某个model 100次，从1加到100，那么有了Virtual DOM的缓存之后，只会把最后一次修改patch到view上。那diff 算法的实现过程是怎样的？

### diff 算法

![img](https://image.fundebug.com/2019-06-26-03.png)

Vue的diff算法是基于snabbdom改造过来的，**仅在同级的vnode间做diff，递归地进行同级vnode的diff，最终实现整个DOM树的更新**。因为跨层级的操作是非常少的，忽略不计，这样时间复杂度就从O(n3)变成O(n)。

diff 算法包括几个步骤：

- 用 JavaScript 对象结构表示 DOM 树的结构；然后用这个树构建一个真正的 DOM 树，插到文档当中
- 当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树差异
- 把所记录的差异应用到所构建的真正的DOM树上，视图就更新了

![img](https://image.fundebug.com/2019-06-26-04.png)

### diff 算法的实现过程

diff 算法本身非常复杂，实现难度很大。本文去繁就简，粗略介绍以下两个核心函数实现流程：

- patch(container,vnode) :初次渲染的时候，将VDOM渲染成真正的DOM然后插入到容器里面。
- patch(vnode,newVnode):再次渲染的时候，将新的vnode和旧的vnode相对比，然后之间差异应用到所构建的真正的DOM树上。

#### 1. patch(container,vnode)

通过这个函数可以让VNode渲染成真正的DOM，我们通过以下模拟代码，可以了解大致过程：

```javascript
function createElement(vnode) {    
var tag = vnode.tag  
var attrs = vnode.attrs || {}    
var children = vnode.children || []    
if (!tag) {       
 return null  
  }    
// 创建真实的 DOM 元素    
var elem = document.createElement(tag)   
 // 属性    
var attrName    
for (attrName in attrs) {    
    if (attrs.hasOwnProperty(attrName)) { 
           // 给 elem 添加属性
           elem.setAttribute(attrName, attrs[attrName])
        }
    }
    // 子元素
    children.forEach(function (childVnode) {
        // 给 elem 添加子元素，如果还有子节点，则递归的生成子节点。
        elem.appendChild(createElement(childVnode))  // 递归
    })    // 返回真实的 DOM 元素   
 return elem
}
```

#### 2. patch(vnode,newVnode)

这里我们只考虑vnode与newVnode如何对比的情况：

```javascript
function updateChildren(vnode, newVnode) {
    var children = vnode.children || []
    var newChildren = newVnode.children || []
  // 遍历现有的children
    children.forEach(function (childVnode, index) {
        var newChildVnode = newChildren[index]
  // 两者tag一样
        if (childVnode.tag === newChildVnode.tag) {
            // 深层次对比，递归
            updateChildren(childVnode, newChildVnode)
        } else { 
  // 两者tag不一样
           replaceNode(childVnode, newChildVnode) 
       }
    }
)}
```

