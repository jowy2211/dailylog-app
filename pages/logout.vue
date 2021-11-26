<template>
  <v-container>
    <div class="dailylog-app_text-center">
      <v-overlay :value="true" style="z-index: 999;">
        <v-row>
          <v-col>
            <v-progress-circular indeterminate :button="true" size="100">
              <v-img
                src="/rgb-banner.png"
                class="mx-auto"
                alt="Rolling Glory"
                max-height="50"
                max-width="100"
                lazy-src="/rgb-banner.png"
              />
            </v-progress-circular>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="text-center">
            Waiting to logout...
          </v-col>
        </v-row>
      </v-overlay>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'Logout',
  layout: 'logout',
  middleware: [
    ({ app, redirect }) => {
      if (!app.$auth.loggedIn && !app.$cookies.get('auth._user')) return redirect('/');
      return true;
    },
    'isAuth',
  ],
  head: {
    title: 'Waiting to logout...',
  },
  mounted() {
    if (this.$auth.user) {
      this.logout();
    }
  },
  methods: {
    logout() {
      this.cleanData();
      this.$auth.logout();
    },
    async cleanData() {
      await this.$cookies.remove('auth._user');
    },
  },
};
</script>
