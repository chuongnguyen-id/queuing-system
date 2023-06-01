import {
  Button,
  Card,
  Col,
  DatePicker,
  Descriptions,
  Input,
  Row,
  Select,
  Table,
  Typography,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { back, edit } from "../../components/icon/icon";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { CaretDownOutlined, SearchOutlined } from "@ant-design/icons";
import { calendar } from "../../components/icon/icon";
import _ from "lodash";
import { statusSelect } from "../../components/configs/SelectConfigs";

interface DataType {
  key: string;
  stt: string;
  status: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Số thứ tự",
    dataIndex: "stt",
    key: "stt",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    render: (status) => {
      const color =
        status === "Đã hoàn thành"
          ? "#34CD26"
          : status === "Đang thực hiện"
          ? "#5490EB"
          : "#6C7585";
      return (
        <div>
          <span style={{ color: color }}>●&nbsp;</span>
          {status}
        </div>
      );
    },
  },
];

const data: DataType[] = [
  {
    key: "1",
    stt: "2010001",
    status: "Đã hoàn thành",
  },
  {
    key: "2",
    stt: "2010002",
    status: "Đã hoàn thành",
  },
  {
    key: "3",
    stt: "2010003",
    status: "Đang thực hiện",
  },
  {
    key: "4",
    stt: "2010004",
    status: "Vắng",
  },
  {
    key: "5",
    stt: "2010005",
    status: "Đã hoàn thành",
  },
  {
    key: "6",
    stt: "2010006",
    status: "Đang thực hiện",
  },
];

const ServiceInfo = () => {
  const { Title } = Typography;
  const { RangePicker } = DatePicker;
  const [filteredData, setFilteredData] = useState(data);
  const navigate = useNavigate();

  const handleStatus = (value: string) => {
    let filteredData: DataType[] = [];
    if (value === "Tất cả") {
      filteredData = data;
    } else {
      filteredData = data.filter((item) => item.status === value);
    }
    setFilteredData(filteredData);
  };

  const handleSearch = (searchText: string) => {
    const newData = _.filter(data, (item) => {
      return _.includes(item.stt.toLowerCase(), searchText.toLowerCase());
    });

    setFilteredData(newData);
  };

  const onCancel = (event: any) => {
    event.preventDefault();
    navigate(-1);
  };

  return (
    <>
      <div className="layout-content">
        <div className="layout-table">
          <Title level={2} className="text-orange">
            Quản lý dịch vụ
          </Title>
          <Button className="popup-button">
            <Link to="/dich-vu/danh-sach-dich-vu/chi-tiet/cap-nhat">
              <div>{edit}</div>
              <div>Cập nhật danh sách</div>
            </Link>
          </Button>
          <Button
            className="popup-button"
            style={{ marginTop: "100px" }}
            onClick={onCancel}
          >
            <div>{back}</div>
            <div>Quay lại</div>
          </Button>
          <Row gutter={24}>
            <Col span={8}>
              <Card className="fullheight-card">
                <Title level={3} className="text-orange">
                  Thông tin thiết bị
                </Title>
                <Descriptions column={1}>
                  <Descriptions.Item label="Mã dịch vụ">201</Descriptions.Item>
                  <Descriptions.Item label="Tên dịch vụ">
                    Khám tim mạch
                  </Descriptions.Item>
                  <Descriptions.Item label="Mô tả">
                    Chuyên các bệnh lý về tim
                  </Descriptions.Item>
                </Descriptions>

                <Title level={3} className="text-orange">
                  Quy tắc cấp số
                </Title>
                <Descriptions column={1} className="inline-items">
                  <Descriptions.Item
                    label="Tăng tự động từ"
                    labelStyle={{ alignItems: "center" }}
                  >
                    <Input size="large" defaultValue={"0001"} />
                    đến
                    <Input size="large" defaultValue={"9999"} />
                  </Descriptions.Item>
                  <Descriptions.Item
                    label="Prefix"
                    labelStyle={{ alignItems: "center" }}
                  >
                    <Input size="large" defaultValue={"0001"} />
                  </Descriptions.Item>
                </Descriptions>
                <Descriptions layout="vertical">
                  <Descriptions.Item label="Reset mỗi ngày">
                    Ví dụ: 201-2001
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
            <Col span={16}>
              <Card className="fullheight-card">
                <Row gutter={12}>
                  <Col span={6}>
                    <div>Trạng thái</div>
                    <Select
                      defaultValue="Tất cả"
                      size="large"
                      onChange={handleStatus}
                      suffixIcon={<CaretDownOutlined />}
                      options={statusSelect}
                    />
                  </Col>
                  <Col span={10}>
                    <div>Chọn thời gian</div>
                    <RangePicker size="large" suffixIcon={calendar} />
                  </Col>
                  <Col span={8}>
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
                <Table columns={columns} dataSource={filteredData} bordered />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default ServiceInfo;
