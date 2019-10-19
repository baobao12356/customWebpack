/*
 * @Description: 生产环境配置
 * @Author: 深客
 * @Date: 2019-10-08 21:30:59
 * @LastEditTime: 2019-10-09 22:45:48
 */

const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("terser-webpack-plugin");
const merge = require("webpack-merge");
const common = require("./webpack.common.config");

const initConfig = {
  // 模式，表示dev环境
  mode: "production",
  optimization: {
    //合并压缩css、js代码
    minimizer: [
      new OptimizeCSSAssetsPlugin(),
      new UglifyJsPlugin({ test: /\.js(\?.*)?$/i })
    ],
    //告知 webpack 通过将导入修改为更短的字符串，来减少 WASM 大小。这会破坏模块和导出名称
    mangleWasmImports: true
  }
};

module.exports = merge.smart(initConfig, common);
