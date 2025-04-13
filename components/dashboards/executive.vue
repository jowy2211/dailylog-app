<template>
  <v-row dense>
    <v-col cols="12">
      <v-row dense>
        <v-col cols="3">
          <v-card dark flat class="primary">
            <v-card-title class="justify-space-between">Active Project<v-icon size="36">mdi-bookmark</v-icon></v-card-title>
            <v-card-subtitle>TOTAL</v-card-subtitle>
            <v-card-text>
              <div class="text-h1 text-right font-weight-bold">
                0
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card dark flat class="dailylog-app--card">
            <v-card-title class="justify-space-between">Complete Project<v-icon size="36" color="success">mdi-bookmark-check</v-icon></v-card-title>
            <v-card-subtitle>TOTAL</v-card-subtitle>
            <v-card-text>
              <div class="text-h1 text-right font-weight-bold">
                0
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card dark flat class="dailylog-app--card">
            <v-card-title class="justify-space-between">Discontinued Project<v-icon size="36" color="orange">mdi-bookmark-remove</v-icon></v-card-title>
            <v-card-subtitle>TOTAL</v-card-subtitle>
            <v-card-text>
              <div class="text-h1 text-right font-weight-bold">
                0
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card dark flat class="dailylog-app--card">
            <v-card-title class="justify-space-between">Employee<v-icon size="36" color="yellow darken-1">mdi-lightning-bolt</v-icon></v-card-title>
            <v-card-subtitle>TOTAL</v-card-subtitle>
            <v-card-text>
              <div class="text-h1 text-right font-weight-bold">
                0
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="6">
      <v-card dark flat class="dailylog-app--card">
        <v-card-title>
          Bar Chart Performances
        </v-card-title>
        <v-card-text>
          <BarChart chart-id="bar-chart-performances" />
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="6">
      <v-card dark flat class="dailylog-app--card">
        <v-card-title>
          Bar Chart Achievements
        </v-card-title>
        <v-card-text>
          <BarChart chart-id="bar-chart-achievements" />
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
import LineChart from '@/components/charts/line.vue';

export default {
  name: 'DashboardExecutiveComponents',
  components: { BarChart, LineChart },
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
  }
}
</script>