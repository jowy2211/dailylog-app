<template>
  <v-card light flat class="pa-5">
    <v-card-title>
      <v-row align="center" justify="space-between">
        <v-col cols="auto">{{ title }}</v-col>
        <v-col v-if="option.isFilter" cols="auto">
          <v-select
            label="Filter"
            :items="['year', 'monthly', 'weekly']"
            solo
            depressed
            dense
            hide-details
          />
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <LineChartGenerator
        :chart-data="chartData"
        :chart-id="chartId"
        :dataset-id-key="datasetIdKey"
      />
    </v-card-text>
  </v-card>
</template>

<script>
// import Chart from 'chart.js/auto'
import { Line as LineChartGenerator } from 'vue-chartjs'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
)

export default {
  name: 'CardLineChartComponent',
  components: { LineChartGenerator },
  props: {
    title: {
      type: String,
      default: 'Line Chart'
    },
    chartData: {
      type: Object,
      default: () => {
        return {
            labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July'
          ],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [40, 39, 10, 40, 39, 80, 40]
            }
          ]
        };
      },
    },
    option: {
      type: Object,
      default() {
        return {
          cols: 'auto',
          lg: 4,
          md: 4,
          sm: 12,
          isFilter: false,
        };
      },
    },
    chartId: {
      type: String,
      default: 'line-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
  },
  data() {
    return {
      styles: {
        position: 'relative',
        maxWidth: '100%',
        width: 'inherit',
        display: 'block',
      }
    };
  },
  mounted() {
    // const lineChart = new Chart(
    //   document.getElementById(this.chartId),
    //   {
    //     type: 'line',
    //     data: this.chartData,
    //     options: {
    //       aspectRatio: (this.option.lg * 200) / ((this.option.lg * 110) / 2),
    //     }
    //   }
    // );

    // lineChart.update();

    // return lineChart;
  }
};
</script>
