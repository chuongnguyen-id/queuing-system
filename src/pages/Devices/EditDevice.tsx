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
  deviceTypeSelect,
  serviceSelect,
} from "../../components/configs/SelectConfigs";
import { useNavigate, useParams } from "react-router-dom";
import {
  DeviceType,
  getDevice,
  getDeviceById,
  updateDevice,
} from "../../store/reducer/deviceReducer";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/store";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { createLog } from "../../store/reducer/logReducer";

const EditDevice = () => {
  const { Title } = Typography;
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();
  const data = useSelector((state: any) => state.device.devices[0]);
  const userData = useSelector((state: any) => state.profile.users[0]);

  useEffect(() => {
    if (id) {
      dispatch(getDeviceById(id)).finally(() => setLoading(false));
    }
  }, [dispatch, id]);

  const onFinish = (value: DeviceType) => {
    setLoading(true);
    const device = {
      ...value,
      activeStatus: true,
      connectionStatus: true,
    };
    dispatch(updateDevice({ ...device, id: id }))
      .then(unwrapResult)
      .then(() => {
        const log = {
          fullname: userData.fullname,
          username: userData.username,
          operation: `Cập nhật thông tin thiết bị ${value.deviceName}`,
        };
        dispatch(createLog(log));
        dispatch(getDevice());
        navigate(-1);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onCancel = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="layout-content">
        <div className="layout-edit">
          <Title level={2} className="text-orange">
            Quản lý thiết bị
          </Title>
          {loading ? (
            <div>Đang tải...</div>
          ) : (
            <Form onFinish={onFinish} initialValues={data} layout="vertical">
              <Card>
                <Title level={3} className="text-orange">
                  Thông tin thiết bị
                </Title>
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item
                      label="Mã thiết bị:"
                      name="deviceCode"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập mã thiết bị",
                        },
                      ]}
                    >
                      <Input size="large" placeholder="Nhập mã thiết bị" />
                    </Form.Item>
                    <Form.Item
                      label="Tên thiết bị:"
                      name="deviceName"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập tên thiết bị",
                        },
                      ]}
                    >
                      <Input size="large" placeholder="Nhập tên thiết bị" />
                    </Form.Item>
                    <Form.Item
                      label="Địa chỉ IP:"
                      name="ipAddress"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập địa chỉ IP",
                        },
                      ]}
                    >
                      <Input size="large" placeholder="Nhập địa chỉ IP" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Loại thiết bị:"
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
                        suffixIcon={<CaretDownOutlined />}
                        options={deviceTypeSelect}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Tên đăng nhập:"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập tên đăng nhập",
                        },
                      ]}
                    >
                      <Input size="large" placeholder="Nhập tài khoản" />
                    </Form.Item>
                    <Form.Item
                      label="Mật khẩu:"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập mật khẩu",
                        },
                      ]}
                    >
                      <Input size="large" placeholder="Nhập mật khẩu" />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label="Dịch vụ sử dụng:"
                      name="usedService"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập dịch vụ sử dụng",
                        },
                      ]}
                    >
                      <Select
                        mode="multiple"
                        size="large"
                        placeholder="Nhập dịch vụ sử dụng"
                        suffixIcon={<CaretDownOutlined />}
                        options={serviceSelect}
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
                    {loading ? <Spin /> : "Cập nhật"}
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          )}
        </div>
      </div>
    </>
  );
};

export default EditDevice;
