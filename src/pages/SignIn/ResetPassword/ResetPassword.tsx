import { Button, Form, Input, Spin } from "antd";
import SignInLayout from "../SignInLayout";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../../../store/selector/useAuth";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  let oobCode: string | null = searchParams.get("oobCode");
  const [loading, setLoading] = useState(false);

  const { AuthState, setErrorIn, resetPassword, setSuccessMsg } = useAuth();
  const { error, success } = AuthState;

  useEffect(() => {
    return () => {
      if (error) {
        setErrorIn("");
      }
      if (success) {
        setSuccessMsg("");
      }
    };
  }, [error, setErrorIn, setSuccessMsg, success]);

  const submitHandler = async (value: any) => {
    try {
      if (oobCode) {
        setLoading(true);
        await resetPassword(oobCode, value.confirmPassword);
        setLoading(false);
        setSuccessMsg("");
        navigate("/dang-nhap");
      } else {
        window.alert("Something is wrong; try again later!");
        console.log("missing oobCode");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <>
      <SignInLayout>
        <Form onFinish={submitHandler} layout="vertical" className="row-col">
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
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Xin nhập mật khẩu",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu mới mà bạn đã nhập không khớp!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item className="wrapper-center">
            <Button htmlType="submit" className="submit-button">
              {loading ? <Spin /> : "Xác nhận"}
            </Button>
          </Form.Item>
        </Form>
      </SignInLayout>
    </>
  );
};

export default ResetPassword;
