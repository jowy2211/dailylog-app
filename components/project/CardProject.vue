<template>
  <v-hover>
    <template #default="{ hover }">
      <v-card
        rounded="lg"
        :elevation="hover ? 20 : 5"
        class="pa-2"
        :ripple="false"
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
  </v-hover>
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
