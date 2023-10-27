<template>
  <v-app>
    <v-main class="grey lighten-4">
      <nuxt />
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
  name: 'Auth',
  data () {
    return {}
  }
}
</script>
