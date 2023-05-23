import LineChart from "../../components/chart/LineChart";
import {
  device,
  ordinalNumber,
  ordinalNumber1,
  ordinalNumber2,
  ordinalNumber3,
  ordinalNumber4,
  service,
} from "./Icon";
import { Card, Col, Row, Typography } from "antd";

const count = [
  {
    title: "Số thứ tự đã cấp",
    number: "4.221",
    persent: "+32,41%",
    icon: ordinalNumber1,
    bnb: "uptext",
  },
  {
    title: "Số thứ tự đã sử dụng",
    number: "3.721",
    persent: "-32,41%",
    icon: ordinalNumber2,
    bnb: "downtext",
  },
  {
    title: "Số thứ tự đang chờ",
    number: "468",
    persent: "+56,41%",
    icon: ordinalNumber3,
    bnb: "uptext",
  },
  {
    title: "Số thứ tự đã bỏ qua",
    number: "32",
    persent: "-22,41%",
    icon: ordinalNumber4,
    bnb: "downtext",
  },
];

const overview = [
  {
    label: "Thiết bị",
    icon: device,
    bnb: "device",
    number: "4.211",
    enable: "3.799",
    disable: "422",
  },
  {
    label: "Dịch vụ",
    icon: service,
    bnb: "service",
    number: "276",
    enable: "210",
    disable: "66",
  },
  {
    label: "Cấp số",
    icon: ordinalNumber,
    bnb: "ordinalnumber",
    number: "4.211",
    used: "3.721",
    waiting: "486",
    skip: "32",
  },
];

const Home = () => {
  const { Title } = Typography;
  return (
    <>
      <div className="layout-content">
        <Title level={2} className="text-orange">
          Biểu đồ cấp số
        </Title>
        <Row gutter={24}>
          <Col span={16}>
            <Row gutter={13}>
              {count.map((item, index) => (
                <Col key={index} span={6}>
                  <Card bordered={false} className="cardbox">
                    <div className="number-title">
                      <span className="icon-box">{item.icon}</span>
                      <span>{item.title}</span>
                    </div>
                    <Title level={1} className="number">
                      {item.number}
                      <small className={item.bnb}>{item.persent}</small>
                    </Title>
                  </Card>
                </Col>
              ))}
            </Row>
            <Row gutter={24}>
              <Col span={24}>
                <Card bordered={false} className="cardbox">
                  <LineChart />
                </Card>
              </Col>
            </Row>
          </Col>
          <Col span={8}>
            <Card bordered={false} className="cardbox-right">
              <Title level={2} className="text-orange">
                Tổng quan
              </Title>
              {overview.map((item, index) => (
                <Card key={index} bordered={false} className="cardbox">
                  <Row align="middle">
                    <Col xs={4}>
                      <div>{item.icon}</div>
                    </Col>
                    <Col xs={8}>
                      <Title level={2}>
                        <div className="number">{item.number}</div>
                        <div className={`${item.bnb} colortext number-title`}>
                          {item.icon}&nbsp;{item.label}
                        </div>
                      </Title>
                    </Col>
                    <Col xs={8} className={`${item.bnb} item`}>
                      {item.enable && <div>Đang hoạt động</div>}
                      {item.disable && <div>Ngưng hoạt động</div>}
                      {item.used && <div>Đã sử dụng</div>}
                      {item.waiting && <div>Đang chờ</div>}
                      {item.skip && <div>Bỏ qua</div>}
                    </Col>
                    <Col xs={4} className={`${item.bnb} colortext`}>
                      {item.enable && <div>{item.enable}</div>}
                      {item.disable && <div>{item.disable}</div>}
                      {item.used && <div>{item.used}</div>}
                      {item.waiting && <div>{item.waiting}</div>}
                      {item.skip && <div>{item.skip}</div>}
                    </Col>
                  </Row>
                </Card>
              ))}
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Home;
