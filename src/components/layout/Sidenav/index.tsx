import { Menu, Button } from "antd";
import { NavLink, useLocation } from "react-router-dom";
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

function Sidenav() {
  const location = useLocation();
  const currentPath = location.pathname;
  const currentKey =
    [
      { path: "/dashboard", key: "1" },
      { path: "/thiet-bi", key: "2" },
      { path: "/dich-vu", key: "3" },
      { path: "/cap-so", key: "4" },
      { path: "/bao-cao", key: "5" },
      { path: "/cai-dat", key: "6" },
    ].find((item) => currentPath.startsWith(item.path))?.key ?? "";

  return (
    <>
      <div className="brand">
        <img src={logo} alt="" />
      </div>
      <Menu mode="inline" defaultSelectedKeys={[currentKey]}>
        {[
          {
            key: "1",
            to: "/dashboard",
            icon: dashboard,
            label: "Dashboard",
          },
          {
            key: "2",
            to: "/thiet-bi/danh-sach-thiet-bi",
            icon: devices,
            label: "Thiết bị",
          },
          {
            key: "3",
            to: "/dich-vu/danh-sach-dich-vu",
            icon: services,
            label: "Dịch vụ",
          },
          {
            key: "4",
            to: "/cap-so/danh-sach-cap-so",
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
            <NavLink key={item.key} to={item.to}>
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
