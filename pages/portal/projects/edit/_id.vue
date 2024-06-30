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
      <v-card-title class="text-h4 white--text">Update Existing Project</v-card-title>
      <v-card-subtitle class="text-subtitle-1 white--text">{{ `${project?.code} - ${project?.name}` }}</v-card-subtitle>
      <v-card-text>
        <FormProject form-type="EDIT" :detail="{ ...project }" @onSubmit="doSubmit" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import FormProject from '@/components/form/form-project.vue';

export default {
  name: 'EditPortalProjectPage',
  components: { FormProject },
  transition: 'slide-x-transition',
  async asyncData({ $auth, store, params }) {
    let detail = await store.getters['project/getProjectDetail'];
    await store.commit('user/INIT_ADD_MEMBER', []);

    if ($auth.loggedIn) {
      await store.dispatch('user/initEmployeeList');

      if (!detail) {
        await store.dispatch('project/initProjectDetail', params.id);
        detail = await store.getters['project/getProjectDetail'];
      }

      for (let index = 0; index < detail?.member.length; index++) {
        const item = detail?.member[index];
        await store.dispatch(
          'user/initAddMember',
          {
            ...item,
            employee: {
              text: `${item.employee.fullname} [${item.employee.position.name}]`,
              value: item.employee.id,
            }
          },
        );
      }
    }
  },
  computed: {
    project() {
      return this.$store.getters['project/getProjectDetail'];
    }
  },
  methods: {
    async doSubmit(payload) {
      try {
        await this.$nuxt.$loading.start();

        const res = await this.$store.dispatch('project/initProjectUpdate', { id: this.$route.params.id, data: payload });

        if (res && res.statusCode === 200) {
          await this.$utilities.snackbar({
            status: true,
            type: 'success',
            message: 'Update project successfuly',
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