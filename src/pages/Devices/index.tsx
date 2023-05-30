import { Typography, Table, Select, Col, Row, Input, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { CaretDownOutlined, SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { add } from "../../components/icon/icon";
import { useState } from "react";
import _ from "lodash";

interface DataType {
  key: string;
  code: string;
  name: string;
  ipAddress: string;
  activeStatus: boolean;
  connectionStatus: boolean;
  serviceUsed: string;
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
    title: "Địa chỉ IP",
    dataIndex: "ipAddress",
    key: "ipAddress",
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
    title: "Trạng thái kết nối",
    dataIndex: "connectionStatus",
    key: "connectionStatus",
    render: (activeStatus) => {
      const color = activeStatus ? "#34CD26" : "#EC3740";
      const text = activeStatus ? "Kết nối" : "Mất kết nối";
      return (
        <div>
          <span style={{ color: color }}>●&nbsp;</span>
          {text}
        </div>
      );
    },
  },
  {
    title: "Dịch vụ sử dụng",
    dataIndex: "serviceUsed",
    key: "serviceUsed",
    render: (serviceUsed) => {
      // const link = `https://www.example.com/service/${serviceUsed}`;
      const link = `/thiet-bi/danh-sach-thiet-bi/chi-tiet-thiet-bi`;
      return (
        <div>
          {serviceUsed.length > 20
            ? serviceUsed.slice(0, 20) + "..."
            : serviceUsed}
          <div>
            <a href={link}>Xem thêm</a>
          </div>
        </div>
      );
    },
  },
  {
    title: " ",
    key: "detail",
    align: "center",
    render: () => (
      <a href={"/thiet-bi/danh-sach-thiet-bi/chi-tiet-thiet-bi"}>Chi tiết</a>
    ),
  },
  {
    title: " ",
    key: "update",
    align: "center",
    render: () => (
      <a
        href={
          "/thiet-bi/danh-sach-thiet-bi/chi-tiet-thiet-bi/cap-nhat-thiet-bi"
        }
      >
        Cập nhật
      </a>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    code: "KIO_01",
    name: "kiosk",
    ipAddress: "192.168.1.10",
    activeStatus: false,
    connectionStatus: true,
    serviceUsed:
      "Khám tim mạch, Khám Sản - Phụ khoa, Khám răng hàm mặt, Khám tai mũi họng, Khám hô hấp, Khám tổng quát",
  },
  {
    key: "2",
    code: "KIO_01",
    name: "kiosk",
    ipAddress: "192.168.1.10",
    activeStatus: true,
    connectionStatus: false,
    serviceUsed:
      "Khám tim mạch, Khám Sản - Phụ khoa, Khám răng hàm mặt, Khám tai mũi họng, Khám hô hấp, Khám tổng quát",
  },
  {
    key: "3",
    code: "KIO_01",
    name: "kiosk",
    ipAddress: "192.168.1.10",
    activeStatus: true,
    connectionStatus: true,
    serviceUsed:
      "Khám tim mạch, Khám Sản - Phụ khoa, Khám răng hàm mặt, Khám tai mũi họng, Khám hô hấp, Khám tổng quát",
  },
  {
    key: "4",
    code: "KIO_01",
    name: "kiosk",
    ipAddress: "192.168.1.10",
    activeStatus: false,
    connectionStatus: true,
    serviceUsed:
      "Khám tim mạch, Khám Sản - Phụ khoa, Khám răng hàm mặt, Khám tai mũi họng, Khám hô hấp, Khám tổng quát",
  },
  {
    key: "5",
    code: "KIO_01",
    name: "kiosk",
    ipAddress: "192.168.1.10",
    activeStatus: false,
    connectionStatus: true,
    serviceUsed:
      "Khám tim mạch, Khám Sản - Phụ khoa, Khám răng hàm mặt, Khám tai mũi họng, Khám hô hấp, Khám tổng quát",
  },
  {
    key: "6",
    code: "KIO_01",
    name: "kiosk",
    ipAddress: "192.168.1.10",
    activeStatus: true,
    connectionStatus: false,
    serviceUsed:
      "Khám tim mạch, Khám Sản - Phụ khoa, Khám răng hàm mặt, Khám tai mũi họng, Khám hô hấp, Khám tổng quát",
  },
  {
    key: "7",
    code: "KIO_01",
    name: "kiosk",
    ipAddress: "192.168.1.10",
    activeStatus: true,
    connectionStatus: true,
    serviceUsed:
      "Khám tim mạch, Khám Sản - Phụ khoa, Khám răng hàm mặt, Khám tai mũi họng, Khám hô hấp, Khám tổng quát",
  },
  {
    key: "8",
    code: "KIO_01",
    name: "kiosk",
    ipAddress: "192.168.1.10",
    activeStatus: false,
    connectionStatus: true,
    serviceUsed:
      "Khám tim mạch, Khám Sản - Phụ khoa, Khám răng hàm mặt, Khám tai mũi họng, Khám hô hấp, Khám tổng quát",
  },
  {
    key: "9",
    code: "KIO_01",
    name: "kiosk",
    ipAddress: "192.168.1.10",
    activeStatus: false,
    connectionStatus: true,
    serviceUsed:
      "Khám tim mạch, Khám Sản - Phụ khoa, Khám răng hàm mặt, Khám tai mũi họng, Khám hô hấp, Khám tổng quát",
  },
  {
    key: "10",
    code: "KIO_01",
    name: "kiosk",
    ipAddress: "192.168.1.10",
    activeStatus: true,
    connectionStatus: false,
    serviceUsed:
      "Khám tim mạch, Khám Sản - Phụ khoa, Khám răng hàm mặt, Khám tai mũi họng, Khám hô hấp, Khám tổng quát",
  },
  {
    key: "11",
    code: "KIO_01",
    name: "kiosk",
    ipAddress: "192.168.1.10",
    activeStatus: true,
    connectionStatus: true,
    serviceUsed:
      "Khám tim mạch, Khám Sản - Phụ khoa, Khám răng hàm mặt, Khám tai mũi họng, Khám hô hấp, Khám tổng quát",
  },
  {
    key: "12",
    code: "KIO_01",
    name: "kiosk",
    ipAddress: "192.168.1.10",
    activeStatus: false,
    connectionStatus: true,
    serviceUsed:
      "Khám tim mạch, Khám Sản - Phụ khoa, Khám răng hàm mặt, Khám tai mũi họng, Khám hô hấp, Khám tổng quát",
  },
];

const Devices = () => {
  const { Title } = Typography;
  const [filteredData, setFilteredData] = useState(data);

  const handleActiveStatus = (value: string) => {
    let filteredData: DataType[] = [];
    if (value === "all") {
      filteredData = data;
    } else {
      filteredData = data.filter(
        (item) => item.activeStatus === (value === "enable" ? true : false)
      );
    }
    setFilteredData(filteredData);
  };

  const handleConnectionStatus = (value: string) => {
    let filteredData: DataType[] = [];
    if (value === "all") {
      filteredData = data;
    } else {
      filteredData = data.filter(
        (item) => item.connectionStatus === (value === "connect" ? true : false)
      );
    }
    setFilteredData(filteredData);
  };

  const handleSearch = (searchText: string) => {
    const newData = _.filter(data, (item) => {
      return _.includes(
        (
          item.code +
          item.name +
          item.ipAddress +
          item.serviceUsed
        ).toLowerCase(),
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
            Danh sách thiết bị
          </Title>
          <Row gutter={24}>
            <Col span={6}>
              <div>Trạng thái hoạt động</div>
              <Select
                defaultValue="Tất cả"
                size="large"
                onChange={handleActiveStatus}
                suffixIcon={<CaretDownOutlined />}
                options={[
                  { value: "all", label: "Tất cả" },
                  { value: "enable", label: "Hoạt động" },
                  { value: "disable", label: "Ngưng hoạt động" },
                ]}
              />
            </Col>
            <Col span={6}>
              <div>Trạng thái kết nối</div>
              <Select
                defaultValue="Tất cả"
                size="large"
                onChange={handleConnectionStatus}
                suffixIcon={<CaretDownOutlined />}
                options={[
                  { value: "all", label: "Tất cả" },
                  { value: "connect", label: "Kết nối" },
                  { value: "disconnect", label: "Mất kết nối" },
                ]}
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
            <Link to="/thiet-bi/danh-sach-thiet-bi/them-thiet-bi">
              <div>{add}</div>
              <div>Thêm thiết bị</div>
            </Link>
          </Button>
          <Table columns={columns} dataSource={filteredData} bordered />
        </div>
      </div>
    </>
  );
};

export default Devices;
