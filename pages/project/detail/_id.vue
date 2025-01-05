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
          <v-btn v-if="detail?.viewer?.is_captain" depressed icon class="mx-2" @click="dialog.status = true">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </div>
      </v-card-title>
      <v-card-subtitle class="white--text text-4 font-weight-bold">
        {{ detail.code }}
      </v-card-subtitle>
      <v-divider />
      <v-card-text>
        <v-row dense>
          <v-col cols="12">
            <label class="text-subtitle-2 white--text font-weight-bold">Description</label>
            <div class="text-subtitle-1 white--text font-weight-bold">{{ detail.description }}</div>
          </v-col>
          <v-col cols="6">
            <label class="text-subtitle-2 white--text font-weight-bold">Project Deadline</label>
            <div class="text-subtitle-1 white--text font-weight-bold">{{ $dayjs.rangeDateText(detail.start_date, detail.end_date) }}</div>
          </v-col>
          <v-col cols="6">
            <v-row dense>
              <v-col cols="auto">
                <label class="text-subtitle-2 white--text font-weight-bold">Total Days</label>
                <div class="text-subtitle-1 white--text font-weight-bold">{{ $dayjs.durationRangeDateText(detail.start_date, detail.end_date) }} days</div>
              </v-col>
              <v-col cols="auto">
                <div class="d-flex flex-column">
                  <label class="text-subtitle-2 white--text font-weight-bold">Status Deadline</label>
                  <v-chip label small :color="projectDeadlineStatus?.color" :class="`text-subtitle-1 white--text font-weight-bold`">
                    {{ projectDeadlineStatus?.text }}
                  </v-chip>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12">
            <label class="text-subtitle-2 white--text font-weight-bold">Project Members</label>
          </v-col>
          <v-col
            v-for="(item, index) in detail?.member ?? []"
            :key="`item-member-${index}`"
            cols="4"
          >
            <v-list two-line light class="rounded">
              <v-list-item :to="`/activities/member/${item.id}?code=${detail.code}`">
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

                <v-list-item-icon v-if="item.is_captain">
                  <v-tooltip content-class="elevation rounded" right>
                    <template #activator="{ on, attrs }">
                      <v-icon v-bind="attrs" v-on="on">mdi-crown-circle</v-icon>
                    </template>
                    <span>Project Leader</span>
                  </v-tooltip>
                </v-list-item-icon>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12">
            <v-btn
              depressed
              :ripple="false"
              class="text-none"
              color="secondary"
              block
              height="48"
              :to="`/project/daily-log/${detail.code}`"
            >
              Add Logs
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <DialogProjectStatus
      :is-open="dialog.status"
      :current-status="detail.status"
      @onClose="dialog.status = false"
      @onSubmit="doChangeStatus"
    />
  </v-container>
</template>

<script>
import DialogProjectStatus from '@/components/dialog/dialog-project-status.vue';

export default {
  name: 'ProjectDetailPage',
  components: { DialogProjectStatus },
  transition: 'scroll-y-reverse-transition',
  async asyncData({ $auth, params, store }) {
    if ($auth.user) {
      await store.dispatch('project/initProjectDetail', params.id);
    }
  },
  data() {
    return {
      dialog: {
        status: false,
      }
    }
  },
  computed: {
    detail() {
      return this.$store.getters['project/getProjectDetail'];
    },
    projectStatus() {
      return this.$utilities.projectStatus();
    },
    projectDeadlineStatus() {
      const status = this.$dayjs.diffRangeDateText(
        this.detail.start_date,
        this.detail.end_date,
      );

      return status;
    }
  },
  methods: {
    handlerAvatarTitle(fullname) {
      const splitText = fullname.split(' ');

      return splitText.slice(0, 2).map((txt) => txt.slice(0, 1)).join('');
    },
    async doChangeStatus(payload) {
      try {
        this.dialog.status = false;
        await this.$nuxt.$loading.start();

        const res = await this.$store.dispatch('project/initProjectUpdateStatus', {
          id: this.$route.params.id,
          data: { ...payload }
        });

        if (res && res.statusCode === 200) {
          await this.$utilities.snackbar({
            status: true,
            type: 'success',
            message: 'Update status project successfuly',
          });
          await this.$nuxt.$loading.finish();
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
