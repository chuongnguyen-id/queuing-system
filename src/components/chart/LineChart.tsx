import ReactApexChart from "react-apexcharts";
import { Select, Typography } from "antd";
import lineChart from "./configs/lineChart";
import { CaretDownOutlined } from "@ant-design/icons";

const LineChart = () => {
  const { Title, Paragraph } = Typography;

  return (
    <>
      <div className="titlechart">
        <div>
          <Title level={5}>Bảng thống kê theo ngày</Title>
          <Paragraph>Tháng 11/2021</Paragraph>
        </div>
        <div className="sales">
          Xem theo{" "}
          <Select
            defaultValue="Ngày"
            size="large"
            // onChange={handleChange}
            suffixIcon={<CaretDownOutlined />}
            options={[
              { value: "day", label: "Ngày" },
              { value: "week", label: "Tuần" },
              { value: "month", label: "Tháng" },
            ]}
          />
        </div>
      </div>
      <ReactApexChart
        options={lineChart}
        series={lineChart.series}
        type="area"
        height={350}
        width={810}
      />
    </>
  );
};

export default LineChart;
