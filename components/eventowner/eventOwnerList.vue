<template>
  <div>
    <v-data-table
      :server-items-length="totalEventOwners"
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
            <td>{{ item.event }}</td>
            <td>{{ item.event }}</td>
            <td>
              <v-menu auto rounded="lg" content-class="elevation-3">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    :color="item.is_active ? 'success' : 'rgba(175,175,175)'"
                    class="subtitle-2 font-weight-bold text-capitalize"
                    :loading="btnLoading[index] || loading"
                    depressed
                    outlined
                    small
                  >
                    {{ item.is_active ? 'Approved' : 'Unapproved' }}
                  </v-btn>
                </template>
                <v-list class="px-0 py-2" dense>
                  <v-list-item>
                    <v-btn
                      @click="approve(index, item.id)"
                      color="success"
                      class="subtitle-2 font-weight-bold text-capitalize"
                      depressed
                      outlined
                      small
                      block
                    >
                      Approve
                    </v-btn>
                  </v-list-item>
                  <v-list-item>
                    <v-btn
                      @click="unapprove(index, item.id)"
                      color="error"
                      class="subtitle-2 font-weight-bold text-capitalize"
                      depressed
                      outlined
                      small
                      block
                    >
                      Unapprove
                    </v-btn>
                  </v-list-item>
                </v-list>
              </v-menu>
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
      :length="totalEventOwners"
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
      index: 0,
      loading: false,
      btnLoading: [false],
      eventOwners: [],
      totalEventOwners: 0,
      options: {
        page: 0,
        itemsPerPage: 5,
      },
      profic: require('~/static/images/person.jpg'),
      headers: [
        { text: 'nama', value: 'name' },
        { text: 'event', value: 'Event' },
        { text: 'program', value: 'Program' },
        // { text: 'budget', value: 'budget' },
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
        let eventOwners = []
        const { itemsPerPage, page } = this.options
        this.$store.commit('eventOwner/returnPage', page)
        let skip = page * 5 - 5
        const { data } = await this.$axios.get(
          '/api' + '/candidates/?skip=' + skip + '&limit=' + itemsPerPage
        )
        data.data.forEach(async (item, index) => {
          await this.$axios
            .get('/api' + '/users/userid/' + item.user_id)
            .then(async (response) => {
              eventOwners.push(response.data)
              const res = await this.$axios.get(
                '/api' +
                  '/campaigns/candidate/{user_id}?cand_user_id=' +
                  response.data.id +
                  '&skip=0&limit=99999'
              )
              eventOwners[index].event = res.data.count
            })
        })
        this.eventOwners = eventOwners
        console.log(this.eventOwners)
        this.loading = false
      } catch (error) {
        console.log(error)
      }
    },

    async getTotalEO() {
      const { data } = await this.$axios.get(
        '/api' + '/candidates/?skip=0&limit=99999'
      )
      this.totalEventOwners = Math.ceil(data.count / this.options.itemsPerPage)
    },

    async approve(index, id) {
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
    },

    async unapprove(index, id) {
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

  mounted() {
    this.getTotalEO()
    this.options.page = this.$store.state.eventOwner.page
  },
}
</script>
