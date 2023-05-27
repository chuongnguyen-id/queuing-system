import { Typography, Table, Select, Col, Row, Input, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { CaretDownOutlined, SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

interface DataType {
  key: string;
  deviceCode: string;
  deviceName: string;
  ipAddress: string;
  activeStatus: boolean;
  connectionStatus: boolean;
  serviceUsed: string;
}

const add = [
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
    <path
      d="M18.8884 2.33301H9.11171C4.86504 2.33301 2.33337 4.86467 2.33337 9.11134V18.8763C2.33337 23.1347 4.86504 25.6663 9.11171 25.6663H18.8767C23.1234 25.6663 25.655 23.1347 25.655 18.888V9.11134C25.6667 4.86467 23.135 2.33301 18.8884 2.33301ZM18.6667 14.8747H14.875V18.6663C14.875 19.1447 14.4784 19.5413 14 19.5413C13.5217 19.5413 13.125 19.1447 13.125 18.6663V14.8747H9.33337C8.85504 14.8747 8.45837 14.478 8.45837 13.9997C8.45837 13.5213 8.85504 13.1247 9.33337 13.1247H13.125V9.33301C13.125 8.85467 13.5217 8.45801 14 8.45801C14.4784 8.45801 14.875 8.85467 14.875 9.33301V13.1247H18.6667C19.145 13.1247 19.5417 13.5213 19.5417 13.9997C19.5417 14.478 19.145 14.8747 18.6667 14.8747Z"
      fill="#FF9138"
    />
  </svg>,
];

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
      const link = `https://www.example.com/service/${serviceUsed}`;
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
    render: () => <a href={""}>Chi tiết</a>,
  },
  {
    title: " ",
    key: "update",
    render: () => <a href={""}>Cập nhật</a>,
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
