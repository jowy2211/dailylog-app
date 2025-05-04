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
                <Bar :chart-data="totalHoursData.data" :chart-options="totalHoursData.options" />
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card light flat>
              <v-card-title>Activity Distribution</v-card-title>
              <v-card-text>
                <Bar :chart-data="activityDistributionData.data" :chart-options="activityDistributionData.options" />
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card light flat>
              <v-card-title>Average Daily Hours</v-card-title>
              <v-card-text>
                <Bar :chart-data="avgDailyHoursData.data" :chart-options="avgDailyHoursData.options" />
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card light flat>
              <v-card-title>Total Assigned Projects</v-card-title>
              <v-card-text>
                <Bar :chart-data="projectCountData.data" :chart-options="projectCountData.options" />
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
                <Bar :chart-data="hoursPerProjectData.data" :chart-options="hoursPerProjectData.options" />
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card light flat>
              <v-card-title>Activity Distribution</v-card-title>
              <v-card-text>
                <Bar :chart-data="activityDistributionPerformanceData.data" :chart-options="activityDistributionPerformanceData.options" />
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
                  <Pie :chart-data="activityByCategoryData.data" :chart-options="activityByCategoryData.options" />
                </client-only>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card light flat>
              <v-card-title>Productivity Ratio</v-card-title>
              <v-card-text>
                <client-only>
                  <Doughnut :chart-data="productivityRatioData.data" :chart-options="productivityRatioData.options" />
                </client-only>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card light flat>
              <v-card-title>Meeting Frequency</v-card-title>
              <v-card-text>
                <client-only>
                  <LineChart :chart-data="meetingFrequencyData.data" :chart-options="meetingFrequencyData.options" />
                </client-only>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card light flat>
              <v-card-title>Hours by Position</v-card-title>
              <v-card-text>
                <client-only>
                  <Bar :chart-data="hoursByPositionData.data" :chart-options="hoursByPositionData.options" />
                </client-only>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card light flat>
              <v-card-title>Activities per Project</v-card-title>
              <v-card-text>
                <client-only>
                  <Bar :chart-data="activitiesPerProjectData.data" :chart-options="activitiesPerProjectData.options" />
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
                  <Bar :chart-data="monthlyHoursData.data" :chart-options="monthlyHoursData.options" />
                </client-only>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card light flat>
              <v-card-title>Category Trend</v-card-title>
              <v-card-text>
                <client-only>
                  <LineChart :chart-data="categoryTrendData.data" :chart-options="categoryTrendData.options" />
                </client-only>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card light flat>
              <v-card-title>Productive Days</v-card-title>
              <v-card-text>
                <client-only>
                  <Bar :chart-data="productiveDaysData.data" :chart-options="productiveDaysData.options" />
                </client-only>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card light flat>
              <v-card-title>Workload Activity Peaks</v-card-title>
              <v-card-text>
                <client-only>
                  <LineChart :chart-data="workloadPeaksData.data" :chart-options="workloadPeaksData.options" />
                </client-only>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card light flat>
              <v-card-title>Activity Efficiency</v-card-title>
              <v-card-text>
                <client-only>
                  <Bar :chart-data="activityEfficiencyData.data" :chart-options="activityEfficiencyData.options" />
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
import {
  Chart,
  registerables,
} from 'chart.js';
import {
  Bar,
  Doughnut,
  Line as LineChart,
  Pie,
} from 'vue-chartjs';

Chart.register(...registerables);

export default {
  name: 'DashboardExecutiveComponents',
  components: { Bar, LineChart, Pie, Doughnut },
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
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
    // Bar Chart Used
    totalHoursData() {
      if (!this.dashboardWorkload) return { data: {}, options: {} };

      return {
        data: {
          labels: this.dashboardWorkload.totalHours.map(item => item.employeeName),
          datasets: [{
            label: 'Total Hours',
            data: this.dashboardWorkload.totalHours.map(item => item.totalHours),
            backgroundColor: this.$utilities.getRandomUniqueColors(this.dashboardWorkload.totalHours.length, 1),
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `Total ${context.raw} hours`;
                }
              }
            }
          }
        },
      };
    },
    // Bar Chart Used
    activityDistributionData() {
      if (!this.dashboardWorkload) return { data: {}, options: {} };

      const categories = [...new Set(this.dashboardWorkload.activityDistribution.map(item => item.category))];
      return {
        data: {
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
        },
        options: {
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
    // Bar Chart Used
    avgDailyHoursData() {
      if (!this.dashboardWorkload) return { data: {}, options: {} };
      
      return {
        data: {
          labels: this.dashboardWorkload.avgDailyHours.map(item => item.employeeName),
          datasets: [{
            label: 'Average Daily Hours',
            data: this.dashboardWorkload.avgDailyHours.map(item => item.avgHours),
            backgroundColor: this.$utilities.getRandomUniqueColors(this.dashboardWorkload.avgDailyHours.length, 1),
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `Average: ${context.raw} hours`;
                }
              }
            }
          }
        },
      };
    },
    // Bar Chart Used
    projectCountData() {
      if (!this.dashboardWorkload) return { data: {}, options: {} };
      
      return {
        data: {
          labels: this.dashboardWorkload.projectCount.map(item => item.employeeName),
          datasets: [{
            label: 'Total Assigned Project',
            data: this.dashboardWorkload.projectCount.map(item => item.projectCount),
            backgroundColor: this.$utilities.getRandomUniqueColors(this.dashboardWorkload.projectCount.length, 1),
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `Assigned: ${context.raw} projects`;
                }
              }
            }
          }
        },
      };
    },
    // Bar Chart Used
    hoursPerProjectData() {
      if (!this.dashboardPerformance) return { data: {}, options: {} };

      return {
        data: {
          labels: this.dashboardPerformance.hoursPerProject.map(item => item.projectName),
          datasets: [{
            label: 'Total Hours',
            data: this.dashboardPerformance.hoursPerProject.map(item => item.totalHours),
            backgroundColor: this.$utilities.getRandomUniqueColors(this.dashboardPerformance.hoursPerProject.length, 1),
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `Total: ${context.raw} hours`;
                }
              }
            }
          }
        },
      };
    },
    // Bar Chart Used
    activityDistributionPerformanceData() {
      if (!this.dashboardPerformance) return { data: {}, options: {} };

      const categories = [...new Set(this.dashboardPerformance.activityDistribution.flat().map(item => item.category))];

      return {
        data: {
          labels: this.dashboardPerformance.hoursPerProject.map(item => item.projectName),
          datasets: categories.map((category, catIndex) => ({
            label: category,
            data: this.dashboardPerformance.activityDistribution.map(
              project => project.find(item => item.category === category)?.percentage || 0
            ),
            backgroundColor: this.$utilities.getRandomUniqueColors(categories.length, 1)[catIndex],
          })),
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `${context.label}: ${parseFloat(context.raw).toFixed(1)}%`;
                }
              }
            }
          }
        },
      };
    },
    // Pie Chart Used
    activityByCategoryData() {
      if (!this.dashboardProductivity) return { data: {}, options: {} };

      return {
        data: {
          labels: this.dashboardProductivity.activityByCategory.map(item => item.category),
          datasets: [{
            data: this.dashboardProductivity.activityByCategory.map(item => item.count),
            backgroundColor: this.$utilities.getRandomUniqueColors(this.dashboardProductivity.activityByCategory.length, 0.5),
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `${context.label}: ${context.raw} hours`;
                }
              }
            }
          }
        },
      };
    },
    // Doughnut Chart Used
    productivityRatioData() {
      if (!this.dashboardProductivity) return { data: {}, options: {} };

      return {
        data: {
          labels: this.dashboardProductivity.productivityRatio.map(item => item.type),
          datasets: [{
            data: this.dashboardProductivity.productivityRatio.map(item => item.percentage),
            backgroundColor: this.$utilities.getRandomUniqueColors(this.dashboardProductivity.productivityRatio.length, 0.5),
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `${context.label}: ${parseFloat(context.raw).toFixed(2)}%`;
                }
              }
            }
          }
        },
      };
    },
    // Bar Chart Used
    hoursByPositionData() {
      if (!this.dashboardProductivity) return { data: {}, options: {} };

      return {
        data: {
          labels: this.dashboardProductivity.hoursByPosition.map(item => item.position),
          datasets: [{
            label: 'Total Hours',
            data: this.dashboardProductivity.hoursByPosition.map(item => item.totalHours),
            backgroundColor: this.$utilities.getRandomUniqueColors(this.dashboardProductivity.hoursByPosition.length, 0.5),
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `Total: ${context.raw} hours`;
                }
              }
            }
          }
        },
      };
    },
    // Line Chart Used
    meetingFrequencyData() {
      if (!this.dashboardProductivity) return { data: {}, options: {} };

      const projects = [...new Set(this.dashboardProductivity.meetingFrequency.map(item => item.projectName))];
      const weeks = [...new Set(this.dashboardProductivity.meetingFrequency.map(item => item.week))].sort();

      return {
        data: {
          labels: weeks,
          datasets: projects.map((projectName, index) => ({
            label: projectName,
            data: weeks.map(week => {
              const entry = this.dashboardProductivity.meetingFrequency.find(
                item => item.projectName === projectName && item.week === week
              );
              return entry ? entry.count : 0;
            }),
            backgroundColor: this.$utilities.getRandomUniqueColors(projects.length, 0.5)[index],
            borderColor: this.$utilities.getRandomUniqueColors(projects.length, 1)[index],
            fill: false,
          })),
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `Meeting Frequency: ${context.raw} times in a week`;
                }
              }
            }
          }
        },
      };
    },
    // Bar Chart Used
    activitiesPerProjectData() {
      if (!this.dashboardProductivity) return { data: {}, options: {} };

      return {
        data: {
          labels: this.dashboardProductivity.activitiesPerProject.map(item => item.projectName),
          datasets: [
            {
              label: 'Tasks',
              data: this.dashboardProductivity.activitiesPerProject.map(item => item.taskCount),
              backgroundColor: this.$utilities.getRandomUniqueColors(this.dashboardProductivity.activitiesPerProject.length, 0.5),
            },
            {
              label: 'Bug Fixing',
              data: this.dashboardProductivity.activitiesPerProject.map(item => item.bugFixingCount),
              backgroundColor: this.$utilities.getRandomUniqueColors(this.dashboardProductivity.activitiesPerProject.length, 0.5),
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `${context.dataset.label}: Total ${context.raw} hours`;
                }
              }
            }
          }
        },
      };
    },
    // Bar Chart Used
    monthlyHoursData() {
      if (!this.dashboardActivityTrend) return { data: {}, options: {} };

      const projects = [...new Set(this.dashboardActivityTrend.monthlyHours.map(item => item.projectName))];
      const months = [...new Set(this.dashboardActivityTrend.monthlyHours.map(item => item.month))].sort();

      return {
        data: {
          labels: months,
          datasets: projects.map((projectName, index) => ({
            label: `Project ${projectName}`,
            data: months.map(month => {
              const entry = this.dashboardActivityTrend.monthlyHours.find(
                item => item.projectName === projectName && item.month === month
              );
              return entry ? entry.totalHours : 0;
            }),
            backgroundColor: this.$utilities.getRandomUniqueColors(projects.length, 0.5)[index],
          })),
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `${context.dataset.label}: Total ${context.raw} hours in a month`;
                }
              }
            }
          }
        },
      };
    },
    // Line Chart Used
    categoryTrendData() {
      if (!this.dashboardActivityTrend) return { data: {}, options: {} };

      const categories = [...new Set(this.dashboardActivityTrend.categoryTrend.map(item => item.category))];
      const months = [...new Set(this.dashboardActivityTrend.categoryTrend.map(item => item.month))].sort();

      return {
        data: {
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
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `${context.dataset.label}: Count ${context.raw} in a month`;
                }
              }
            }
          }
        },
      };
    },
    // Bar Chart Used
    productiveDaysData() {
      if (!this.dashboardActivityTrend) return { data: {}, options: {} };

      return {
        data: {
          labels: this.dashboardActivityTrend.productiveDays.map(item => item.employeeName),
          datasets: [{
            label: 'Productive Days',
            data: this.dashboardActivityTrend.productiveDays.map(item => item.productiveDays),
            backgroundColor: this.$utilities.getRandomUniqueColors(this.dashboardActivityTrend.productiveDays.length, 0.5),
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `Productive Days: Count ${context.raw} days`;
                }
              }
            }
          }
        },
      };
    },
    // Line Chart Used
    workloadPeaksData() {
      if (!this.dashboardActivityTrend) return { data: {}, options: {} };

      return {
        data: {
          labels: this.dashboardActivityTrend.workloadPeaks.map(item => item.week),
          datasets: [{
            label: 'Total Hours',
            data: this.dashboardActivityTrend.workloadPeaks.map(item => item.totalHours),
            backgroundColor: this.$utilities.getRandomUniqueColors(1, 0.5)[0],
            borderColor: this.$utilities.getRandomUniqueColors(1, 1)[0],
            fill: false,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `Total: ${context.raw} hours in a week`;
                }
              }
            }
          }
        },
      };
    },
    // Bar Chart Used
    activityEfficiencyData() {
      if (!this.dashboardActivityTrend) return { data: {}, options: {} };

      return {
        data: {
          labels: this.dashboardActivityTrend.activityEfficiency.map(item => item.category),
          datasets: [{
            label: 'Average Hours',
            data: this.dashboardActivityTrend.activityEfficiency.map(item => item.avgHours),
            backgroundColor: this.$utilities.getRandomUniqueColors(this.dashboardActivityTrend.activityEfficiency.length, 0.5),
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `Average: ${parseFloat(context.raw).toFixed(1)} hours`;
                }
              }
            }
          }
        },
      };
    },
  },
};
</script>
