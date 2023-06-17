import { CaretDownOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row, Select, Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import _ from "lodash";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  activeStatusSelect,
  connectionStatusSelect,
} from "../../components/configs/SelectConfigs";
import { add } from "../../components/icon/icon";
import { DeviceType, getDevice } from "../../store/reducer/deviceReducer";
import { useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";

const columns: ColumnsType<DeviceType> = [
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
    dataIndex: "usedService",
    key: "usedService",
    render: (usedService) => {
      const link = `/thiet-bi/danh-sach-thiet-bi/chi-tiet`;
      const services = usedService.join(", ");
      return (
        <div>
          {services.length > 20 ? services.slice(0, 20) + "..." : services}
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
    render: (record) => (
      <a href={`/thiet-bi/danh-sach-thiet-bi/chi-tiet/${record.id}`}>
        Chi tiết
      </a>
    ),
  },
  {
    title: " ",
    key: "update",
    align: "center",
    render: (record) => (
      <a href={`/thiet-bi/danh-sach-thiet-bi/chi-tiet/cap-nhat/${record.id}`}>
        Cập nhật
      </a>
    ),
  },
];

const Devices = () => {
  const { Title } = Typography;
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();
  const data = useSelector((state: any) => state.device.devices);
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    dispatch(getDevice()).finally(() => setLoading(false));
    setFilteredData(data);
  }, [dispatch, data]);

  const handleActiveStatus = (value: string) => {
    let filteredData: DeviceType[] = [];
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

  const handleConnectionStatus = (value: string) => {
    let filteredData: DeviceType[] = [];
    if (value === "Tất cả") {
      filteredData = data;
    } else {
      filteredData = data.filter(
        (item: { connectionStatus: boolean }) =>
          item.connectionStatus === (value === "Kết nối" ? true : false)
      );
    }
    setFilteredData(filteredData);
  };

  const handleSearch = (searchText: string) => {
    const newData = _.filter(data, (item) => {
      return _.includes(
        (
          item.deviceCode +
          item.deviceName +
          item.ipAddress +
          item.usedService
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
                options={activeStatusSelect}
              />
            </Col>
            <Col span={6}>
              <div>Trạng thái kết nối</div>
              <Select
                defaultValue="Tất cả"
                size="large"
                onChange={handleConnectionStatus}
                suffixIcon={<CaretDownOutlined />}
                options={connectionStatusSelect}
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
          <Table
            key={filteredData.map((item: any) => item.id).join(",")}
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

export default Devices;
