import { Typography, Table, Col, Row, Input, Button, DatePicker } from "antd";
import type { ColumnsType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { add, calendar } from "../../../components/icon/icon";
import { useEffect, useState } from "react";
import _ from "lodash";
import moment from "moment";

interface DataType {
  key: string;
  username: string;
  activeTime: Date;
  ipAddress: string;
  operations: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Tên đăng nhập",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Thời gian tác động",
    dataIndex: "activeTime",
    key: "activeTime",
    render: (date) => moment(date).format("DD/MM/YYYY - HH:mm:ss"),
  },
  {
    title: "IP thực hiện",
    dataIndex: "ipAddress",
    key: "ipAddress",
  },
  {
    title: "Thao tác thực hiện",
    dataIndex: "operations",
    key: "operations",
  },
];

const data: DataType[] = [
  {
    key: "1",
    username: "tuyetnguyen@12",
    activeTime: new Date("01/12/2021 15:12:17"),
    ipAddress: "192.168.3.1",
    operations: "Cập nhật thông tin dịch vụ DV_01",
  },
  {
    key: "2",
    username: "tuyetnguyen@12",
    activeTime: new Date("01/12/2021 15:12:17"),
    ipAddress: "192.168.3.1",
    operations: "Cập nhật thông tin dịch vụ DV_01",
  },
  {
    key: "3",
    username: "tuyetnguyen@12",
    activeTime: new Date("01/12/2021 15:12:17"),
    ipAddress: "192.168.3.1",
    operations: "Cập nhật thông tin dịch vụ DV_01",
  },
  {
    key: "14",
    username: "tuyetnguyen@12",
    activeTime: new Date("01/12/2021 15:12:17"),
    ipAddress: "192.168.3.1",
    operations: "Cập nhật thông tin dịch vụ DV_01",
  },
  {
    key: "5",
    username: "tuyetnguyen@12",
    activeTime: new Date("01/12/2021 15:12:17"),
    ipAddress: "192.168.3.1",
    operations: "Cập nhật thông tin dịch vụ DV_01",
  },
  {
    key: "6",
    username: "tuyetnguyen@12",
    activeTime: new Date("01/12/2021 15:12:17"),
    ipAddress: "192.168.3.1",
    operations: "Cập nhật thông tin dịch vụ DV_01",
  },
];

const ActivityLogs = () => {
  const { Title } = Typography;
  const { RangePicker } = DatePicker;

  const [filteredData, setFilteredData] = useState(data);
  const [selectedDateRange, setSelectedDateRange] = useState(undefined);

  const handleSearch = (searchText: string) => {
    const newData = _.filter(data, (item) => {
      return _.includes(
        (item.username + item.ipAddress + item.operations).toLowerCase(),
        searchText.toLowerCase()
      );
    });

    setFilteredData(newData);
  };

  const handleRangeChange = (dates: any, dateStrings: [string, string]) => {
    setSelectedDateRange(dates);
    const filtered = data.filter((item) =>
      moment(item.activeTime).isBetween(dateStrings[0], dateStrings[1])
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    if (!selectedDateRange) {
      setFilteredData(data);
    }
  }, [selectedDateRange]);

  return (
    <>
      <div className="layout-content">
        <div className="layout-table">
          <Title level={2} className="text-orange">
            Danh sách tài khoản
          </Title>
          <Row gutter={24}>
            <Col span={6}>
              <div>Chọn thời gian</div>
              <RangePicker
                size="large"
                suffixIcon={calendar}
                onChange={handleRangeChange}
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
          <Table columns={columns} dataSource={filteredData} bordered />
        </div>
      </div>
    </>
  );
};

export default ActivityLogs;
