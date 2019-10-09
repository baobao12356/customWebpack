/**
 *  author: HuTao
 *  description: 动态加载组件、路由
 *  created: 2019-09-30 14:46:12
 *  last-modified: 2019-09-30 15:15:56
 */

import Loadable from "react-loadable";
import LoadingIcon from "@/components/LoadingIcon/index.jsx";

const loadCom = Component => {
  return Loadable({
    loader: Component,
    loading: LoadingIcon
  });
};

export default loadCom;
