<template>
  <v-container>
    <v-btn
      dark
      text
      exact
      class="text-none my-2"
      to="/portal/users"
    >
      <v-icon>mdi-chevron-left</v-icon>
      Back to Projects
    </v-btn>
    <v-card flat class="dailylog-app--card pa-5">
      <v-card-title class="text-h4 white--text">Add New User</v-card-title>
      <v-card-subtitle class="text-subtitle-1 white--text">Record user employee</v-card-subtitle>
      <v-card-text>
        <FormUser form-type="CREATE" @onSubmit="doSubmit" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import FormUser from '@/components/form/form-user.vue';

export default {
  name: 'CreatePortalUserPage',
  components: { FormUser },
  transition: 'slide-x-transition',
  async asyncData({ $auth, store }) {
    if ($auth.loggedIn) {
      await store.dispatch('user/initRoleList');
      await store.dispatch('user/initPositionList');
    }
  },
  methods: {
    async doSubmit(payload) {
      try {
        await this.$nuxt.$loading.start();

        const res = await this.$store.dispatch('user/initUserCreate', payload);

        if (res && res.statusCode === 201) {
          await this.$utilities.snackbar({
            status: true,
            type: 'success',
            message: 'Create new user successfuly',
          });

          await this.$router.push('/portal/users');
        }
      } catch (error) {
        await this.$nuxt.$loading.finish();
        const err = error.data;

        await this.$utilities.snackbar({
          status: true,
          type: 'error',
          message: err?.message || error.message,
        });
      }
    }
  }
}
</script>