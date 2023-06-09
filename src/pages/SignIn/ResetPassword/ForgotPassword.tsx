import { Button, Form, Input, Space, Spin, notification } from "antd";
import SignInLayout from "../SignInLayout";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useUser from "../../../store/selector/useUser";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { userState, setErrorIn, forgotPassword, setSuccessMsg } = useUser();
  const { error, success } = userState;

  const openNotification = () => {
    notification.success({
      message: "Email xác nhận được gửi thành công",
      description:
        "Vui lòng kiểm tra hộp thư để được hướng dẫn thay đổi password !",
      placement: "bottomRight",
    });
  };

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
    if (error) {
      setErrorIn("");
    }
    if (success) {
      setSuccessMsg("");
    }
    setLoading(true);
    await forgotPassword(value.email, "sent Email !!!");
    setLoading(false);
    openNotification();
  };

  const onCancel = (event: any) => {
    event.preventDefault();
    navigate(-1);
  };

  return (
    <>
      <SignInLayout>
        <Form onFinish={submitHandler} className="row-col" layout="vertical">
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
                {loading ? <Spin /> : "Tiếp tục"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </SignInLayout>
    </>
  );
};

export default ForgotPassword;
