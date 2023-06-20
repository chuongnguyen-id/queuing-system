import { Button, Card, Form, Select, Space, Spin, Typography } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { serviceSelect } from "../../components/configs/SelectConfigs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  OrdinalNumberType,
  createOrdinalNumber,
} from "../../store/reducer/ordinalNumberReducer";
import { useAppDispatch } from "../../store/store";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { createLog } from "../../store/reducer/logReducer";

const AddOrdinalNumber = () => {
  const { Title } = Typography;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const data = useSelector((state: any) => state.profile.users[0]);
  const userData = useSelector((state: any) => state.profile.users[0]);

  const currentYear = new Date().getFullYear();
  const randomNumber = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");

  const onFinish = (value: OrdinalNumberType) => {
    setLoading(true);
    const ordinalNumber = {
      ...value,
      stt: `${currentYear}${randomNumber}`,
      userId: data.id,
      fullname: data.fullname,
      phoneNumber: data.phoneNumber,
      email: data.email,
      issueDate: new Date(),
      expirationDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      dateStatus: "Đang chờ",
      source: "Kiosk",
    };
    dispatch(createOrdinalNumber(ordinalNumber))
      .then(unwrapResult)
      .then(() => {
        const log = {
          username: userData.username,
          operation: `Cấp số thứ tự mới ${ordinalNumber.stt}`,
        };
        dispatch(createLog(log));
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
            Quản lý cấp số
          </Title>
          <Card className="fullheight-card wrapper-center">
            <Title level={1} className="text-orange wrapper-center">
              CẤP SỐ MỚI
            </Title>
            <Title level={5} className="text-gray wrapper-center">
              Dịch vụ khách hàng lựa chọn
            </Title>
            <Form onFinish={onFinish} layout="vertical">
              <Form.Item
                name="service"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập loại dịch vụ",
                  },
                ]}
              >
                <Select
                  size="large"
                  placeholder="Chọn loại thiết bị"
                  suffixIcon={<CaretDownOutlined />}
                  options={serviceSelect}
                />
              </Form.Item>
              <Space />
              <Form.Item>
                <Space size="large" className="wrapper-center">
                  <Button onClick={onCancel} className="cancel-button">
                    Hủy bỏ
                  </Button>
                  <Button htmlType="submit" className="submit-button">
                    {loading ? <Spin /> : "In số"}
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AddOrdinalNumber;
