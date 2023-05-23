import { ApexOptions } from "apexcharts";

const lineChart: ApexOptions = {
  chart: {
    width: "100%",
    height: 350,
    type: "area",
    toolbar: {
      show: false,
    },
  },

  series: [
    {
      name: "Websites",
      data: [2600, 3900, 3000, 3300, 4221, 3400, 4000, 3500],
    },
  ],

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
        colors: [
          "#8c8c8c",
          "#8c8c8c",
          "#8c8c8c",
          "#8c8c8c",
          "#8c8c8c",
          "#8c8c8c",
          "#8c8c8c",
          "#8c8c8c",
          "#8c8c8c",
        ],
      },
    },
    categories: ["01", "05", "10", "15", "20", "25", "30", "31"],
  },

  tooltip: {
    y: {
      formatter: function (val: any) {
        return val;
      },
    },
  },
};

export default lineChart;
