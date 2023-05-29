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
import InputTag from "./InputTag";

const EditDevice = () => {
  const { Title } = Typography;

  const onFinish = (values: any) => {
    console.log(values);
    window.alert(JSON.stringify(values));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div className="layout-content">
        <div className="layout-edit">
          <Title level={2} className="text-orange">
            Quản lý thiết bị
          </Title>
          <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            <Card>
              <Title level={3} className="text-orange">
                Thông tin thiết bị
              </Title>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    label="Mã thiết bị:"
                    name="deviceCode"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập mã thiết bị",
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Nhập mã thiết bị" />
                  </Form.Item>
                  <Form.Item
                    label="Tên thiết bị:"
                    name="deviceName"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên thiết bị",
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Nhập tên thiết bị" />
                  </Form.Item>
                  <Form.Item
                    label="Địa chỉ IP:"
                    name="ipAddress"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập địa chỉ IP",
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Nhập địa chỉ IP" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Loại thiết bị:"
                    name="model"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập loại thiết bị",
                      },
                    ]}
                  >
                    <Select
                      size="large"
                      placeholder="Chọn loại thiết bị"
                      // onChange={handleChange}
                      suffixIcon={<CaretDownOutlined />}
                      options={[
                        { value: "Kiosk", label: "Kiosk 1" },
                        { value: "Display counter", label: "Display counter" },
                      ]}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Tên đăng nhập:"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên đăng nhập",
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Nhập tài khoản" />
                  </Form.Item>
                  <Form.Item
                    label="Mật khẩu:"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập mật khẩu",
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Nhập mật khẩu" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="Dịch vụ sử dụng:"
                    name="usedService"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập dịch vụ sử dụng",
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Nhập dịch vụ sử dụng" />
                    {/* <Input.TextArea> */}
                    <InputTag />
                    {/* </Input.TextArea> */}
                  </Form.Item>
                </Col>
              </Row>
              <div className="required-dsc">
                <span>✻</span> Là trường thông tin bắt buộc
              </div>
            </Card>
            <Form.Item>
              <Space size="large" className="wrapper-center">
                <Button htmlType="submit" className="cancel-button">
                  Hủy dịch vụ
                </Button>
                <Button htmlType="submit" className="submit-button">
                  Thêm dịch vụ
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default EditDevice;
