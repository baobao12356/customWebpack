/*
 * @Description: 开发环境配置
 * @Author: 深客
 * @Date: 2019-09-19 22:40:09
 * @LastEditTime: 2019-10-09 22:34:56
 */

const path = require("path");
const webpack = require("webpack");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const PortFinder = require("portfinder");
const merge = require("webpack-merge");
const common = require("./webpack.common.config");

const initConfig = {
  // 模式，表示dev环境
  mode: "development",
  plugins: [
    //热更新插件
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    //网站的根目录为/dist，如果配置不对，会报Cannot GET /错误
    proxy: {
      "/jouav-official-website-online/": {
        //http://114.116.33.61:8080 测试环境华为云
        target: `http://114.116.33.61:8080/jouav-official-website-online`,
        changeOrigin: true,
        pathRewrite: { "^/jouav-official-website-online": "" }
      }
    },
    contentBase: path.join(__dirname, "/dist"),
    port: "8000",
    hot: true,
    //当使用 HTML5 History API时任意的 404 响应都被替代为index.html
    historyApiFallback: true,
    // 默认为true,用来监视页面的改动而自动刷新页面,
    //当为false时，网页自动刷新的模式是iframe，也就是将模板页放在一个frame中
    inline: true,
    // 自动打开浏览器
    open: true,
    //关闭错误提示，启用FriendlyErrorsWebpackPlugin
    quiet: true
  }
};

const mergeConfig = merge.smart(common, initConfig);

module.exports = new Promise((resolve, reject) => {
  PortFinder.basePort = mergeConfig.devServer.port;
  PortFinder.getPort(function(err, port) {
    if (err) {
      reject(err);
    } else {
      mergeConfig.devServer.port = port;
      mergeConfig.plugins.push(
        //更友好的错误提示
        new FriendlyErrorsWebpackPlugin({
          compilationSuccessInfo: {
            messages: [
              `开发环境启动成功，项目运行在: http://localhost:${mergeConfig.devServer.port}`
            ]
          },
          onErrors: function(severity, errors) {
            console.log("开发环境启动失败，Errors:", severity, errors);
          },
          clearConsole: true
        })
      );
      resolve(mergeConfig);
    }
  });
});
