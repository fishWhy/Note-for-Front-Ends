
//commonjs规范和服务器端开发一样
require('./modules/a.js')
require('./modules/b.js')
require('./modules/c.js')

//注意：前端模块化开发，一定要使用相对路径，引入模块
//引入css
require('./modules/style.css')

//引入图片资源
let src1 = require('./1.jpeg')
let src2 = require('./2.png')
//创建两个img标签，加载图片，并渲染到页面中
let img1 = new Image();
let img2 = new Image();

//加载图片
img1.src = src1.default;
img2.src = src2.default;

console.log(src1)
// console.log(src2)
document.body.appendChild(img1)
document.body.appendChild(img2)

