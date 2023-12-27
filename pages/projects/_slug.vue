<template>
  <div>
    <v-card color="transparent" flat>
      <v-card-title>Daily Log</v-card-title>
      <v-card-subtitle>Lorem ipsum dolor sit amet</v-card-subtitle>
      <v-card-text>
        <v-card class="pa-5" rounded="lg" elevation="5">
          <v-card-title>
            Project's Title
          </v-card-title>
          <v-card-subtitle>
            Project's Description
          </v-card-subtitle>
        </v-card>
      </v-card-text>
    </v-card>
    <v-card color="transparent" flat>
      <v-card-text>
        <v-card class="pa-5" rounded="lg" elevation="5">
          <FormLog />
        </v-card>
      </v-card-text>
      <v-card-actions>
        <v-btn
          class="rounded-lg text-none"
          color="secondary"
          text
          depressed
          nuxt
          link
          to="/"
        >
          Back
        </v-btn>
        <v-spacer />
        <v-btn
          class="rounded-lg text-none"
          color="secondary"
          height="44"
          width="150"
          depressed
          nuxt
          link
        >
          Add Log
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import FormLog from '@/components/log/FormLog.vue';

export default {
  name: 'DetailProject',
  layout: 'admin',
  components: {
    FormLog,
  },
  // middleware: 'rbac',
  data() {
    return {}
  },
};
</script>
