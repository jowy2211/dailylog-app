<template>
  <v-dialog v-model="dialog" persistent max-width="500">
    <v-card class="dailylog-app--card pa-5">
      <v-card-title class="flex flex-row align-center justify-space-between">
        <div class="white--text text-h4">Change Date</div>
        <v-btn icon color="white" @click="$emit('onClose')"><v-icon>mdi-close</v-icon></v-btn>
      </v-card-title>
      <v-card-text>
        <v-row dense>
          <v-col cols="12">
            <v-menu
              v-model="date.picker"
              min-width="auto"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="date.value"
                  label="Date"
                  readonly
                  solo
                  flat
                  append-icon="mdi-calendar"
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="date.value"
                no-title
                :min="startDate"
                :max="$dayjs.getDate()"
                @input="date.picker = false"
              />
            </v-menu>
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
  name: 'DialogDatePickerComponent',
  props: {
    isOpen: Boolean,
    startDate: {
      type: String,
      default: null,
    },
    endDate: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      dialog: false,
      date: {
        picker: false,
        value: null,
      }
    }
  },
  watch: {
    isOpen(val) {
      if (val) {
        this.date.value = null;
      }
      this.dialog = !!val;
    }
  },
  methods: {
    doSubmit() {
      this.$emit('onSubmit', this.date.value);
    }
  }
}
</script>