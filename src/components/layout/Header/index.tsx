import { Fragment, useEffect, useState } from "react";

import { Row, Col, Badge, Dropdown, List, Spin } from "antd";

import { Link, NavLink } from "react-router-dom";
import profile from "../../../assets/images/avatar.png";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { useAppDispatch } from "../../../store/store";
import { useSelector } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getProfile } from "../../../store/reducer/profileReducer";

const bell = [
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
    <rect width="32" height="32" rx="16" fill="#FFF2E7" />
    <path
      d="M22.1167 18.0753L21.2833 16.692C21.1083 16.3837 20.95 15.8003 20.95 15.4587V13.3503C20.95 11.392 19.8 9.70033 18.1417 8.90866C17.7083 8.14199 16.9083 7.66699 15.9917 7.66699C15.0833 7.66699 14.2667 8.15866 13.8333 8.93366C12.2083 9.74199 11.0833 11.417 11.0833 13.3503V15.4587C11.0833 15.8003 10.925 16.3837 10.75 16.6837L9.90833 18.0753C9.57499 18.6337 9.49999 19.2503 9.70833 19.817C9.90833 20.3753 10.3833 20.8087 11 21.017C12.6167 21.567 14.3167 21.8337 16.0167 21.8337C17.7167 21.8337 19.4167 21.567 21.0333 21.0253C21.6167 20.8337 22.0667 20.392 22.2833 19.817C22.5 19.242 22.4417 18.6087 22.1167 18.0753Z"
      fill="#FFAC6A"
    />
    <path
      d="M18.3584 22.6753C18.0084 23.642 17.0834 24.3337 16 24.3337C15.3417 24.3337 14.6917 24.067 14.2334 23.592C13.9667 23.342 13.7667 23.0087 13.65 22.667C13.7584 22.6837 13.8667 22.692 13.9834 22.7087C14.175 22.7337 14.375 22.7587 14.575 22.7753C15.05 22.817 15.5334 22.842 16.0167 22.842C16.4917 22.842 16.9667 22.817 17.4334 22.7753C17.6084 22.7587 17.7834 22.7503 17.95 22.7253C18.0834 22.7087 18.2167 22.692 18.3584 22.6753Z"
      fill="#FFAC6A"
    />
  </svg>,
];

const notification = [
  {
    title: "Nguyễn Thị Thùy Dung",
    description: "12h20 ngày 30/11/2021",
  },
  {
    title: "Nguyễn Thị Thùy Dung",
    description: "12h20 ngày 30/11/2021",
  },
  {
    title: "Võ Thị Kim Liên",
    description: "12h20 ngày 30/11/2021",
  },
  {
    title: "Hoàng Nguyễn Quốc Huy",
    description: "12h20 ngày 30/11/2021",
  },
  {
    title: "Võ Ngọc Lan Anh",
    description: "12h20 ngày 30/11/2021",
  },
  {
    title: "Nguyễn Thị Trúc Anh",
    description: "12h20 ngày 30/11/2021",
  },
  {
    title: "Nguyễn Trường Toản",
    description: "12h20 ngày 30/11/2021",
  },
  {
    title: "Phan Quốc Học",
    description: "12h20 ngày 30/11/2021",
  },
  {
    title: "Phan Thị Lệ",
    description: "12h20 ngày 30/11/2021",
  },
  {
    title: "Nguyễn Kim Kiều",
    description: "12h20 ngày 30/11/2021",
  },
];

const routes = [
  { path: "/dashboard", breadcrumb: "Dashboard" },
  { path: "/profile", breadcrumb: "Thông tin cá nhân" },
  {
    path: "/thiet-bi",
    breadcrumb: "Thiết bị",
    children: [
      {
        path: "danh-sach-thiet-bi",
        breadcrumb: "Danh sách thiết bị",
        children: [
          {
            path: "them-thiet-bi",
            breadcrumb: "Thêm thiết bị",
          },
          {
            path: "chi-tiet",
            breadcrumb: "Chi tiết",
            children: [
              {
                path: "cap-nhat",
                breadcrumb: "Cập nhật",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/dich-vu",
    breadcrumb: "Dịch vụ",
    children: [
      {
        path: "danh-sach-dich-vu",
        breadcrumb: "Danh sách dịch vụ",
        children: [
          {
            path: "them-dich-vu",
            breadcrumb: "Thêm dịch vụ",
          },
          {
            path: "chi-tiet",
            breadcrumb: "Chi tiết",
            children: [
              {
                path: "cap-nhat",
                breadcrumb: "Cập nhật",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/cap-so",
    breadcrumb: "Cấp số",
    children: [
      {
        path: "danh-sach-cap-so",
        breadcrumb: "Danh sách cấp số",
        children: [
          {
            path: "cap-so-moi",
            breadcrumb: "Cấp số mới",
          },
          {
            path: "chi-tiet",
            breadcrumb: "Chi tiết",
          },
        ],
      },
    ],
  },
  {
    path: "/bao-cao",
    breadcrumb: "Báo cáo",
    children: [
      {
        path: "lap-bao-cao",
        breadcrumb: "Lập báo cáo",
      },
    ],
  },
  {
    path: "/cai-dat-he-thong",
    breadcrumb: "Cài đặt hệ thống",
    children: [
      {
        path: "quan-ly-vai-tro",
        breadcrumb: "Quản lý vai trò",
        children: [
          {
            path: "them-vai-tro",
            breadcrumb: "Thêm vai trò",
          },
          {
            path: "cap-nhat-vai-tro",
            breadcrumb: "Cập nhật tài khoản",
          },
        ],
      },
      {
        path: "quan-ly-tai-khoan",
        breadcrumb: "Quản lý tài khoản",
        children: [
          {
            path: "them-tai-khoan",
            breadcrumb: "Thêm vai trò",
          },
          {
            path: "cap-nhat-tai-khoan",
            breadcrumb: "Cập nhật tài khoản",
          },
        ],
      },
      {
        path: "nhat-ky-hoat-dong",
        breadcrumb: "Nhật ký hoạt động",
      },
    ],
  },
];

const menu = (
  <List
    className="header-notifications-dropdown"
    itemLayout="horizontal"
    dataSource={notification}
    header={<div>Thông báo</div>}
    renderItem={(item) => (
      <List.Item>
        <List.Item.Meta
          title={`Người dùng: ${item.title}`}
          description={`Thời gian nhận số: ${item.description}`}
        />
      </List.Item>
    )}
  />
);

const Header = () => {
  useEffect(() => window.scrollTo(0, 0));
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();
  const data = useSelector((state: any) => state.profile.users[0]);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(getProfile(user.uid)).finally(() => setLoading(false));
      }
    });
  }, [dispatch]);

  const breadcrumbs = useBreadcrumbs(routes, { disableDefaults: true });
  return (
    <>
      <Row>
        <Col span={12} className="nav-breadcrumb">
          {breadcrumbs.map(({ match, breadcrumb }, index) => (
            <Fragment key={match.pathname}>
              <NavLink to={match.pathname}>{breadcrumb}</NavLink>
              {index !== breadcrumbs.length - 1 && " > "}
            </Fragment>
          ))}
        </Col>
        <Col span={12} className="header-control">
          <Link to="/profile" className="btn-profile">
            <img src={profile} alt="" />
            <div>
              <div>Xin chào</div>
              <div>{loading ? <Spin /> : data.fullname}</div>
            </div>
          </Link>
          <Badge size="small" count={notification.length}>
            <Dropdown overlay={menu} trigger={["click"]}>
              <a
                href="#pablo"
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                {bell}
              </a>
            </Dropdown>
          </Badge>
        </Col>
      </Row>
    </>
  );
};

export default Header;
