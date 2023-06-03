import { Typography, Table, Col, Row, Input, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { add } from "../../../components/icon/icon";
import { useState } from "react";
import _ from "lodash";

interface DataType {
  key: string;
  name: string;
  usersNumber: number;
  description: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Tên vai trò",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Số người dùng",
    dataIndex: "usersNumber",
    key: "usersNumber",
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    key: "description",
  },
  {
    title: " ",
    key: "update",
    align: "center",
    render: () => (
      <a href={"/cai-dat-he-thong/quan-ly-vai-tro/cap-nhat-vai-tro"}>
        Cập nhật
      </a>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "Kế toán",
    usersNumber: 6,
    description: "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",
  },
  {
    key: "2",
    name: "Bác sĩ",
    usersNumber: 6,
    description: "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",
  },
  {
    key: "3",
    name: "Lễ tân",
    usersNumber: 6,
    description: "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",
  },
  {
    key: "4",
    name: "Quản lý",
    usersNumber: 6,
    description: "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",
  },
  {
    key: "5",
    name: "Admin",
    usersNumber: 6,
    description: "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",
  },
  {
    key: "6",
    name: "Superadmin",
    usersNumber: 6,
    description: "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",
  },
];

const RoleManagement = () => {
  const { Title } = Typography;
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (searchText: string) => {
    const newData = _.filter(data, (item) => {
      return _.includes(
        (item.name + item.usersNumber + item.description).toLowerCase(),
        searchText.toLowerCase()
      );
    });

    setFilteredData(newData);
  };

  return (
    <>
      <div className="layout-content">
        <div className="layout-table">
          <Title level={2} className="text-orange">
            Danh sách vai trò
          </Title>
          <Row gutter={24}>
            <Col span={6} offset={18}>
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
            <Link to="/cai-dat-he-thong/quan-ly-vai-tro/them-vai-tro">
              <div>{add}</div>
              <div>Thêm vai trò</div>
            </Link>
          </Button>
          <Table
            columns={columns}
            dataSource={filteredData}
            pagination={false}
            bordered
          />
        </div>
      </div>
    </>
  );
};

export default RoleManagement;
