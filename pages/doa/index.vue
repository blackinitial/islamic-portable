<template>
  <div class="container">
    <h3 class="headline">{{ $store.state.headerTitle }}</h3>
    <h5 class="subheadline">Baca Do'a Harian mendapat Perlindungan Allah</h5>

    <div class="hero-card">
      <div class="hero-card__content">
        <span class="hero-card__title">Belum hafal Do'a harianmu?</span>
        <van-button 
          round type="default" 
          size="small">Yuk dihafal</van-button>
      </div>
      <img class="hero-card__bg" src="/tasbih.webp" alt="tasbih">
    </div>

    <div class="title-doa">
      <h4 class="headline">Daftar Do'a</h4>
    </div>
    <van-search 
      v-model="searchText"
      @clear="searchText = ''"
      placeholder="Do'a apa yang mau dicari ?"
      shape="round" />

    <!-- loading skeleton -->
    <van-skeleton 
      v-for="n in 10" :key="n" avatar
      title :row="1" row-width="100%"
      style="margin-bottom: 16px"
      :loading="loading" />

    <!-- list doa -->
    <div id="list-doa" style="padding-bottom: 48px">
      <van-collapse v-model="activeCollapses">
        <van-collapse-item 
          v-for="doa in filteredDoa"
          :key="`doa-${doa.index}`" center
          :name="doa.index"
          :id="`doa-${doa.index}`">
          <div>
            <div class="share-button-wrapper">
              <van-button 
                @click="shareDoa(doa.title, doa.text)" color="#7142d7"
                round icon="share-o" size="small">Bagikan Do'a</van-button>
            </div>
            <div v-for="(item, index) in doa.text" :key="`doa-${index}`">
              <div class="arabic align-right">{{ item.arabic }}</div>
              <p><strong>{{ item.latin }}</strong></p>
              <p><i>{{ item.translation }}</i></p>
              <p>({{ item.source }})</p>
              <hr class="line-doa" v-if="doa.text.length > 1 && !(index + 1 == doa.text.length)">
            </div>
          </div>
          <template #icon>
            <div class="doa-list">
              <span class="doa-list__number">{{ doa.index }}</span>
              <svg class="doa-list__icon" width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M49 20.7157L57.2843 29L49 37.2843V49H37.2843L29 57.2843L20.7158 49H9.00003V37.2843L0.715759 29L9.00003 20.7157V9H20.7158L29 0.715729L37.2843 9H49V20.7157ZM54.4559 29L47 36.4558V47H36.4559L29 54.4558L21.5442 47H11V36.4558L3.54419 29L11 21.5442V11H21.5442L29 3.54416L36.4559 11H47V21.5442L54.4559 29Z" fill="#8855CC"/>
              </svg>
            </div>
          </template>
          <template #title>
            <div class="doa-list__title-container">
              <span class="doa-list__title">{{ doa.title }}</span>
              <van-icon 
                v-if="!isFavoriteDoa(doa.title)"
                @click.stop="addToFavoriteDoa(doa)"
                class="doa-list__favorite" 
                title="Tambahkan Do'a to Favorite"
                name="star-o" />
              <van-icon 
                v-else
                @click.stop="removeFromFavoriteDoa(doa)"
                class="doa-list__favorite" 
                title="Hapus Do'a to Favorite"
                name="star" color="#F9B090" />
            </div>
          </template>
        </van-collapse-item>
      </van-collapse>
      <van-empty v-if="filteredDoa.length < 1" image="search" description="Tidak ada data do'a" />
    </div>

  </div>
</template>

<script>
import { Toast, Notify } from 'vant'
import lastReadAyahCard from '~/components/quran/LastReadAyahCard'
import { __isNotEmptyString, __isNotNull, __isNumber } from '~/utils'
import { AppConstant } from '~/constant'

export default {
  name: 'DoaHome',
  components: {
    lastReadAyahCard
  },
  data: () => ({
    loading: true,
    searchText: '',
    activeCollapses: []
  }),

  computed: {
    isHaveSource() {
      return __isNotEmptyString(this.$route.query.source)
    },
    filteredDoa() {
      if (__isNotEmptyString(this.searchText) && !isNaN(this.searchText)) {
        const filtered = this.$store.state.doa.allDoaList.filter(item => Number(this.searchText) === item.index)
        return filtered

      } else if (__isNotEmptyString(this.searchText) && this.searchText.length >= 2) {
        const normalizeText = text => text.toLowerCase().replace(/[\W_]+/g, '')

        return this.$store.state.doa.allDoaList.filter(item => {
          let predicateTitle = normalizeText(item.title).includes(
            normalizeText(this.searchText)
          )

          return predicateTitle
        })
      } else return this.$store.state.doa.allDoaList
    }
  },

  mounted() {
    this.$store.commit('setHeaderTitle', AppConstant.DOA_TITLE)
    this.$store.dispatch('doa/fetchAllDoa', {success: () => {}})
    if (!this.isHaveSource) {
      setTimeout(() => {
        this.loading = false
      }, 1000)
    } else this.loading = false
  },
  methods: {
    addToFavoriteDoa(doa) {
      this.$store.dispatch('doa/addToFavoriteDoa', doa)
      Toast({
        message: `Do'a telah ditambakan di Favorit`,
        icon: 'star-o',
      })
    },
    removeFromFavoriteDoa(doa) {
      this.$store.dispatch('doa/removeFromFavoriteDoa', doa)
      Toast({
        message: `Do'a telah dihapus dari Favorit`,
        icon: 'star-o',
      })
    },
    isFavoriteDoa (title) {
      const favArray = this.$store.state.doa.favoriteDoa || []
      const isExist = favArray.some(item => item.title === title)
      return isExist
    },
    shareDoa(title, textArray) {
      let doaText = ''
      textArray.forEach(text => {
        doaText += `${text.arabic}\n\nArtinya:\n${text.translation}\n(${text.source})\n\n`
      })
      if (navigator.share) {
        navigator.share({
          title: `${title}`,
          text: `${title}\n\n${doaText}Islamic Portable App`,
          url: `https://islamic-portable.netlify.com`
        })
      } else {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(`${title}\n\n${doaText}Islamic Portable App\nhttps://islamic-portable.netlify.com`)
          Toast({
            message: `Do'a telah disalin`,
            icon: 'orders-o',
          })
        } else {
          Notify({ type: 'warning', message: 'Fitur Share/clipboard tidak mendukung !' });
          console.warn('web share and clipboard not support !')
        }
      }
    }
  }
}
</script>

<style lang="less">
.doa-list {
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
  &__title-container {
    display: flex;
    align-items: center;
  }
  &__favorite {
    margin-left: 8px;
    font-size: 18px;
  }
}
.share-button-wrapper {
  width: 100%;
  text-align: center;
  margin-bottom: 8px;
}
.title-doa {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.modal-container {
  padding: 16px;
}
.van-search {
  padding: 10px 0;
}
.nb {
  font-size: 12px;
  opacity: .5;
}
.line-doa {
  margin: 16px 0;
  border-color: hsl(259, 65%, 79%);
}
</style>