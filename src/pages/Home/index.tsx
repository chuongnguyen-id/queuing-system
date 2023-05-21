import LineChart from "../../components/chart/LineChart";
import {
  ordinalNumber1,
  ordinalNumber2,
  ordinalNumber3,
  ordinalNumber4,
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

const Home = () => {
  const { Title } = Typography;
  return (
    <>
      <div className="layout-content">
        <Title level={3}>Biểu đồ cấp số</Title>
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
                    <Title level={2} className="number">
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
            <Card bordered={false} className="cardbox">
              {/* asdadsd */}
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Home;
