<template>
  <div>
    <v-data-table
      :options.sync="options"
      :server-items-length="totalPeserta"
      :headers="headers"
      :items="peserta"
      :height="height"
      :loading="loading"
      locale="id"
      disable-sort
      hide-default-footer
      fixed-header
    >
      <template v-slot:body="{ items }">
        <tbody>
          <tr
            class="font-weight-bold text-capitalize"
            v-for="(item, index) in items"
            :key="index"
          >
            <td>
              <v-container>
                <v-avatar size="32" class="mr-3">
                  <v-img :lazy-src="profic" :src="profic"></v-img>
                </v-avatar>
                {{ item.constituent_name }}
              </v-container>
            </td>
            <td>{{ item.id }}</td>
            <td>{{ index }}</td>
            <td>{{ index }}</td>
            <td>
              <v-menu
                nudge-right="9"
                offset-x
                rounded="lg"
                content-class="elevation-0"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    @click="getUserId(index)"
                    retain-focus-on-click
                    v-bind="attrs"
                    v-on="on"
                    small
                    icon
                  >
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-btn
                  to="/peserta/detail"
                  class="subtitle-2 text-capitalize font-weight-bold"
                  depressed
                  small
                  color="primary"
                >
                  lihat detail</v-btn
                >
              </v-menu>
            </td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
    <v-pagination
      v-model="options.page"
      :length="options.pageCount"
    ></v-pagination>
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
      totalPeserta: 0,
      peserta: [],
      options: {
        page: 1,
        pageCount: 0,
        itemsPerPage: 5,
      },
      profic: require('~/static/images/person.jpg'),
      headers: [
        { text: 'nama', value: 'constituent_name' },
        { text: 'event berjalan', value: 'name' },
        { text: 'event selesai', value: 'name' },
        { text: 'capil terjaring', value: 'name' },
        { text: '', value: '', sortable: false },
      ],
    }
  },

  methods: {
    async getPesertaList() {
      try {
        this.getPageCount()
        this.loading = true
        const { itemsPerPage, page } = this.options
        this.$store.commit('peserta/returnPage', page)
        let skip = page * 5 - 5
        const { data } = await this.$axios.get(
          '/api' + '/constituents/?skip=' + skip + '&limit=' + itemsPerPage
        )

        this.peserta = data.data
        this.loading = false
      } catch (error) {}
    },

    async getPageCount() {
      const { data } = await this.$axios.get(
        '/api' + '/constituents/?skip=0&limit=99999'
      )
      this.totalPeserta = data.count
      this.options.pageCount = Math.ceil(
        this.totalPeserta / this.options.itemsPerPage
      )
    },

    getUserId(index) {
      this.$store.commit('peserta/getUserId', this.peserta[index].id)
    },
  },

  watch: {
    options: {
      handler() {
        this.getPesertaList()
      },
      deep: true,
    },
  },

  mounted() {
    this.options.page = this.$store.state.peserta.page
  },
}
</script>
