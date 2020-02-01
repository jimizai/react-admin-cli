import { Menu, Icon, Layout, Badge } from "antd";
import * as React from "react";
// import { queryString } from "@/utils";
const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const HeaderCustom: React.FC = props => {
  const logout = React.useCallback(() => {
    localStorage.removeItem("user");
  }, []);

  const menuClick = React.useCallback(
    e => {
      e.key === "logout" && logout();
    },
    [logout]
  );

  return (
    <Header className="custom-theme header bg-white">
      <Menu
        mode="horizontal"
        style={{ lineHeight: "64px", float: "right" }}
        onClick={menuClick}
      >
        <Menu.Item key="1">
          <Badge count={25} overflowCount={10} style={{ marginLeft: 10 }}>
            <Icon type="notification" />
          </Badge>
        </Menu.Item>
        <SubMenu
          title={
            <span className="avatar">
              <i className="on bottom b-white" />
            </span>
          }
        >
          <MenuItemGroup title="用户中心">
            <Menu.Item key="setting:1"></Menu.Item>
            <Menu.Item key="setting:2">个人信息</Menu.Item>
            <Menu.Item key="logout">
              <span onClick={logout}>退出登录</span>
            </Menu.Item>
          </MenuItemGroup>
          <MenuItemGroup title="设置中心">
            <Menu.Item key="setting:3">个人设置</Menu.Item>
            <Menu.Item key="setting:4">系统设置</Menu.Item>
          </MenuItemGroup>
        </SubMenu>
      </Menu>
    </Header>
  );
};
export default HeaderCustom;
