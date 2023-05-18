import { ReactNode } from "react";
import { Layout, Row, Col } from "antd";
import logo from "../../assets/images/logo.png";
import signinbg from "../../assets/images/signin.png";

const { Content } = Layout;

type Props = {
  children: ReactNode;
};

const SignInLayout = ({ children }: Props) => {
  return (
    <>
      <Layout>
        <Content className="signin">
          <Row>
            <Col span={10} className="logo">
              <img src={logo} alt="" />
              {children}
            </Col>
            <Col
              span={14}
              className="sign-img signin-text"
              style={{ background: "#ffffff" }}
            >
              <img src={signinbg} alt="" />
              <div>
                <h2>Hệ thống</h2>
                <h1>QUẢN LÝ XẾP HÀNG</h1>
              </div>
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};

export default SignInLayout;
