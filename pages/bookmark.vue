<template>
  <div class="container">
    <h3 class="headline">Penanda</h3>
    <h5 class="subheadline">Buka terakhir yang disimpan atau ditandai</h5>
    <div class="space-24"></div>

    <van-cell-group v-if="isHaveLastReadAyah" title="Terakhir ditandai">
      <van-cell 
        value-class="big-value" title-class="big-title"
        @click="goToSurahDetail(lastReadAyahData.index, lastReadAyahData.ayah)"
        center :title="lastReadAyahData.latin" 
        :value="`${lastReadAyahData.index}:${lastReadAyahData.ayah}`" 
        :label="`Surat ke-${lastReadAyahData.index} • Ayat ke-${lastReadAyahData.ayah}`" />
    </van-cell-group>
    <van-empty v-else description="Tidak ada yang ditandai" />
  </div>
</template>
<script>
import { AppConstant } from '~/constant'
import { __isNotNull } from '~/utils'

export default {
  name: 'Bookmark',
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
  },
  mounted() {
    this.$store.commit('setHeaderTitle', AppConstant.BOOKMARK)
  }
}
</script>
<style lang="less">
.big-value {
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 4px;
}
.big-title {
  font-size: 16px;
  font-weight: bold;
}
</style>