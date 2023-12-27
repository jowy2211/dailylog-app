<template>
  <v-row dense align="center" justify="space-between" class="flex-column fill-height">
    <v-col cols="auto">
      <div></div>
    </v-col>
    <v-col cols="auto">
      <v-row align="center" class="flex-column white--text">
        <v-col cols="auto">
          <div class="text-h1 font-weight-bold">{{ currentDatetime }}</div>
        </v-col>
        <v-col cols="auto">
          <div class="text-h2 font-weight-bold">Good Afternoon, Unjust.</div>
        </v-col>
        <v-col cols="12">
          <v-form @submit.prevent="doSearch">
            <v-text-field
              v-model="search"
              placeholder="Search"
              prepend-inner-icon="mdi-magnify"
              append-icon="mdi-google"
              solo
              rounded
              flat
            />
          </v-form>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="auto">
      <v-btn
        text
        depressed
        dark
        rounded
        class="text-none"
        to="/portal"
      >
        Go to Portal
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import moment from 'moment';

export default {
  name: 'IndexPage',
  data() {
    return {
      search: null,
      currentDatetime: moment().format('HH:mm'),
      intervalData: null,
    };
  },
  mounted() {
    if (!this.intervalData) {
      clearInterval(this.intervalData);

      this.intervalData = setInterval(() => {
        this.handlerCurrentDatetime();
      }, 1000);
    }
  },
  beforeDestroy() {
    if (this.intervalData) clearInterval(this.intervalData);
  },
  methods: {
    handlerCurrentDatetime() {
      this.currentDatetime = moment().format('HH:mm');
    },
    doSearch() {
      window.location = `https://www.google.com/search?q=${this.search}`;

      this.search = null;
    }
  }
}
</script>