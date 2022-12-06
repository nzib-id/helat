export const state = () => {
  return {
    user: {
      email: '',
      phone: null,
      password: '',
    },
  }
}

export const mutations = {
  async login(state) {
    try {
      let response = await this.$auth.loginWith('local', {
        data: state.user,
      })
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  },
}

export const actions = {}

export const getters = {}
