module.exports = function(api) {
  api.cache(true);
  const presets = [
    [
      "@babel/preset-env",
      {
        // 将es6的语法翻译成es5语法
        targets: { ie: 10 },
        useBuiltIns: "usage", // 做@babel/polyfill补充时，按需补充，用到什么才补充什么,
        corejs: "3"
      }
    ],
    "@babel/preset-react"
  ];
  const plugins = [
    //处理commonjs和esm的混用兼容
    "@babel/plugin-transform-modules-commonjs",
    //处理class类
    "@babel/plugin-proposal-class-properties",
    //异步加载
    "@babel/plugin-syntax-dynamic-import"
  ];
  return {
    presets,
    plugins
  };
};
