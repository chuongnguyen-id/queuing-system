import { Layout } from "antd";
import Sidenav from "../Sidenav";
import Header from "../Header";
import { useState } from "react";

const { Header: AntHeader, Content, Sider } = Layout;

function Main({ children }: any) {
  const [currentPath, setCurrentPath] = useState("Dashboard");

  const handleSetPath = (path: string) => {
    setCurrentPath(path);
  };

  return (
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
          <Header name={currentPath} />
        </AntHeader>
        <Content className="content-ant">{children}</Content>
      </Layout>
    </Layout>
  );
}

export default Main;
