<template>
  <div class="container">
    <div>
      <logo />
      <h4>Aplikasi Islami dalam Genggaman</h4>

      <div class="home-slide">
        <div class="info">
          <van-icon name="label" />
          <span>Terakhir Dibaca</span>
        </div>
        <div class="detail">
          <div class="title">Al Fatihah</div>
          <div class="subtitle">Ayat 6</div>
        </div>
        <img class="bg" src="/quran.webp" alt="al qur'an">
      </div>

      <h4>Daftar Surat</h4>

      <!-- loading skeleton -->
      <van-skeleton 
        v-for="n in 5" :key="n" avatar
        title :row="1" row-width="100%"
        style="margin-bottom: 16px"
        :loading="loading" />

      <!-- list surah -->
      <van-cell-group>
        <van-cell 
          v-for="(surah, index) in surahInfoArray"
          :key="`surah-${index}`" size="large"
          :title="surah.latin" :value="surah.arabic" value-class="arabic"
          :label="`${surah.translation} • ${surah.ayah_count} Ayat`" center
          :to="getSurahDetailUrl(surah, index)">
          <template #icon>
            <div class="ayah-number">
              <span class="number">{{ index + 1 }}</span>
              <svg class="icon" width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M49 20.7157L57.2843 29L49 37.2843V49H37.2843L29 57.2843L20.7158 49H9.00003V37.2843L0.715759 29L9.00003 20.7157V9H20.7158L29 0.715729L37.2843 9H49V20.7157ZM54.4559 29L47 36.4558V47H36.4559L29 54.4558L21.5442 47H11V36.4558L3.54419 29L11 21.5442V11H21.5442L29 3.54416L36.4559 11H47V21.5442L54.4559 29Z" fill="#8855CC"/>
              </svg>
            </div>
          </template>
        </van-cell>

      </van-cell-group>

    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import { ApiPath } from '../constant'
export default {
  name: 'Home',
  components: {
    Logo
  },
  data: () => ({
    surahInfoArray: [],
    loading: true
  }),

  mounted() {
    this.fetchSurahInfo()
  },

  methods: {
    getSurahDetailUrl(surah, index) {
      return `/${index+1}`
    },

    fetchSurahInfo() {
      fetch(ApiPath.SURAH_INFO)
        .then(response => {
          console.log('get surah datas')
          return response.json()
        })
        .then(data => {
          this.surahInfoArray = data.surah_info.map((item, idx) => {
            return Object.assign({}, item, {index: idx+1})
          })
          this.loading = false
        })
    }
  }
}
</script>

<style>
.home-slide {
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
}
.home-slide .title {
  font-weight: bold;
}
.home-slide .subtitle {
  opacity: 0.8;
}
.home-slide .bg {
  position: absolute;
  bottom: -15%;
  right: 0;
  transform: scale(.8) translateX(10%) rotate(25deg);
  opacity: .75;
  z-index: -1;
  pointer-events: none;
}
.ayah-number {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -16px;
  margin-right: 16px;
}
.ayah-number .number {
  position: absolute;
}
.ayah-number .icon {
  width: 40px;
}
@keyframes appear {
  0% {
    opacity: 0;
  }
}
</style>