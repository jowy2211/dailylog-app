<template>
  <v-container fluid class="fill-height">
    <v-row
      dense
      align="center"
      class="flex-column"
    >
      <v-col cols="auto">
        <v-card color="transparent" flat dark>
          <v-card-title class="text-h1 font-weight-bold justify-center">
            {{ time.now }}
          </v-card-title>
          <v-card-subtitle class="text-h2 font-weight-bold text-center">
            {{ user ? `${time.text}, ${user?.employees?.fullname}.` : `${time.text}, Welcome.` }}
          </v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card color="transparent" flat>
          <v-card-text>
            <v-form ref="form" @submit.prevent="doSearch">
              <v-text-field
                v-model="form.data.query"
                label="Search"
                solo
                flat
                append-icon="mdi-google"
                prepend-inner-icon="mdi-magnify"
              />
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'home',
  transition: 'scroll-y-transition',
  data() {
    return {
      time: {
        interval: null,
        now: this.$dayjs.getTime(),
        text: this.$dayjs.getText(),
      },
      form: {
        data: {
          query: null,
        }
      }
    }
  },
  computed: {
    user() {
      return this.$auth.user;
    }
  },
  beforeDestroy() {
    if (this.time.interval) clearInterval(this.time.interval);
  },
  mounted() {
    if (!this.time.interval) this.renderTime();
  },
  methods: {
    renderTime() {
      clearInterval(this.time.interval);
      if (!this.time.interval) {
        this.time.interval = setInterval(() => {
          this.time.now = this.$dayjs.getTime();
          this.time.text = this.$dayjs.getText();
        }, 1000);
      }
    },
    doSearch() {
      window.location = `https://google.com/search?q=${this.form.data.query}`;
    }
  }
}
</script>
