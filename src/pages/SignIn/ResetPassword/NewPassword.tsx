import { Button, Form, Input } from "antd";
import SignInLayout from "../SignInLayout";
import { useNavigate } from "react-router-dom";

const NewPassword = () => {
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    navigate("/dashboard");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <SignInLayout>
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          className="row-col"
        >
          <h3>Đặt lại mật khẩu mới</h3>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: "Xin nhập mật khẩu",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Nhập lại mật khẩu"
            name="newPassword"
            rules={[
              {
                required: true,
                message: "Xin nhập mật khẩu mới",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item className="wrapper-center">
            <Button htmlType="submit" className="submit-button">
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      </SignInLayout>
    </>
  );
};

export default NewPassword;
