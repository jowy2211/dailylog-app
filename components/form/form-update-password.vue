<template>
  <v-form ref="form" v-model="form.status" @submit.prevent="doSubmit">
    <v-row dense>
      <v-col cols="12" lg="6" md="6" sm="12">
        <label class="text-subtitle-2 white--text font-weight-bold">Update Password</label>
        <v-text-field
          v-model="form.data.password"
          :rules="form.rules.password"
          :type="form.option.toogle ? 'text' : 'password'"
          label="Password"
          solo
          flat
          :append-icon="form.option.toogle ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="form.option.toogle = !form.option.toogle"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="auto">
        <v-btn
          type="submit"
          class="text-none"
          depressed
          height="48"
          width="150"
          :loading="isLoading"
        >
          Update
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  name: 'FormUpdatePasswordComponent',
  props: {
    isLoading: Boolean,
  },
  data() {
    return {
      form: {
        status: false,
        data: {
          password: null,
        },
        option: {
          toogle: false,
        },
        rules: {
          password: [(v) => !!v || 'This field is required', (v) => v && v.length >= 8 || 'Password must be at least 8 characters']
        }
      },
    };
  },
  methods: {
    doSubmit() {
      const status = this.$refs.form.validate();

      if (status) {
        this.$emit('onSubmit', { payload: this.form.data, case: 'update-password' });

        setTimeout(() => {
          this.$refs.form.reset();
        }, 1000);
      }
    }
  }
};
</script>