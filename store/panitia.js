export const state = () => {
  return {
    userId: '',
    page: 1,
  }
}

export const mutations = {
  getUserId(state, id) {
    return (state.userId = id)
  },
  returnPage(state, page) {
    return (state.page = page)
  },
}

export const actions = {}

export const getters = {}
