import ReactApexChart from "react-apexcharts";
import radialBarChart from "./configs/radialBarChart";

interface RadialBarChartProps {
  series: [number, number] | [number, number, number];
}

const RadialBarChart = ({ series }: RadialBarChartProps) => {
  const sum = series.reduce((acc, curr) => acc + curr, 0);
  const percentages = series.map((data) => Math.round((data / sum) * 100));

  return (
    <>
      <ReactApexChart
        options={radialBarChart}
        series={percentages}
        type="radialBar"
        width={130}
      />
    </>
  );
};

export default RadialBarChart;
