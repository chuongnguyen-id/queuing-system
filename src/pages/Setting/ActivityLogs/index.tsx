import { Typography, Table, Col, Row, Input, DatePicker } from "antd";
import type { ColumnsType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
import { calendar } from "../../../components/icon/icon";
import { useEffect, useState } from "react";
import _ from "lodash";
import moment from "moment";
import { useAppDispatch } from "../../../store/store";
import { useSelector } from "react-redux";
import { LogType, getLog } from "../../../store/reducer/logReducer";

const columns: ColumnsType<LogType> = [
  {
    title: "Tên đăng nhập",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Thời gian tác động",
    dataIndex: "timestamp",
    key: "timestamp",
    render: (date) => moment(date).format("DD/MM/YYYY - HH:mm:ss"),
  },
  {
    title: "IP thực hiện",
    dataIndex: "ipAddress",
    key: "ipAddress",
  },
  {
    title: "Thao tác thực hiện",
    dataIndex: "operation",
    key: "operation",
  },
];

const ActivityLogs = () => {
  const { Title } = Typography;
  const { RangePicker } = DatePicker;

  const dispatch = useAppDispatch();
  const data = useSelector((state: any) => state.log.logs);
  const [filteredData, setFilteredData] = useState(data);
  const [selectedDateRange, setSelectedDateRange] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getLog()).finally(() => setLoading(false));
  }, [dispatch]);

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
    const filtered = data.filter((item: { activeTime: moment.MomentInput }) =>
      moment(item.activeTime).isBetween(dateStrings[0], dateStrings[1])
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

export default ActivityLogs;
