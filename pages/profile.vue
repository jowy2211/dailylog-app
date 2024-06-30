<template>
  <v-container>
    <v-btn
      dark
      text
      exact
      class="text-none my-2"
      to="/"
    >
      <v-icon>mdi-chevron-left</v-icon>
      Back to Home
    </v-btn>
    <v-card class="dailylog-app--card pa-5" min-height="55vh" flat>
      <v-card-text>
        <v-tabs
          v-model="tabs.active"
          dark
          background-color="transparent"
          slider-size="1"
        >
          <v-tab
            v-for="item in tabs.list"
            :key="item.key"
            :ripple="false"
            class="text-none"
          >
            <v-icon class="mr-4">{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tabs.active" class="transparent my-5">
          <v-tab-item
            v-for="item in tabs.list"
            :key="item.key"
            transition="none"
          >
            <component :is="item.components" :is-loading="isLoading" @onSubmit="doSubmit" />
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import FormProfile from '@/components/form/form-profile.vue';
import FormUpdatePassword from '@/components/form/form-update-password.vue';

export default {
  name: 'ProfilePage',
  transition: 'slide-x-transition',
  async asyncData({ $auth, store }) {
    if ($auth.user) await store.dispatch('user/initUserDetail', $auth.user.employees.code);
  },
  data() {
    return {
      tabs: {
        active: 'my-profile',
        list: [
          {
            title: 'Update Profile',
            icon: 'mdi-account-edit',
            key: 'my-profile',
            components: FormProfile,
          },
          {
            title: 'Security',
            icon: 'mdi-key',
            key: 'security',
            components: FormUpdatePassword,
          },
        ]
      },
    }
  },
  computed: {
    user() {
      return this.$store.getters['user/getUserDetail'];
    },
    isLoading() {
      return this.$store.getters['user/getUserLoading'];
    }
  },
  methods: {
    async doSubmit(data) {
      try {
        await this.$nuxt.$loading.start();
  
        const res = await this.$store.dispatch(
          'user/initUserUpdate',
          {
            id: this.$auth.user.employees.code,
            data: data.payload
          }
        );
  
        if (res && res.statusCode === 200) {
          if (data.case === 'update-profile') {
            await this.$utilities.snackbar({
              status: true,
              type: 'success',
              message: 'Update profile successfuly',
            });
  
            await this.$nuxt.$loading.finish();
          }

          if (data.case === 'update-password') {
            await this.$utilities.snackbar({
              status: true,
              type: 'success',
              message: 'Update password successfuly. Please do re-login.',
            });
  

            await this.$auth.logout();
            await this.$nuxt.refresh();
            await this.$router.push('/');
          }
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