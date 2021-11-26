<template>
  <v-row justify="center" align="center" no-gutters>
    <v-col cols="12" sm="8" md="12">
      <v-card color="transparent" flat>
        <v-card-title>My Profile</v-card-title>
        <v-card-subtitle>Lorem ipsum dolor sit amet</v-card-subtitle>
      </v-card>
      <v-card rounded="xl" elevation="5">
        <CardUser :user="user" />
      </v-card>
    </v-col>
    <v-col cols="12" sm="8" md="12">
      <v-card class="py-5 px-5" rounded="xl" elevation="5">
        <FormUser />
        <v-card-actions>
          <v-spacer />
          <v-btn
            class="mx-2"
            width="150"
            rounded
            color="secondary"
          >
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import CardUser from '@/components/profile/CardUser.vue';
import FormUser from '@/components/profile/FormUser.vue';

export default {
  name: 'Profile',
  components: {
    CardUser,
    FormUser,
  },
  middleware: 'rbac',
  async asyncData({ app }) {
    const user = await app.$cookies.get('auth._user') || null;

    console.log('async data : ', user);
    return {
      user,
    }
  },
  data() {
    return {}
  },
  head: {
    title: 'My Profile',
  },
};
</script>
