import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import SignInLayout from "./SignInLayout";

const SignIn = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
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
            <Input size="large" />
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
            <Input.Password size="large" />
          </Form.Item>
          <p className="font-semibold text-muted">
            <Link to="/quen-mat-khau" className="text-red">
              Quên mật khẩu?
            </Link>
          </p>
          <Form.Item className="wrapper-center">
            <Button htmlType="submit" className="submit-button">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </SignInLayout>
    </>
  );
};

export default SignIn;
