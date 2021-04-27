import { AppConstant } from '../constant/index'

export const state = () => ({
  headerTitle: AppConstant.TITLE
})

export const mutations = {
  setHeaderTitle (state, data) {
    state.headerTitle = data
  }
}