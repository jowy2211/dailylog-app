<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="12">
      <v-card class="my-2" color="transparent" flat>
        <v-card-title>News</v-card-title>
        <v-card-subtitle>Lorem ipsum dolor sit amet</v-card-subtitle>
      </v-card>
      <v-card class="my-2" color="transparent" flat>
        <v-row justify="start" align="start" no-gutters>
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
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import CardProjects from '~/components/project/CardProject.vue';

export default {
  name: 'PortalNews',
  components: {
    CardProjects,
  },
  middleware: 'rbac',
  data() {
    return {}
  },
};
</script>
