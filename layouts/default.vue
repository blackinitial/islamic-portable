<template>
  <div>
    <Nuxt />
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  mounted() {
    this.$store.dispatch('surah/readDataFromStorage')
  }
}
</script>

<style>
/* TODO: Fix scroll to ayah (anchor) */
html {
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background: #CED2F9;
  /* scroll-behavior: smooth; */
  scroll-margin-top: 50px;
  scroll-snap-type: y proximity;
}
.container {
  box-sizing: border-box;
  min-height: 100vh;
  padding: 48px 16px 16px;
  background: #fff;
  width: clamp(300px, 100%, 500px);
  margin: 0 auto;
  scroll-margin-top: 50px;
}
</style>
