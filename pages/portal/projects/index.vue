<template>
  <v-container>
    <v-btn
      dark
      text
      exact
      class="text-none my-2"
      to="/portal"
    >
      <v-icon>mdi-chevron-left</v-icon>
      Back to Portal
    </v-btn>
    <v-card dark flat class="dailylog-app--card pa-5">
      <v-card-title>Project Management</v-card-title>
      <v-card-subtitle>List data table projects</v-card-subtitle>
      <v-divider />
      <v-card-text>
        <v-row align="center">
          <v-col cols="6">
            <v-text-field
              v-model="table.search"
              label="Search"
              solo
              flat
              light
              hide-details
              append-icon="mdi-magnify"
            />
          </v-col>
          <v-col cols="6">
            <v-btn
              text
              class="text-none float-right"
              height="48"
              link
              nuxt
              to="/portal/projects/create"
            >
              <v-icon>mdi-plus</v-icon>
              Add New Project
            </v-btn>
          </v-col>
          <v-col cols="12">
            <v-data-table
              light
              :headers="table.headers"
              :search="table.search"
              :items="projects"
              :items-per-page="10"
            >
              <template #[`item.status`]="{ item }">
                <v-chip label small dark :color="status.find((i) => i.value === item.status)?.color" class="font-weight-bold">
                  {{ status.find((i) => i.value === item.status)?.text ?? '-' }}
                </v-chip>
              </template>
              <template #[`item.action`]="{ item }">
                <v-tooltip content-class="elevation rounded" left>
                  <template #activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      class="elevation rounded mr-1"
                      icon
                      small
                      v-on="on"
                      @click="editItem(item)"
                    >
                      <v-icon small color="info"> mdi-pencil </v-icon>
                    </v-btn>
                  </template>
                  <span>Edit Item</span>
                </v-tooltip>
                <v-tooltip content-class="elevation rounded" right>
                  <template #activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      class="elevation rounded mr-1"
                      icon
                      small
                      v-on="on"
                      @click="openDialog(item)"
                    >
                      <v-icon small color="error"> mdi-delete </v-icon>
                    </v-btn>
                  </template>
                  <span>Remove Item</span>
                </v-tooltip>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <DialogConfirmation
      :is-open="dialog.status"
      @onClose="dialog.status = false"
      @onConfirm="removeItem"
    />
  </v-container>
</template>

<script>
import DialogConfirmation from '@/components/dialog/dialog-confirmation.vue';

export default {
  name: 'PortalProjectPage',
  components: { DialogConfirmation },
  transition: 'slide-x-transition',
  async asyncData({ $auth, store }) {
    if ($auth.loggedIn)
      await store.dispatch('project/initPortalProjectList');
  },
  data() {
    return {
      dialog: {
        status: false,
        selected: null,
      },
      table: {
        search: null,
        headers: [
          { text: 'Code', value: 'code', sortable: false },
          { text: 'Title', value: 'name' },
          { text: 'Start Project', value: 'start_date' },
          { text: 'End Project', value: 'end_date' },
          { text: 'Total Member', value: '_count.member' },
          { text: 'Status', value: 'status' },
          { text: 'Action', value: 'action', align: 'center', sortable: false },
        ],
      },
    }
  },
  computed: {
    projects() {
      return this.$store.getters['project/getProjectList'];
    },
    status() {
      return this.$utilities.projectStatus();
    }
  },
  methods: {
    async editItem(item) {
      try {
        await this.$nuxt.$loading.start();

        const res = await this.$store.dispatch('project/initProjectDetail', item.code);

        if (res && res.statusCode === 200) {
          await this.$router.push(`/portal/projects/edit/${item.code}`)
        }
      } catch (error) {
        await this.$nuxt.$loading.finish();
        const err = error.data;

        await this.$utilities.snackbar({
          status: true,
          type: 'error',
          message: err?.message ?? error.message,
        });
      }
    },
    openDialog(item) {
      this.dialog = {
        status: true,
        selected: item,
      }
    },
    async removeItem() {
      try {
        await this.$nuxt.$loading.start();

        await this.$store.dispatch(
          'project/initProjectRemove',
          this.dialog.selected.id,
        );

        this.dialog = {
          status: false,
          selected: null,
        };

        await this.$nuxt.$loading.finish();
        await this.$utilities.snackbar({
          status: true,
          type: 'success',
          message: 'Remove project successfuly',
        });

        await this.$store.dispatch('project/initPortalProjectList');
      } catch (error) {
        this.dialog = {
          status: false,
          selected: null,
        };
        await this.$nuxt.$loading.finish();
        const err = error.data;

        await this.$utilities.snackbar({
          status: true,
          type: 'error',
          message: err?.message ?? error.message,
        });
      }
    }
  }
};
</script>
