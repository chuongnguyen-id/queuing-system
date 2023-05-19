import { useLocation } from "react-router-dom";
import { Layout } from "antd";
import Sidenav from "../Sidenav";
import Header from "../Header";
import { useState } from "react";

const { Header: AntHeader, Content, Sider } = Layout;

function Main({ children }: any) {
  let { pathname } = useLocation();
  pathname = pathname.replace("/", "");

  const [currentPath, setCurrentPath] = useState("Dashboard");

  const handleSetPath = (path: string) => {
    setCurrentPath(path);
  };

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
