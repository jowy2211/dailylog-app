<template>
  <v-container>
    <v-btn
      dark
      text
      exact
      class="text-none my-2"
      to="/project"
    >
      <v-icon>mdi-chevron-left</v-icon>
      Back
    </v-btn>
    <v-card
      v-if="detail"
      flat
      nuxt
      link
      :ripple="false"
      class="dailylog-app--card"
      min-height="20vh"
    >
      <v-card-title class="flex align-center justify-space-between">
        <div class="white--text text-h3 font-weight-bold">
          {{ detail.name }}
        </div>
        <div>
          <v-chip
            label
            dark
            class="font-weight-light"
            :color="projectStatus.find((item) => item.value === detail.status)?.color"
          >
            {{ projectStatus.find((item) => item.value === detail.status)?.text }}
          </v-chip>
        </div>
      </v-card-title>
      <v-card-subtitle class="white--text text-4 font-weight-bold">
        {{ detail.code }}
      </v-card-subtitle>
      <v-divider />
      <v-card-text>
        <v-row dense>
          <v-col
            v-for="(item, index) in detail?.member ?? []"
            :key="`item-member-${index}`"
            cols="4"
          >
            <v-list two-line light class="rounded">
              <v-list-item>
                <v-list-item-avatar>
                  <v-avatar
                    size="36"
                    color="primary white--text text-center"
                  >
                    {{ handlerAvatarTitle(item.employee.fullname) }}
                  </v-avatar>
                </v-list-item-avatar>
  
                <v-list-item-content>
                  <v-list-item-title>{{ item.employee.fullname }}</v-list-item-title>
                  <v-list-item-subtitle><small>{{ item.employee.code }}</small> - {{ item.employee.email }}</v-list-item-subtitle>
                  <v-list-item-subtitle>{{ item.responsibility }} - <small>{{ item.description }}</small></v-list-item-subtitle>
                </v-list-item-content>

                <!-- <v-list-item-icon>
                  <v-icon>mdi-crown-circle</v-icon>
                </v-list-item-icon> -->
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'ProjectDetailPage',
  transition: 'scroll-y-reverse-transition',
  async asyncData({ $auth, params, store }) {
    if ($auth.user) {
      await store.dispatch('project/initProjectDetail', params.id);
    }
  },
  data() {
    return {}
  },
  computed: {
    detail() {
      return this.$store.getters['project/getProjectDetail'];
    },
    projectStatus() {
      return this.$utilities.projectStatus();
    }
  },
  methods: {
    handlerAvatarTitle(fullname) {
      const splitText = fullname.split(' ');

      return splitText.slice(0, 2).map((txt) => txt.slice(0, 1)).join('');
    }
  }
}
</script>
