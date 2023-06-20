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
import {
  dateStatusSelect,
  serviceSelect,
  sourceSelect,
} from "../../components/configs/SelectConfigs";
import { CaretDownOutlined, SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { add, calendar } from "../../components/icon/icon";
import { useEffect, useState } from "react";
import _ from "lodash";
import moment from "moment";
import {
  OrdinalNumberType,
  getOrdinalNumber,
} from "../../store/reducer/ordinalNumberReducer";
import { useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";

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
    title: "Tên dịch vụ",
    dataIndex: "service",
    key: "service",
  },
  {
    title: "Thời gian cấp",
    dataIndex: "issueDate",
    key: "issueDate",
    render: (date) => moment(date).format("HH:mm - DD/MM/YYYY"),
  },
  {
    title: "Hạn sử dụng",
    dataIndex: "expirationDate",
    key: "expirationDate",
    render: (date) => moment(date).format("HH:mm - DD/MM/YYYY"),
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
  {
    title: " ",
    key: "detail",
    align: "center",
    render: (record) => (
      <a href={`/cap-so/danh-sach-cap-so/chi-tiet/${record.id}`}>Chi tiết</a>
    ),
  },
];

const OrdinalNumbers = () => {
  const { Title } = Typography;
  const { RangePicker } = DatePicker;

  const dispatch = useAppDispatch();
  const data = useSelector((state: any) => state.ordinalNumber.ordinalNumbers);
  const [filteredData, setFilteredData] = useState(data);
  const [loading, setLoading] = useState(true);
  const [selectedDateRange, setSelectedDateRange] = useState(undefined);

  useEffect(() => {
    dispatch(getOrdinalNumber()).finally(() => setLoading(false));
  }, [dispatch]);

  const handleService = (value: string) => {
    let filteredData: OrdinalNumberType[] = [];
    if (value === "Tất cả") {
      filteredData = data;
    } else {
      filteredData = data.filter(
        (item: { service: string }) => item.service === value
      );
    }
    setFilteredData(filteredData);
  };

  const handleStatus = (value: string) => {
    let filteredData: OrdinalNumberType[] = [];
    if (value === "Tất cả") {
      filteredData = data;
    } else {
      filteredData = data.filter(
        (item: { dateStatus: string }) => item.dateStatus === value
      );
    }
    setFilteredData(filteredData);
  };

  const handleSource = (value: string) => {
    let filteredData: OrdinalNumberType[] = [];
    if (value === "Tất cả") {
      filteredData = data;
    } else {
      filteredData = data.filter(
        (item: { source: string }) => item.source === value
      );
    }
    setFilteredData(filteredData);
  };

  const handleSearch = (searchText: string) => {
    const newData = _.filter(data, (item) => {
      return _.includes(
        (item.fullname + item.service + item.source).toLowerCase(),
        searchText.toLowerCase()
      );
    });

    setFilteredData(newData);
  };

  const handleRangeChange = (dates: any, dateStrings: [string, string]) => {
    setSelectedDateRange(dates);
    const filtered = data.filter(
      (item: {
        issueDate: moment.MomentInput;
        expirationDate: moment.MomentInput;
      }) =>
        moment(item.issueDate).isBetween(dateStrings[0], dateStrings[1]) &&
        moment(item.expirationDate).isBetween(dateStrings[0], dateStrings[1])
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
          <Title level={2} className="text-orange">
            Quản lý dịch vụ
          </Title>
          <Row gutter={24}>
            <Col span={4}>
              <div>Tên dịch vụ</div>
              <Select
                defaultValue="Tất cả"
                size="large"
                onChange={handleService}
                suffixIcon={<CaretDownOutlined />}
                options={serviceSelect}
              />
            </Col>
            <Col span={4}>
              <div>Tình trạng</div>
              <Select
                defaultValue="Tất cả"
                size="large"
                onChange={handleStatus}
                suffixIcon={<CaretDownOutlined />}
                options={dateStatusSelect}
              />
            </Col>
            <Col span={4}>
              <div>Nguồn cấp</div>
              <Select
                defaultValue="Tất cả"
                size="large"
                onChange={handleSource}
                suffixIcon={<CaretDownOutlined />}
                options={sourceSelect}
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
            <Col span={6}>
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
            <Link to="/cap-so/danh-sach-cap-so/cap-so-moi">
              <div>{add}</div>
              <div>Cấp số mới</div>
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

export default OrdinalNumbers;
