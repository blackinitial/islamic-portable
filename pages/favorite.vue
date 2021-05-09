<template>
  <div class="container">
    <h3>Favorit</h3>
    <h5 class="subheadline">Buka surat atau do'a favorit yang disimpan</h5>
    <div class="space-24"></div>

    <div v-if="isHaveSurahFav || isHaveDoaFav">
      <van-cell-group v-if="isHaveSurahFav" title="Surat Favorit">
        <van-cell 
          v-for="(surah, index) in $store.state.surah.favoriteSurah"
          :key="`surah-${index}`"
          title-class="big-title"
          @click="goToSurahDetail(surah.number)"
          center :title="surah.name_latin" 
          :label="`Surat ke-${surah.number} • ${surah.number_of_ayah} Ayat`">
          <div class="arabic">{{ surah.name }}</div>
        </van-cell>
      </van-cell-group>

      <van-cell-group v-if="isHaveDoaFav" title="Do'a Favorit">
        <van-cell 
          v-for="(doa, index) in $store.state.doa.favoriteDoa"
          :key="`doa-${index}`"
          title-class="big-title"
          @click="goToDoaDetailUrl(doa.index)"
          center :title="doa.title" 
          :label="`Do'a ke-${doa.index}`">
        </van-cell>
      </van-cell-group>
    </div>

    <van-empty v-else description="Tidak ada data Favorit" />
  </div>
</template>
<script>
import { AppConstant } from '~/constant'
import { __isNotEmptyArray } from '~/utils'

export default {
  computed: {
    isHaveSurahFav() {
      return __isNotEmptyArray(this.$store.state.surah.favoriteSurah)
    },
    isHaveDoaFav() {
      return __isNotEmptyArray(this.$store.state.doa.favoriteDoa)
    }
  },
  methods: {
    goToSurahDetail (number) {
      this.$router.push(`/quran/${number}`)
    },
    goToDoaDetailUrl (number) {
      this.$router.push(`/doa#doa-${number}`)
    }
  },
  mounted() {
    this.$store.commit('setHeaderTitle', AppConstant.FAVORITE)
  }
}
</script>
<style lang="less">
.big-title {
  font-size: 16px;
  font-weight: bold;
}
</style>