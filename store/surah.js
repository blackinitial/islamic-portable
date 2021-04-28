import { ApiPath, storageKey } from '../constant/index'
import { __isNotNull } from '../utils/index'
import { getItem, setItem } from '../utils/storage'

export const state = () => ({
  allSurahList: [],
  surahDetail: {
    number: 0,
    name: '',
    name_latin: '',
    number_of_ayah: '',
    text: [],
    translations: {
      id: {
        name: '',
        text: ''
      }
    }
  },
  favoriteSurah:[],
  lastReadAyah: null
})

export const mutations = {
  setSurahList (state, data) {
    state.allSurahList = data
  },
  setSurahDetail(state, data) {
    state.surahDetail = data
  },
  setFavoriteSurah (state, data) {
    state.favoriteSurah = data
  },
  setLastReadAyah (state, data) {
    state.lastReadAyah = data
  }
}

export const actions = {
  fetchAllSurah ({ commit }, { success = () => {} }) {
    const cache = getItem(storageKey.ALL_SURAH)
    
    if (__isNotNull(cache)) {
      commit('setSurahList', cache)
      success && success(cache)
    } else {
      fetch(ApiPath.SURAH_INFO)
        .then(response => {
          return response.json()
        })
        .then(data => {
          const indexedData = data.surah_info.map((item, idx) => {
            return Object.assign({}, item, { index: idx + 1 })
          })
          setItem(storageKey.ALL_SURAH, indexedData)
          commit('setSurahList', indexedData)
          success && success(indexedData)
        })
    }
  },
  fetchSurahById ({ commit }, { id = 1, success = () => {} }) {
    const cache = getItem(storageKey.SURAH_BY_ID(id))
    console.log(`cache surah ${id}`, cache)

    if (__isNotNull(cache)) {
      commit('setSurahDetail', cache)
      success && success(cache)
    } else {
      fetch(ApiPath.SURAH_BY_ID(id))
        .then(response => {
          return response.json()
        })
        .then(data => {
          console.log('fetch', data[id])
          commit('setSurahDetail', data[id])
          setItem(storageKey.SURAH_BY_ID(id), data[id])
          success && success(data[id])
        })
    }
  },
  readDataFromStorage ({ commit }) {
    const cacheFavoriteSurah = getItem(storageKey.FAVORITE_SURAH) || []
    commit('setFavoriteSurah', cacheFavoriteSurah)
    const cacheLastReadAyah = getItem(storageKey.LAST_READ_AYAH) || {}
    commit('setLastReadAyah', cacheLastReadAyah)
  },
  addToFavoriteSurah ({ commit, state }, surah) {
    const isExist = state.favoriteSurah.find(item => item.name === surah.name)
    if (!isExist) {
      const newFavorite = [...state.favoriteSurah, surah]
      commit('setFavoriteSurah', newFavorite)
      setItem(storageKey.FAVORITE_SURAH, newFavorite)
    }
  },
  removeFromFavoriteSurah ({ commit, state }, surah) {
    const isExist = state.favoriteSurah.find(item => item.name === surah.name)
    if (isExist) {
      const newFavorite = state.favoriteSurah.filter(item => item.name !== surah.name) || []
      commit('setFavoriteSurah', newFavorite)
      setItem(storageKey.FAVORITE_SURAH, newFavorite)
    }
  },
  setLastReadAyah ({ commit, state }, { surah, ayah }) {
    const data = { surah, ayah }
    commit('setLastReadAyah', data)
    setItem(storageKey.LAST_READ_AYAH, data)
  }
}