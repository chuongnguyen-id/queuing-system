import { ApexOptions } from "apexcharts";

const radialBarChart: ApexOptions = {
  //   series: [44, 55, 67],
  chart: {
    width: "100%",
    type: "radialBar",
  },
  plotOptions: {
    radialBar: {
      offsetX: -15,
      offsetY: 0,
      track: {
        show: true,
        margin: 3,
      },

      dataLabels: {
        show: true,
        name: {
          show: false,
          fontSize: "16px",
        },
        value: {
          show: true,
          fontSize: "16px",
          offsetY: 7,
        },
        total: {
          show: true,
          formatter: function (w: any) {
            return w.globals.series[0].toFixed(0) + "%";
          },
        },
      },
    },
  },

  stroke: {
    curve: "smooth",
    lineCap: "round",
  },
};

export default radialBarChart;
