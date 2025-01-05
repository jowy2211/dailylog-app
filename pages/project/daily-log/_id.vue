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
      flat
      class="dailylog-app--card"
    >
      <v-card-title class="text-h4 white--text">Add Daily Log</v-card-title>
      <v-card-subtitle class="text-subtitle-1 white--text">Detail Project</v-card-subtitle>
      <v-divider />
      <v-card-text>
        <FormActivity @onSubmit="doSubmit" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import FormActivity from '@/components/form/form-activity.vue';

export default {
  name: 'ProjectDailyLogPage',
  components: { FormActivity },
  transition: 'slide-x-transition',
  async asyncData({ store, params }) {
    await store.dispatch('project/initProjectDetail', params.id);
  },
  methods: {
    async doSubmit(payload) {
      try {
        await this.$nuxt.$loading.start();

        const res = await this.$store.dispatch('activity/initActivityCreate', { logs: [payload] });

        if (res && res.statusCode === 201) {
          await this.$utilities.snackbar({
            status: true,
            type: 'success',
            message: 'Add logs successfuly',
          });

          await this.$router.push('/activities');
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
};
</script>