export const state = () => {
  return {
    show: false,
    drawer: [
      {
        name: 'Dashboard',
        icon: 'mdi-view-dashboard-outline',
        to: '/',
      },
      {
        name: 'Event Owner',
        icon: 'mdi-account-outline',
        to: '/event-owner',
      },
      {
        name: 'Panitia',
        icon: 'mdi-handshake-outline',
        to: '/panitia',
      },
      {
        name: 'Peserta',
        icon: 'mdi-account-group-outline',
        to: '/peserta',
      },
    ],
  }
}

export const mutations = {}

export const actions = {}

export const getters = {}
