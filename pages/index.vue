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
        <svg class="bg-icon" width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M79.1667 8.375H25C19.975 8.375 12.5 11.7042 12.5 20.875V79.2083C12.5 88.3792 19.975 91.7083 25 91.7083H87.5V83.375H25.05C23.125 83.325 20.8333 82.5625 20.8333 79.2083C20.8333 78.7875 20.8708 78.4125 20.9333 78.0708C21.4 75.675 23.3625 75.0833 25.0458 75.0417H83.3333C83.4083 75.0417 83.4625 75.0042 83.5375 75H87.5V16.7083C87.5 12.1125 83.7625 8.375 79.1667 8.375ZM79.1667 66.7083H20.8333V20.875C20.8333 17.5167 23.125 16.7583 25 16.7083H54.1667V45.875L62.5 41.7083L70.8333 45.875V16.7083H79.1667V66.7083Z" fill="white"/>
        </svg>
      </div>

      <h4>Daftar Surat</h4>

      <van-cell-group>
        <van-cell 
          v-for="(surah, index) in surahInfoArray"
          :key="`surah-${index}`" size="large"
          :title="surah.latin" :value="surah.arabic" value-class="surah-arabic"
          :label="`${surah.translation} - ${surah.ayah_count} Ayat`" center>
          <template #icon>
            <div class="ayah-number">
              <span class="number">{{ index + 1 }}</span>
              <svg class="icon" width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M49 20.7157L57.2843 29L49 37.2843V49H37.2843L29 57.2843L20.7158 49H9.00003V37.2843L0.715759 29L9.00003 20.7157V9H20.7158L29 0.715729L37.2843 9H49V20.7157ZM54.4559 29L47 36.4558V47H36.4559L29 54.4558L21.5442 47H11V36.4558L3.54419 29L11 21.5442V11H21.5442L29 3.54416L36.4559 11H47V21.5442L54.4559 29Z" fill="#8855CC"/>
              </svg>
            </div>
          </template>
          <template #value>
            <span class="ayah-arabic">{{ surah.arabic }}</span>
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
  components: {
    Logo
  },
  data: () => ({
    surahInfoArray: []
  }),

  mounted() {
    this.fetchSurahInfo()
  },

  methods: {
    fetchSurahInfo() {
      fetch(ApiPath.SURAH_INFO)
        .then(response => {
          console.log('oy')
          return response.json()
        })
        .then(data => {
          this.surahInfoArray = data.surah_info
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
  height: 80px;
  overflow: hidden;
}
.home-slide .title {
  font-weight: bold;
}
.home-slide .subtitle {
  opacity: 0.8;
}
.home-slide .bg-icon {
  position: absolute;
  bottom: 0;
  right: 0;
  transform: rotate(20deg) scale(1.2) translateX(10px);
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
.surah-arabic {
  color: #8855CC;
  font-size: 18px;
  font-weight: bold;
}
</style>