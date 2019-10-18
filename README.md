## 项目介绍：

基于`babel7`和`webpack4`，用于支持`react + less`技术栈的前端框架配置实践。使用[umi-request](https://github.com/umijs/umi-request)发起网络请求。编译后的代码约**200kb**。本项目适用于官网等**重展示轻业务**的项目，如果业务逻辑较重建议使用 [umi](https://github.com/umijs/umi) + [dva](https://github.com/dvajs/dva/blob/master/README_zh-CN.md) 的方式。

## 快速开始：

**开发：**

```
npm install

npm start
```

> 若`npm`包下载速度较慢建议使用`yarn`，不建议使用`cnpm`

```
yarn

yarn start
```

**编译：**

```
npm run build
```

## 特性：

- ES6/7
- less
- 路由按需动态加载
- 兼容到`IE10`
- `css3`属性自动添加前缀
- 若默认端口`8000`不可用则自动寻找可用端口并在浏览器打开
- 模块热替换（HMR）
- 代码分割(SplitChunksPlugin)
- tree shaking（webpack4 开发环境自动支持）
