import { Menu, Button } from "antd";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
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
import useUser from "../../../store/selector/useUser";

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

  const renderMenuItem = (item: any) => {
    if (item.children) {
      return (
        <Menu.SubMenu key={item.key} title={item.label} icon={item.icon}>
          {item.children.map((child: any) => (
            <Menu.Item key={`${item.key}-${child.to}`}>
              <NavLink key={child.to} to={`${item.to}/${child.to}`}>
                <span>{child.label}</span>
              </NavLink>
            </Menu.Item>
          ))}
        </Menu.SubMenu>
      );
    } else {
      return (
        <Menu.Item key={item.key} icon={item.icon}>
          <NavLink key={item.key} to={item.to}>
            <span className="label">{item.label}</span>
          </NavLink>
        </Menu.Item>
      );
    }
  };

  const { signout } = useUser();

  const navigate = useNavigate();
  const logOut = () => {
    signout();
    navigate("/dang-nhap");
  };

  return (
    <>
      <div className="brand">
        <img src={logo} alt="" />
      </div>
      <Menu mode="vertical" defaultSelectedKeys={[currentKey]}>
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
            to: "/bao-cao/lap-bao-cao",
            icon: report,
            label: "Báo cáo",
          },
          {
            key: "6",
            to: "/cai-dat-he-thong",
            icon: setting,
            label: "Cài đặt hệ thống",
            children: [
              {
                to: "quan-ly-vai-tro",
                label: "Quản lý vai trò",
              },
              {
                to: "quan-ly-tai-khoan",
                label: "Quản lý tài khoản",
              },
              {
                to: "nhat-ky-hoat-dong",
                label: "Nhật ký người dùng",
              },
            ],
          },
        ].map(renderMenuItem)}
      </Menu>
      <Button type="primary" className="aside-footer" onClick={logOut}>
        <span className="icon">{logout}</span>
        <span className="label">Đăng xuất</span>
      </Button>
    </>
  );
}

export default Sidenav;
