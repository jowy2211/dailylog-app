<template>
  <v-form
    ref="form"
  >
    <v-row no-gutters>
      <v-col cols="12" class="mb-2">
        <h5 class="text-h5 font-weight-light">Profile</h5>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" sm="6" md="6" class="px-2">
        <v-text-field
          label="First Name"
          solo
          rounded
          dark
          placeholder="First Name"
        />
      </v-col>
      <v-col cols="12" sm="6" md="6" class="px-2">
        <v-text-field
          label="Last Name"
          solo
          rounded
          dark
          placeholder="Last Name"
        />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" sm="6" md="6" class="px-2">
        <v-text-field
          label="Address"
          solo
          rounded
          dark
          placeholder="Address"
        />
      </v-col>
      <v-col cols="12" sm="6" md="6" class="px-2">
        <v-text-field
          label="City"
          solo
          rounded
          dark
          placeholder="City"
        />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" sm="6" md="6" class="px-2">
        <v-text-field
          label="Email"
          solo
          rounded
          dark
          placeholder="Email Address"
        />
      </v-col>
      <v-col cols="12" sm="6" md="6" class="px-2">
        <v-text-field
          label="Phone Number"
          solo
          rounded
          dark
          placeholder="+62 8xxxx"
        />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" class="mb-2">
        <h5 class="text-h5 font-weight-light">Social Media</h5>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" class="px-2">
        <v-text-field
          label="Instagram"
          solo
          rounded
          dark
          placeholder="https://instagram.com/your-username"
        />
      </v-col>
      <v-col cols="12" class="px-2">
        <v-text-field
          label="Facebook"
          solo
          rounded
          dark
          placeholder="https://facebook.com/your-username"
        />
      </v-col>
      <v-col cols="12" class="px-2">
        <v-text-field
          label="Github"
          solo
          rounded
          dark
          placeholder="https://github.com/your-username"
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  name: 'FormUser',
  data() {
    return {}
  },
};
</script>
