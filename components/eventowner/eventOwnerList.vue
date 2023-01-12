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
      <template v-slot:item.name="{ item }">
        <v-container class="font-weight-bold">
          <v-avatar size="32" class="mr-3">
            <v-img :lazy-src="profic" :src="profic"></v-img>
          </v-avatar>
          {{ item.name }}
        </v-container>
      </template>
      <template v-slot:item.event="{ item }">
        <span class="font-weight-bold">
          {{ item.event }}
        </span>
      </template>
      <template v-slot:item.is_active="{ item, index }">
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
      </template>
    </v-data-table>
    <v-pagination
      v-model="options.page"
      :length="totalEventOwners"
      total-visible="7"
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
        { text: 'event', value: 'event' },
        { text: 'program', value: 'program' },
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

        const { data } = await this.$axios.get(
          '/api' + '/candidates/?skip=0&limit=99999'
        )
        this.totalEventOwners = Math.ceil(
          data.count / this.options.itemsPerPage
        )

        const { itemsPerPage, page } = this.options
        this.$store.commit('eventOwner/returnPage', page)
        let skip = page * 5 - 5
        let eventOwners
        await this.$axios
          .get('/api' + '/candidates/?skip=' + skip + '&limit=' + itemsPerPage)
          .then((res) => {
            eventOwners = []
            res.data.data.forEach((item, index) => {
              eventOwners[index] = {
                name: item.candidate_name,
                id: item.user_id,
                event: 0,
                is_active: null,
              }
            })
          })
          .then(() => {
            eventOwners.forEach(async (item, index) => {
              const { data } = await this.$axios.get(
                '/api' + '/users/userid/' + item.id
              )
              eventOwners[index].is_active = data.is_active
            })
          })
          .then(() => {
            eventOwners.forEach(async (item, index) => {
              const { data } = await this.$axios.get(
                '/api' +
                  '/campaigns/candidate/{user_id}?cand_user_id=' +
                  item.id +
                  '&skip=0&limit=99999'
              )
              eventOwners[index].event = data.count
            })
          })
          .then(() => {
            setTimeout(() => {
              this.eventOwners = eventOwners
              this.loading = false
            }, 500)
          })
      } catch (error) {
        console.log(error)
      }
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
    this.options.page = this.$store.state.eventOwner.page
  },
}
</script>

<style lang="scss">
td {
  border: none !important;
}
</style>
