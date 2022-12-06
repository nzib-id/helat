export const state = () => {
  return {
    items: [
      {
        name: 'Kandidat',
        value: 3,
        type: 'orang',
      },
      {
        name: 'Relawan',
        value: 29,
        type: 'orang',
      },
      {
        name: 'Calon Pemilih',
        value: 3342,
        type: 'orang',
      },
      {
        name: 'Kampanye',
        value: 27,
        type: 'kampanye',
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
