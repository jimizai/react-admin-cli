/*
 * @Author: xiaoyou
 * @Date: 2020-02-01 13:37:46
 * @Last Modified by: xiaoyou
 * @Last Modified time: 2020-02-01 15:32:01
 */
import * as React from "react";
import Routes from "./routes";
import SiderCustom from "@/components/Base/SiderCustom";
import HeaderCustom from "@/components/Base/HeaderCustom";
import { Layout } from "antd";
// import { checkLogin } from "./utils";

const { Content, Footer } = Layout;

interface S {
  collapsed: boolean;
  title: string;
}

class App extends React.Component<any, S> {
  public readonly state: Readonly<S> = {
    collapsed: false,
    title: ""
  };
  public getClientWidth = () => {
    // 获取当前浏览器宽度并设置responsive管理响应式
    const clientWidth = window.innerWidth;
    console.log(clientWidth);
    // receiveData({isMobile: clientWidth <= 992}, 'responsive');
  };
  public toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  public render() {
    return (
      <Layout style={{ width: "100%", height: "100vh", overflow: "hidden" }}>
        {/* {!responsive.data.isMobile && checkLogin(auth.data.permissions) && ( */}
        <SiderCustom collapsed={this.state.collapsed} />
        {/* )} */}
        <Layout style={{ flexDirection: "column" }}>
          <HeaderCustom />
          <Content
            style={{ margin: "0 16px", overflow: "initial", flex: "1 1 0" }}
          >
            <Routes />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            YinlouAdmin ©{new Date().getFullYear()} Created by xiaoyou
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default App;
