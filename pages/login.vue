<template>
  <v-layout fill-height>
    <v-row align="center" justify="center" class="flex-column">
      <v-col cols="auto">
        <v-img
          lazy-src="/spn-logo.png"
          src="/spn-logo.png"
          alt="Supernova Logo"
          height="100%"
          width="400"
          contain
        />
      </v-col>
      <v-col cols="3">
        <v-card
          elevation="10"
          width="100%"
          height="100%"
          rounded="lg"
        >
          <v-card-title>Daily Log Application</v-card-title>
          <v-card-subtitle>
            <div class="text-caption">Use username & password to Log In</div>
          </v-card-subtitle>
          <v-card-text>
            <v-form ref="form" v-model="form.status" @submit.prevent="onSubmit">
              <v-row no-gutters align="center" justify="center">
                <v-col cols="12">
                  <v-text-field
                    v-model="form.data.email"
                    :rules="form.rules.email"
                    type="email"
                    label="Username"
                    solo
                    flat
                    dark
                    class="rounded-lg"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="form.data.password"
                    :type="form.toggle.password ? 'text' : 'password'"
                    :rules="form.rules.password"
                    label="Password"
                    solo
                    flat
                    dark
                    class="rounded-lg"
                    :append-icon="form.toggle.password ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="form.toggle.password = !form.toggle.password"
                  />
                </v-col>
                <v-col cols="12">
                  <v-btn
                    type="submit"
                    class="rounded-lg mx-auto text-none"
                    color="secondary"
                    height="44"
                    block
                    depressed
                    nuxt
                    link
                  >
                    Log In
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
export default {
  name: 'Login',
  layout: 'auth',
  data() {
    return {
      form: {
        status: false,
        data: {
          email: null,
          password: null,
          remember: 'no',
        },
        rules: {
          email: [
            (v) => !!v || 'Username is required',
            (v) => /^(?:[A-Z\d][A-Z\d_.-]{4,}|[A-Z0-9._-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/i.test(v) || 'A username at least 4 characters using email format or using dot, dash and underscore without space.',
          ],
          password: [
            (v) => !!v || 'Password is required',
          ],
        },
        toggle: {
          password: false,
        },
      },
    }
  },
  head: {
    title: 'Login',
  },
  methods: {
    onSubmit() {
      try {
        const status = this.$refs.form.validate();

        if (status) {
          // const d = this.form.data;
          // await this.$auth.login({
          //   data: {
          //     email: d.email,
          //     password: d.password,
          //     remember: d.remember,
          //   }
          // }).then(async (res) => {
          //   await this.$cookies.set('auth._user', res.data.user);
          // });

          // if (this.$auth.loggedIn) this.$router.push('/');

          setTimeout(() => {
            this.$router.push('/');
          }, 1000);
        }
      } catch (error) {
        console.log('error : ', error);
      }
    }
  }
};
</script>
