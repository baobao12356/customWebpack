/*
 * @Description: 项目入口文件
 * @Author: 深客
 * @Date: 2019-09-23 14:27:24
 * @LastEditTime: 2019-10-08 21:34:37
 */
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import routes from "../config/router.config.js";
// import '@babel/polyfill';
// import "core-js/stable";
// import "regenerator-runtime/runtime";
import "./index.less";

ReactDOM.render(
  <Router>{renderRoutes(routes)}</Router>,
  document.getElementById("root")
);
