import { Table, Col, Row, Button, DatePicker } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { download, calendar } from "../../components/icon/icon";
import { useEffect, useState } from "react";
import moment from "moment";
import { useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";
import {
  OrdinalNumberType,
  getOrdinalNumber,
} from "../../store/reducer/ordinalNumberReducer";

const columns: ColumnsType<OrdinalNumberType> = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
  },
  {
    title: "Tên khách hàng",
    dataIndex: "fullname",
    key: "fullname",
  },
  {
    title: "Thời gian cấp",
    dataIndex: "issueDate",
    key: "issueDate",
    render: (date) => moment(date).format("HH:mm - YYYY/MM/DD"),
  },
  {
    title: "Trạng thái",
    dataIndex: "dateStatus",
    key: "dateStatus",
    render: (dateStatus) => {
      const color =
        dateStatus === "Đang chờ"
          ? "#4277FF"
          : dateStatus === "Đã sử dụng"
          ? "#7E7D88"
          : "#E73F3F";
      return (
        <div>
          <span style={{ color: color }}>●&nbsp;</span>
          {dateStatus}
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
//   {
//     key: "1",
//     stt: "2010001",
//     name: "Lê Huỳnh Ái Vân",
//     issueDate: new Date("2023/05/01 15:56"),
//     status: "Đang chờ",
//     source: "Kiosk",
//   },
//   {
//     key: "2",
//     stt: "2010001",
//     name: "Lê Huỳnh Ái Vân",
//     issueDate: new Date("2023/05/06 15:56"),
//     status: "Đang chờ",
//     source: "Hệ thống",
//   },
//   {
//     key: "3",
//     stt: "2010001",
//     name: "Lê Huỳnh Ái Vân",
//     issueDate: new Date("2023/05/10 15:56"),
//     status: "Đã sử dụng",
//     source: "Kiosk",
//   },
//   {
//     key: "4",
//     stt: "2010001",
//     name: "Lê Huỳnh Ái Vân",
//     issueDate: new Date("2023/05/10 15:56"),
//     status: "Bỏ qua",
//     source: "Kiosk",
//   },
//   {
//     key: "5",
//     stt: "2010001",
//     name: "Lê Huỳnh Ái Vân",
//     issueDate: new Date("2023/05/10 15:56"),
//     status: "Đã sử dụng",
//     source: "Kiosk",
//   },
// ];

const Reports = () => {
  const { RangePicker } = DatePicker;

  const dispatch = useAppDispatch();
  const data = useSelector((state: any) => state.ordinalNumber.ordinalNumbers);
  const [filteredData, setFilteredData] = useState(data);
  const [loading, setLoading] = useState(true);
  const [selectedDateRange, setSelectedDateRange] = useState(undefined);

  useEffect(() => {
    dispatch(getOrdinalNumber()).finally(() => setLoading(false));
  }, [dispatch]);

  const handleRangeChange = (dates: any, dateStrings: [string, string]) => {
    setSelectedDateRange(dates);
    const filtered = data.filter((item: { issueDate: moment.MomentInput }) =>
      moment(item.issueDate).isBetween(dateStrings[0], dateStrings[1])
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    if (!selectedDateRange) {
      setFilteredData(data);
    }
  }, [data, selectedDateRange]);

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

export default Reports;
