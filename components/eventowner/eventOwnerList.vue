<template>
  <div>
    <v-data-table
      :options.sync="options"
      :headers="headers"
      :items="eventOwners"
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
                {{ item.name }}
              </v-container>
            </td>
            <td>{{ index }}</td>
            <td>{{ index }}</td>
            <td>{{ item.is_active }}</td>
            <td>
              <v-btn
                class="subtitle-2 font-weight-bold text-capitalize"
                :loading="btnLoading[index] || loading"
                depressed
                outlined
                small
                @click.prevent="approval(index, item.id)"
                :color="item.is_active ? 'success' : 'rgb(175, 175, 175 )'"
              >
                {{ item.is_active ? 'Approved' : 'Unapproved' }}
              </v-btn>
            </td>
            <td>
              <v-btn @click="" color="error" icon small>
                <v-icon>mdi-cancel</v-icon>
              </v-btn>
            </td>
            <td>
              <v-btn small icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
    <v-pagination
      v-model="options.page"
      :length="options.pageCount"
      total-visible="7"
    ></v-pagination>
  </div>
</template>

<style lang="scss">
td {
  border: none !important;
}
</style>

<script>
export default {
  props: {
    height: null,
  },
  data() {
    return {
      loading: false,
      btnLoading: [false],
      eventOwners: [],
      totalEventOwners: 7,
      userid: {},
      options: {
        page: 0,
        pageCount: 0,
        itemsPerPage: 5,
      },
      profic: require('~/static/images/person.jpg'),
      headers: [
        { text: 'nama', value: 'name' },
        { text: 'event', value: 'Event' },
        { text: 'program', value: 'Program' },
        { text: 'budget', value: 'budget' },
        { text: 'status', value: 'is_active' },
        { text: '', value: '', sortable: false },
        { text: '', value: '', sortable: false },
      ],
    }
  },

  methods: {
    async getDataEO() {
      try {
        this.loading = true
        const { itemsPerPage, page } = this.options
        this.$store.commit('eventOwner/returnPage', page)
        let skip = page * 5 - 5

        await this.$axios
          .get('/api' + '/candidates/?skip=' + skip + '&limit=' + itemsPerPage)
          .then((response) => {
            this.eventOwners = []
            response.data.data.forEach(async (item) => {
              const { data } = await this.$axios.get(
                '/api' + '/users/userid/' + item.user_id
              )
              if (data != this.eventOwners) {
                this.eventOwners.push(data)
              }
            })
          })
        this.loading = false
      } catch (error) {
        console.log(error)
      }
    },

    async getPageCount() {
      const { data } = await this.$axios.get(
        '/api' + '/candidates/?skip=0&limit=99999'
      )
      this.totalEventOwners = data.count
      this.options.pageCount = Math.ceil(
        this.totalEventOwners / this.options.itemsPerPage
      )
    },

    async approval(index, id) {
      if (this.eventOwners[index].is_active === false) {
        try {
          this.btnLoading[index] = true
          await this.$axios.put('/api' + '/users/activate/' + id, {
            is_active: true,
          })
          this.eventOwners[index].is_active = true
          this.btnLoading[index] = false
        } catch (error) {
          console.log(error)
        }
      } else if (this.eventOwners[index].is_active === true) {
        try {
          this.btnLoading[index] = true
          await this.$axios.put('/api' + '/users/activate/' + id, {
            is_active: false,
          })
          this.eventOwners[index].is_active = false
          this.btnLoading[index] = false
        } catch (error) {
          console.log(error)
        }
      }
    },
  },

  watch: {
    options: {
      handler() {
        this.getDataEO()
      },
      deep: true,
    },
  },

  created() {
    this.getPageCount()
    this.options.page = this.$store.state.eventOwner.page
  },
}
</script>
