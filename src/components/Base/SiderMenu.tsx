import * as React from "react";
import { Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import { IFMenu } from "@/routes/config";
import { MenuProps } from "antd/lib/menu";

const renderMenuItem = (
  item: IFMenu // item.route 菜单单独跳转的路由
) => (
  <Menu.Item key={item.key}>
    <Link to={(item.route || item.key) + (item.query || "")}>
      {item.icon && <Icon type={item.icon} />}
      <span className="nav-text">{item.title}</span>
    </Link>
  </Menu.Item>
);

const renderSubMenu = (item: IFMenu) => {
  return (
    <Menu.SubMenu
      key={item.key}
      title={
        <span>
          {item.icon && <Icon type={item.icon} />}
          <span className="nav-text">{item.title}</span>
        </span>
      }
    >
      {item.subs!.map(sub =>
        sub.subs ? renderSubMenu(sub) : renderMenuItem(sub)
      )}
    </Menu.SubMenu>
  );
};

type SiderMenuProps = MenuProps & {
  menus: any;
  onClick: (e: any) => void;
  selectedKeys: string[];
  openKeys?: string[];
  onOpenChange: (v: string[]) => void;
};

export default ({ menus, ...props }: SiderMenuProps) => {
  return (
    <div>
      {menus.map((item: IFMenu) => (
        <Menu {...props} key={item.key}>
          {item.subs! ? renderSubMenu(item) : renderMenuItem(item)}
        </Menu>
      ))}
    </div>
  );
};
