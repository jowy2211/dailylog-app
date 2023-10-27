<template>
  <v-form
    ref="form"
  >
    <v-row no-gutters>
      <v-col cols="12" class="mb-3 px-2">
        <h5 class="text-h5 font-weight-light">Log - {{ date }}</h5>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" class="px-2">
        <v-text-field
          label="What I've Done Today ?"
          class="rounded-lg"
          solo
          flat
          dark
          placeholder="Detail activities"
        />
      </v-col>
      <v-col cols="12" class="px-2">
        <v-text-field
          label="Duration"
          class="rounded-lg"
          solo
          flat
          dark
          placeholder="How long ?"
        />
      </v-col>
      <v-col cols="12" class="px-2">
        <v-text-field
          label="Any issues ? How are you feeling today ?"
          class="rounded-lg"
          solo
          flat
          dark
          placeholder="Share your issues"
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import moment from 'moment';

export default {
  name: 'FormLog',
  data() {
    return {}
  },
  computed: {
    date() {
      return moment().format('dddd, DD MMMM YYYY');
    }
  },
};
</script>
