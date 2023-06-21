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
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import { useAppDispatch } from "../../../store/store";
import { useSelector } from "react-redux";
import {
  RoleType,
  getRole,
  getRoleById,
  updateRole,
} from "../../../store/reducer/roleReducer";
import { unwrapResult } from "@reduxjs/toolkit";
import { createLog } from "../../../store/reducer/logReducer";

const EditRoleManagement = () => {
  const { Title } = Typography;
  const CheckboxGroup = Checkbox.Group;
  const navigate = useNavigate();

  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>();
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  const plainOptions = ["Chức năng x", "Chức năng y", "Chức năng z"];

  const { id } = useParams();
  const dispatch = useAppDispatch();
  const data = useSelector((state: any) => state.role.roles[0]);
  const userData = useSelector((state: any) => state.profile.users[0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      dispatch(getRoleById(id)).finally(() => setLoading(false));
    }
  }, [dispatch, id]);

  const onFinish = (value: RoleType) => {
    setLoading(true);
    dispatch(updateRole({ ...value, id: id }))
      .then(unwrapResult)
      .then(() => {
        const log = {
          fullname: userData.fullname,
          username: userData.username,
          operation: `Cập nhật thông tin vài trò ${value.roleName}`,
        };
        dispatch(createLog(log));
        dispatch(getRole());
        navigate(-1);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
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
          {loading ? (
            <div>Đang tải...</div>
          ) : (
            <Form onFinish={onFinish} initialValues={data} layout="vertical">
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

export default EditRoleManagement;
