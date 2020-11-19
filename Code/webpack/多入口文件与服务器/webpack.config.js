module.exports = {
    //处理模式
    //development表示开发模式，代码不会压缩
    //producetion表示发布模式，代码会压缩（默认）
    mode:'development',
    //入口
    entry: {
        //多个入口文件
        header: './modules/header/header.js',
        footer: './modules/footer/footer.js'
    },
    //发布
    output: {
        //文件名称
        filename: './[name].js',
    }
}
//最后会生成	 /dist/header.js与/dist/footer.js文件
