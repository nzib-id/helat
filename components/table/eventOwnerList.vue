<template>
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
          <td>
            <v-chip
              depressed
              outlined
              @click="approval(index, item.id)"
              :color="item.is_active ? 'success' : 'rgb(175, 175, 175 )'"
            >
              {{ item.is_active ? 'Approved' : 'Unapproved' }}</v-chip
            >
          </td>
          <td>
            <v-btn @click="deleteIt(index)" color="error" icon small>
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
      profic: require('~/static/images/person.jpg'),
      headers: [
        { text: 'Nama', value: 'name' },
        { text: 'Event', value: 'Event' },
        { text: 'Budget', value: 'budget' },
        { text: 'Status', value: 'is_active' },
        { text: '', value: '', sortable: false },
        { text: '', value: '', sortable: false },
      ],
      items: [],
      userid: {},
    }
  },
  methods: {
    async approval(index, id) {
      if (this.items[index].is_active === false) {
        try {
          await this.$axios
            .put('/api' + '/users/activate/' + id, {
              is_active: true,
            })
            .then((this.items[index].is_active = true))
        } catch (error) {
          console.log(error)
        }
      } else if (this.items[index].is_active === true) {
        try {
          await this.$axios
            .put('/api' + '/users/activate/' + id, {
              is_active: false,
            })
            .then((this.items[index].is_active = false))
        } catch (error) {
          console.log(error)
        }
      }
    },
    async getDataEO() {
      try {
        this.loading = true
        await this.$axios.get('/api' + '/candidates/').then((response) =>
          response.data.data.forEach(async (item) => {
            try {
              await this.$axios
                .get('/api' + '/users/userid/' + item.user_id)
                .then((response) => {
                  this.items.push(response.data)
                  this.loading = false
                })
            } catch (error) {}
          })
        )
      } catch (error) {
        console.log(error)
      }
    },
    deleteIt(index) {
      this.items.splice(index, 1)
    },
  },
  computed: {},
  mounted() {
    this.getDataEO()
  },
}
</script>
