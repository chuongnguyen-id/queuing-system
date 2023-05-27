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

interface SidenavProps {
  setPath: any;
}

function Sidenav(props: SidenavProps) {
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
    ].find((item) => item.path === currentPath)?.key ?? "1";

  const handleOnClick = (path: string, subPath: string) => {
    props.setPath(path, subPath);
  };

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
            breadcrumbName: "",
          },
          {
            key: "2",
            to: "/thiet-bi/danh-sach-thiet-bi",
            icon: devices,
            label: "Thiết bị",
            breadcrumbName: "Danh sách thiết bị",
          },
          {
            key: "3",
            to: "/dich-vu",
            icon: services,
            label: "Dịch vụ",
            breadcrumbName: "Danh sách dịch vụ",
          },
          {
            key: "4",
            to: "/cap-so",
            icon: ordinalNumbers,
            label: "Cấp số",
            breadcrumbName: "Danh sách Cấp số",
          },
          {
            key: "5",
            to: "/bao-cao",
            icon: report,
            label: "Báo cáo",
            breadcrumbName: "Lập báo cáo",
          },
          {
            key: "6",
            to: "/cai-dat",
            icon: setting,
            label: "Cài đặt hệ thống",
            breadcrumbName: "Quản lý vai trò",
          },
        ].map((item) => (
          <Menu.Item key={item.key}>
            <NavLink
              key={item.key}
              to={item.to}
              onClick={() => handleOnClick(item.label, item.breadcrumbName)}
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
