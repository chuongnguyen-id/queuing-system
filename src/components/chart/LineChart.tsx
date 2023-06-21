import ReactApexChart from "react-apexcharts";
import { Select, Typography } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { ApexOptions } from "apexcharts";

type LineChartProps = {
  data: { [x: string]: number };
  onChange: any;
};

const LineChart = ({ data, onChange }: LineChartProps) => {
  const { Title, Paragraph } = Typography;

  const lineChart: ApexOptions = {
    chart: {
      width: "100%",
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },

    series: [{ name: "Số thứ tự đã cấp", data: Object.values(data) }],

    fill: {
      colors: ["#CEDDFF"],
      type: "gradient",
      gradient: {
        shadeIntensity: 0.5,
        opacityFrom: 1,
        opacityTo: 0,
        stops: [0, 100],
      },
    },

    legend: {
      show: false,
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      colors: ["#5185F7"],
      curve: "smooth",
      width: 2,
    },

    yaxis: {
      labels: {
        style: {
          fontSize: "14px",
          fontWeight: 600,
          colors: ["#8c8c8c"],
        },
      },
    },

    xaxis: {
      labels: {
        style: {
          fontSize: "14px",
          fontWeight: 600,
          colors: "#8c8c8c",
        },
      },
      categories: Object.keys(data),
    },

    tooltip: {
      y: {
        formatter: function (val: any) {
          return val;
        },
      },
    },
  };

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
            onChange={onChange}
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
