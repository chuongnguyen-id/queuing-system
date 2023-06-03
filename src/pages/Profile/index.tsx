import { Avatar, Card, Col, Form, Input, Row, Typography } from "antd";
import avatar from "../../assets/images/bigavatar.png";
import { camera } from "../../components/icon/icon";

const initialValues = {
  fullname: "Lê Quỳnh Ái Vân",
  username: "lequynhaivan01",
  phoneNumber: "0767375921",
  password: "311940211",
  email: "adminSSO1@domain.com",
  role: "Kế toán",
};

const Profile = () => {
  const { Title } = Typography;
  return (
    <>
      <div className="layout-content">
        <div className="layout-table">
          <Form initialValues={initialValues} layout="vertical" disabled>
            <Card>
              <Row gutter={24}>
                <Col span={6}>
                  <div className="profile-avatar wrapper-center">
                    <Avatar src={avatar} />
                    <div className="camera-icon">{camera}</div>
                  </div>
                  <Title level={3} className="profile-name wrapper-center">
                    {initialValues.fullname}
                  </Title>
                </Col>
                <Col span={9}>
                  <Form.Item label="Tên người dùng" name="fullname">
                    <Input size="large" />
                  </Form.Item>
                  <Form.Item label="Số điện thoại" name="phoneNumber">
                    <Input size="large" />
                  </Form.Item>
                  <Form.Item label="Email" name="email">
                    <Input size="large" />
                  </Form.Item>
                </Col>
                <Col span={9}>
                  <Form.Item label="Tên đăng nhập" name="username">
                    <Input size="large" />
                  </Form.Item>
                  <Form.Item label="Mật khẩu" name="password">
                    <Input size="large" />
                  </Form.Item>
                  <Form.Item label="Vai trò" name="role">
                    <Input size="large" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Profile;
