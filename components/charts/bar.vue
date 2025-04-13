<template>
  <v-card flat light class="pa-5">
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
      <Bar
        :chart-data="chartData"
        :chart-id="chartId"
        :dataset-id-key="datasetIdKey"
        :chart-options="chartOptions"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import { Bar } from 'vue-chartjs';
import {
Chart as ChartJS,
Title,
Tooltip,
Legend,
BarElement,
CategoryScale,
LinearScale,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
name: 'CardBarChartComponent',
components: {
  Bar,
},
props: {
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
  title: {
    type: String,
    default: 'Bar Chart'
  },
  chartId: {
    type: String,
    default: 'bar-chart'
  },
  datasetIdKey: {
    type: String,
    default: 'label'
  },
  chartData: {
    type: Object,
    default: () => {
      return {
        labels: [ 'January', 'February', 'March', 'April', 'May' ],
        datasets: [
          {
            label: 'Example Bar Chart',
            data: [40, 20, 32, 11, 45],
            backgroundColor: [
              'rgba(255, 99, 132)',
            ],
          },
          {
            label: 'Example Bar Chart II',
            data: [25, 15, 42, 31, 10],
            backgroundColor: [
              'rgba(255, 159, 64)',
            ],
          },
        ],
      }
    }
  }
},
data() {
  return {
    chartOptions: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${context.raw} hours`;
            }
          }
        }
      }
    },
  };
},
};
</script>
