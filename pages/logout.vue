<template>
  <v-container>
    <v-overlay>
      <v-card flat rounded="circle">
        <v-card-text>
          <v-progress-circular indeterminate :button="true" color="primary" size="120">
            <v-img
              src="/spn-logo.png"
              class="mx-auto"
              alt="Supernova Logo"
              max-height="50"
              max-width="100"
              lazy-src="/spn-logo.png"
            />
          </v-progress-circular>
        </v-card-text>
      </v-card>
      <v-row>
        <v-col class="text-center">
          Waiting to logout...
        </v-col>
      </v-row>
    </v-overlay>
  </v-container>
</template>

<script>
export default {
  name: 'Logout',
  layout: 'auth',
  head: {
    title: 'Waiting to logout...',
  },
  mounted() {
    setTimeout(() => {
      this.$router.push('/login');
    }, 3000);
  },
  methods: {},
};
</script>
