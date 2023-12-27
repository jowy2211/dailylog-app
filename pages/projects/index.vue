<template>
  <v-card class="my-2" color="transparent" flat>
    <v-card-title>My Projects</v-card-title>
    <v-card-subtitle>Lorem ipsum dolor sit amet</v-card-subtitle>
    <v-card-text>
      <v-row justify="space-around" align="center">
        <v-col
          v-for="n in 3"
          :key="n"
          cols="auto"
          sm="6"
          md="4"
        >
          <CardProjects :slug="`project-${n+1}`" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import CardProjects from '~/components/project/CardProject.vue';

export default {
  name: 'Projects',
  layout: 'admin',
  components: {
    CardProjects,
  },
  // middleware: 'rbac',
  data() {
    return {}
  },
  head: {
    title: 'My Projects',
  },
};
</script>
