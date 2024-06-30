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
      dark
      flat
      class="dailylog-app--card"
    >
      <v-card-title>Add Daily Log</v-card-title>
      <v-card-subtitle>Detail Project</v-card-subtitle>
      <v-card-text>
        <v-form>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'ProjectDailyLogPage',
  transition: 'slide-x-transition',
};
</script>