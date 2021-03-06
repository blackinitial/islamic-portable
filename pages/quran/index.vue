<template>
  <div class="container">
    <h3 class="headline">{{ $store.state.headerTitle }}</h3>
    <h5 class="subheadline">Tenangkan Jiwa dengan membaca Al Qur'an</h5>

    <lastReadAyahCard v-if="isHaveLastReadAyah" :surah="lastReadAyahData" />
    <div v-else class="hero-card">
      <div class="hero-card__content">
        <span class="hero-card__title">Belum baca Al-Qur'an hari ini ?</span>
        <van-button 
          to="quran/1"
          round type="default" 
          size="small">Cuss Baca</van-button>
      </div>
      <img class="hero-card__bg" src="/quran.webp" alt="al qur'an">
    </div>

    <div class="title-surah">
      <h4 class="headline">Daftar Surat</h4>
      <van-button 
        @click="searchModal = !searchModal"
        icon="search" type="default" 
        size="small" round />
    </div>

    <!-- search modal -->
    <van-popup v-model="searchModal" 
      round closeable close-icon="close" 
      @click-close-icon="searchText = ''"
      @click-overlay="searchText = ''"
      position="bottom" :style="{ height: '60%' }">
      <div class="modal-container">
        <van-search 
          v-model="searchText" 
          @clear="searchText = ''"
          placeholder="Surat apa yang mau dicari ?"
          shape="round" />
        <small class="nb">* cari dengan nama surat, arti surat atau nomer surat</small>
        <van-empty v-if="filteredSurah.length < 1" image="search" description="Tidak ada data surat" />
        <van-cell 
          v-for="surah in filteredSurah"
          :key="`surah-${surah.index}`" size="large"
          :title="surah.latin" :value="surah.arabic" value-class="arabic"
          :label="`${surah.translation} • ${surah.ayah_count} Ayat`" center
          :to="getSurahDetailUrl(surah, surah.index)">
          <template #icon>
            <div class="surah-list">
              <span class="surah-list__number">{{ surah.index }}</span>
              <svg class="surah-list__icon" width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M49 20.7157L57.2843 29L49 37.2843V49H37.2843L29 57.2843L20.7158 49H9.00003V37.2843L0.715759 29L9.00003 20.7157V9H20.7158L29 0.715729L37.2843 9H49V20.7157ZM54.4559 29L47 36.4558V47H36.4559L29 54.4558L21.5442 47H11V36.4558L3.54419 29L11 21.5442V11H21.5442L29 3.54416L36.4559 11H47V21.5442L54.4559 29Z" fill="#8855CC"/>
              </svg>
            </div>
          </template>
        </van-cell>
      </div>
    </van-popup>

    <!-- loading skeleton -->
    <van-skeleton 
      v-for="n in 10" :key="n" avatar
      title :row="1" row-width="100%"
      style="margin-bottom: 16px"
      :loading="loading" />

    <!-- list surah -->
    <van-cell-group style="padding-bottom: 48px">
      <van-cell 
        v-for="surah in $store.state.surah.allSurahList"
        :key="`surah-${surah.index}`" size="large"
        :title="surah.latin" :value="surah.arabic" value-class="arabic"
        :label="`${surah.translation} • ${surah.ayah_count} Ayat`" center
        :to="getSurahDetailUrl(surah, surah.index)">
        <template #icon>
          <div class="surah-list">
            <span class="surah-list__number">{{ surah.index }}</span>
            <svg class="surah-list__icon" width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M49 20.7157L57.2843 29L49 37.2843V49H37.2843L29 57.2843L20.7158 49H9.00003V37.2843L0.715759 29L9.00003 20.7157V9H20.7158L29 0.715729L37.2843 9H49V20.7157ZM54.4559 29L47 36.4558V47H36.4559L29 54.4558L21.5442 47H11V36.4558L3.54419 29L11 21.5442V11H21.5442L29 3.54416L36.4559 11H47V21.5442L54.4559 29Z" fill="#8855CC"/>
            </svg>
          </div>
        </template>
      </van-cell>
    </van-cell-group>

  </div>
</template>

<script>
import lastReadAyahCard from '~/components/quran/LastReadAyahCard'
import { __isNotEmptyString, __isNotNull, __isNumber } from '~/utils'
import { AppConstant } from '~/constant'

export default {
  name: 'QuranHome',
  components: {
    lastReadAyahCard
  },
  data: () => ({
    loading: true,
    searchText: '',
    searchModal: false
  }),

  computed: {
    isHaveLastReadAyah() {
      return __isNotNull(this.$store.state.surah.lastReadAyah && this.$store.state.surah.lastReadAyah.surah)
    },
    isHaveSource() {
      return __isNotEmptyString(this.$route.query.source)
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
    filteredSurah() {
      if (__isNotEmptyString(this.searchText) && !isNaN(this.searchText)) {
        const filtered = this.$store.state.surah.allSurahList.filter(item => Number(this.searchText) === item.index)
        return filtered

      } else if (__isNotEmptyString(this.searchText) && this.searchText.length >= 3) {
        const normalizeText = text => text.toLowerCase().replace(/[\W_]+/g, '')

        return this.$store.state.surah.allSurahList.filter(item => {
          let predicateTranslation = normalizeText(item.translation).includes(
            normalizeText(this.searchText)
          )
          let predicateLatin = normalizeText(item.latin).includes(
            normalizeText(this.searchText)
          )

          return predicateTranslation || predicateLatin
        })
      } else return []
    }
  },

  mounted() {
    this.$store.commit('setHeaderTitle', AppConstant.QURAN_TITLE)
    if (!this.isHaveSource) {
      setTimeout(() => {
        this.loading = false
      }, 1000)
    } else this.loading = false
  },

  methods: {
    getSurahDetailUrl(surah, index) {
      return `quran/${index}`
    }
  }
}
</script>

<style lang="less">
.surah-list {
  display: flex;
  align-items: center;
  justify-content: center;
  // margin-left: -16px;
  margin-right: 16px;
  &__number {
    position: absolute;
  }
  &__icon {
    width: 40px;
  }
}
.title-surah {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.modal-container {
  padding: 48px 16px 16px;
}
.van-search {
  padding: 10px 0;
}
.nb {
  font-size: 12px;
  opacity: .5;
}
</style>