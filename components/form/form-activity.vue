<template>
  <div>
    <v-form ref="form" v-model="form.status" @submit.prevent="doSubmit">
      <v-row dense>
        <v-col cols="12">
          <label class="text-subtitle-2 white--text font-weight-bold">
            {{ form.data.date }}
          </label>
          <v-btn
            text
            small
            class="text-none"
            color="seconday"
            @click="dialog.status = true"
          >
            Change Date
          </v-btn>
        </v-col>
        <v-col cols="12">
          <label class="text-subtitle-2 white--text font-weight-bold">
            What you've done today ?
          </label>
          <v-text-field
            v-model="form.data.description"
            :rules="form.rules.description"
            label="Describe your activities"
            solo
            flat
          />
        </v-col>
        <v-col cols="12" lg="6" md="6" sm="12">
          <label class="text-subtitle-2 white--text font-weight-bold">
            Time Spent (in Hour: 0 - 8 Hours)
          </label>
          <v-text-field
            v-model="form.data.time_spent"
            :rules="form.rules.time_spent"
            label="How long time you spent"
            solo
            flat
            @keypress="onlyNumberOnKeypress"
            @input="handlerInput"
          />
        </v-col>
        <v-col cols="12" lg="6" md="6" sm="12">
          <label class="text-subtitle-2 white--text font-weight-bold">
            Category
          </label>
          <v-select
            v-model="form.data.category"
            :rules="form.rules.category"
            label="Select category activity"
            :items="$utilities.categoryActivity()"
            solo
            flat
          />
        </v-col>
        <v-col cols="12">
          <label class="text-subtitle-2 white--text font-weight-bold">
            Any issue or note you want to share ?
          </label>
          <v-textarea
            v-model="form.data.note"
            label="Note"
            solo
            flat
          />
        </v-col>
        <v-col cols="12">
          <v-btn
            type="submit"
            depressed
            :ripple="false"
            class="text-none"
            color="secondary"
            block
            height="48"
          >
            Submit
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
    <DialogDatePicker
      :is-open="dialog.status"
      :start-date="detail?.start_date"
      :end-date="detail?.end_date"
      @onClose="dialog.status = false"
      @onSubmit="doChangeDate"
    />
  </div>
</template>

<script>
import DialogDatePicker from '@/components/dialog/dialog-date-picker.vue';
import { handleNumberInput, onlyNumberOnKeypress } from '@/helpers/input-rules.js';

export default {
  name: 'FormActivityComponent',
  components: { DialogDatePicker },
  data() {
    return {
      dialog: {
        status: false,
      },
      form: {
        status: false,
        data: {
          member_id: null,
          date: new Date(),
          category: null,
          description: null,
          time_spent: 0,
          note: null,
        },
        rules: {
          category: [(v) => !!v || 'This field is required'],
          description: [(v) => !!v || 'This field is required'],
          time_spent: [
            (v) => !!v || 'This field is required',
            (v) => Number(v) > 0 && Number(v) <= 8 || 'Maximum time spent must in 0 - 8 hours'
          ],
        }
      },
    }
  },
  computed: {
    detail() {
      return this.$store.getters['project/getProjectDetail'];
    }
  },
  methods: {
    onlyNumberOnKeypress,
    handleNumberInput,
    handlerInput(event) {
      this.form.data.time_spent = handleNumberInput(event);
    },
    doChangeDate(value) {
      this.dialog.status = false;
      this.form.data.date = new Date(value);
    },
    doSubmit() {
      const status = this.$refs.form.validate();

      if (status) {
        this.$emit('onSubmit', {
          ...this.form.data,
          member_id: this.detail?.viewer?.id
        });
      }
    }
  }
}
</script>