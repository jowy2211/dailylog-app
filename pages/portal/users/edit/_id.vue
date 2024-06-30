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
      <v-card-title class="text-h4 white--text">Update Existing User</v-card-title>
      <v-card-subtitle class="text-subtitle-1 white--text"></v-card-subtitle>
      <v-card-text>
        <FormUser form-type="EDIT" :detail="{ ...userEmployee }" @onSubmit="doSubmit" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import FormUser from '@/components/form/form-user.vue';

export default {
  name: 'EditPortalUserPage',
  components: { FormUser },
  transition: 'slide-x-transition',
  async asyncData({ $auth, store, params }) {
    const detail = await store.getters['user/getUserDetail'];

    if ($auth.loggedIn) {
      if (!detail) await store.dispatch('user/initUserDetail', params.id);
      await store.dispatch('user/initRoleList');
      await store.dispatch('user/initPositionList');
    }
  },
  computed: {
    userEmployee() {
      return this.$store.getters['user/getUserDetail'];
    }
  },
  methods: {
    async doSubmit(payload) {
      try {
        await this.$nuxt.$loading.start();

        const res = await this.$store.dispatch('user/initUserUpdate', { id: this.$route.params.id, data: payload });

        if (res && res.statusCode === 200) {
          await this.$utilities.snackbar({
            status: true,
            type: 'success',
            message: 'Update user successfuly',
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