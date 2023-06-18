import { Typography, Table, Col, Row, Input, Button, Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import { CaretDownOutlined, SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { add } from "../../../components/icon/icon";
import { useEffect, useState } from "react";
import _ from "lodash";
import { roleSelect } from "../../../components/configs/SelectConfigs";
import { UserType, getUser } from "../../../store/reducer/userReducer";
import { useAppDispatch } from "../../../store/store";
import { useSelector } from "react-redux";

const columns: ColumnsType<UserType> = [
  {
    title: "Tên đăng nhập",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Họ tên",
    dataIndex: "fullname",
    key: "fullname",
  },
  {
    title: "Số điện thoại",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Vai trò",
    dataIndex: "role",
    key: "role",
  },

  {
    title: "Trạng thái hoạt động",
    dataIndex: "activeStatus",
    key: "activeStatus",
    render: (activeStatus) => {
      const color = activeStatus === "Hoạt động" ? "#34CD26" : "#EC3740";
      return (
        <div>
          <span style={{ color: color }}>●&nbsp;</span>
          {activeStatus}
        </div>
      );
    },
  },
  {
    title: " ",
    key: "update",
    align: "center",
    render: (record) => (
      <a
        href={`/cai-dat-he-thong/quan-ly-tai-khoan/cap-nhat-tai-khoan/${record.id}`}
      >
        Cập nhật
      </a>
    ),
  },
];

const AccountManagement = () => {
  const { Title } = Typography;
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();
  const data = useSelector((state: any) => state.user.users);
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    dispatch(getUser()).finally(() => setLoading(false));
    setFilteredData(data);
  }, [dispatch, data]);

  const handleSearch = (searchText: string) => {
    const newData = _.filter(data, (item) => {
      return _.includes(
        (
          item.username +
          item.fullname +
          item.phoneNumber +
          item.email +
          item.role
        ).toLowerCase(),
        searchText.toLowerCase()
      );
    });

    setFilteredData(newData);
  };

  const handleRole = (value: string) => {
    let filteredData: UserType[] = [];
    filteredData = data.filter((item: { role: string }) => item.role === value);
    setFilteredData(filteredData);
  };

  return (
    <>
      <div className="layout-content">
        <div className="layout-table">
          <Title level={2} className="text-orange">
            Danh sách tài khoản
          </Title>
          <Row gutter={24}>
            <Col span={6}>
              <div>Tên vai trò</div>
              <Select
                defaultValue="Tất cả"
                size="large"
                onChange={handleRole}
                suffixIcon={<CaretDownOutlined />}
                options={roleSelect}
              />
            </Col>
            <Col span={6} offset={12}>
              <div>Từ khóa</div>
              <Input
                suffix={<SearchOutlined />}
                size="large"
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Nhập từ khóa"
                allowClear
              />
            </Col>
          </Row>
          <Button className="popup-button">
            <Link to="/cai-dat-he-thong/quan-ly-tai-khoan/them-tai-khoan">
              <div>{add}</div>
              <div>Thêm tài khoản</div>
            </Link>
          </Button>
          <Table
            columns={columns}
            dataSource={filteredData}
            loading={loading}
            bordered
          />
        </div>
      </div>
    </>
  );
};

export default AccountManagement;
