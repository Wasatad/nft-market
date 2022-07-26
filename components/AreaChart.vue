<template>
  <LineElem :chart-options="chartOptions" :chart-data="chartData" />
</template>

<script>
// import { Bar } from 'vue-chartjs'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
} from 'chart.js'

// ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
ChartJS.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
)

export default {
  name: 'AreaChart',
  components: { LineElem: Line },
  props: {
    chartId: {
      type: String,
      default: 'area-chart',
    },
    chartData: {
      type: Object,
      default() {
        return {
          labels: ['50', '20', '33', '12'],
          datasets: [{ data: [50, 20, 33, 12] }],
        }
      },
    },
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
        // maintainAspectRatio: false,

        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            displayColors: false,
            bodyFont: {
              size: 13,
              weight: 'bold',
            },
            padding: 8,
            callbacks: {
              title: function () {},
            },
          },
        },

        scales: {
          y: {
            grid: {
              color: 'white',
              drawBorder: false,
            },
            ticks: {
              display: false,
            },
          },
          x: {
            grid: {
              color: '#E2E2ED',
              borderDash: [7, 5],
              // lineWidth: 2,
            },
            ticks: {
              // color: '#7780A1',
              display: false,
            },
          },
        },

        borderColor: 'rgba(118, 222, 205, 1)',
        backgroundColor: null,
        pointBackgroundColor: 'white',
        fill: 'origin',
        tension: 0.3,
        pointRadius: 6,
        pointBorderWidth: 3,
        pointHoverBorderWidth: 6,
      },
    }
  },
  methods: {},
  mounted() {
    let canvas = document.querySelector('canvas')
    let ctx = canvas.getContext('2d')
    this.chartOptions.backgroundColor = ctx.createLinearGradient(0, 0, 0, 450)
    this.chartOptions.backgroundColor.addColorStop(
      0,
      'rgba(118, 222, 204, 0.1)'
    )
    this.chartOptions.backgroundColor.addColorStop(1, 'rgba(118, 222, 204, 0)')
  },
}
</script>
