import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Space,
  Typography,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import type { CheckboxValueType } from "antd/es/checkbox/Group";

const EditRoleManagement = () => {
  const { Title } = Typography;
  const CheckboxGroup = Checkbox.Group;
  const navigate = useNavigate();

  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>();
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  const plainOptions = ["Chức năng x", "Chức năng y", "Chức năng z"];

  const onFinish = (values: any) => {
    console.log(values);
    window.alert(JSON.stringify(values));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  // Check Box
  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const onCancel = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="layout-content">
        <div className="layout-edit">
          <Title level={2} className="text-orange">
            Danh sách vai trò
          </Title>
          <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            <Card>
              <Title level={3} className="text-orange">
                Thông tin vai trò
              </Title>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    label="Tên vai trò"
                    name="roleName"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên vai trò",
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Nhập tên vai trò" />
                  </Form.Item>
                  <Form.Item label="Mô tả:" name="description">
                    <Input.TextArea size="large" placeholder="Nhập mô tả" />
                  </Form.Item>
                  <div className="required-dsc">
                    <span>✻</span> Là trường thông tin bắt buộc
                  </div>
                </Col>
                <Col span={12}>
                  <div>
                    Phân quyền chức năng{" "}
                    <span style={{ color: "#FF4747" }}>✻</span>
                  </div>
                  <div className="scroll-box">
                    {["A", "B", "C", "D"].map((group) => (
                      <>
                        <Title level={3} className="text-orange">
                          Nhóm chức năng {group}
                        </Title>
                        <Form.Item
                          name={`group${group}`}
                          rules={[
                            {
                              required: true,
                              message: `Vui lòng chọn nhóm chức năng ${group}`,
                            },
                          ]}
                        >
                          <Checkbox
                            indeterminate={indeterminate}
                            onChange={onCheckAllChange}
                            checked={checkAll}
                          >
                            Tất cả
                          </Checkbox>
                          <CheckboxGroup
                            options={plainOptions}
                            value={checkedList}
                            onChange={onChange}
                          />
                        </Form.Item>
                      </>
                    ))}
                  </div>
                </Col>
              </Row>
            </Card>
            <Form.Item>
              <Space size="large" className="wrapper-center">
                <Button onClick={onCancel} className="cancel-button">
                  Hủy bỏ
                </Button>
                <Button htmlType="submit" className="submit-button">
                  Cập nhật
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default EditRoleManagement;
