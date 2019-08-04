<template>
    <section style="width: 100%;height: 100%;" v-loading.fullscreen.lock="fullScreenLoading">
      个人中心
    </section>
</template>

<script>
    export default {
        name: "personCenter",
      data(){
          return {
            fullScreenLoading:false
          }
      },
      methods:{


        openFullScreen() {
          this.fullScreenLoading = true;
          setTimeout(() => {
            this.fullScreenLoading = false;
          }, 200 + Math.random() * 150);
        },
      },
      mounted(){
          this.openFullScreen();
      }
    }
</script>

<style scoped>

</style>
