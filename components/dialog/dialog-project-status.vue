<template>
  <v-dialog v-model="dialog" persistent max-width="500">
    <v-card class="dailylog-app--card pa-5">
      <v-card-title class="flex flex-row align-center justify-space-between">
        <div class="white--text text-h4">Change Status Project</div>
        <v-btn icon color="white" @click="$emit('onClose')"><v-icon>mdi-close</v-icon></v-btn>
      </v-card-title>
      <v-card-text>
        <v-row dense>
          <v-col cols="12">
            <v-select
              v-model="form.data.status"
              :rules="form.rules.status"
              :items="$utilities.projectStatus()"
              :disabled="currentStatus === 'DISCONTINUED'"
              label="Project Status"
              solo
              flat
            />
          </v-col>
          <v-col>
            <v-btn
              color="primary"
              class="text-none mb-2"
              depressed
              block
              height="48"
              @click="doSubmit"
            >
              Change
            </v-btn>
            <v-btn
              class="text-none mb-2"
              depressed
              block
              height="48"
              @click="$emit('onClose')"
            >
              Cancel
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DialogChangeStatusComponent',
  props: {
    isOpen: Boolean,
    currentStatus: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      dialog: false,
      form: {
        data: {
          status: null,
        },
        rules: {
          status: [(v) => !!v || 'This field is required']
        }
      }
    }
  },
  watch: {
    isOpen(val) {
      if (val) {
        this.form.data.status = this.currentStatus;
      }
      this.dialog = !!val;
    }
  },
  methods: {
    doSubmit() {
      this.$emit('onSubmit', this.form.data);
    }
  }
}
</script>