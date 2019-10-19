/*
 * @Description: 路由配置
 * @Author: 深客
 * @Date: 2019-10-08 21:39:50
 * @LastEditTime: 2019-10-09 22:36:45
 */
//react-router-config式配置
//详见：https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config

import loadCom from "@/utils/loadComponent";

const Home = loadCom(() => import("@/pages/home/home"));
const Detail = loadCom(() => import("@/pages/detail/detail"));
const Layout = loadCom(() => import("@/pages/layout/layout"));

export default [
  {
    component: Layout,
    routes: [
      { path: "/", component: Home, exact: true },
      { path: "/home", component: Home },
      { path: "/detail", component: Detail }
    ]
  }
];
