<template>
  <div>
    <v-card color="transparent" flat>
      <v-card-title>My Profile</v-card-title>
      <v-card-subtitle>Lorem ipsum dolor sit amet</v-card-subtitle>
      <v-card-text>
        <CardUser :user="user" />
      </v-card-text>
    </v-card>
    <v-card color="transparent" flat>
      <v-card-text>
        <FormUser />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import CardUser from '@/components/profile/CardUser.vue';
import FormUser from '@/components/profile/FormUser.vue';

export default {
  name: 'Profile',
  layout: 'admin',
  components: {
    CardUser,
    FormUser,
  },
  // middleware: 'rbac',
  asyncData({ app }) {
    const user = null;

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
