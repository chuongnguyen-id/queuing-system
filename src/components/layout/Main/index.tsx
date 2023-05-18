import { useLocation } from "react-router-dom";
import { Layout } from "antd";
import Sidenav from "../Sidenav";
import Header from "../Header";

const { Header: AntHeader, Content, Sider } = Layout;

function Main({ children }: any) {
  let { pathname } = useLocation();
  pathname = pathname.replace("/", "");

  return (
    <Layout
      className={`layout-dashboard ${
        pathname === "profile" ? "layout-profile" : ""
      } `}
    >
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        trigger={null}
        width={200}
        theme="light"
        className={`sider-primary ant-layout-sider-primary `}
      >
        <Sidenav />
      </Sider>
      <Layout>
        <AntHeader>
          <Header name={pathname} />
        </AntHeader>
        <Content className="content-ant">{children}</Content>
      </Layout>
    </Layout>
  );
}

export default Main;
