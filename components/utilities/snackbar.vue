<template>
  <v-snackbar
    v-model="snackbar.status"
    :value="true"
    :color="snackbar.type"
    bottom
    app
  >
    <span class="text-subtitle-2">{{ snackbar.message }}</span>
    
    <template #action="{ attrs }">
        <v-btn
          icon
          v-bind="attrs"
          @click="snackbar.status = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
  </v-snackbar>
</template>

<script>
export default {
  name: 'SnackbarComponent',
  data() {
    return {
      snackbar: {
        status: false,
        message: 'Sorry, cannot process the action.',
        type: 'error',
      },
    };
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'INIT_SNACKBAR') {
        const { type, message, status } = state.snackbar;

        this.snackbar = {
          status,
          message,
          type,
        };
      }
    });
  },
}
</script>