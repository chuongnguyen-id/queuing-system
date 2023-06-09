import { Button, Form, Input, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import SignInLayout from "./SignInLayout";
import useUser from "../../store/selector/useUser";
import { useEffect, useState } from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const SignIn = () => {
  const navigate = useNavigate();
  const { userState, setErrorIn, signin } = useUser();
  const [loading, setLoading] = useState(false);
  const { error } = userState;

  useEffect(() => {
    return () => {
      if (error) {
        setErrorIn("");
      }
    };
  }, [error, setErrorIn]);

  const login = async (value: any) => {
    if (error) {
      setErrorIn("");
    }
    setLoading(true);
    await signin(
      {
        email: value.username + "@gmail.com",
        password: value.password,
      },
      () => setLoading(false)
    );

    setTimeout(() => {
      navigate("/dashboard");
    }, 500);
  };

  return (
    <>
      <SignInLayout>
        <Form
          onFinish={login}
          validateTrigger="onSubmit"
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
          {error && (
            <p className="text-red">
              <ExclamationCircleOutlined /> Sai mật khẩu hoặc tên đăng nhập
            </p>
          )}
          <p className="font-semibold text-muted">
            <Link to="/quen-mat-khau" className="text-red">
              Quên mật khẩu?
            </Link>
          </p>
          <Form.Item className="wrapper-center">
            <Button htmlType="submit" className="submit-button">
              {loading ? <Spin /> : "Đăng nhập"}
            </Button>
          </Form.Item>
        </Form>
      </SignInLayout>
    </>
  );
};

export default SignIn;
