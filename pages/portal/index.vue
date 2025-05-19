<template>
  <v-container fluid class="px-5">
    <v-row dense>
      <v-col cols="12">
        <v-card dark flat class="dailylog-app--card">
          <v-card-text>
            <v-row align="start" justify="space-between">
              <v-col cols="auto">
                <v-row v-if="isLoggedIn && user?.role?.code === 'ADMIN'" dense>
                  <v-col cols="12">
                    <div class="text-h2 mx-4">Welcome to Portal Admin!</div>
                    <div class="text-h6 mx-4">Navigation Management Data</div>
                  </v-col>
                  <v-col cols="auto">
                    <v-btn
                      text
                      exact
                      class="text-none"
                      nuxt
                      link
                      to="/portal/projects"
                    >
                      Projects
                    </v-btn>
                  </v-col>
                  <v-col cols="auto">
                    <v-btn
                      text
                      exact
                      class="text-none"
                      nuxt
                      link
                      to="/portal/users"
                    >
                      Users
                    </v-btn>
                  </v-col>
                  <v-col cols="auto">
                    <v-btn
                      text
                      exact
                      class="text-none"
                      @click="dialog.status = true"
                    >
                      Import Daily Logs
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row v-if="isLoggedIn && user?.role?.code === 'PROJECT_MANAGER'">
                  <v-col cols="12">
                    <div class="text-h2 mx-4">Welcome to Portal Admin!</div>
                    <div class="text-h6 mx-4">Apply filter to view Dashboard</div>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      v-model="filter.project_id"
                      :items="project"
                      item-text="name"
                      item-value="id"
                      light
                      solo
                      flat
                      placeholder="Select Project"
                    />
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="auto">
                <v-row dense>
                  <v-col cols="12">
                    <div class="text-h3">{{ time.text }}</div>
                    <div class="text-h5">{{ time.full }}</div>
                    <div class="text-h5">{{ time.now }}</div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <DashboardExecutive
      v-if="isLoggedIn && user?.role?.code === 'ADMIN'"
      :filter="filter"
      @onApplyFilter="handlerApplyFilter"
    />
    <DashboardProjectManager
      v-if="isLoggedIn && user?.role?.code === 'PROJECT_MANAGER'"
      :filter="filter"
      @onApplyFilter="handlerApplyFilter"
    />
    <DialogImportFile
      :is-open="dialog.status"
      @onSubmit="handlerSubmit"
      @onClose="dialog.status = false"
    />
  </v-container>
</template>

<script>
import DashboardExecutive from '@/components/dashboards/executive.vue';
import DashboardProjectManager from '@/components/dashboards/project-manager.vue';
import DialogImportFile from '@/components/dialog/dialog-import-file.vue';

export default {
  name: 'PortalPage',
  components: { DialogImportFile, DashboardExecutive, DashboardProjectManager },
  transition: 'slide-x-transition',
  async asyncData({ $auth, store }) {
    if ($auth.user && $auth.user?.employees?.code !== 'ADMIN') {
      await store.dispatch('project/initProjectList');
      // const projects = await store.getters['project/getProjectList'];
    }
  },
  data() {
    return {
      table: {
        headers: [
          { text: 'Code', value: 'code', sortable: false },
          { text: 'Title', value: 'name' },
          { text: 'Start Project', value: 'start_date' },
          { text: 'End Project', value: 'end_date' },
          { text: 'Total Member', value: '_count.member' },
          { text: 'Status', value: 'status' }
        ],
        items: [],
        search: null
      },
      time: {
        interval: null,
        now: this.$dayjs.getTime(),
        text: this.$dayjs.getText(),
        full: this.$dayjs.getFormattedDate()
      },
      dialog: {
        status: false,
        selected: null,
      },
      filter: {
        project_id: null,
        start_date: new Date('2023-01-01'),
        end_date: new Date()
      }
    };
  },
  computed: {
    isLoggedIn() {
      return this.$auth.loggedIn;
    },
    status() {
      return this.$utilities.projectStatus();
    },
    user() {
      return this.$auth.user;
    },
    project() {
      return this.$store.getters['project/getProjectList'];
    },
  },
  beforeDestroy() {
    if (this.time.interval) clearInterval(this.time.interval);
  },
  async mounted() {
    if (!this.time.interval) this.renderTime();

    await this.handlerApplyFilter();
  },
  methods: {
    async handlerApplyFilter(payload) {
      try {
        if (payload) {
          this.filter = payload;
        }

        await Promise.all([
          this.$store.dispatch('dashboard/initDashboardPerformance', {
            params: {...this.filter}
          }),
          this.$store.dispatch('dashboard/initDashboardWorkload', {
            params: {...this.filter}
          }),
          this.$store.dispatch('dashboard/initDashboardProductivity', {
            params: {...this.filter}
          }),
          this.$store.dispatch('dashboard/initDashboardTrend', {
            params: {...this.filter}
          }),
        ]);
      } catch (error) {
        const err = error.data;

        await this.$utilities.snackbar({
          status: true,
          type: 'error',
          message: err?.message || error.message,
        });
      }
    },
    async handlerSubmit(payload) {
      try {
        await this.$nuxt.$loading.start();
        this.dialog.status = false;
        const formData = new FormData();
  
        formData.append('file', payload?.file);

        const res = await this.$store.dispatch(
          'activity/initImportActivity',
          { formData, member_id: payload?.member_id },
        );

        if (res) {
          await this.$nuxt.$loading.finish();

          await this.$utilities.snackbar({
            status: true,
            type: 'success',
            message: 'Successfuly Imported!',
          });

          await this.$nuxt.refresh();
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
    },
    renderTime() {
      clearInterval(this.time.interval);
      if (!this.time.interval) {
        this.time.interval = setInterval(() => {
          this.time.now = this.$dayjs.getTime();
          this.time.text = this.$dayjs.getText();
        }, 1000);
      }
    },
  }
}
</script>