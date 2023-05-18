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
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");

  return (
    <>
      <div className="brand">
        <img src={logo} alt="" />
      </div>
      <Menu mode="inline">
        <Menu.Item key="1">
          <NavLink to="/dashboard">
            <span
              className="icon"
              style={{
                background: page === "dashboard" ? "" : "",
              }}
            >
              {dashboard}
            </span>
            <span className="label">Dashboard</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="2">
          <NavLink to="/thiet-bi">
            <span
              className="icon"
              style={{
                background: page === "devices" ? "" : "",
              }}
            >
              {devices}
            </span>
            <span className="label">Thiết bị</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="3">
          <NavLink to="/dich-vu">
            <span
              className="icon"
              style={{
                background: page === "services" ? "" : "",
              }}
            >
              {services}
            </span>
            <span className="label">Dịch vụ</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="4">
          <NavLink to="/cap-so">
            <span
              className="icon"
              style={{
                background: page === "ordinalNumbers" ? "" : "",
              }}
            >
              {ordinalNumbers}
            </span>
            <span className="label">Cấp số</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="6">
          <NavLink to="/bao-cao">
            <span
              className="icon"
              style={{
                background: page === "report" ? "" : "",
              }}
            >
              {report}
            </span>
            <span className="label">Báo cáo</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="7">
          <NavLink to="/cai-dat">
            <span className="icon">{setting}</span>
            <span className="label">Cài đặt hệ thống</span>
          </NavLink>
        </Menu.Item>
      </Menu>
      <Button type="primary" className="aside-footer">
        <span className="icon">{logout}</span>
        <span className="label">Đăng xuất</span>
      </Button>
    </>
  );
}

export default Sidenav;
