<template>
  <v-card
    class="py-5 px-5 my-2 mx-2"
    rounded="xl"
    elevation="5"
    nuxt
    link
    :to="`/projects/${slug}`"
  >
      <v-card-title>
        <span>Project's Name</span>
        <v-spacer />
        <span class="text-subtitle-1 success--text">Active</span>
      </v-card-title>
      <v-card-subtitle class="text-caption">
        Begin 01 Sept 2021 - End 31 Nov 2021<br />
        Progress 85%
      </v-card-subtitle>
      <v-card-text>
        <p>Detail Projects</p>
      </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'CardProjects',
  props: {
    slug: {
      type: String,
      default: 'project-0',
    },
  },
  data() {
    return {}
  },
};
</script>
