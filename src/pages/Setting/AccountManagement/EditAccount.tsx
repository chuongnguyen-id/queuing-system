import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import {
  activeStatusSelect,
  deviceTypeSelect,
  roleSelect,
  serviceSelect,
} from "../../../components/configs/SelectConfigs";
import { useNavigate } from "react-router-dom";

const EditAccount = () => {
  const { Title } = Typography;
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    console.log(values);
    window.alert(JSON.stringify(values));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  const onCancel = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="layout-content">
        <div className="layout-edit">
          <Title level={2} className="text-orange">
            Quản lý tài khoản
          </Title>
          <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            <Card>
              <Title level={3} className="text-orange">
                Thông tin tài khoản
              </Title>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    label="Họ tên"
                    name="fullname"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập họ tên",
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Nhập họ tên" />
                  </Form.Item>
                  <Form.Item
                    label="Số điện thoại"
                    name="phoneNumber"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số điện thoại",
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Nhập số điện thoại" />
                  </Form.Item>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập email",
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Nhập email" />
                  </Form.Item>
                  <Form.Item
                    label="Vai trò"
                    name="role"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập vai trò",
                      },
                    ]}
                  >
                    <Select
                      size="large"
                      placeholder="Chọn vai trò"
                      // onChange={handleChange}
                      suffixIcon={<CaretDownOutlined />}
                      options={roleSelect}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Tên đăng nhập"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên đăng nhập",
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Nhập tên đăng nhập" />
                  </Form.Item>
                  <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập mật khẩu",
                      },
                    ]}
                  >
                    <Input.Password size="large" placeholder="Nhập mật khẩu" />
                  </Form.Item>
                  <Form.Item
                    label="Nhập lại mật khẩu"
                    name="enterPassword"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập lại mật khẩu",
                      },
                    ]}
                  >
                    <Input.Password
                      size="large"
                      placeholder="Nhập lại mật khẩu"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Tình trạng"
                    name="activeStatus"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tình trạng",
                      },
                    ]}
                  >
                    <Select
                      size="large"
                      placeholder="Nhập tình trạng"
                      // onChange={handleChange}
                      suffixIcon={<CaretDownOutlined />}
                      options={activeStatusSelect}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <div className="required-dsc">
                <span>✻</span> Là trường thông tin bắt buộc
              </div>
            </Card>
            <Form.Item>
              <Space size="large" className="wrapper-center">
                <Button onClick={onCancel} className="cancel-button">
                  Hủy bỏ
                </Button>
                <Button htmlType="submit" className="submit-button">
                  Cập nhật
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default EditAccount;
