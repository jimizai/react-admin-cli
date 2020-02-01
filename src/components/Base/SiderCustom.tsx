import React, { Component } from "react";
import { Layout } from "antd";
import { withRouter, RouteComponentProps } from "react-router-dom";
import routes from "@/routes/config";
import SiderMenu from "./SiderMenu";

const { Sider } = Layout;

type SiderCustomProps = RouteComponentProps<any> & {
  popoverHide?: () => void;
  collapsed?: boolean;
};
interface SiderCustomState {
  collapsed?: boolean | undefined;
  openKeys: string[];
  firstHide: boolean | undefined;
  selectedKey: string;
  mode: string;
}

class SiderCustom extends Component<SiderCustomProps, SiderCustomState> {
  public constructor(props: any) {
    super(props);
    this.state = {
      mode: "inline",
      openKeys: [],
      selectedKey: "",
      firstHide: true // 点击收缩菜单，第一次隐藏展开子菜单，openMenu时恢复
    };
  }

  public componentDidUpdate(prevProps: SiderCustomProps) {
    if (this.props.collapsed !== this.state.collapsed) {
      const { collapsed } = this.props;
      // eslint-disable-next-line
      this.setState({
        ...this.getOpenAndSelectKeys(),
        collapsed,
        mode: collapsed ? "vertical" : "inline",
        firstHide: collapsed
      });
    }
    if (prevProps.location.pathname !== this.props.location.pathname) {
      // eslint-disable-next-line
      this.setState({ ...this.getOpenAndSelectKeys() });
    }
  }

  public getOpenAndSelectKeys() {
    const { location } = this.props;
    const { pathname } = location;
    return {
      openKeys: this.recombineOpenKeys(pathname.match(/[/](\w+)/gi) || []),
      selectedKey: pathname
    };
  }

  public recombineOpenKeys = (openKeys: string[]) => {
    let i = 0;
    let strPlus = "";
    let tempKeys: string[] = [];
    while (i < openKeys.length) {
      strPlus += openKeys[i];
      tempKeys.push(strPlus);
      i++;
    }
    return tempKeys;
  };

  public menuClick = (e: any) => {
    this.setState({
      selectedKey: e.key
    });
    this.props.popoverHide && this.props.popoverHide();
  };
  public openMenu = (v: string[]) => {
    this.setState({
      openKeys: v,
      firstHide: false
    });
  };
  public render() {
    const { selectedKey, openKeys, firstHide, collapsed } = this.state;
    return (
      <Sider
        trigger={null}
        breakpoint="lg"
        collapsed={collapsed}
        style={{ overflowY: "auto" }}
        className="sider-custom bg-white"
      >
        <div className="logo" />
        <SiderMenu
          menus={routes.menus}
          onClick={this.menuClick}
          mode="inline"
          selectedKeys={[selectedKey]}
          openKeys={firstHide ? [] : openKeys}
          onOpenChange={this.openMenu}
        />
        <style>
          {`
            #nprogress .spinner{
                left: ${collapsed ? "70px" : "206px"};
                right: 0 !important;
            }
            `}
        </style>
      </Sider>
    );
  }
}

export default withRouter(SiderCustom);
