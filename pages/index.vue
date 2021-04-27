<template>
  <div class="container">
    <div>
      <logo />
      <h4 class="headline">Aplikasi Islami dalam Genggaman</h4>

      <lastReadAyahCard v-if="isHaveLastReadAyah" :surah="lastReadAyahData" />
      <div v-else class="card">
        <div class="card__content">
          <span class="card__title">Belum baca Al-Qur'an hari ini ?</span>
          <van-button 
            to="/1"
            round type="default" 
            size="small">Cuss Baca</van-button>
        </div>
        <img class="card__bg" src="/quran.webp" alt="al qur'an">
      </div>

      <h4 class="headline">Menu Utama</h4>

      <div>{{ quran }}</div>

      <div class="menu__content">
        <div 
          v-for="(menu, index) in menus"
          :key="`menu-${index}`"
          :style="`background-color: ${menu.color}`"
          :class="menu.isDisable ? 'menu--disable' : ''"
          @click="$router.push(menu.link)"
          class="menu__card">
          <div class="menu__icon" v-html="menu.icon"></div>
          <div class="menu__title">{{ menu.title }}</div>
          <div v-if="menu.isDisable" class="menu--label">{{ menu.label }}</div>
        </div>
      </div>

      <!-- Navigation Bottom  -->
      <NavBottom />

    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo'
import lastReadAyahCard from '~/components/quran/LastReadAyahCard'
import NavBottom from '~/components/NavBottom'
import { __isNotNull } from '~/utils'
import { AppConstant } from '~/constant'
import { quran, pray, article, mosque } from '~/assets/icons'

export default {
  name: 'Home',
  components: {
    Logo,
    lastReadAyahCard,
    NavBottom
  },
  data: () => ({
    loading: true,
    menus: [
      { title: `Al Qur'an`, icon: quran, link: '/quran', color: 'hsl(18deg 90% 90%)', isDisable: false, label: '' },
      { title: `Do'a Harian`, icon: pray, link: '/doa', color: 'hsl(272deg 85% 90%)', isDisable: false, label: '' },
      { title: `Artikel Islam`, icon: article, link: '', color: 'hsl(272deg 85% 90%)', isDisable: true, label: 'Coming Soon' },
      { title: `Jadwal Sholat`, icon: mosque, link: '', color: 'hsl(18deg 90% 90%)', isDisable: true, label: 'Coming Soon' }
    ]
  }),

  computed: {
    isHaveLastReadAyah() {
      return __isNotNull(this.$store.state.surah.lastReadAyah && this.$store.state.surah.lastReadAyah.surah)
    },
    lastReadAyahData() {
      if (this.isHaveLastReadAyah) {
        const res = this.$store.state.surah.allSurahList.find(
          item => item.index === this.$store.state.surah.lastReadAyah.surah
        )
        return Object.assign({}, res, { ayah: this.$store.state.surah.lastReadAyah.ayah })
      }
      return null
    },
  },

  mounted() {
    this.$store.commit('setHeaderTitle', AppConstant.TITLE)
  }
}
</script>

<style lang="less">
.headline {
  margin: 24px 0 12px;
}
.card {
  background: linear-gradient(135deg, #DD96F9, #995CFE);
  border-radius: 8px;
  padding: 16px;
  color: #fff;
  position: relative;
  height: 100px;
  overflow: hidden;
  animation: 1s appear;
  z-index: 1;
  &__content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  &__title {
    font-weight: bold;
    margin-bottom: 12px;
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
.menu {
  &__content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 18px;
    position: relative;
    overflow: hidden;
  }
  &__card {
    // background: linear-gradient(135deg, #DD96F9, #995CFE);
    background-color: hsl(18deg 90% 85%);
    border-radius: 8px;
    padding: 16px;
    color: #3B1D77;
    position: relative;
    height: 100px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  &__icon {
    font-size: 40px;
  }
  &__title {
    font-weight: bold;
  }
  &--label {
    position: absolute;
    top: 25px;
    left: -40px;
    height: auto;
    width: 150px;
    padding: 4px;
    background: hsl(270deg 100% 40%);
    transform: rotate(-45deg);
    text-align: center;
    color: #fff;
    font-size: 14px;
  }
  &--disable {
    cursor: not-allowed;
    opacity: 0.5;
  }
}
@keyframes appear {
  0% {
    opacity: 0;
  }
}
</style>