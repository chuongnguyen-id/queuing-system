import ReactApexChart from "react-apexcharts";
import { Select, Typography } from "antd";
import lineChart from "./configs/lineChart";

function LineChart() {
  const { Title, Paragraph } = Typography;

  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>Bảng thống kê theo ngày</Title>
          <Paragraph className="lastweek">Tháng 11/2021</Paragraph>
        </div>
        <div className="sales">
          Xem theo{" "}
          <Select
            defaultValue="Ngày"
            // onChange={handleChange}
            options={[
              { value: "day", label: "Ngày" },
              { value: "week", label: "Tuần" },
              { value: "month", label: "Tháng" },
            ]}
          />
        </div>
      </div>

      <ReactApexChart
        className="full-width"
        options={lineChart.options}
        series={lineChart.series}
        type="area"
        height={350}
        width={"100%"}
      />
    </>
  );
}

export default LineChart;
