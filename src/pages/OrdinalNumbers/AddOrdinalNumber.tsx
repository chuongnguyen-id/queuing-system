import { Button, Card, Form, Select, Space, Typography } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { serviceSelect } from "../../components/configs/SelectConfigs";
import { useNavigate } from "react-router-dom";

const AddOrdinalNumber = () => {
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
            Quản lý cấp số
          </Title>
          <Card className="fullheight-card wrapper-center">
            <Title level={1} className="text-orange wrapper-center">
              CẤP SỐ MỚI
            </Title>
            <Title level={5} className="text-gray wrapper-center">
              Dịch vụ khách hàng lựa chọn
            </Title>
            <Form
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout="vertical"
            >
              <Form.Item
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
                  options={serviceSelect}
                />
              </Form.Item>
              <Space />
              <Form.Item>
                <Space size="large" className="wrapper-center">
                  <Button onClick={onCancel} className="cancel-button">
                    Hủy bỏ
                  </Button>
                  <Button htmlType="submit" className="submit-button">
                    In số
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AddOrdinalNumber;
