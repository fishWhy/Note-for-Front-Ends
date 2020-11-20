# sass

### 安装sass

和less一样，sass也是一种css预编译语言，由于sass出现的比less晚，因此支持的语法更多，例如循环语句，条件语句等等，sass是通过ruby编译的，因此我们使用sass要首先安装ruby<br>

ruby安装完成，输入gem -v可以查看版本号<br>

sass属于gem的一个模块，我们可以通过gem安装sass： gem install sass<br>

安装完成，提供了sass指令，输入sass -v可以查看版本号，也可以手动安装sass:   gem install 将sass文件拖入进来。<br>

开发的使用，通常写中文注释，但ruby是日本人开发的，因此编码不涵盖中文字符串，所以我们要更改字符串：进入：C:\Ruby22-x64\lib\ruby\gems\2.2.0\gem2\sass-3.4.22\lib\sass目录，打开engine.rb文件，在54行，添加Encoding.default_external = Encoding.find("utf-8")<br>

```javascript
require 'sass/supports'
Encoding.default_external = Encoding.find('utf-8')
module Sass
```

### 拓展名

sass支持两种拓展名<br>

一种是.sass<br>

&emsp;&emsp;这种拓展名文件，支持的语法比较新，和css差距很大，因此开发者很少使用<br>

```sass
.box 
	.demo
		p
			color: red;
			font-size: 30px;
```

一种是.scss<br>

&emsp;&emsp;这种拓展名文件，支持的语法和css语法很相似，因此被开发者接受<br>

```scss
.box {
	.demo{
		p{
			color: red;
			font-size: 30px;
		}
	}
}
```



<font color=red>**这里以.scss语法记录笔记**</font><br>

sass和less一样，浏览器不识别，因此需要进行编译。



### 编译

命令行编译：安装完成sass,可以通过sass指令编译代码<br>

```
sass sass文件 css文件 配置
```

&emsp;&emsp;&emsp;配置： -C 避免输出缓存文件		--sourcemap = none避免输出sourcemap文件<br>

```
sass sass文件 css文件 -C --sourcemap = none
```

scss文件的编译方法相同



### webpack编译

工程化编译sass<br>

&emsp;&emsp;对webpack来说sass文件也是资源，是资源我们就可以模块化打包加载<br>

&emsp;&emsp;我们要装sass-loader，使用方式和less一样

```
style-loader!css-loader!sassloader
```

注意：本地安装sass，sass-loader依赖node-sass<br>

