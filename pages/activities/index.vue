<template>
  <v-container>
    <v-btn
      dark
      text
      exact
      class="text-none my-2"
      to="/"
    >
      <v-icon>mdi-chevron-left</v-icon>
      Back to Home
    </v-btn>
    <v-card dark flat class="dailylog-app--card pa-5">
      <v-card-title>My Activities</v-card-title>
      <v-card-subtitle>List data table activity</v-card-subtitle>
      <v-divider />
      <v-card-text>
        <v-virtual-scroll
          height="580"
          item-height="250"
          :items="activities"
        >
          <template #default="{ item }">
            <v-card
              :key="`log-item-${item.code}`"
              flat
              light
              class="my-1"
              height="240"
            >
              <v-card-title class="d-flex align-center justify-space-between">
                <div>{{ item.member.project.name }}</div>
                <v-btn
                  depressed
                  class="text-none"
                  color="info"
                  :to="`/project/detail/${item.member.project.code}`"
                >
                  <v-icon>mdi-magnify</v-icon>
                  Project Detail
                </v-btn>
              </v-card-title>
              <v-card-subtitle>{{ item.member.project.code }}</v-card-subtitle>
              <v-card-text>
                <v-row>
                  <v-col cols="auto" lg="3" md="3" sm="12">
                    <label>Log Code</label>
                    <div class="text-subtitle-1 font-weight-bold">#{{ item.code }}</div>
                  </v-col>
                  <v-col cols="auto" lg="3" md="3" sm="12">
                    <label>Log Category</label>
                    <div class="text-subtitle-1 font-weight-bold">{{ item.category }}</div>
                  </v-col>
                  <v-col cols="auto" lg="3" md="3" sm="12">
                    <label>Date</label>
                    <div class="text-subtitle-1 font-weight-bold">{{ $dayjs.getFormattedDate(item.date) }}</div>
                  </v-col>
                  <v-col cols="auto" lg="3" md="3" sm="12">
                    <label>Spent Duration</label>
                    <div class="text-subtitle-1 font-weight-bold">
                      {{ item.time_spent }} (hour)
                    </div>
                  </v-col>
                  <v-col cols="6">
                    <label>Log Description</label>
                    <div class="text-subtitle-1 font-weight-bold">{{ item.description }}</div>
                  </v-col>
                  <v-col cols="6">
                    <label>Note</label>
                    <div class="text-subtitle-1 font-weight-bold">{{ item.note }}</div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </template>
        </v-virtual-scroll>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'ActivitiesPage',
  transition: 'slide-x-transition',
  async asyncData({ $auth, store }) {
    if ($auth.loggedIn)
      await store.dispatch('activity/initActivityList');
  },
  data() {
    return {
      table: {
        search: null,
        headers: [
          { text: 'Code', value: 'code', sortable: false },
          { text: 'Date', value: 'date' },
          { text: 'Category', value: 'category' },
          { text: 'Description', value: 'description' },
          { text: 'Time Spent', value: 'time_spent' },
          { text: 'Project', value: 'member.project.name' },
          { text: 'Responsibility', value: 'member.responsibility' },
        ],
      },
    }
  },
  computed: {
    activities() {
      return this.$store.getters['activity/getActivityList'];
    },
  },
  methods: {
  }
};
</script>
