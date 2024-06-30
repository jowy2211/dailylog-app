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
          dark
          flat
          nuxt
          link
          :ripple="false"
          class="dailylog-app--card"
          min-height="20vh"
          :to="`/project/detail/${item.code}`"
        >
          <v-card-title>{{ item.name }}</v-card-title>
          <v-card-subtitle>{{ item.code }}</v-card-subtitle>
          <v-divider />
          <v-card-text>
            <v-row dense>
              <v-col cols="4">
                Total Member
              </v-col>
              <v-col cols="8">
                : {{ item._count.member }}
              </v-col>
              <v-col cols="4">
                Status
              </v-col>
              <v-col cols="8">
                : {{ item.status }}
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
    }
  },
  methods: {}
}
</script>