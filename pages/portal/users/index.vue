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
      <v-card-title>User Management</v-card-title>
      <v-card-subtitle>List data table users</v-card-subtitle>
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
              to="/portal/users/create"
            >
              <v-icon>mdi-plus</v-icon>
              Add New User
            </v-btn>
          </v-col>
          <v-col cols="12">
            <v-data-table
              light
              :headers="table.headers"
              :search="table.search"
              :items="users"
              :items-per-page="10"
            >
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
  name: 'PortalUserPage',
  components: { DialogConfirmation },
  transition: 'slide-x-transition',
  async asyncData({ $auth, store }) {
    if ($auth.loggedIn)
      await store.dispatch('user/initUserList');
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
          { text: 'Code', value: 'employees.code', sortable: false },
          { text: 'Fullname', value: 'employees.fullname' },
          { text: 'Email', value: 'employees.email' },
          { text: 'Position', value: 'employees.position.name' },
          { text: 'Action', value: 'action', align: 'center', sortable: false },
        ],
      },
    }
  },
  computed: {
    users() {
      return this.$store.getters['user/getUserList'];
    },
  },
  methods: {
    async editItem(item) {
      try {
        await this.$nuxt.$loading.start();

        const res = await this.$store.dispatch('user/initUserDetail', item.employees.code);

        if (res && res.statusCode === 200) {
          await this.$router.push(`/portal/users/edit/${item.employees.code}`)
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
          'user/initUserRemove',
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
          message: 'Remove user successfuly',
        });

        await this.$store.dispatch('user/initUserList');
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
