import {
  Typography,
  Table,
  Select,
  Col,
  Row,
  Input,
  Button,
  DatePicker,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { CaretDownOutlined, SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { add, calendar } from "../../components/icon/icon";
import { useEffect, useState } from "react";
import _ from "lodash";
import moment from "moment";

interface DataType {
  key: string;
  stt: string;
  name: string;
  service: string;
  issueDate: Date;
  expirationDate: Date;
  status: string;
  source: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
  },
  {
    title: "Tên khách hàng",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "tên dịch vụ",
    dataIndex: "service",
    key: "service",
  },
  {
    title: "Thời gian cấp",
    dataIndex: "issueDate",
    key: "issueDate",
    render: (date) => moment(date).format("HH:mm - YYYY/MM/DD"),
  },
  {
    title: "Hạn sử dụng",
    dataIndex: "expirationDate",
    key: "expirationDate",
    render: (date) => moment(date).format("HH:mm - YYYY/MM/DD"),
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    render: (status) => {
      const color =
        status === "Đang chờ"
          ? "#4277FF"
          : status === "Đã sử dụng"
          ? "#7E7D88"
          : "#E73F3F";
      return (
        <div>
          <span style={{ color: color }}>●&nbsp;</span>
          {status}
        </div>
      );
    },
  },
  {
    title: "Nguồn cấp",
    dataIndex: "source",
    key: "source",
  },
  {
    title: " ",
    key: "detail",
    align: "center",
    render: () => (
      <a href={"/cap-so/danh-sach-cap-so/chi-tiet-cap-so"}>Chi tiết</a>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    stt: "2010001",
    name: "Lê Huỳnh Ái Vân",
    service: "Khám tim mạch",
    issueDate: new Date("2023/05/01 15:56"),
    expirationDate: new Date("2023/05/05 15:56"),
    status: "Đang chờ",
    source: "kiosk",
  },
  {
    key: "2",
    stt: "2010001",
    name: "Lê Huỳnh Ái Vân",
    service: "Khám tim mạch",
    issueDate: new Date("2023/05/06 15:56"),
    expirationDate: new Date("2023/05/10 15:56"),
    status: "Đang chờ",
    source: "kiosk",
  },
  {
    key: "3",
    stt: "2010001",
    name: "Lê Huỳnh Ái Vân",
    service: "Khám tim mạch",
    issueDate: new Date("2023/05/10 15:56"),
    expirationDate: new Date("2023/05/15 15:56"),
    status: "Đang chờ",
    source: "kiosk",
  },
];

const OrdinalNumber = () => {
  const { Title } = Typography;
  const { RangePicker } = DatePicker;

  const [filteredData, setFilteredData] = useState(data);
  const [selectedDateRange, setSelectedDateRange] = useState(undefined);

  const handleStatus = (value: string) => {
    let filteredData: DataType[] = [];
    if (value === "all") {
      filteredData = data;
    } else {
      filteredData = data.filter(
        (item) =>
          item.status ===
          (value === "waiting"
            ? "Đang chờ"
            : value === "used"
            ? "Đã sử dụng"
            : "Bỏ qua")
      );
    }
    setFilteredData(filteredData);
  };

  const handleSearch = (searchText: string) => {
    const newData = _.filter(data, (item) => {
      return _.includes(
        (item.stt + item.name + item.service + item.source).toLowerCase(),
        searchText.toLowerCase()
      );
    });

    setFilteredData(newData);
  };

  const handleRangeChange = (dates: any, dateStrings: [string, string]) => {
    setSelectedDateRange(dates);
    const filtered = data.filter(
      (item) =>
        moment(item.issueDate).isBetween(dateStrings[0], dateStrings[1]) &&
        moment(item.expirationDate).isBetween(dateStrings[0], dateStrings[1])
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
            Quản lý dịch vụ
          </Title>
          <Row gutter={24}>
            <Col span={6}>
              <div>Tình trạng</div>
              <Select
                defaultValue="Tất cả"
                size="large"
                onChange={handleStatus}
                suffixIcon={<CaretDownOutlined />}
                options={[
                  { value: "all", label: "Tất cả" },
                  { value: "waiting", label: "Đang chờ" },
                  { value: "used", label: "Đã sử dụng" },
                  { value: "skip", label: "Bỏ qua" },
                ]}
              />
            </Col>
            <Col span={6}>
              <div>Chọn thời gian</div>
              <RangePicker
                size="large"
                suffixIcon={calendar}
                onChange={handleRangeChange}
              />
            </Col>
            <Col span={6} offset={6}>
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
            <Link to="/dich-vu/danh-sach-dich-vu/them-dich-vu">
              <div>{add}</div>
              <div>Thêm dịch vụ</div>
            </Link>
          </Button>
          <Table columns={columns} dataSource={filteredData} bordered />
        </div>
      </div>
    </>
  );
};

export default OrdinalNumber;
