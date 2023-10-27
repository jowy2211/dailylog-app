<template>
  <v-card
    rounded="lg"
    elevation="5"
    flat
  >
      <v-list-item class="grow py-2">
        <v-list-item-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            alt="Profile"
            src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
          />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="text-h5">Unjust Orono <span class="caption font-weight-thin">#00001</span></v-list-item-title>
          <v-list-item-subtitle class="text-subtitle-2">unjust@mail.com</v-list-item-subtitle>
        </v-list-item-content>

        <v-row
          align="center"
          justify="end"
        >
          <v-btn icon>
            <v-icon>mdi-instagram</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>mdi-facebook</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>mdi-github</v-icon>
          </v-btn>
        </v-row>
      </v-list-item>
  </v-card>
</template>

<script>
export default {
  name: 'CardUser',
  props: {
    user: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {}
  },
  mounted() {
    console.log(this.user)
  }
};
</script>
