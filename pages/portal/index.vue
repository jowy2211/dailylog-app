<template>
  <div>
    <v-card color="transparent" flat>
      <v-card-title>Welcome,</v-card-title>
      <v-card-subtitle>Daily Log Application</v-card-subtitle>
      <v-card-text>
        <CardUser />
      </v-card-text>
    </v-card>
    <v-card color="transparent" flat>
      <v-card-title>Projects</v-card-title>
      <v-card-subtitle>Active Project</v-card-subtitle>
      <v-card-text>
        <v-row justify="start" align="start">
          <v-col
            v-for="n in 3"
            :key="n"
            cols="auto"
            sm="6"
            md="4"
            class="mx-auto"
          >
            <CardProjects />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import CardUser from '@/components/profile/CardUser.vue';
import CardProjects from '@/components/project/CardProject.vue';

export default {
  name: 'Home',
  layout: 'admin',
  components: {
    CardUser,
    CardProjects,
  },
  // middleware: 'rbac',
  data() {
    return {}
  },
};
</script>
