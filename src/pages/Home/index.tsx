import { useEffect, useState } from "react";
import LineChart from "../../components/chart/LineChart";
import RadialBarChart from "../../components/chart/RadialBarChart";
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
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";
import { getOrdinalNumber } from "../../store/reducer/ordinalNumberReducer";
import { getDevice } from "../../store/reducer/deviceReducer";
import { getService } from "../../store/reducer/serviceReducer";

const Home = () => {
  const { Title } = Typography;
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const ordinalNumberData = useSelector(
    (state: any) => state.ordinalNumber.ordinalNumbers
  );
  const deviceData = useSelector((state: any) => state.device.devices);
  const serviceData = useSelector((state: any) => state.service.services);

  // OrdinalNumber
  const ordinalNumberCount = ordinalNumberData.length;
  const usedCount = ordinalNumberData.filter(
    (item: any) => item.dateStatus === "Đã sử dụng"
  ).length;
  const waitingCount = ordinalNumberData.filter(
    (item: any) => item.dateStatus === "Đang chờ"
  ).length;
  const skippedCount = ordinalNumberData.filter(
    (item: any) => item.dateStatus === "Bỏ qua"
  ).length;
  //   (acc: { [x: string]: number }, item: { issueDate: Date }) => {
  //     const date = new Date(item.issueDate).toLocaleDateString();
  //     if (!acc[date]) {
  //       acc[date] = 0;
  //     }
  //     acc[date]++;
  //     return acc;
  //   },
  //   {}
  // );
  // const countByWeek = ordinalNumberData.reduce(
  //   (acc: { [x: string]: number }, item: { issueDate: Date }) => {
  //     const date = moment(item.issueDate, "YYYY-MM-DD").week();
  //     if (!acc[date]) {
  //       acc[date] = 0;
  //     }
  //     acc[date]++;
  //     return acc;
  //   },
  //   {}
  // );
  // const countByMonth = ordinalNumberData.reduce(
  //   (acc: { [x: string]: number }, item: { issueDate: Date }) => {
  //     const date = new Date(item.issueDate);
  //     const month = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}`;
  //     if (!acc[month]) {
  //       acc[month] = 0;
  //     }
  //     acc[month]++;
  //     return acc;
  //   },
  //   {}
  // );

  const countByDay = ordinalNumberData.reduce((acc: any, cur: any) => {
    const issueDate = new Date(cur.issueDate);
    const day = issueDate.getDate();
    if (!acc[day]) {
      acc[day] = 0;
    }
    acc[day]++;
    return acc;
  }, {});
  const daysInMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  ).getDate();
  for (let i = 1; i <= daysInMonth; i++) {
    if (!countByDay[i]) {
      countByDay[i] = 0;
    }
  }

  const countByWeek = ordinalNumberData.reduce((acc: any, cur: any) => {
    const issueDate = new Date(cur.issueDate);
    const day = issueDate.getDate();
    const week = Math.ceil(day / 7);
    if (!acc[week]) {
      acc[week] = 0;
    }
    acc[week]++;
    return acc;
  }, {});
  for (let i = 1; i <= 4; i++) {
    if (!countByWeek[i]) {
      countByWeek[i] = 0;
    }
  }

  const countByMonth = ordinalNumberData.reduce((acc: any, cur: any) => {
    const issueDate = new Date(cur.issueDate);
    const month = issueDate.getMonth() + 1;
    if (!acc[month]) {
      acc[month] = 0;
    }
    acc[month]++;
    return acc;
  }, {});
  for (let i = 1; i <= 12; i++) {
    if (!countByMonth[i]) {
      countByMonth[i] = 0;
    }
  }

  // Device
  const deviceCount = deviceData.length;
  const deviceActiveCount = deviceData.filter(
    (item: any) => item.activeStatus === true
  ).length;
  const deviceDisactiveCount = deviceData.filter(
    (item: any) => item.activeStatus === false
  ).length;

  // Service
  const serviceCount = serviceData.length;
  const serviceActiveCount = serviceData.filter(
    (item: any) => item.activeStatus === true
  ).length;
  const serviceDisactiveCount = serviceData.filter(
    (item: any) => item.activeStatus === false
  ).length;

  useEffect(() => {
    Promise.all([
      dispatch(getOrdinalNumber()),
      dispatch(getDevice()),
      dispatch(getService()),
    ]).finally(() => setLoading(false));
  }, [dispatch]);

  const [chartData, setChartData] = useState(countByDay);

  const handleSelectChange = (value: string) => {
    switch (value) {
      case "day":
        setChartData(countByDay);
        break;
      case "week":
        setChartData(countByWeek);
        break;
      case "month":
        setChartData(countByMonth);
        break;
      default:
        break;
    }
  };

  const count = [
    {
      title: "Số thứ tự đã cấp",
      number: ordinalNumberCount,
      persent: "+32,41%",
      icon: ordinalNumber1,
      bnb: "uptext",
    },
    {
      title: "Số thứ tự đã sử dụng",
      number: usedCount,
      persent: "-32,41%",
      icon: ordinalNumber2,
      bnb: "downtext",
    },
    {
      title: "Số thứ tự đang chờ",
      number: waitingCount,
      persent: "+56,41%",
      icon: ordinalNumber3,
      bnb: "uptext",
    },
    {
      title: "Số thứ tự đã bỏ qua",
      number: skippedCount,
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
      number: deviceCount,
      enable: deviceActiveCount,
      disable: deviceDisactiveCount,
    },
    {
      label: "Dịch vụ",
      icon: service,
      bnb: "service",
      number: serviceCount,
      enable: serviceActiveCount,
      disable: serviceDisactiveCount,
    },
    {
      label: "Cấp số",
      icon: ordinalNumber,
      bnb: "ordinalnumber",
      number: ordinalNumberCount,
      used: usedCount,
      waiting: waitingCount,
      skip: skippedCount,
    },
  ];

  return (
    <>
      <div className="layout-content">
        <Title level={2} className="text-orange">
          Biểu đồ cấp số
        </Title>
        {loading ? (
          <div>Đang tải...</div>
        ) : (
          <Row gutter={24}>
            <Col span={16}>
              <Row gutter={13}>
                {count.map((item, index) => (
                  <Col key={index} span={6}>
                    <Card bordered={false} className="cardbox">
                      <div className="inline-items">
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
                    <LineChart data={chartData} onChange={handleSelectChange} />
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
                  <Card
                    key={index}
                    bordered={false}
                    className="cardbox"
                    bodyStyle={{ padding: "0px 8px" }}
                  >
                    <Row align="middle">
                      <Col xs={6} className="radial-bar">
                        <RadialBarChart
                          series={
                            item.enable && item.disable
                              ? [item.enable ?? 0, item.disable ?? 0]
                              : [
                                  item.used ?? 0,
                                  item.waiting ?? 0,
                                  item.skip ?? 0,
                                ]
                          }
                        />
                      </Col>
                      <Col xs={6}>
                        <Title level={2}>
                          <div className="number">{item.number}</div>
                          <div className={`${item.bnb} colortext inline-items`}>
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
                <Calendar
                  calendarType="ISO 8601"
                  locale="en-EN"
                  defaultValue={new Date()}
                />
              </Card>
            </Col>
          </Row>
        )}
      </div>
    </>
  );
};

export default Home;
