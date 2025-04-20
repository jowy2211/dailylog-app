<template>
  <div>
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
          <v-col cols="6">
            <v-card light flat>
              <v-card-title>Average Daily Hours</v-card-title>
              <v-card-text>
                <Bar :chart-data="avgDailyHoursData" :options="chartOptions" />
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card light flat>
              <v-card-title>Total Assigned Projects</v-card-title>
              <v-card-text>
                <Bar :chart-data="projectCountData" :options="chartOptions" />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card dark flat class="dailylog-app--card my-2">
      <v-card-text>
        <v-row dense>
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
    <v-card dark flat class="dailylog-app--card my-2">
      <v-card-text>
        <v-row dense>
          <v-col cols="12">
            <div class="text-h4">Productivity Dashboard</div>
          </v-col>
          <v-col cols="6">
            <v-card light flat>
              <v-card-title>Activity by Category</v-card-title>
              <v-card-text>
                <client-only>
                  <Pie :chart-data="activityByCategoryData" :options="chartOptions" />
                </client-only>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card light flat>
              <v-card-title>Productivity Ratio</v-card-title>
              <v-card-text>
                <client-only>
                  <Doughnut :chart-data="productivityRatioData" :options="chartOptions" />
                </client-only>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card light flat>
              <v-card-title>Meeting Frequency</v-card-title>
              <v-card-text>
                <client-only>
                  <LineChart :chart-data="meetingFrequencyData" :options="chartOptions" />
                </client-only>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card light flat>
              <v-card-title>Hours by Position</v-card-title>
              <v-card-text>
                <client-only>
                  <Bar :chart-data="hoursByPositionData" :options="chartOptions" />
                </client-only>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card light flat>
              <v-card-title>Activities per Project</v-card-title>
              <v-card-text>
                <client-only>
                  <Bar :chart-data="activitiesPerProjectData" :options="chartOptions" />
                </client-only>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card dark flat class="dailylog-app--card my-2">
      <v-card-text>
        <v-row dense>
          <v-col cols="12">
            <div class="text-h4">Activity Trend Dashboard</div>
          </v-col>
          <v-col cols="12">
            <v-card light flat>
              <v-card-title>Monthly Hours</v-card-title>
              <v-card-text>
                <client-only>
                  <Bar :chart-data="monthlyHoursData" :options="chartOptions" />
                </client-only>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card light flat>
              <v-card-title>Category Trend</v-card-title>
              <v-card-text>
                <client-only>
                  <LineChart :chart-data="categoryTrendData" :options="chartOptions" />
                </client-only>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card light flat>
              <v-card-title>Productive Days</v-card-title>
              <v-card-text>
                <client-only>
                  <Bar :chart-data="productiveDaysData" :options="chartOptions" />
                </client-only>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card light flat>
              <v-card-title>Workload Peaks</v-card-title>
              <v-card-text>
                <client-only>
                  <LineChart :chart-data="workloadPeaksData" :options="chartOptions" />
                </client-only>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card light flat>
              <v-card-title>Activity Efficiency</v-card-title>
              <v-card-text>
                <client-only>
                  <Bar :chart-data="activityEfficiencyData" :options="chartOptions" />
                </client-only>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
import { Bar, Doughnut, Line as LineChart, Pie } from 'vue-chartjs';

Chart.register(...registerables);

export default {
  name: 'DashboardExecutiveComponents',
  components: { Bar, LineChart, Pie, Doughnut },
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
    dashboardProductivity() {
      return this.$store.getters['dashboard/getDashboardProductivity'];
    },
    dashboardActivityTrend() {
      return this.$store.getters['dashboard/getDashboardActivityTrend'];
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
    avgDailyHoursData() {
      if (!this.dashboardWorkload) return {};
      
      return {
        labels: this.dashboardWorkload.avgDailyHours.map(item => item.employeeName),
        datasets: [{
          label: 'Average Daily Hours',
          data: this.dashboardWorkload.avgDailyHours.map(item => item.avgHours),
          backgroundColor: this.$utilities.getRandomUniqueColors(this.dashboardWorkload.avgDailyHours.length, 1),
        }],
      };
    },
    projectCountData() {
      if (!this.dashboardWorkload) return {};
      
      return {
        labels: this.dashboardWorkload.projectCount.map(item => item.employeeName),
        datasets: [{
          label: 'Total Assigned Project',
          data: this.dashboardWorkload.projectCount.map(item => item.projectCount),
          backgroundColor: this.$utilities.getRandomUniqueColors(this.dashboardWorkload.projectCount.length, 1),
        }],
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
    activityByCategoryData() {
      if (!this.dashboardProductivity) return {};
      return {
        labels: this.dashboardProductivity.activityByCategory.map(item => item.category),
        datasets: [{
          data: this.dashboardProductivity.activityByCategory.map(item => item.count),
          backgroundColor: this.$utilities.getRandomUniqueColors(this.dashboardProductivity.activityByCategory.length, 0.5),
        }],
      };
    },
    productivityRatioData() {
      if (!this.dashboardProductivity) return {};
      return {
        labels: this.dashboardProductivity.productivityRatio.map(item => item.type),
        datasets: [{
          data: this.dashboardProductivity.productivityRatio.map(item => item.percentage),
          backgroundColor: this.$utilities.getRandomUniqueColors(this.dashboardProductivity.productivityRatio.length, 0.5),
        }],
      };
    },
    hoursByPositionData() {
      if (!this.dashboardProductivity) return {};
      return {
        labels: this.dashboardProductivity.hoursByPosition.map(item => item.position),
        datasets: [{
          label: 'Total Hours',
          data: this.dashboardProductivity.hoursByPosition.map(item => item.totalHours),
          backgroundColor: this.$utilities.getRandomUniqueColors(this.dashboardProductivity.hoursByPosition.length, 0.5),
        }],
      };
    },
    meetingFrequencyData() {
      if (!this.dashboardProductivity) return {};
      const projects = [...new Set(this.dashboardProductivity.meetingFrequency.map(item => item.projectId))];
      const weeks = [...new Set(this.dashboardProductivity.meetingFrequency.map(item => item.week))].sort();
      return {
        labels: weeks,
        datasets: projects.map((projectId, index) => ({
          label: `Project ${projectId}`,
          data: weeks.map(week => {
            const entry = this.dashboardProductivity.meetingFrequency.find(
              item => item.projectId === projectId && item.week === week
            );
            return entry ? entry.count : 0;
          }),
          backgroundColor: this.$utilities.getRandomUniqueColors(projects.length, 0.5)[index],
          borderColor: this.$utilities.getRandomUniqueColors(projects.length, 1)[index],
          fill: false,
        })),
      };
    },
    activitiesPerProjectData() {
      if (!this.dashboardProductivity) return {};
      return {
        labels: this.dashboardProductivity.activitiesPerProject.map(item => item.projectId),
        datasets: [
          {
            label: 'Tasks',
            data: this.dashboardProductivity.activitiesPerProject.map(item => item.taskCount),
            backgroundColor: this.$utilities.getRandomUniqueColors(1, 0.5)[0],
          },
          {
            label: 'Bug Fixing',
            data: this.dashboardProductivity.activitiesPerProject.map(item => item.bugFixingCount),
            backgroundColor: this.$utilities.getRandomUniqueColors(1, 0.5, ['rgba(231, 76, 60, 0.5)'])[0],
          },
        ],
      };
    },
    monthlyHoursData() {
      if (!this.dashboardActivityTrend) return {};
      const projects = [...new Set(this.dashboardActivityTrend.monthlyHours.map(item => item.projectId))];
      const months = [...new Set(this.dashboardActivityTrend.monthlyHours.map(item => item.month))].sort();
      return {
        labels: months,
        datasets: projects.map((projectId, index) => ({
          label: `Project ${projectId}`,
          data: months.map(month => {
            const entry = this.dashboardActivityTrend.monthlyHours.find(
              item => item.projectId === projectId && item.month === month
            );
            return entry ? entry.totalHours : 0;
          }),
          backgroundColor: this.$utilities.getRandomUniqueColors(projects.length, 0.5)[index],
        })),
      };
    },
    categoryTrendData() {
      if (!this.dashboardActivityTrend) return {};
      const categories = [...new Set(this.dashboardActivityTrend.categoryTrend.map(item => item.category))];
      const months = [...new Set(this.dashboardActivityTrend.categoryTrend.map(item => item.month))].sort();
      return {
        labels: months,
        datasets: categories.map((category, index) => ({
          label: category,
          data: months.map(month => {
            const entry = this.dashboardActivityTrend.categoryTrend.find(
              item => item.category === category && item.month === month
            );
            return entry ? entry.count : 0;
          }),
          backgroundColor: this.$utilities.getRandomUniqueColors(categories.length, 0.5)[index],
          borderColor: this.$utilities.getRandomUniqueColors(categories.length, 1)[index],
          fill: false,
        })),
      };
    },
    productiveDaysData() {
      if (!this.dashboardActivityTrend) return {};
      return {
        labels: this.dashboardActivityTrend.productiveDays.map(item => item.employeeName),
        datasets: [{
          label: 'Productive Days',
          data: this.dashboardActivityTrend.productiveDays.map(item => item.productiveDays),
          backgroundColor: this.$utilities.getRandomUniqueColors(this.dashboardActivityTrend.productiveDays.length, 0.5),
        }],
      };
    },
    workloadPeaksData() {
      if (!this.dashboardActivityTrend) return {};
      return {
        labels: this.dashboardActivityTrend.workloadPeaks.map(item => item.week),
        datasets: [{
          label: 'Total Hours',
          data: this.dashboardActivityTrend.workloadPeaks.map(item => item.totalHours),
          backgroundColor: this.$utilities.getRandomUniqueColors(1, 0.5)[0],
          borderColor: this.$utilities.getRandomUniqueColors(1, 1)[0],
          fill: false,
        }],
      };
    },
    activityEfficiencyData() {
      if (!this.dashboardActivityTrend) return {};
      return {
        labels: this.dashboardActivityTrend.activityEfficiency.map(item => item.category),
        datasets: [{
          label: 'Average Hours',
          data: this.dashboardActivityTrend.activityEfficiency.map(item => item.avgHours),
          backgroundColor: this.$utilities.getRandomUniqueColors(this.dashboardActivityTrend.activityEfficiency.length, 0.5),
        }],
      };
    },
  },
};
</script>
