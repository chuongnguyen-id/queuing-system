import { Layout } from "antd";
import Sidenav from "../Sidenav";
import Header from "../Header";
import { Outlet } from "react-router-dom";

const { Header: AntHeader, Content, Sider } = Layout;

function Main({ children }: any) {
  return (
    <>
      <Layout className="layout-dashboard">
        <Sider
          breakpoint="lg"
          width={200}
          className="sider-primary ant-layout-sider-primary"
        >
          <Sidenav />
        </Sider>
        <Layout>
          <AntHeader>
            <Header />
          </AntHeader>
          <Content className="content-ant">{children}</Content>
        </Layout>
      </Layout>
      <Outlet />
    </>
  );
}

export default Main;
