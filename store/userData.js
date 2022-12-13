export const state = () => {
  return {
    user: {},
  }
}

export const mutations = {
  saveUser(state, payload) {
    return (state.user = payload)
  },
}
export const actions = {}
export const getters = {}
