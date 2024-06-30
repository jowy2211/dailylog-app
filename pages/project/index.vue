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
    <v-row>
      <v-col v-for="(item, index) in project" :key="`item-project-${index}`" cols="12" lg="4" md="6" sm="12">
        <v-card
          flat
          nuxt
          link
          :ripple="false"
          class="dailylog-app--card"
          min-height="20vh"
          :to="`/project/detail/${item.code}`"
        >
          <v-card-title>
            <div class="white--text text-h5">{{ item.name }}</div>
          </v-card-title>
          <v-card-subtitle>
            <div class="white--text text-subtitle-1">{{ item.code }}</div>
          </v-card-subtitle>
          <v-divider />
          <v-card-text>
            <v-row dense class="white--text">
              <v-col cols="4">
                <div class="font-weight-bold">Total Member</div>
              </v-col>
              <v-col cols="8">
                : {{ item._count.member }}
              </v-col>
              <v-col cols="4">
                <div class="font-weight-bold">Status</div>
              </v-col>
              <v-col cols="8">
                : <v-chip
                  small
                  label
                  dark
                  :color="projectStatus.find((i) => i.value === item.status)?.color"
                  >
                    {{ projectStatus.find((i) => i.value === item.status)?.text }}
                  </v-chip>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ProjectPage',
  transition: 'scroll-y-reverse-transition',
  async asyncData({ $auth, store }) {
    if ($auth.user) {
      await store.dispatch('user/initUserDetail', $auth.user.employees.code);
      await store.dispatch('project/initProjectList');
    }
  },
  data() {
    return {
      isLoading: false,
    }
  },
  computed: {
    user() {
      return this.$store.getters['user/getUserDetail'];
    },
    project() {
      return this.$store.getters['project/getProjectList'];
    },
    projectStatus() {
      return this.$utilities.projectStatus();
    }
  },
  methods: {}
}
</script>