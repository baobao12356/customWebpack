/**
 *  author: 深客
 *  description: 全局layout
 *  created: 2019-09-29 17:52:41
 *  last-modified: 2019-09-30 16:38:18
 */

import React, { Component } from "react";
import { renderRoutes } from "react-router-config";

import "./layout.less";

class Layout extends Component {
  render() {
    const { route } = this.props;
    return (
      <div className="layout">
        <div className="title">Layout</div>
        {renderRoutes(route.routes)}
      </div>
    );
  }
}

export default Layout;
