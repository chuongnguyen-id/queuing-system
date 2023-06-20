/* eslint-disable jsx-a11y/anchor-is-valid */
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
import { activeStatusSelect } from "../../components/configs/SelectConfigs";
import { ServiceType, getService } from "../../store/reducer/serviceReducer";
import { useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";

const columns: ColumnsType<ServiceType> = [
  {
    title: "Mã dịch vụ",
    dataIndex: "serviceCode",
    key: "serviceCode",
  },
  {
    title: "Tên thiết bị",
    dataIndex: "serviceName",
    key: "serviceName",
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    key: "description",
    width: "500px",
    // render: (des) => {
    //   const toggleExpanded = () => {
    //     setExpanded(!expanded);
    //   };

    //   return (
    //     <div>
    //       {expanded ? des : des.slice(0, 70) + "..."}
    //       <div>
    //         <a onClick={toggleExpanded}>{expanded ? "Ẩn" : "Xem thêm"}</a>
    //       </div>
    //     </div>
    //   );
    // },
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
    render: (record) => (
      <a href={`/dich-vu/danh-sach-dich-vu/chi-tiet/${record.id}`}>Chi tiết</a>
    ),
  },
  {
    title: " ",
    key: "update",
    align: "center",
    render: (record) => (
      <a href={`/dich-vu/danh-sach-dich-vu/chi-tiet/cap-nhat/${record.id}`}>
        Cập nhật
      </a>
    ),
  },
];

const Services = () => {
  const { Title } = Typography;
  const { RangePicker } = DatePicker;
  const [loading, setLoading] = useState(true);
  // const [expanded, setExpanded] = useState(false);

  const dispatch = useAppDispatch();
  const data = useSelector((state: any) => state.service.services);
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    dispatch(getService()).finally(() => setLoading(false));
  }, [dispatch]);

  const handleActiveStatus = (value: string) => {
    let filteredData: ServiceType[] = [];
    if (value === "Tất cả") {
      filteredData = data;
    } else {
      filteredData = data.filter(
        (item: { activeStatus: boolean }) =>
          item.activeStatus === (value === "Hoạt động" ? true : false)
      );
    }
    setFilteredData(filteredData);
  };

  const handleSearch = (searchText: string) => {
    const newData = _.filter(data, (item) => {
      return _.includes(
        (item.serviceCode + item.serviceName + item.description).toLowerCase(),
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

export default Services;
