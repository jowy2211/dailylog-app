<template>
  <v-app>
    <v-app-bar
      app
      flat
      hide-on-scroll
      color="white"
      elevation="5"
    >
      <v-container>
        <v-row align="center" justify="space-between">
          <v-col cols="auto">
            <v-img
              lazy-src="/spn-logo.png"
              src="/spn-logo.png"
              alt="Supernova Logo"
              height="100%"
              width="200"
              contain
            />
          </v-col>
          <v-col cols="auto">
            <v-text-field
              dense
              flat
              hide-details
              solo-inverted
              class="rounded-lg"
              placeholder="Search . . ."
            />
          </v-col>
        </v-row>
      </v-container>
      <template #extension>
        <v-container>
          <v-row align="center" justify="space-between">
            <v-col cols="auto">
              <v-btn
                class="rounded-lg text-none"
                color="primary"
                text
                plain
                nuxt
                link
                to="/"
              >
                Home
              </v-btn>
              <v-btn
                class="rounded-lg text-none"
                color="primary"
                text
                plain
                nuxt
                link
                to="/profile"
              >
                Profile
              </v-btn>
              <v-btn
                class="rounded-lg text-none"
                color="primary"
                text
                plain
                nuxt
                link
                to="/projects"
              >
                Projects
              </v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn
                class="rounded-lg text-none"
                color="secondary"
                text
                plain
                nuxt
                link
                to="/logout"
              >
                Log Out
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </v-app-bar>

    <v-main class="grey lighten-4">
      <v-container>
        <v-breadcrumbs :items="breadcrumbs" />
        <nuxt />
      </v-container>
    </v-main>

    <v-footer
      app
      elevation="5"
      class="text-center"
    >
      <v-row align="center" justify="center">
        <v-col>
          <span>Supernova Corp Ltd. &copy; {{ new Date().getFullYear() }}</span>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      breadcrumbs: [
        {
          text: 'Home',
          disabled: true,
          exact: false,
          to: '/',
        }
      ]
    }
  },
  methods: {
    async doLogout() {
      await this.$router.push('/logout');
    }
  }
}
</script>
