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
                message: "Xin nhập tên đăng nhập",
              },
            ]}
          >
            <Input />
          </Form.Item>
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
          <p className="font-semibold text-muted">
            <Link to="/quen-mat-khau" className="text-red">
              Quên mật khẩu?
            </Link>
          </p>
          <Form.Item>
            <Button htmlType="submit" className="signin-button">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </SignInLayout>
    </>
  );
};

export default SignIn;
