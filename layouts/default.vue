<template>
  <v-app>
    <v-app-bar
      app
      dense
      rounded="md"
      elevation="5"
      color="white"
      hide-on-scroll
    >
      <v-container class="py-0 fill-height">
        <v-img
          src="/rgb-banner.png"
          class="mx-auto"
          alt="Rolling Glory"
          max-height="50"
          max-width="200"
          lazy-src="/rgb-banner.png"
        />
        <v-spacer class="d-none d-sm-flex" />
        <v-responsive max-width="260" class="d-none d-sm-flex">
            <v-text-field
              dense
              flat
              hide-details
              rounded
              solo-inverted
              placeholder="Search . . ."
            />
          </v-responsive>
      </v-container>
      <template #extension>
        <v-container class="py-0 fill-height">
          <v-btn
            text
            small
            rounded
            class="my-auto"
            to="/"
          >
            Dashboard
          </v-btn>

          <v-btn
            text
            small
            rounded
            class="my-auto"
            to="/portal/news"
          >
            News
          </v-btn>

          <v-btn
            text
            small
            rounded
            class="my-auto"
            to="/portal/bulletin"
          >
            Bulletin
          </v-btn>
        </v-container>
      </template>
    </v-app-bar>

    <v-main class="grey lighten-2">
      <v-container>
        <v-row align="start" justify="space-around">
          <v-col cols="12" sm="6" md="2">
            <v-card rounded="xl" elevation="5"  class="my-2">
              <v-list color="transparent" class="py-5">
                <v-list-item link to="/profile">
                  <v-list-item-content>
                    <v-list-item-title>
                      Profile
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item link to="/projects">
                  <v-list-item-content>
                    <v-list-item-title>
                      Projects
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2" />

                <v-list-item>
                  <v-list-item-content>
                    <v-btn
                      color="secondary"
                      small
                      rounded
                      block
                      @click="doLogout"
                    >
                      Log Out
                    </v-btn>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" md="10">
            <nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer
      app
      rounded="md"
      elevation="5"
      class="text-center"
    >
      <v-row align="center" justify="center">
        <v-col>
          <span>Rolling Glory &copy; {{ new Date().getFullYear() }}</span>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {}
  },
  methods: {
    async doLogout() {
      await this.$auth.logout();
      await this.$router.push('/logout');
    }
  }
}
</script>
