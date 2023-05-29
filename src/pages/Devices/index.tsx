import { Typography, Table, Select, Col, Row, Input, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { CaretDownOutlined, SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { add } from "../../components/icon/icon";

interface DataType {
  key: string;
  deviceCode: string;
  deviceName: string;
  ipAddress: string;
  activeStatus: boolean;
  connectionStatus: boolean;
  serviceUsed: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Mã thiết bị",
    dataIndex: "deviceCode",
    key: "deviceCode",
  },
  {
    title: "Tên thiết bị",
    dataIndex: "deviceName",
    key: "deviceName",
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
    render: () => (
      <a href={"/thiet-bi/danh-sach-thiet-bi/chi-tiet-thiet-bi"}>Chi tiết</a>
    ),
  },
  {
    title: " ",
    key: "update",
    render: () => (
      <a href={"/thiet-bi/danh-sach-thiet-bi/cap-nhat-thiet-bi"}>Cập nhật</a>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    deviceCode: "KIO_01",
    deviceName: "kiosk",
    ipAddress: "192.168.1.10",
    activeStatus: false,
    connectionStatus: true,
    serviceUsed:
      "Khám tim mạch, Khám Sản - Phụ khoa, Khám răng hàm mặt, Khám tai mũi họng, Khám hô hấp, Khám tổng quát",
  },
  {
    key: "2",
    deviceCode: "KIO_01",
    deviceName: "kiosk",
    ipAddress: "192.168.1.10",
    activeStatus: true,
    connectionStatus: false,
    serviceUsed:
      "Khám tim mạch, Khám Sản - Phụ khoa, Khám răng hàm mặt, Khám tai mũi họng, Khám hô hấp, Khám tổng quát",
  },
  {
    key: "3",
    deviceCode: "KIO_01",
    deviceName: "kiosk",
    ipAddress: "192.168.1.10",
    activeStatus: true,
    connectionStatus: true,
    serviceUsed:
      "Khám tim mạch, Khám Sản - Phụ khoa, Khám răng hàm mặt, Khám tai mũi họng, Khám hô hấp, Khám tổng quát",
  },
  {
    key: "4",
    deviceCode: "KIO_01",
    deviceName: "kiosk",
    ipAddress: "192.168.1.10",
    activeStatus: false,
    connectionStatus: true,
    serviceUsed:
      "Khám tim mạch, Khám Sản - Phụ khoa, Khám răng hàm mặt, Khám tai mũi họng, Khám hô hấp, Khám tổng quát",
  },
  {
    key: "5",
    deviceCode: "KIO_01",
    deviceName: "kiosk",
    ipAddress: "192.168.1.10",
    activeStatus: false,
    connectionStatus: true,
    serviceUsed:
      "Khám tim mạch, Khám Sản - Phụ khoa, Khám răng hàm mặt, Khám tai mũi họng, Khám hô hấp, Khám tổng quát",
  },
  {
    key: "6",
    deviceCode: "KIO_01",
    deviceName: "kiosk",
    ipAddress: "192.168.1.10",
    activeStatus: true,
    connectionStatus: false,
    serviceUsed:
      "Khám tim mạch, Khám Sản - Phụ khoa, Khám răng hàm mặt, Khám tai mũi họng, Khám hô hấp, Khám tổng quát",
  },
  {
    key: "7",
    deviceCode: "KIO_01",
    deviceName: "kiosk",
    ipAddress: "192.168.1.10",
    activeStatus: true,
    connectionStatus: true,
    serviceUsed:
      "Khám tim mạch, Khám Sản - Phụ khoa, Khám răng hàm mặt, Khám tai mũi họng, Khám hô hấp, Khám tổng quát",
  },
  {
    key: "8",
    deviceCode: "KIO_01",
    deviceName: "kiosk",
    ipAddress: "192.168.1.10",
    activeStatus: false,
    connectionStatus: true,
    serviceUsed:
      "Khám tim mạch, Khám Sản - Phụ khoa, Khám răng hàm mặt, Khám tai mũi họng, Khám hô hấp, Khám tổng quát",
  },
  {
    key: "9",
    deviceCode: "KIO_01",
    deviceName: "kiosk",
    ipAddress: "192.168.1.10",
    activeStatus: false,
    connectionStatus: true,
    serviceUsed:
      "Khám tim mạch, Khám Sản - Phụ khoa, Khám răng hàm mặt, Khám tai mũi họng, Khám hô hấp, Khám tổng quát",
  },
  {
    key: "10",
    deviceCode: "KIO_01",
    deviceName: "kiosk",
    ipAddress: "192.168.1.10",
    activeStatus: true,
    connectionStatus: false,
    serviceUsed:
      "Khám tim mạch, Khám Sản - Phụ khoa, Khám răng hàm mặt, Khám tai mũi họng, Khám hô hấp, Khám tổng quát",
  },
  {
    key: "11",
    deviceCode: "KIO_01",
    deviceName: "kiosk",
    ipAddress: "192.168.1.10",
    activeStatus: true,
    connectionStatus: true,
    serviceUsed:
      "Khám tim mạch, Khám Sản - Phụ khoa, Khám răng hàm mặt, Khám tai mũi họng, Khám hô hấp, Khám tổng quát",
  },
  {
    key: "12",
    deviceCode: "KIO_01",
    deviceName: "kiosk",
    ipAddress: "192.168.1.10",
    activeStatus: false,
    connectionStatus: true,
    serviceUsed:
      "Khám tim mạch, Khám Sản - Phụ khoa, Khám răng hàm mặt, Khám tai mũi họng, Khám hô hấp, Khám tổng quát",
  },
];

const Devices = () => {
  const { Title } = Typography;

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
                // onChange={handleChange}
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
                // onChange={handleChange}
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
          <Table columns={columns} dataSource={data} bordered />
        </div>
      </div>
    </>
  );
};

export default Devices;
