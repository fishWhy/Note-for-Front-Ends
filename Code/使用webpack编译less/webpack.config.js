//commonjs规范（因为webpack是在node下运行的）
module.exports = {
    //处理模式
    //development表示开发模式，代码不会压缩
    //producetion表示发布模式，代码会压缩（默认）
    mode:'development',
    //入口
    entry: './modules/main.js',
    //发布
    output: {
        //文件名称
        filename: './demo.js'
    },
    //模块,表示对模块的处理
    module:{
        //加载机
        rules: [
             //每一个成员代表一个加载机 !
            //less载机
            {
                test : /\.less$/,
                //!级联多个加载机,要先使用npm安装'style-loader','css-loader','less-loader'
                use: ['style-loader','css-loader','less-loader']
            }
        ]
    }
}
