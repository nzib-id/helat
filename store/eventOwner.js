export const state = () => {
  return {
    page: 1,
  }
}

export const mutations = {
  returnPage(state, page) {
    return (state.page = page)
  },
}

export const actions = {}

export const getters = {}
