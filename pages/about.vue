<template>
  <div class="container">
    <h3>Tentang</h3>
    <div class="space-24"></div>

    <Logo />
    <h3>Aplikasi Islami dalam Genggaman</h3>
    <p><b>Islamic Portable</b> adalah sebuah app yang berisi berbagai aplikasi Islami seperti Al Qur'an, Do'a Harian, Artikel Islami, Jadwal Sholat, dll.</p>
    <p>Dibuat dengan teknologi Web App modern, bisa buka aplikasi langsung dengan web browser dari manapun dan berbagai platform, tidak perlu ribet install Apps dan yang pasti gratis.</p>
    <br>
    <LogoKKN />
    <p>Aplikasi ini adalah Side Project yang dibuat dalam rangka menjalankan Program KKN STAIM Klaten tahun 2021 di Jatinom, yang bertemakan <i>"Literasi Digital Sebagai Model Dakwah Yang Mencerahkan di Masa Pandemi"</i></p>
    <p>Semoga aplikasi sederhana ini bisa membantu dan bermanfaat bagi kita semua.</p>

    Credits:
    <ul>
      <li><a href="https://github.com/rioastamal/quran-json">quran-json</a> oleh <a href="https://github.com/rioastamal">@rioastamal</a></li>
      <li><a href="https://github.com/mazipan/quran-offline">quran-offline</a> oleh <a href="https://github.com/mazipan">@mazipan</a></li>
      <li><a href="https://play.google.com/store/apps/details?id=com.barakahapps.hisnulmuslimbahasaindonesia">Hisnul Muslim (Bahasa Indonesia, Doa & Dzikir)</a></li>
    </ul>
    <br>
    <small>Dibuat oleh <a href="https://github.com/blackinitial">Ibrohim Mahmud Hanafi</a><br/>Copyright © 2021</small>

    <div class="space-48"></div>
  </div>
</template>
<script>
import Logo from '~/components/Logo'
import LogoKKN from '~/components/LogoKKN'
import { AppConstant } from '~/constant'

export default {
  components: {
    Logo,
    LogoKKN
  },
  mounted() {
    this.$store.commit('setHeaderTitle', AppConstant.ABOUT)
  }
}
</script>