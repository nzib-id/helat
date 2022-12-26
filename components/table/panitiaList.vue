<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="5"
      fixed-header
      :height="height"
      :loading="loading"
      locale="id"
    >
      <template v-slot:body="{ items }">
        <tbody>
          <tr
            class="font-weight-bold text-capitalize"
            v-for="(item, index) in items"
            :key="index"
            @click="getUserId(index)"
          >
            <td>
              <v-container>
                <v-avatar size="32" class="mr-3">
                  <v-img :lazy-src="profic" :src="profic"></v-img>
                </v-avatar>
                {{ item.volunteer_name }}
              </v-container>
            </td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  props: {
    height: null,
  },
  data() {
    return {
      loading: false,
      profic: require('~/static/images/person.jpg'),
      headers: [
        { text: 'Nama', value: 'volunteer_name' },
        { text: 'Event Berjalan', value: 'name' },
        { text: 'Event Selesai', value: 'name' },
        { text: 'Capil Terjaring', value: 'name' },
      ],
      items: [],
    }
  },

  methods: {
    async getPanitiaList() {
      try {
        this.loading = true
        this.items = (await this.$axios.get('/api' + '/volunteer/')).data.data
        this.loading = false
      } catch (error) {}
    },

    getUserId(index) {
      this.$store.commit('panitia/showDetail', this.items[index].id)
    },
  },

  mounted() {
    this.getPanitiaList()
  },
}
</script>
