<template>
  <section>
    <!-- menu -->
    <van-tabbar v-model="menuActive" active-color="#995CFE" inactive-color="#DD96F9">
      <van-tabbar-item to="/" name="home" icon="home-o">Beranda</van-tabbar-item>
      <van-tabbar-item to="/lastRead" name="lastRead" icon="label-o">Terakhir</van-tabbar-item>
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
}
</script>