/*
 * @Author: xiaoyou
 * @Date: 2020-02-01 13:37:43
 * @Last Modified by: xiaoyou
 * @Last Modified time: 2020-02-01 15:30:59
 */
import * as React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import AllComponents from "../pages";
import routesConfig, { IFMenuBase, IFMenu } from "./config";
import queryString from "query-string";
import { checkLogin } from "../utils";

export default class CRouter extends React.Component {
  public getPermits = (): any[] | null => {
    // const { auth } = this.props;
    // return auth ? auth.data.permissions : null;
    return null;
  };

  public requireAuth = (permit: any, component: React.ReactElement) => {
    // const permits = this.getPermits();
    // const { auth } = store.getState().httpData;
    // if (!permits || !permits.includes(permit)) return <Redirect to={"404"} />;
    return component;
  };
  public requireLogin = (component: React.ReactElement, permit: any) => {
    const permits = this.getPermits();
    if (!checkLogin(permits)) {
      // 线上环境判断是否登录
      return <Redirect to="/login" />;
    }
    return permit ? this.requireAuth(permit, component) : component;
  };

  public createRoute = (key: string) => {
    return routesConfig[key].map((r: IFMenu) => {
      const route = (r: IFMenuBase) => {
        const Component = r.component && AllComponents[r.component];
        return (
          <Route
            key={r.route || r.key}
            exact
            path={r.route || r.key}
            render={props => {
              const reg = /\?\S*/g;
              // 匹配?及其以后字符串
              const queryParams = window.location.hash.match(reg);
              // 去除?的参数
              const { params } = props.match;
              Object.keys(params).forEach(key => {
                params[key] = params[key] && params[key].replace(reg, "");
              });
              props.match.params = { ...params };
              const merge = {
                ...props,
                query: queryParams ? queryString.parse(queryParams[0]) : {}
              };
              // 重新包装组件
              const wrappedComponent = <Component {...merge} />;
              return r.login
                ? wrappedComponent
                : this.requireLogin(wrappedComponent, r.auth);
            }}
          />
        );
      };

      const subRoute = (r: IFMenu): any =>
        r.subs &&
        r.subs.map((subR: IFMenu) =>
          subR.subs ? subRoute(subR) : route(subR)
        );

      return r.component ? route(r) : subRoute(r);
    });
  };

  public render() {
    return (
      <Switch>
        {Object.keys(routesConfig).map(key => this.createRoute(key))}
        <Route render={() => <Redirect to="/404" />} />
      </Switch>
    );
  }
}
