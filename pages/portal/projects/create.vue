<template>
  <v-container>
    <v-btn
      dark
      text
      exact
      class="text-none my-2"
      to="/portal/projects"
    >
      <v-icon>mdi-chevron-left</v-icon>
      Back to Projects
    </v-btn>
    <v-card flat class="dailylog-app--card pa-5">
      <v-card-title class="text-h4 white--text">Add New Project</v-card-title>
      <v-card-subtitle class="text-subtitle-1 white--text">Record Opportunities Potential Project</v-card-subtitle>
      <v-card-text>
        <FormProject form-type="CREATE" @onSubmit="doSubmit" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import FormProject from '@/components/form/form-project.vue';

export default {
  name: 'CreatePortalProjectPage',
  components: { FormProject },
  transition: 'slide-x-transition',
  async asyncData({ $auth, store }) {
    await store.commit('user/INIT_ADD_MEMBER', []);
    if ($auth.loggedIn) await store.dispatch('user/initEmployeeList');
  },
  methods: {
    async doSubmit(payload) {
      try {
        await this.$nuxt.$loading.start();

        const res = await this.$store.dispatch('project/initProjectCreate', payload);

        if (res && res.statusCode === 201) {
          await this.$utilities.snackbar({
            status: true,
            type: 'success',
            message: 'Create new project successfuly',
          });

          await this.$router.push('/portal/projects');
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