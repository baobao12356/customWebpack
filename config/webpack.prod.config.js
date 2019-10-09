/*
 * @Description: Description
 * @Author: HuTao
 * @Date: 2019-10-08 21:30:59
 * @LastEditTime: 2019-10-09 22:45:48
 */

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("terser-webpack-plugin");

function resolve(u) {
  return path.resolve(__dirname, u);
}

const initConfig = {
  // 模式，表示dev环境
  mode: "production",
  // 入口文件
  entry: {
    index: "./src/index.js"
  },
  output: {
    // 打包后文件名称
    filename: "[name].js",
    // 打包后文件夹存放路径
    path: path.resolve(__dirname, "../dist")
  },
  //设置别名方便开发
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src")
    },
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [resolve("../src"), resolve("./router.config.js")],
        use: ["babel-loader"]
      },
      //样式文件处理
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2
            }
          },
          "postcss-loader",
          "less-loader"
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
      },
      //图片、字体等资源处理
      {
        test: /\.(png|jpg|jpeg|gif|otf|ttf|woff|svg|eot)$/i,
        exclude: /node_modules/,
        use: {
          loader: "url-loader",
          options: {
            //小于2k由url-loader转换为base64直接写在文件中，不另外发起请求,大于2k则自动由file-loader处理
            limit: 2048,
            name: "[name].[hash:8].[ext]",
            //静态资源打包到根目录下的static文件夹
            // publicPath: "static/"
            outputPath: "static/"
          }
        }
      }
    ]
  },
  optimization: {
    //合并压缩css、js代码
    minimizer: [
      new OptimizeCSSAssetsPlugin(),
      new UglifyJsPlugin({ test: /\.js(\?.*)?$/i })
    ],
    mangleWasmImports: true,
    //分离js代码，node_modules中的代码与业务代码分别打包
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,
        base: {
          chunks: "all",
          minSize: 0,
          maxSize: 1500000,
          test: /node_modules/,
          name: "base",
          priority: 100
        },
        personal: {
          chunks: "initial",
          priority: 90,
          name: "personal",
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    //html模板
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    // 打包后先清除dist文件，先于HtmlWebpackPlugin运行
    new CleanWebpackPlugin(),
    //分离css
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].chunk.css"
    })
  ]
};

module.exports = initConfig;
