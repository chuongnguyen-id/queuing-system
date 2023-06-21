import { Avatar, Card, Col, Form, Input, Row, Typography } from "antd";
import avatar from "../../assets/images/avatar.png";
import { camera } from "../../components/icon/icon";
import { useSelector } from "react-redux";

const Profile = () => {
  const { Title } = Typography;
  const data = useSelector((state: any) => state.profile.users[0]);

  return (
    <>
      <div className="layout-content">
        <div className="layout-table">
          <Form initialValues={data} layout="vertical" disabled>
            <Card>
              <Row gutter={24}>
                <Col span={6}>
                  <div className="profile-avatar wrapper-center">
                    <Avatar src={avatar} />
                    <div className="camera-icon">{camera}</div>
                  </div>
                  <Title level={3} className="profile-name wrapper-center">
                    {data.fullname}
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
