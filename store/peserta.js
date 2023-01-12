export const state = () => {
  return {
    id: '',
    userId: '',
    page: 1,
  }
}

export const mutations = {
  getUserId(state, id) {
    state.userId = id
  },
  getConstituentId(state, id) {
    state.id = id
  },

  returnPage(state, page) {
    return (state.page = page)
  },
}

export const actions = {}

export const getters = {}
