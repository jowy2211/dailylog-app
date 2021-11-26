<template>
  <v-app>
    <v-main class="grey lighten-2 fill-height">
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer
      app
      rounded="lg"
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
  name: 'Auth',
  data () {
    return {}
  }
}
</script>
