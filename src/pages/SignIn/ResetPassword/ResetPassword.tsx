import { Button, Form, Input, Space } from "antd";
import SignInLayout from "../SignInLayout";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    navigate("/doi-mat-khau");
  };

  const onCancel = () => {
    navigate("/dang-nhap");
  };

  return (
    <>
      <SignInLayout>
        <Form onFinish={onFinish} className="row-col" layout="vertical">
          <h3>Đặt lại mật khẩu</h3>
          <Form.Item
            label="Vui lòng nhập email để đặt lại mật khẩu của bạn *"
            name="email"
            rules={[
              {
                message: "Xin nhập tên đăng nhập",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item>
            <Space style={{ display: "flex", justifyContent: "center" }}>
              <Button onClick={onCancel} className="signin-cancel">
                Hủy
              </Button>
              <Button htmlType="submit" className="signin-button">
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
