<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="6" md="4">
      <v-card rounded="xl" elevation="5">
        <v-card-title class="text-center">
          <v-img class="mx-auto my-5" src="/rgb-banner.png" alt="Rolling Glory" max-height="75" max-width="250"/>
        </v-card-title>
        <v-card-subtitle class="mt-4">Use username & password to Log In</v-card-subtitle>
        <v-form ref="form" v-model="formValidated" @submit.prevent="onSubmit">
          <v-card-text>
              <v-row no-gutters>
                <v-col cols="12">
                  <v-text-field
                    v-model="form.data.email"
                    :rules="inputRules.email"
                    type="email"
                    label="Username"
                    solo
                    rounded
                    dark
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="form.data.password"
                    :type="togglePassword ? 'text' : 'password'"
                    :rules="inputRules.password"
                    label="Password"
                    solo
                    rounded
                    dark
                    :append-icon="togglePassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="togglePassword = !togglePassword"
                  />
                </v-col>
              </v-row>
          </v-card-text>
          <v-card-actions class="px-5">
            <v-btn
              type="submit"
              class="mb-2"
              elevation="5"
              color="secondary"
              rounded
              block
              nuxt
              link
            >
              Log In
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Login',
  layout: 'auth',
  data() {
    return {
      togglePassword: false,
      formValidated: false,
      form: {
        data: {
          email: null,
          password: null,
          remember: 'no',
        },
      },
      inputRules: {
        email: [
          (v) => !!v || 'Username is required',
          (v) => /^(?:[A-Z\d][A-Z\d_.-]{4,}|[A-Z0-9._-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/i.test(v) || 'A username at least 4 characters using email format or using dot, dash and underscore without space.',
        ],
        password: [
          (v) => !!v || 'Password is required',
        ],
      },
    }
  },
  head: {
    title: 'Login',
  },
  methods: {
    async onSubmit() {
      try {
        const status = this.$refs.form.validate();

        if (status) {
          const d = this.form.data;
          await this.$auth.login({
            data: {
              email: d.email,
              password: d.password,
              remember: d.remember,
            }
          }).then(async (res) => {
            await this.$cookies.set('auth._user', res.data.user);
          });

          if (this.$auth.loggedIn) this.$router.push('/');
        }
      } catch (error) {
        console.log('error : ', error);
      }
    }
  }
};
</script>
