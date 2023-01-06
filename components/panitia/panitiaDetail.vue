<template>
  <v-container class="pt-10">
    <v-row>
      <v-card-title class="text-capitalize text-h5 font-weight-bold">
        <v-btn
          to="/panitia"
          color="primary"
          small
          icon
          class="mr-3 dark"
          exact-path
        >
          <v-icon>mdi-arrow-left-thick</v-icon>
        </v-btn>

        {{ user.name }}
      </v-card-title>
    </v-row>
    <v-row>
      <v-card class="d-flex ml-12 mt-2 pa-5" rounded="xl" width="600" outlined>
        <v-col cols="6">
          <v-list>
            <v-list-item
              class="body-1"
              v-if="key != 'name'"
              v-for="(item, key) in user"
              :key="key"
              style="border-bottom: 1px solid #ccc"
            >
              <v-list-item-content
                class="overflow-visible"
                v-if="key != 'gender'"
              >
                {{ item }}
              </v-list-item-content>
              <v-list-item-content v-if="key == 'gender'">
                {{
                  item == 'male' || item == 'pria' ? 'Laki-laki' : 'Perempuan'
                }}
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="5 ml-9" full-height>
          <v-card :img="profic" height="100%" class="rounded-xl" outlined>
          </v-card>
        </v-col>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      user: {
        nik: 0,
        name: '',
        ttl: '',
        gender: '',
        email: '',
        phone: 0,
      },
      profic: require('~/static/images/person.jpg'),
    }
  },
  methods: {
    async getPanitiaDetail1() {
      try {
        const { data } = await this.$axios.get(
          '/api' +
            '/volunteer/volunteer-userid/' +
            this.$store.state.panitia.userId
        )
        this.user.name = data.volunteer_name
        this.user.nik = data.nik
        this.user.ttl = data.place_of_birth + ',' + ' ' + data.date_of_birth
        this.user.gender = data.gender
        this.user.phone = data.cellphone
      } catch (error) {}
    },
    async getPanitiaDetail2() {
      try {
        const { data } = await this.$axios.get(
          '/api' + '/users/userid/' + this.$store.state.panitia.userId
        )
        this.user.email = data.email
      } catch (error) {}
    },
  },
  computed: {},

  created() {
    this.getPanitiaDetail1()
    this.getPanitiaDetail2()
  },
}
</script>
