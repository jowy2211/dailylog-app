<template>
  <v-dialog v-model="dialog" persistent max-width="500">
    <v-form ref="form" v-model="form.status" @submit.prevent="doSubmit">
      <v-card class="dailylog-app--card pa-5">
        <v-card-title class="flex flex-row align-center justify-space-between">
          <div class="text-h4 white--text">Log In</div>
          <v-btn icon color="white" @click="$emit('onClose')"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-card-subtitle>
          <div class="text-subtitle-1 white--text">Use username & password to Log In</div>
        </v-card-subtitle>
        <v-card-text>
          <div class="my-5">
            <v-text-field
              v-model="form.data.username"
              :rules="form.rules.username"
              label="Username"
              solo
              flat
              light
            />
            <v-text-field
              v-model="form.data.password"
              :rules="form.rules.password"
              :type="form.option.toogle ? 'text' : 'password'"
              label="Password"
              solo
              flat
              light
              :append-icon="form.option.toogle ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="form.option.toogle = !form.option.toogle"
            />
          </div>
          <v-btn
            type="submit"
            color="primary"
            class="text-none mt-5 mb-2"
            depressed
            block
            height="48"
          >
            Submit
          </v-btn>
        </v-card-text>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
export default {
  name: 'DialogLoginComponent',
  props: {
    isOpen: Boolean,
  },
  data() {
    return {
      dialog: false,
      form: {
        status: false,
        data: {
          username: null,
          password: null,
        },
        option: {
          toogle: false,
        },
        rules: {
          username: [(v) => !!v || 'This field is required', (v) => v && v.length >= 3 || 'Username must be at least 3 characters'],
          password: [(v) => !!v || 'This field is required', (v) => v && v.length >= 8 || 'Password must be at least 8 characters']
        }
      }
    }
  },
  watch: {
    isOpen(val) {
      this.dialog = !!val;
    }
  },
  methods: {
    doSubmit() {
      const status = this.$refs.form.validate();

      if (status) {
        this.$emit('onSubmit', this.form.data);

        setTimeout(() => {
          this.$refs.form.reset();
        }, 1000);
      }
    }
  }
}
</script>