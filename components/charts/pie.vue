<template>
  <v-card flat class="scp--rounded">
    <v-card-title>
      <v-row align="center" justify="center">
        <v-col cols="auto">{{ title }}</v-col>
        <v-col v-if="option.isFilter" cols="auto">
          <v-select
            label="Filter"
            :items="['year', 'monthly', 'weekly']"
            solo
            depressed
            dense
            hide-details
            class="scp--rounded"
          />
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <Pie
        :chart-options="chartOptions"
        :chart-data="chartData"
        :chart-id="chartId"
        :dataset-id-key="datasetIdKey"
        :height="height"
        :plugins="plugins"
        :css-classes="cssClasses"
        :styles="styles"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import { Pie } from 'vue-chartjs';
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
name: 'CardPieChartComponent',
components: {
  Pie,
},
props: {
  title: {
    type: String,
    default: 'Pie Chart'
  },
  chartData: {
    type: Object,
    default: null,
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
    default: 'pie-chart'
  },
  width: {
    type: Number,
    default: 400
  },
  height: {
    type: Number,
    default: 400
  },
  datasetIdKey: {
    type: String,
    default: 'label'
  },
  cssClasses: {
    default: '',
    type: String
  },
  styles: {
    type: Object,
    default: () => {}
  },
  plugins: {
    type: Object,
    default: () => {}
  }
},
data() {
  return {
    chartOptions: {
      responsive: true,
    },
  };
},
};
</script>
