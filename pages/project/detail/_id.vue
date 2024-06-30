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
      dark
      flat
      nuxt
      link
      :ripple="false"
      class="dailylog-app--card"
      min-height="20vh"
    >
      <v-card-title class="flex align-center justify-space-between">
        <div class="text-h3 font-weight-bold">
          {{ detail && detail.name }}
        </div>
        <div>
          <v-chip class="font-weight-light text-none" color="info">{{ detail && detail.status }}</v-chip>
        </div>
      </v-card-title>
      <v-card-subtitle class="font-weight-bold">{{ detail && detail.code }}</v-card-subtitle>
      <v-divider />
      <v-card-text>
        <v-row dense>
          <v-col v-for="(item, index) in detail?.member ?? []" :key="`item-member-${index}`" cols="4">
            <v-list three-line light class="rounded">
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

                <v-list-item-icon>
                  <v-icon>mdi-crown-circle</v-icon>
                </v-list-item-icon>
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
    }
  },
  methods: {
    handlerAvatarTitle(fullname) {
      const splitText = fullname.split(' ');

      if (splitText.legth > 2) return splitText.pop().map((txt) => txt.slice(0, 1)).join('');

      return splitText.map((txt) => txt.slice(0, 1)).join('')
    }
  }
}
</script>
