import { Table, Col, Row, Button, DatePicker } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { download, calendar } from "../../components/icon/icon";
import { useEffect, useState } from "react";
import moment from "moment";

interface DataType {
  key: string;
  stt: string;
  name: string;
  issueDate: Date;
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
    title: "Thời gian cấp",
    dataIndex: "issueDate",
    key: "issueDate",
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
];

const data: DataType[] = [
  {
    key: "1",
    stt: "2010001",
    name: "Lê Huỳnh Ái Vân",
    issueDate: new Date("2023/05/01 15:56"),
    status: "Đang chờ",
    source: "Kiosk",
  },
  {
    key: "2",
    stt: "2010001",
    name: "Lê Huỳnh Ái Vân",
    issueDate: new Date("2023/05/06 15:56"),
    status: "Đang chờ",
    source: "Hệ thống",
  },
  {
    key: "3",
    stt: "2010001",
    name: "Lê Huỳnh Ái Vân",
    issueDate: new Date("2023/05/10 15:56"),
    status: "Đã sử dụng",
    source: "Kiosk",
  },
  {
    key: "4",
    stt: "2010001",
    name: "Lê Huỳnh Ái Vân",
    issueDate: new Date("2023/05/10 15:56"),
    status: "Bỏ qua",
    source: "Kiosk",
  },
  {
    key: "5",
    stt: "2010001",
    name: "Lê Huỳnh Ái Vân",
    issueDate: new Date("2023/05/10 15:56"),
    status: "Đã sử dụng",
    source: "Kiosk",
  },
];

const Reports = () => {
  const { RangePicker } = DatePicker;

  const [filteredData, setFilteredData] = useState(data);
  const [selectedDateRange, setSelectedDateRange] = useState(undefined);

  const handleRangeChange = (dates: any, dateStrings: [string, string]) => {
    setSelectedDateRange(dates);
    const filtered = data.filter((item) =>
      moment(item.issueDate).isBetween(dateStrings[0], dateStrings[1])
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
          <Row gutter={24}>
            <Col span={6}>
              <div>Chọn thời gian</div>
              <RangePicker
                size="large"
                suffixIcon={calendar}
                onChange={handleRangeChange}
              />
            </Col>
          </Row>
          <Button className="popup-button">
            <Link to="/cap-so/danh-sach-cap-so/cap-so-moi">
              <div>{download}</div>
              <div>Tải về</div>
            </Link>
          </Button>
          <Table columns={columns} dataSource={filteredData} bordered />
        </div>
      </div>
    </>
  );
};

export default Reports;
