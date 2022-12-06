export const state = () => {
  return {
    title: 'Dapilku',
    drawer: [
      {
        name: 'Dashboard',
        icon: 'mdi-view-dashboard-outline',
        to: '/',
      },
      {
        name: 'Kandidat',
        icon: 'mdi-account-outline',
        to: '/kandidat',
      },
      {
        name: 'Relawan',
        icon: 'mdi-handshake-outline',
        to: '/relawan',
      },
      {
        name: 'Calon Pemilih',
        icon: 'mdi-account-group-outline',
        to: '/calon-pemilih',
      },
    ],
  }
}

export const mutations = {}

export const actions = {}

export const getters = {
  tampil: (state) => {
    return state.title.toUpperCase()
  },
}
