<template>
  <v-form ref="form" v-model="form.status" @submit.prevent="doSubmit">
    <v-row dense>
      <v-col cols="12">
        <div class="white--text text-h5 font-weight-bold">Detail Employee</div>
      </v-col>
      <v-col cols="12" lg="6" md="6" sm="12">
        <label class="text-subtitle-2 white--text font-weight-bold">Position</label>
        <v-select
          v-model="form.data.employees.position_id"
          :rules="form.rules.employees.position_id"
          :items="positions"
          label="Select Position"
          solo
          flat
        />
      </v-col>
      <v-col cols="12" lg="6" md="6"></v-col>
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
      <v-col cols="12">
        <div class="white--text text-h5 font-weight-bold">Detail User</div>
      </v-col>
      <v-col v-if="formType === 'CREATE'" cols="12" lg="6" md="6" sm="12">
        <label class="text-subtitle-2 white--text font-weight-bold">Role</label>
        <v-select
          v-model="form.data.role_id"
          :rules="form.rules.role_id"
          :items="roles"
          label="Select Role"
          solo
          flat
        />
      </v-col>
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
        <label class="text-subtitle-2 white--text font-weight-bold">
          {{ formType === 'CREATE' ? 'Password' : 'Update Password' }}
        </label>
        <v-text-field
          v-model="form.data.password"
          :rules="formType === 'CREATE' ? form.rules.password : undefined"
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
          color="primary"
          class="text-none"
          depressed
          height="48"
          width="150"
          :loading="isLoading"
        >
          Submit
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>


<script>
export default {
  name: 'FormUserComponent',
  props: {
    formType: {
      type: String,
      default: 'CREATE'
    },
    detail: {
      type: Object,
      default: null,
    }
  },
  data() {
    return {
      dialog: {
        status: false,
      },
      form: {
        status: false,
        data: {
          employees: {
            fullname: null,
            email: null,
            phone_number: null,
            address: null,
            position_id: null,
          },
          role_id: null,
          username: null,
          password: null,
        },
        rules: {
          employees: {
            fullname: [(v) => !!v || 'This field is required'],
            email: [(v) => !!v || 'This field is required'],
            phone_number: [(v) => !!v || 'This field is required'],
            address: [(v) => !!v || 'This field is required'],
            position_id: [(v) => !!v || 'This field is required'],
          },
          role_id: [(v) => !!v || 'This field is required'],
          username: [(v) => !!v || 'This field is required'],
          password: [(v) => !!v || 'This field is required'],
        },
        option: {
          toogle: false,
        }
      },
    };
  },
  computed: {
    roles() {
      return this.$store.getters['user/getRoleList'];
    },
    positions() {
      return this.$store.getters['user/getPositionList'];
    },
    isLoading() {
      return this.$store.getters['user/getUserLoading'];
    },
  },
  mounted() {
    if (this.detail) {
      this.form.data = { ...this.detail, employees: { ...this.detail.employees } };
    }
  },
  methods: {
    doSubmit() {
      const status = this.$refs.form.validate();

      if (status) {
        let payload = this.form.data;

        if (this.formType === 'EDIT') {
          payload = {
            username: this.form.data.username,
            password: this.form.data.password,
            fullname: this.form.data.employees.fullname,
            email: this.form.data.employees.email,
            phone_number: this.form.data.employees.phone_number,
            address: this.form.data.employees.address,
            position_id: this.form.data.employees.position_id,
          }
        }

        this.$emit('onSubmit', payload);
      }
    }
  }
};
</script>
