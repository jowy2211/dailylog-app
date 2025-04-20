<template>
  <v-card dark flat class="dailylog-app--card my-2">
    <v-card-text>
      <v-row dense>
        <v-col cols="12">
          <div class="text-h4">Workload Dashboard</div>
        </v-col>
        <v-col cols="6">
          <v-card light flat>
            <v-card-title>Total Hours</v-card-title>
            <v-card-text>
              <Bar :chart-data="totalHoursData" :options="chartOptions" />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card light flat>
            <v-card-title>Activity Distribution</v-card-title>
            <v-card-text>
              <Bar :chart-data="activityDistributionData" :options="chartOptions" />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12">
          <div class="text-h4">Project Performance Dashboard</div>
        </v-col>
        <v-col cols="6">
          <v-card light flat>
            <v-card-title>Hours per Project</v-card-title>
            <v-card-text>
              <Bar :chart-data="hoursPerProjectData" :options="chartOptions" />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card light flat>
            <v-card-title>Activity Distribution</v-card-title>
            <v-card-text>
              <Bar :chart-data="activityDistributionPerformanceData" :options="chartOptions" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<!-- 
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
    dashboardWorkload() {
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
</script> -->

<script>
import { BarElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar } from 'vue-chartjs';
// import { getRandomUniqueColors } from '~/utils/colors';

Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export default {
  components: { Bar },
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top' },
          tooltip: {
            callbacks: {
              label: context => `${context.dataset.label}: ${context.raw}%`,
            },
          },
        },
        scales: {
          y: { beginAtZero: true },
        },
      },
    };
  },
  computed: {
    dashboardWorkload() {
      return this.$store.getters['dashboard/getDashboardWorkload'];
    },
    dashboardPerformance() {
      return this.$store.getters['dashboard/getDashboardPerformance'];
    },
    isLoading() {
      return this.$store.getters['dashboard/getActivityLoading'];
    },
    totalHoursData() {
      if (!this.dashboardWorkload) return {};
      return {
        labels: this.dashboardWorkload.totalHours.map(item => item.employeeName),
        datasets: [{
          label: 'Total Hours',
          data: this.dashboardWorkload.totalHours.map(item => item.totalHours),
          backgroundColor: this.$utilities.getRandomUniqueColors(this.dashboardWorkload.totalHours.length, 1),
        }],
      };
    },
    activityDistributionData() {
      if (!this.dashboardWorkload) return {};
      const categories = [...new Set(this.dashboardWorkload.activityDistribution.map(item => item.category))];
      return {
        labels: this.dashboardWorkload.totalHours.map(item => item.employeeName),
        datasets: categories.map((category, catIndex) => ({
          label: category,
          data: this.dashboardWorkload.totalHours.map(employee => {
            const entry = this.dashboardWorkload.activityDistribution.find(
              item => item.employeeId === employee.employeeId && item.category === category
            );
            return entry ? entry.percentage : 0;
          }),
          backgroundColor: this.$utilities.getRandomUniqueColors(categories.length, 1)[catIndex],
        })),
      };
    },
    projectStatusData() {
      if (!this.dashboardPerformance) return {};
      return {
        labels: this.dashboardPerformance.projectStatus.map(item => item.status),
        datasets: [{
          data: this.dashboardPerformance.projectStatus.map(item => item.count),
          backgroundColor: this.$utilities.getRandomUniqueColors(this.dashboardPerformance.projectStatus.length, 1),
        }],
      };
    },
    delayedProjectsData() {
      if (!this.dashboardPerformance) return {};
      return {
        labels: this.dashboardPerformance.delayedProjects.map(item => item.name),
        datasets: [{
          label: 'Delay Days',
          data: this.dashboardPerformance.delayedProjects.map(item => item.delayDays),
          backgroundColor: 'rgba(231, 76, 60, 1)',
        }],
      };
    },
    hoursPerProjectData() {
      if (!this.dashboardPerformance) return {};
      return {
        labels: this.dashboardPerformance.hoursPerProject.map(item => item.projectName),
        datasets: [{
          label: 'Total Hours',
          data: this.dashboardPerformance.hoursPerProject.map(item => item.totalHours),
          backgroundColor: this.$utilities.getRandomUniqueColors(this.dashboardPerformance.hoursPerProject.length, 1),
        }],
      };
    },
    activityDistributionPerformanceData() {
      if (!this.dashboardPerformance) return {};
      const categories = [...new Set(this.dashboardPerformance.activityDistribution.flat().map(item => item.category))];
      return {
        labels: this.dashboardPerformance.hoursPerProject.map(item => item.projectName),
        datasets: categories.map((category, catIndex) => ({
          label: category,
          data: this.dashboardPerformance.activityDistribution.map(
            project => project.find(item => item.category === category)?.percentage || 0
          ),
          backgroundColor: this.$utilities.getRandomUniqueColors(categories.length, 1)[catIndex],
        })),
      };
    },
    activeMembersData() {
      if (!this.dashboardPerformance) return {};
      return {
        labels: this.dashboardPerformance.activeMembers.map(item => item.projectId),
        datasets: [{
          label: 'Member Count',
          data: this.dashboardPerformance.activeMembers.map(item => item.memberCount),
          backgroundColor: this.$utilities.getRandomUniqueColors(this.dashboardPerformance.activeMembers.length, 1),
        }],
      };
    },
  },
};
</script>
