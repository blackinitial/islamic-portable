<template>
  <div 
    @click="goToSurahDetail(surah.index, surah.ayah)"
    class="card">
    <div class="card__info">
      <van-icon name="label" />
      <span>Terakhir Dibaca</span>
    </div>
    <div class="card__detail">
      <div class="card__title">{{ surah.latin }}</div>
      <div class="card__subtitle">Ayat {{ surah.ayah }}</div>
    </div>
    <img class="card__bg" src="/quran.webp" alt="al qur'an">
  </div>
</template>
<script>
export default {
  name: 'lastReadAyahCard',
  props: {
    surah: {
      type: Object,
      default: () => ({
        "translation": "",
        "arabic": "",
        "latin": "",
        "ayah_count": 1,
        "index": 1,
        "ayah": 1
      })
    }
  },
  methods: {
    getSurahDetailUrl(index, ayah) {
      return `/quran/${index}#ayah-${ayah}`
    },
    goToSurahDetail(index, ayah) {
      const path = this.getSurahDetailUrl(index, ayah)
      this.$router.push(path)
    }
  }
}
</script>
<style lang="less" scoped>
.card {
  background: linear-gradient(135deg, #DD96F9, #995CFE);
  border-radius: 8px;
  padding: 16px;
  color: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: space-between;
  height: 100px;
  overflow: hidden;
  animation: 1s appear;
  z-index: 1;
  cursor: pointer;
  &__title {
    font-weight: bold;
  }
  &__subtitle {
    opacity: 0.8;
  }
  &__bg {
    position: absolute;
    bottom: -15%;
    right: 0;
    transform: scale(.8) translateX(10%) rotate(25deg);
    opacity: .75;
    z-index: -1;
    pointer-events: none;
  }
}
</style>