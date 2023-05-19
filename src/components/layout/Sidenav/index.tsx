import { Menu, Button } from "antd";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import {
  dashboard,
  devices,
  ordinalNumbers,
  report,
  services,
  setting,
  logout,
} from "./Icon";

interface SidenavProps {
  setPath: any;
}

function Sidenav(props: SidenavProps) {
  const handleOnClick = (path: string) => {
    props.setPath(path);
  };
  return (
    <>
      <div className="brand">
        <img src={logo} alt="" />
      </div>
      <Menu mode="inline" defaultSelectedKeys={["1"]}>
        {[
          {
            key: "1",
            to: "/dashboard",
            icon: dashboard,
            label: "Dashboard",
          },
          {
            key: "2",
            to: "/thiet-bi",
            icon: devices,
            label: "Thiết bị",
          },
          {
            key: "3",
            to: "/dich-vu",
            icon: services,
            label: "Dịch vụ",
          },
          {
            key: "4",
            to: "/cap-so",
            icon: ordinalNumbers,
            label: "Cấp số",
          },
          {
            key: "5",
            to: "/bao-cao",
            icon: report,
            label: "Báo cáo",
          },
          {
            key: "6",
            to: "/cai-dat",
            icon: setting,
            label: "Cài đặt hệ thống",
          },
        ].map((item) => (
          <Menu.Item key={item.key}>
            <NavLink
              key={item.key}
              to={item.to}
              onClick={() => handleOnClick(item.label)}
            >
              <span className="icon">{item.icon}</span>
              <span className="label">{item.label}</span>
            </NavLink>
          </Menu.Item>
        ))}
      </Menu>
      <Button type="primary" className="aside-footer">
        <span className="icon">{logout}</span>
        <span className="label">Đăng xuất</span>
      </Button>
    </>
  );
}

export default Sidenav;
