import { Typography, Table, Col, Row, Input, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { add } from "../../../components/icon/icon";
import { useEffect, useState } from "react";
import _ from "lodash";
import { RoleType, getRole } from "../../../store/reducer/roleReducer";
import { useAppDispatch } from "../../../store/store";
import { useSelector } from "react-redux";

const columns: ColumnsType<RoleType> = [
  {
    title: "Tên vai trò",
    dataIndex: "roleName",
    key: "roleName",
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
    render: (record) => (
      <a
        href={`/cai-dat-he-thong/quan-ly-vai-tro/cap-nhat-vai-tro/${record.id}`}
      >
        Cập nhật
      </a>
    ),
  },
];
//     key: "1",
//     name: "Kế toán",
//     usersNumber: 6,
//     description: "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",
//   },
//   {
//     key: "2",
//     name: "Bác sĩ",
//     usersNumber: 6,
//     description: "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",
//   },
//   {
//     key: "3",
//     name: "Lễ tân",
//     usersNumber: 6,
//     description: "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",
//   },
//   {
//     key: "4",
//     name: "Quản lý",
//     usersNumber: 6,
//     description: "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",
//   },
//   {
//     key: "5",
//     name: "Admin",
//     usersNumber: 6,
//     description: "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",
//   },
//   {
//     key: "6",
//     name: "Superadmin",
//     usersNumber: 6,
//     description: "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",
//   },
// ];

const RoleManagement = () => {
  const { Title } = Typography;

  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const roleData = useSelector((state: any) => state.role.roles);
  const userData = useSelector((state: any) => state.user.users);

  const data = roleData.map((role: any) => {
    const usersInRole = userData.reduce(
      (count: number, user: { role: any }) => {
        if (user.role === role.roleName) {
          count++;
        }
        return count;
      },
      0
    );

    return {
      ...role,
      usersNumber: usersInRole,
    };
  });

  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    dispatch(getRole()).finally(() => setLoading(false));
  }, [dispatch]);

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
            loading={loading}
            bordered
          />
        </div>
      </div>
    </>
  );
};

export default RoleManagement;
