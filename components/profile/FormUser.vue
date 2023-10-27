<template>
  <v-card class="rounded-lg" elevation="5">
    <v-card-title>
      Profile
    </v-card-title>
    <v-card-text>
      <v-form
        ref="form"
      >
        <v-row dense>
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              label="First Name"
              class="rounded-lg"
              solo
              flat
              dark
              placeholder="First Name"
            />
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              label="Last Name"
              class="rounded-lg"
              solo
              flat
              dark
              placeholder="Last Name"
            />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              label="Address"
              class="rounded-lg"
              solo
              flat
              dark
              placeholder="Address"
            />
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              label="City"
              class="rounded-lg"
              solo
              flat
              dark
              placeholder="City"
            />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              label="Email"
              class="rounded-lg"
              solo
              flat
              dark
              placeholder="Email Address"
            />
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              label="Phone Number"
              class="rounded-lg"
              solo
              flat
              dark
              placeholder="+62 8xxxx"
            />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12" class="mb-2">
            <h5 class="text-h5 font-weight-light">Social Media</h5>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12">
            <v-text-field
              label="Instagram"
              class="rounded-lg"
              solo
              flat
              dark
              placeholder="https://instagram.com/your-username"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Facebook"
              class="rounded-lg"
              solo
              flat
              dark
              placeholder="https://facebook.com/your-username"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Github"
              class="rounded-lg"
              solo
              flat
              dark
              placeholder="https://github.com/your-username"
            />
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'FormUser',
  data() {
    return {}
  },
};
</script>
