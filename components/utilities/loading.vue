<template>
  <v-overlay v-model="loading" opacity="0.8" absolute z-index="9999">
    <div class="loader">
    </div>
  </v-overlay>
</template>

<script>
export default {
  name: 'LoadingComponent',
  data: () => ({
    loading: false,
  }),
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    },
  },
}
</script>

<style scoped lang="scss">
  .loader  {
    animation: rotate 1s infinite;  
    height: 50px;
    width: 50px;
  }

  .loader:before,
  .loader:after {   
    border-radius: 50%;
    content: '';
    display: block;
    height: 20px;  
    width: 20px;
  }
  .loader:before {
    animation: ball1 1s infinite;  
    background-color: cyan;
    box-shadow: 30px 0 0 cyan;
    margin-bottom: 10px;
  }
  .loader:after {
    animation: ball2 1s infinite; 
    background-color: #fff;
    box-shadow: 30px 0 0 #fff;
  }

  @keyframes rotate {
    0% { 
      -webkit-transform: rotate(0deg) scale(0.9);
      -moz-transform: rotate(0deg) scale(0.9);
    }
    50% { 
      -webkit-transform: rotate(360deg) scale(1.4); 
      -moz-transform: rotate(360deg) scale(1.4);
    }
    100% { 
      -webkit-transform: rotate(720deg) scale(0.9);
      -moz-transform: rotate(720deg) scale(0.9);
    }
  }

  @keyframes ball1 {
    0% {
      box-shadow: 30px 0 0 #fff;
    }
    50% {
      box-shadow: 0 0 0 #fff;
      margin-bottom: 0;
      -webkit-transform: translate(14px,14px);
      -moz-transform: translate(14px, 14px);
    }
    100% {
      box-shadow: 30px 0 0 #fff;
      margin-bottom: 10px;
    }
  }

  @keyframes ball2 {
    0% {
      box-shadow: 30px 0 0 cyan;
    }
    50% {
      box-shadow: 0 0 0 cyan;
      margin-top: -20px;
      -webkit-transform: translate(14px,14px);
      -moz-transform: translate(14px, 14px);
    }
    100% {
      box-shadow: 30px 0 0 cyan;
      margin-top: 0;
    }
  }
</style>
