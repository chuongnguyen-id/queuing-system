import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Space,
  Typography,
} from "antd";

const AddService = () => {
  const { Title } = Typography;

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div className="layout-content">
        <div className="layout-edit">
          <Title level={2} className="text-orange">
            Quản lý dịch vụ
          </Title>
          <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            <Card>
              <Title level={3} className="text-orange">
                Thông tin dịch vụ
              </Title>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    label="Mã dịch vụ:"
                    name="serviceCode"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập mã dịch vụ",
                      },
                    ]}
                  >
                    <Input size="large" placeholder="201" />
                  </Form.Item>
                  <Form.Item
                    label="Tên dịch vụ:"
                    name="serviceName"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên dịch vụ",
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Khám tim mạch" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Mô tả" name="description">
                    <Input.TextArea placeholder="Mô tả dịch vụ" />
                  </Form.Item>
                </Col>
              </Row>

              <Title level={3} className="text-orange">
                Quy tắc cấp số
              </Title>

              <Row className="inline-items">
                <Col span={4}>
                  <Checkbox>Tăng tự động từ:</Checkbox>
                </Col>
                <Col span={4}>
                  <Input size="large" defaultValue={"0001"} />
                  đến
                  <Input size="large" defaultValue={"9999"} />
                </Col>
              </Row>

              <Row className="inline-items">
                <Col span={4}>
                  <Checkbox>Prefix:</Checkbox>
                </Col>
                <Col span={4}>
                  <Input size="large" defaultValue={"0001"} />
                </Col>
              </Row>

              <Row className="inline-items">
                <Col span={4}>
                  <Checkbox>Surfix:</Checkbox>
                </Col>
                <Col span={4}>
                  <Input size="large" defaultValue={"0001"} />
                </Col>
              </Row>

              <Row className="inline-items">
                <Checkbox>Reset mỗi ngày</Checkbox>
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

export default AddService;
