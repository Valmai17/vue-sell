'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {//配置入口
    app: './src/main.js'
  },
  output: {//输出文件出口
    path: config.build.assetsRoot, //入口文件最终要输出到哪里，
    filename: '[name].js',//输出文件的名称
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath  //公共资源路径
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },

            // {
            //     test:/\.css$/,
            //     use:ExtractTextPlugin.extract({
            //         fallback:'style-loader',
            //         use:['css-loader','autoprefixer-loader'],
            //         publicPath: "../"//生产环境下（也就是npm run build之后）重写资源的引入的路径,参考链接https://webpack.js.org/plugins/extract-text-webpack-plugin/#-extract
            //     })
            // },
            // {//处理css的规则,处理less的规则
            //     test:/\.less$/,
            //     use:ExtractTextPlugin.extract({
            //         fallback:'style-loader',
            //         use:['css-loader','autoprefixer-loader','less-loader'],
            //         publicPath: "../"
            //     })
            // },


      { 
        test: /\.less$/, 
        loader: "style-loader!css-loader!less-loader", 
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
