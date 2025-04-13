<template>
  <v-row dense>
    <v-col cols="8">
      <v-card dark flat class="dailylog-app--card">
        <v-card-title>
          Performance Hours Projects
        </v-card-title>
        <v-card-text>
          <BarChart
            chart-id="bar-chart-performances"
            title="Total Hours Per Projects"
            :chart-data="cardHoursProjects"
          />
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="4">
      <v-card dark flat class="dailylog-app--card">
        <v-card-title>
          Activity Distribution
        </v-card-title>
        <v-card-text>
          <DoughnutChart
            chart-id="doughnut-chart-achievements"
            title="Percentage Distribution %"
            :chart-data="cardActivityDistribution"
          />
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="6">
      <v-card dark flat class="dailylog-app--card">
        <v-card-title>
          Line Chart Load
        </v-card-title>
        <v-card-text>
          <LineChart chart-id="line-chart-load" />
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="6">
      <v-card dark flat class="dailylog-app--card">
        <v-card-title>
          Line Chart Overwork
        </v-card-title>
        <v-card-text>
          <LineChart chart-id="line-chart-overwork" />
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card light flat class="dailylog-app--card">
        <v-card-title>
          Table Data List Current Projects
        </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="table.headers"
          >
            <template #[`item.status`]="{ item }">
              <v-chip label small dark :color="status.find((i) => i.value === item.status)?.color" class="font-weight-bold">
                {{ status.find((i) => i.value === item.status)?.text ?? '-' }}
              </v-chip>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import BarChart from '@/components/charts/bar.vue';
import DoughnutChart from '@/components/charts/doughnut.vue';
import LineChart from '@/components/charts/line.vue';

export default {
  name: 'DashboardProjectManagerComponents',
  components: { BarChart, DoughnutChart, LineChart },
  data() {
    return {
      table: {
        headers: [
          { text: 'Code', value: 'code', sortable: false },
          { text: 'Title', value: 'name' },
          { text: 'Start Project', value: 'start_date' },
          { text: 'End Project', value: 'end_date' },
          { text: 'Total Member', value: '_count.member' },
          { text: 'Status', value: 'status' }
        ],
        items: [],
        search: null
      },
    }
  },
  computed: {
    dashboardPerformance() {
      return this.$store.getters['dashboard/getDashboardPerformance'];
    },
    cardHoursProjects() {
      const chartData = {
        labels: ['Total Hours'],
        datasets: this.dashboardPerformance?.hoursPerProject.map((i, idx) => ({
          label: i.projectName,
          data: [i.totalHours],
          backgroundColor: this.$utilities.generateColors(idx)
        })),
      };

      return chartData;
    },
    cardActivityDistribution() {
      const chartData = {
        labels: this.dashboardPerformance?.activityDistribution[0]?.map((i) => i.category),
        datasets: [
          {
            backgroundColor: this.dashboardPerformance?.activityDistribution[0]?.map((i, idx) => this.$utilities.generateColors(idx)),
            data: this.dashboardPerformance?.activityDistribution[0]?.map((i) => Math.round(i.percentage).toFixed(2))
          }
        ]
      };

      console.log(this.dashboardPerformance?.activityDistribution)

      return chartData;
    }
  }
}
</script>