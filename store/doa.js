import { ApiPath, storageKey } from '../constant/index'
import { __isNotNull } from '../utils/index'
import { getItem, setItem } from '../utils/storage'

export const state = () => ({
  allDoaList: [],
  doaDetail: {},
  favoriteDoa:[],
  lastReadDoa: null
})

export const mutations = {
  setDoaList (state, data) {
    state.allDoaList = data
  },
  setDoaDetail(state, data) {
    state.doaDetail = data
  },
  setFavoriteDoa (state, data) {
    state.favoriteDoa = data
  },
  setLastReadDoa (state, data) {
    state.lastReadDoa = data
  }
}

export const actions = {
  fetchAllDoa ({ commit }, { success = () => {} }) {
    const cache = getItem(storageKey.ALL_DOA)
    
    if (__isNotNull(cache)) {
      commit('setDoaList', cache)
      success && success(cache)
    } else {
      fetch(ApiPath.DOA_INFO)
        .then(response => {
          return response.json()
        })
        .then(data => {
          console.log(data)
          const arrayData = data.hisnul_muslim
          setItem(storageKey.ALL_DOA, arrayData)
          commit('setDoaList', arrayData)
          success && success(arrayData)
        })
    }
  },
  readDataFromStorage ({ commit }) {
    const cacheFavoriteDoa = getItem(storageKey.FAVORITE_DOA) || []
    commit('setFavoriteDoa', cacheFavoriteDoa)
  },
  addToFavoriteDoa ({ commit, state }, doa) {
    const isExist = state.favoriteDoa.find(item => item.title === doa.title)
    if (!isExist) {
      const newFavorite = [...state.favoriteDoa, doa]
      commit('setFavoriteDoa', newFavorite)
      setItem(storageKey.FAVORITE_DOA, newFavorite)
    }
  },
  removeFromFavoriteDoa ({ commit, state }, doa) {
    const isExist = state.favoriteDoa.find(item => item.title === doa.title)
    if (isExist) {
      const newFavorite = state.favoriteDoa.filter(item => item.title !== doa.title) || []
      commit('setFavoriteDoa', newFavorite)
      setItem(storageKey.FAVORITE_DOA, newFavorite)
    }
  }
}