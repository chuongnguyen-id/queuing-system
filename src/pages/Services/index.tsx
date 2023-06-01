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
import { useState } from "react";
import _ from "lodash";
import { activeStatusSelect } from "../../components/configs/SelectConfigs";

interface DataType {
  key: string;
  code: string;
  name: string;
  description: string;
  activeStatus: boolean;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Mã thiết bị",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "Tên thiết bị",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Trạng thái hoạt động",
    dataIndex: "activeStatus",
    key: "activeStatus",
    render: (activeStatus) => {
      const color = activeStatus ? "#34CD26" : "#EC3740";
      const text = activeStatus ? "Hoạt động" : "Ngưng hoạt động";
      return (
        <div>
          <span style={{ color: color }}>●&nbsp;</span>
          {text}
        </div>
      );
    },
  },
  {
    title: " ",
    key: "detail",
    align: "center",
    render: () => <a href={"/dich-vu/danh-sach-dich-vu/chi-tiet"}>Chi tiết</a>,
  },
  {
    title: " ",
    key: "update",
    align: "center",
    render: () => (
      <a href={"/dich-vu/danh-sach-dich-vu/chi-tiet/cap-nhat"}>Cập nhật</a>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    code: "KIO_01",
    name: "kiosk",
    description: "Mô tả dịch vụ",
    activeStatus: false,
  },
  {
    key: "2",
    code: "KIO_01",
    name: "kiosk",
    description: "Mô tả dịch vụ",
    activeStatus: false,
  },
  {
    key: "3",
    code: "KIO_01",
    name: "kiosk",
    description: "Mô tả dịch vụ",
    activeStatus: true,
  },
  {
    key: "4",
    code: "KIO_01",
    name: "kiosk",
    description: "Mô tả dịch vụ",
    activeStatus: true,
  },
  {
    key: "5",
    code: "KIO_01",
    name: "kiosk",
    description: "Mô tả dịch vụ",
    activeStatus: false,
  },
  {
    key: "6",
    code: "KIO_01",
    name: "kiosk",
    description: "Mô tả dịch vụ",
    activeStatus: false,
  },
];

const Services = () => {
  const { Title } = Typography;
  const { RangePicker } = DatePicker;
  const [filteredData, setFilteredData] = useState(data);

  const handleActiveStatus = (value: string) => {
    let filteredData: DataType[] = [];
    if (value === "Tất cả") {
      filteredData = data;
    } else {
      filteredData = data.filter(
        (item) => item.activeStatus === (value === "Hoạt động" ? true : false)
      );
    }
    setFilteredData(filteredData);
  };

  const handleSearch = (searchText: string) => {
    const newData = _.filter(data, (item) => {
      return _.includes(
        (item.code + item.name + item.description).toLowerCase(),
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
            Quản lý dịch vụ
          </Title>
          <Row gutter={24}>
            <Col span={6}>
              <div>Trạng thái hoạt động</div>
              <Select
                defaultValue="Tất cả"
                size="large"
                onChange={handleActiveStatus}
                suffixIcon={<CaretDownOutlined />}
                options={activeStatusSelect}
              />
            </Col>
            <Col span={6}>
              <div>Chọn thời gian</div>
              <RangePicker size="large" suffixIcon={calendar} />
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

export default Services;
