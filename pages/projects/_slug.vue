<template>
  <v-row justify="center" align="center" no-gutters>
    <v-col cols="12">

    </v-col>
    <v-col cols="12">
      <v-card color="transparent" flat>
        <v-card-title>Daily Log</v-card-title>
        <v-card-subtitle>Lorem ipsum dolor sit amet</v-card-subtitle>
        <v-card-text>
          <v-card class="py-5 px-5" rounded="xl" elevation="5">
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
          <v-card class="py-5 px-5" rounded="xl" elevation="5">
            <FormLog />
          </v-card>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            class="mx-2"
            width="150"
            rounded
            color="secondary"
          >
            Add Log
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import FormLog from '@/components/log/FormLog.vue';

export default {
  name: 'DetailProject',
  components: {
    FormLog,
  },
  middleware: 'rbac',
  data() {
    return {}
  },
};
</script>
