const HtmlWebpackPlugin =require("html-webpack-plugin");
const {Template}=require("webpack");

const path=require("path");
module.exports={
    mode:'development',
    entry:{
        index:'./src/index.js'
    },
    output:{
        filename:"bundle.js",
        path:path.resolve(__dirname,'dist')
    },
    devtool:'inline-source-map',
    devServer:{
        static:'./dist',
    },
    module:{
        rules:[
            {
                test:/\.css$/i,
                use:['style-loader','css-loader']
            },
            {
                test:/\.(png|jpg|jpeg|gif|svg)$/i,
                type:'asset/resource',
            }
        ],
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: 'body'
        })   
    ]
}