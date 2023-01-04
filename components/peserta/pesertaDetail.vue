<template>
  <v-container class="pt-10">
    <v-row>
      <v-card-title class="text-capitalize text-h5 font-weight-bold">
        <v-btn
          to="/peserta"
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
    <v-row class="mx-6 mt-9" align="center">
      <v-card class="d-flex" @click="show = !show" :ripple="false">
        <v-card-title class="text-capitalize text-h5 font-weight-bold">
          Program Diikuti
        </v-card-title>
        <v-icon absolute right>mdi-chevron-down</v-icon>
      </v-card>
    </v-row>
    <v-slide-y-transition>
      <v-row v-if="show" class="mx-6 mt-5 d-flex flex-column">
        <v-card
          v-for="(item, key, index) in event"
          class="mb-5"
          width="500"
          rounded="xl"
          elevation="2"
          to="#"
          :key="key"
          :ripple="false"
        >
          <v-card-title class="subtitle-1"> {{ item.name }} </v-card-title>
          <v-card-text class="mt-n5 text--disabled">{{ item.eo }}</v-card-text>
        </v-card>
      </v-row>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      user: {
        nik: 0,
        name: '',
        ttl: '',
        gender: '',
        email: '',
        phone: 0,
      },
      event: [
        { name: 'Jalan Kayang', eo: 'Dadang Kurniawan' },
        { name: 'Jalan Ngelayang', eo: 'Jujun Junaedi' },
      ],
      userId: '',
      profic: require('~/static/images/person.jpg'),
    }
  },
  methods: {
    async getPesertaDetail1() {
      try {
        const { data } = await this.$axios.get(
          '/api' + '/constituents/' + this.$store.state.peserta.id
        )
        this.user.name = data.constituent_name
        this.user.nik = data.nik
        this.user.ttl = data.place_of_birth + ',' + ' ' + data.date_of_birth
        this.user.gender = data.gender
        this.user.phone = data.cellphone
        this.userId = data.user_id
      } catch (error) {}
    },

    async getPesertaDetail2() {
      try {
        const { data } = await this.$axios.get(
          '/api' + '/users/userid/' + this.$store.state.peserta.userId
        )
        this.user.email = data.email
      } catch (error) {}
    },
  },
  computed: {},

  mounted() {
    this.getPesertaDetail1()
    this.getPesertaDetail2()
  },
}
</script>
