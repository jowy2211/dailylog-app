<template>
  <v-app dark>
    <v-main>
      <v-container fluid class="fill-height pa-0">
        <v-carousel
          class="log--container-bg-images grey lighten-4"
          hide-delimiter-background
          hide-delimiters
          height="100%"
          :show-arrows="false"
          touchless
        >
          <v-carousel-item
            :src="`backgrounds/bg-${currentBackgroundImage}.jpg`"
            class="log--item-bg-image grey lighten-4"
            reverse-transition="fade-transition"
            transition="fade-transition"
            eager
          />
      </v-carousel>
      <div class="log--container-main fill-height">
        <Nuxt />
      </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      currentBackgroundImage: 1,
      intervalBackgroundImage: null,
    }
  },
  mounted() {
    if (!this.intervalBackgroundImage) {
      clearInterval(this.intervalBackgroundImage);

      this.intervalBackgroundImage = setInterval(() => {
        this.handlerBackgroundImages();
      }, (1000 * 60) * 5 );
    }
  },
  beforeDestroy() {
    if (this.intervalBackgroundImage) clearInterval(this.intervalBackgroundImage);
  },
  methods: {
    handlerBackgroundImages() {
      this.currentBackgroundImage = Math.floor(Math.random() * (15 - 1 + 1) + 1);
    },
  }
}
</script>

<style lang="scss" scoped>
.log--container-bg-images {
  position: absolute;
  overflow: hidden;
  height: 100vh !important;
  width: 100vw !important;
  object-fit: cover !important;
  .log--item-bg-image {
    height: 100vh !important;
    width: 100%;
  }
}
.log--container-main {
  position: relative;
  width: 100%;
  height: 100%;
  background: rgb(45,45,45);
  background: linear-gradient(360deg, rgba(45,45,45,0.7) 0%, rgba(45,45,45,0.7) 100%);
}
</style>