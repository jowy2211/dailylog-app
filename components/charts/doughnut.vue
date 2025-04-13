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
      <Doughnut
        :chart-data="chartData"
        :chart-id="chartId"
        :dataset-id-key="datasetIdKey"
        :chart-options="chartOptions"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import { Doughnut } from 'vue-chartjs';
import {
Chart as ChartJS,
Title,
Tooltip,
Legend,
ArcElement,
CategoryScale,
LinearScale
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

export default {
name: 'CardDoughnutChartComponent',
components: {
  Doughnut,
},
props: {
  title: {
    type: String,
    default: 'Doughnut Chart'
  },
  chartData: {
    type: Object,
    default: () => {
      return {
        labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
        datasets: [
          {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
            data: [40, 20, 80, 10]
          }
        ]
      }
    },
  },
  datasetIdKey: {
    type: String,
    default: 'label'
  },
  option: {
    type: Object,
    default() {
      return {
        cols: 'auto',
        lg: 3,
        md: 4,
        sm: 12,
        isFilter: false,
      };
    },
  },
  chartId: {
    type: String,
    default: 'doughnut-chart'
  },
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
              return `${context.label}: ${context.raw}%`;
            }
          }
        }
      }
    },
  };
},
};
</script>
