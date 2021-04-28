<template>
  <section v-if="!isSpecificPage">
    <!-- Navigation Bottom -->
    <van-tabbar v-model="menuActive" active-color="#3B1D77" inactive-color="#a57dd8">
      <van-tabbar-item to="/" name="home" icon="home-o">Beranda</van-tabbar-item>
      <van-tabbar-item to="/bookmark" name="bookmark" icon="label-o">Penanda</van-tabbar-item>
      <van-tabbar-item to="/favorite" name="favorite" icon="star-o">Favorit</van-tabbar-item>
      <van-tabbar-item to="/about" name="about" icon="info-o">Tentang</van-tabbar-item>
    </van-tabbar>
  </section>
</template>
<script>
export default {
  name: 'NavBottom',
  data: () => ({
    menuActive: 'home'
  }),
  computed: {
    isSpecificPage() {
      const surahIdPage = this.$route.name == "quran-surahId"
      return surahIdPage
    }
  }
}
</script>