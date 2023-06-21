import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Space,
  Spin,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";
import {
  ServiceType,
  getService,
  getServiceById,
  updateService,
} from "../../store/reducer/serviceReducer";
import { unwrapResult } from "@reduxjs/toolkit";
import { createLog } from "../../store/reducer/logReducer";

const EditService = () => {
  const { Title } = Typography;
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();
  const data = useSelector((state: any) => state.service.services[0]);
  const userData = useSelector((state: any) => state.profile.users[0]);

  useEffect(() => {
    if (id) {
      dispatch(getServiceById(id)).finally(() => setLoading(false));
    }
  }, [dispatch, id]);

  const onFinish = (value: ServiceType) => {
    setLoading(true);
    const service = {
      ...value,
      activeStatus: true,
    };
    dispatch(updateService({ ...service, id: id }))
      .then(unwrapResult)
      .then(() => {
        const log = {
          fullname: userData.fullname,
          username: userData.username,
          operation: `Cập nhật thông tin dịch vụ ${value.serviceName}`,
        };
        dispatch(createLog(log));
        dispatch(getService());
        navigate(-1);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onCancel = (event: any) => {
    event.preventDefault();
    navigate(-1);
  };

  return (
    <>
      <div className="layout-content">
        <div className="layout-edit">
          <Title level={2} className="text-orange">
            Quản lý dịch vụ
          </Title>
          {loading ? (
            <div>Đang tải...</div>
          ) : (
            <Form onFinish={onFinish} initialValues={data} layout="vertical">
              <Card>
                <Title level={3} className="text-orange">
                  Thông tin dịch vụ
                </Title>
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item
                      label="Mã dịch vụ:"
                      name="serviceCode"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập mã dịch vụ",
                        },
                      ]}
                    >
                      <Input size="large" placeholder="201" />
                    </Form.Item>
                    <Form.Item
                      label="Tên dịch vụ:"
                      name="serviceName"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập tên dịch vụ",
                        },
                      ]}
                    >
                      <Input size="large" placeholder="Khám tim mạch" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Mô tả" name="description">
                      <Input.TextArea placeholder="Mô tả dịch vụ" />
                    </Form.Item>
                  </Col>
                </Row>

                <Title level={3} className="text-orange">
                  Quy tắc cấp số
                </Title>
                <Row className="inline-items">
                  <Col span={4}>
                    <Checkbox>Tăng tự động từ:</Checkbox>
                  </Col>
                  <Col span={4}>
                    <Input size="large" defaultValue={"0001"} />
                    đến
                    <Input size="large" defaultValue={"9999"} />
                  </Col>
                </Row>

                <Row className="inline-items">
                  <Col span={4}>
                    <Checkbox>Prefix:</Checkbox>
                  </Col>
                  <Col span={4}>
                    <Input size="large" defaultValue={"0001"} />
                  </Col>
                </Row>

                <Row className="inline-items">
                  <Col span={4}>
                    <Checkbox>Surfix:</Checkbox>
                  </Col>
                  <Col span={4}>
                    <Input size="large" defaultValue={"0001"} />
                  </Col>
                </Row>

                <Row className="inline-items">
                  <Checkbox>Reset mỗi ngày</Checkbox>
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

export default EditService;
