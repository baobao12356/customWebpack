/*
 * @Description: 开发和生产环境的公共配置
 * @Author: 深客
 * @Date: 2019-09-19 22:40:09
 * @LastEditTime: 2019-10-09 22:34:56
 */

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

function resolve(u) {
  return path.resolve(__dirname, u);
}

module.exports = {
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
        test: /\.(jsx|js)$/,
        include: [
          resolve("../src"),
          resolve("./router.config.js"),
          resolve("../node_modules/react-loadable/lib"),
          resolve("../node_modules/scheduler"),
          resolve("../node_modules/react")
        ],
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
    //合并相同css样式、去除注释
    minimizer: [new OptimizeCSSAssetsPlugin()],
    //分离js代码，node_modules中的代码与业务代码分别打包
    splitChunks: {
      // chunks: "initial",
      // minSize: 307200,
      // maxSize: 1024000,
      // minChunks: 1, // 一个模块至少被用了1次才会被分割
      // maxAsyncRequests: 5, // 同时异步加载的模块数最多是5个，如果超过5个则不做代码分割
      // maxInitialRequests: 3, // 入口文件进行加载时，引入的库最多分割出3个js文件
      // name: true, // 开启自定义名称效果
      // automaticNameDelimiter: "~", // 生成文件名的文件链接符
      cacheGroups: {
        default: false,
        vendors: false,
        base: {
          chunks: "all",
          minSize: 0,
          maxSize: 3000000,
          test: /node_modules/,
          name: "base",
          priority: 80
        },
        personal: {
          chunks: "initial",
          priority: 70,
          name: "personal",
          reuseExistingChunk: true
        },
        asyncVendors: {
          chunks: "async",
          priority: 80,
          name: "asyncVendors",
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
