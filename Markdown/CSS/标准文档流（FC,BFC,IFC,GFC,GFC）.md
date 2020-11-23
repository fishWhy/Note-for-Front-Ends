## FC
FC的全称是:Formatting Contexts(格式化上下文)，是W3C CSS2.1规范中的一个概念。它是页面中的一块渲染<font color='red'>区域</font>，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。<br>
常见的FC有：<br>
&emsp;&emsp;BFC(Block Formatting Contexts):块级格式化上下文。<br>
&emsp;&emsp;IFC(Inline Formatting Contexts):内联格式化上下文。<br>
&emsp;&emsp;GFC(GridLayout Formatting Contexts):网格布局格式化上下文。<br>
&emsp;&emsp;GFC(Flex Formatting Contexts):自适应格式化上下文。<br>

### 1.BFC
Block Formatting Contexts:块级格式化上下文<br>
BFC的布局规则如下：<br>
&emsp;&emsp;内部的盒子会在垂直方向，一个个地放置；<br>
&emsp;&emsp;盒子垂直方向的距离有margin决定，同属于一个BFC的两个相邻Box的上下margin会发生重叠；<br>
&emsp;&emsp;每个元素的左边，与包含的盒子的左边相接触，即使存在浮动也是如此；<br>
&emsp;&emsp;BFC的区域不会与float重叠；<br>
&emsp;&emsp;BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之也是如此；<br>
&emsp;&emsp;计算BFC的高度时，浮动元素也参与计算。<br>
<font color='red'>会产生BFC的情况：<br></font>
&emsp;&emsp;根元素；<br>
&emsp;&emsp;float的属性不为none;<br>
&emsp;&emsp;position为absolute或fixed;<br>
&emsp;&emsp;display为inline-bolck（内部是BFC，外部是IFC）,table-cell,table-caption,flex;<br>
&emsp;&emsp;overflow不为visible<br>


### 2.IFC
Inline Formatting Contexts,内联格式化上下文,IFC的line box(线框,line box 是用来装文字与所有 inline-level box 的，如span标签，p标签等都可以称为inline-level box)高度由其包含行内元素中最高的实际高度计算而来（不受到竖直方向的padding/margin影响）<br>
&emsp;&emsp;IFC中的line box一般左右都贴紧整个IFC，但是会因为float元素而扰乱。<br>
&emsp;&emsp;当float元素位于IFC与line box之间的时候，会使得line box宽度缩短。<br>
&emsp;&emsp;同一个IFC下的多个line box高度会不同。<br>
&emsp;&emsp;IFC中不可能有块级元素的，当插入块级元素时（如p中插入div）会产生两个匿名块与div分隔开，即产生两个IFC，每个IFC对外表现为块级元素，与div垂直排列。<br>

<font color='red'>IFC作用：<br>
&emsp;&emsp;水平居中：当一个块要在环境中水平居中时，设置其为inline-block则会在外层产生IFC，通过text-align:则可以使其水平居中。<br>
&emsp;&emsp;垂直居中：创建一个IFC，用其中一个元素撑开父元素的高度，然后设置其vertical-align:middle,其他行内元素则可以在此父元素下垂直居中。<br>
</font><br>

<font color='red'>基线:<br>在IFC下</font><br>
&emsp;&emsp;1. inline元素的边缘是context-box<br>
&emsp;&emsp;2. inline-block元素的边缘是margin-box<br>
&emsp;&emsp;3. inline-block元素，如果没有内容，则基线与下边界对齐<br>
&emsp;&emsp;4. inline-block元素，如果有内容，则基线与内容的基线对齐，如果有多行内容，则基线与最后一行内容基线对齐。<br>






