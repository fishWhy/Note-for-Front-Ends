//引入path
let path = require('path')
//commonjs规范（因为webpack是在node下运行的）
module.exports = {
    //处理模式
    //development表示开发模式，代码不会压缩
    //producetion表示发布模式，代码会压缩（默认）
    mode:'development',
    //入口
    entry: './main',
    //发布
    output: {
        //文件名称
        filename: './demo.js',
        //发布位置，绝对路径，process.cwd(), __dirname
        //process.cwd()表示指令执行的位置,__dirname表示文件所在位置
        //path: path.join(__dirname,'../output')
        //path: path.join(process.cwd(),'../output')
    }
}

