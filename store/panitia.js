export const state = () => {
  return {
    showDetail: false,
    userId: '',
  }
}

export const mutations = {
  async showDetail(state, id) {
    state.showDetail = !state.showDetail
    state.userId = id
  },
}

export const actions = {}

export const getters = {}
