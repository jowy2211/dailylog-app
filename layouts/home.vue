<template>
  <v-app>
    <v-app-bar app dark flat color="transparent" class="pa-0 ma-0 dailylog-app--card">
      <v-container fluid>
        <v-row align="center" justify="space-between" no-gutters>
          <v-col cols="auto">
            <v-btn
              text
              plain
              :ripple="false"
              class="text-none"
              to="/"
            >
              <div class="text-h5">
                Daily Log Application
              </div>
            </v-btn>
          </v-col>
          <v-col v-if="!isLoggedIn" cols="auto">
            <v-tooltip bottom>
              <template #activator="{ on, attrs }">
                <v-btn
                  text
                  v-bind="attrs"
                  v-on="on"
                  @click="dialog.status = true"
                >
                <v-icon>mdi-login</v-icon>
                </v-btn>
              </template>
              <span>Log In</span>
            </v-tooltip>
          </v-col>
          <v-col v-if="isLoggedIn" cols="auto">
            <template v-if="user?.role?.code === 'ADMIN'">
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-btn
                    text
                    to="/portal"
                    nuxt
                    link
                    v-bind="attrs"
                    v-on="on"
                  >
                  <v-icon>mdi-application-cog</v-icon>
                  </v-btn>
                </template>
                <span>Portal</span>
              </v-tooltip>
            </template>
            <template v-else>
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-btn
                    text
                    to="/daily-log"
                    nuxt
                    link
                    v-bind="attrs"
                    v-on="on"
                  >
                  <v-icon>mdi-account-clock</v-icon>
                  </v-btn>
                </template>
                <span>Daily Log</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-btn
                    text
                    to="/profile"
                    nuxt
                    link
                    v-bind="attrs"
                    v-on="on"
                  >
                  <v-icon>mdi-account</v-icon>
                  </v-btn>
                </template>
                <span>My Profile</span>
              </v-tooltip>
            </template>
            <v-tooltip bottom>
              <template #activator="{ on, attrs }">
                <v-btn
                  text
                  v-bind="attrs"
                  v-on="on"
                  @click="doLogout"
                >
                <v-icon>mdi-logout</v-icon>
                </v-btn>
              </template>
              <span>Log Out</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <v-img
      lazy-src="images/bg-home.jpg"
      src="images/bg-home.jpg"
      alt="Background Home"
      class="dailylog-app--bg-home pa-0 ma-0"
      gradient="0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)"
    >
      <v-main style="height: 100%; overflow-y: auto;">
        <Nuxt />
      </v-main>
    </v-img>
    <DialogLogin
      :is-open="dialog.status"
      @onClose="dialog.status = false"
      @onSubmit="doLogin"
    />
    <Snackbar />
  </v-app>
</template>

<script>
import DialogLogin from '@/components/dialog/dialog-login.vue';
import Snackbar from '@/components/utilities/snackbar.vue';

export default {
  name: 'DefaultLayout',
  components: { DialogLogin, Snackbar },
  data() {
    return {
      dialog: {
        status: false,
      }
    }
  },
  computed: {
    isLoggedIn() {
      return this.$auth.loggedIn;
    },
    user() {
      return this.$auth.user;
    }
  },
  methods: {
    async doLogin(payload) {
      try {
        await this.$nuxt.$loading.start();
  
        const {
          data,
          status
        } = await this.$auth.loginWith('local', { data: payload });
  
        if (status === 201 && data) {
          this.dialog.status = false;

          await this.$utilities.snackbar({
            status: true,
            type: 'success',
            message: 'Login successfuly',
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
    async doLogout() {
      try {
        await this.$nuxt.$loading.start();
        
        await this.$auth.logout();

        await this.$utilities.snackbar({
          status: true,
          type: 'success',
          message: 'Logout successfuly',
        });

        await this.$nuxt.refresh();
        await this.$router.push('/');
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
  },
}
</script>

<style scoped lang="scss">
.dailylog-app--bg-home {
  height: 100vh;
  max-height: 100%;
  width: 100%;
  position: absolute;
  object-fit: cover;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
