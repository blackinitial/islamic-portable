<template>
  <section>
    <!-- navbar -->
    <van-nav-bar
      v-if="!isSpecialPage"
      :title="$store.state.headerTitle"
      left-arrow fixed z-index="5"
      @click-left="onBack()" />
    <!-- only Back -->
    <van-nav-bar
      v-if="isBackOnly"
      :border="false"
      left-arrow fixed z-index="5"
      @click-left="onBack()" />
    
  </section>
</template>
<script>
import { AppConstant } from '~/constant'

export default {
  name: 'Header',
  props: {
    to: {
      type: String,
      default: "/"
    }
  },
  computed: {
    isHomePage: (vm) => vm.$store.state.headerTitle === AppConstant.TITLE,
    isQuranPage: (vm) => vm.$store.state.headerTitle === AppConstant.QURAN_TITLE,
    isSpecialPage() {
      return this.isHomePage || this.isQuranPage
    },
    isBackOnly() {
      return this.isQuranPage
    }
  },
  methods: {
    onBack() {
      const routeName = this.$route.name
      console.log(this.$route.name)
      if (routeName == 'quran') {
        return this.$router.push('/')
      } else if (routeName == 'quran-surahId') {
        return this.$router.push('/quran')
      }
      return this.$router.back()
    }
  }
}
</script>