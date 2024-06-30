<template>
  <v-form ref="form" v-model="form.status" @submit.prevent="doSubmit">
    <v-row dense>
      <v-col cols="12" lg="6" md="6" sm="12">
        <label class="text-subtitle-2 white--text font-weight-bold">Username</label>
        <v-text-field
          v-model="form.data.username"
          :rules="form.rules.username"
          label="Username"
          solo
          flat
        />
      </v-col>
      <v-col cols="12" lg="6" md="6" sm="12">
      </v-col>
      <v-col cols="12" lg="6" md="6" sm="12">
        <label class="text-subtitle-2 white--text font-weight-bold">Full Name</label>
        <v-text-field
          v-model="form.data.employees.fullname"
          :rules="form.rules.employees.fullname"
          label="Full Name"
          solo
          flat
        />
      </v-col>
      <v-col cols="12" lg="6" md="6" sm="12">
        <label class="text-subtitle-2 white--text font-weight-bold">Email</label>
        <v-text-field
          v-model="form.data.employees.email"
          :rules="form.rules.employees.email"
          label="Email"
          solo
          flat
        />
      </v-col>
      <v-col cols="12" lg="6" md="6" sm="12">
        <label class="text-subtitle-2 white--text font-weight-bold">Phone Number</label>
        <v-text-field
          v-model="form.data.employees.phone_number"
          :rules="form.rules.employees.phone_number"
          label="Phone Number"
          solo
          flat
        />
      </v-col>
      <v-col cols="12" lg="6" md="6" sm="12">
        <label class="text-subtitle-2 white--text font-weight-bold">Address</label>
        <v-text-field
          v-model="form.data.employees.address"
          :rules="form.rules.employees.address"
          label="Address"
          solo
          flat
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
  name: 'FormProfileComponent',
  props: {
    isLoading: Boolean,
  },
  data() {
    return {
      form: {
        status: false,
        data: {
          username: null,
          employees: {
            fullname: null,
            email: null,
            phone_number: null,
            address: null,
          },
        },
        rules: {
          username: [(v) => !!v || 'This field is required'],
          employees: {
            fullname: [(v) => !!v || 'This field is required'],
            email: [
              (v) => !!v || 'This field is required',
              (v) =>
                // eslint-disable-next-line no-useless-escape
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                  v
                ) || 'Email format is not match',
            ],
            phone_number: [
              (v) => !!v || 'This field is required',
              (v) => v && v.length >= 6 || 'Phone Number at least 12 digit.',
              (v) => v && v.length <= 12 || 'Phone Number must be less than 12 numbers',
            ],
            address: [(v) => !!v || 'This field is required'],
          },
        }
      },
    };
  },
  computed: {
    user() {
      return this.$store.getters['user/getUserDetail'];
    }
  },
  mounted() {
    if (this.user) this.form.data = { ...this.user, employees: { ...this.user.employees } };
  },
  methods: {
    doSubmit() {
      const status = this.$refs.form.validate();

      if (status) {
        this.$emit('onSubmit', { payload: this.form.data, case: 'update-profile' });
      }
    }
  }
};
</script>