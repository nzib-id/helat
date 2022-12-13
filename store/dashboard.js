export const state = () => {
  return {
    items: [
      {
        name: 'Event Owner',
        value: 3,
        type: 'orang',
      },
      {
        name: 'Panitia',
        value: 29,
        type: 'orang',
      },
      {
        name: 'Peserta',
        value: 3342,
        type: 'orang',
      },
      {
        name: 'Event',
        value: 27,
        type: 'Events',
      },
    ],
  }
}

export const mutations = {}

export const actions = {}

export const getters = {
  localeString: (state) => {
    return state.items.map((item) => ({
      name: item.name,
      value: item.value.toLocaleString('id'),
      type: item.type,
    }))
  },
}
