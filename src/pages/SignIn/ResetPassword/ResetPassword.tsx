import { Button, Form, Input, Space } from "antd";
import SignInLayout from "../SignInLayout";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    navigate("/doi-mat-khau");
  };

  const onCancel = (event: any) => {
    event.preventDefault();
    navigate(-1);
  };

  return (
    <>
      <SignInLayout>
        <Form onFinish={onFinish} className="row-col" layout="vertical">
          <h3>Đặt lại mật khẩu</h3>
          <Form.Item
            label="Vui lòng nhập email để đặt lại mật khẩu của bạn"
            name="email"
            rules={[
              {
                required: true,
                message: "Xin nhập tên đăng nhập",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item>
            <Space size="large" className="wrapper-center">
              <Button onClick={onCancel} className="cancel-button">
                Hủy
              </Button>
              <Button htmlType="submit" className="submit-button">
                Tiếp tục
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </SignInLayout>
    </>
  );
};

export default ResetPassword;
