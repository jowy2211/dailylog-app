<template>
  <v-dialog v-model="dialog" persistent max-width="500">
    <v-card class="pa-1">
      <v-card-title class="flex flex-row align-center justify-space-between">
        <div class="text-h4">{{ content?.title }}</div>
        <v-btn icon @click="$emit('onClose')"><v-icon>mdi-close</v-icon></v-btn>
      </v-card-title>
      <v-card-subtitle>
        <div class="text-subtitle-1">{{ content?.description }}</div>
      </v-card-subtitle>
      <v-card-text>
        <v-btn
          color="primary"
          class="text-none mb-2"
          depressed
          block
          height="48"
          @click="$emit('onConfirm')"
        >
          Confirm
        </v-btn>
        <v-btn
          v-if="content?.isCancel"
          class="text-none mb-2"
          depressed
          block
          height="48"
          @click="$emit('onClose')"
        >
          Cancel
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DialogConfirmationComponent',
  props: {
    isOpen: Boolean,
    content: {
      type: Object,
      default: () => ({
        title: 'Confirmation',
        description: 'Do you want to continue ?',
        isCancel: true, 
      }),
    }
  },
  data() {
    return {
      dialog: false,
    }
  },
  watch: {
    isOpen(val) {
      this.dialog = !!val;
    }
  },
}
</script>