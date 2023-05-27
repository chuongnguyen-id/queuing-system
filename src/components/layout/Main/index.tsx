import { Layout } from "antd";
import Sidenav from "../Sidenav";
import Header from "../Header";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const { Header: AntHeader, Content, Sider } = Layout;

function Main({ children }: any) {
  const [currentPath, setCurrentPath] = useState("Dashboard");
  const [subPath, setSubPath] = useState("");

  const handleSetPath = (path: string, subPath: string) => {
    setCurrentPath(path);
    setSubPath(subPath);
  };

  return (
    <>
      <Layout className="layout-dashboard">
        <Sider
          breakpoint="lg"
          width={200}
          className="sider-primary ant-layout-sider-primary"
        >
          <Sidenav setPath={handleSetPath} />
        </Sider>
        <Layout>
          <AntHeader>
            <Header name={currentPath} subName={subPath} />
          </AntHeader>
          <Content className="content-ant">{children}</Content>
        </Layout>
      </Layout>
      <Outlet />
    </>
  );
}

export default Main;
