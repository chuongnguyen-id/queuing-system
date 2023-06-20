import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Spin,
  Typography,
} from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import {
  activeStatusSelect,
  roleSelect,
} from "../../../components/configs/SelectConfigs";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../../../store/selector/useAuth";
import { useAppDispatch } from "../../../store/store";
import { useSelector } from "react-redux";
import { createLog } from "../../../store/reducer/logReducer";

const AddAccount = () => {
  const { Title } = Typography;
  const navigate = useNavigate();
  const { AuthState, setErrorIn, signup } = useAuth();
  const { error } = AuthState;

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");

  const dispatch = useAppDispatch();
  const userData = useSelector((state: any) => state.profile.users[0]);

  useEffect(() => {
    return () => {
      if (error) {
        setErrorIn("");
      }
    };
  }, [error, setErrorIn]);

  const onFinish = async (value: any) => {
    if (error) {
      setErrorIn("");
    }
    setLoading(true);
    await signup(value, () => setLoading(false));

    const log = {
      username: userData.username,
      operation: `Tạo mới tài khoản ${username}`,
    };
    dispatch(createLog(log));

    setTimeout(() => {
      navigate(-1);
    }, 500);
  };

  const onCancel = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="layout-content">
        <div className="layout-edit">
          <Title level={2} className="text-orange">
            Quản lý tài khoản
          </Title>
          <Form onFinish={onFinish} layout="vertical">
            <Card>
              <Title level={3} className="text-orange">
                Thông tin tài khoản
              </Title>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    label="Họ tên"
                    name="fullname"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập họ tên",
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Nhập họ tên" />
                  </Form.Item>
                  <Form.Item
                    label="Số điện thoại"
                    name="phoneNumber"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số điện thoại",
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Nhập số điện thoại" />
                  </Form.Item>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập email",
                      },
                      {
                        type: "email",
                        message: "Email không đúng định dạng",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Nhập email"
                      onChange={(e) =>
                        setUsername(e.target.value.split("@")[0])
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    label="Vai trò"
                    name="role"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập vai trò",
                      },
                    ]}
                  >
                    <Select
                      size="large"
                      placeholder="Chọn vai trò"
                      suffixIcon={<CaretDownOutlined />}
                      options={roleSelect}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Tên đăng nhập"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên đăng nhập",
                      },
                    ]}
                  >
                    <Input
                      name="email"
                      size="large"
                      placeholder="Nhập tên đăng nhập"
                      value={username}
                      readOnly
                    />
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
                    <Input.Password size="large" placeholder="Nhập mật khẩu" />
                  </Form.Item>
                  <Form.Item
                    label="Nhập lại mật khẩu"
                    name="confirmPassword"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập lại mật khẩu",
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
                    <Input.Password
                      size="large"
                      placeholder="Nhập lại mật khẩu"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Tình trạng"
                    name="activeStatus"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tình trạng",
                      },
                    ]}
                  >
                    <Select
                      size="large"
                      placeholder="Nhập tình trạng"
                      suffixIcon={<CaretDownOutlined />}
                      options={activeStatusSelect}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <div className="required-dsc">
                <span>✻</span> Là trường thông tin bắt buộc
              </div>
            </Card>
            <Form.Item>
              <Space size="large" className="wrapper-center">
                <Button onClick={onCancel} className="cancel-button">
                  Hủy bỏ
                </Button>
                <Button htmlType="submit" className="submit-button">
                  {loading ? <Spin /> : "Thêm"}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AddAccount;
