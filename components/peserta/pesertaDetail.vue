<template>
  <v-container>
    <v-row class="">
      <v-card-title class="text-capitalize">
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

        {{ user.constituent_name }}
      </v-card-title>
    </v-row>
    <v-row>
      <v-col cols="5">
        <v-list class="text-capitalize">
          <v-list-item>
            <v-list-item-content>
              <v-card class="pa-2" outlined rounded="pill">
                {{ user.place_of_birth }}, {{ user.date_of_birth }}
              </v-card>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-card class="pa-2" outlined rounded="pill">
                {{ user.address }}
              </v-card>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-card class="pa-2" outlined rounded="pill">
                {{ user.gender }}
              </v-card>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="3">
        <v-card
          :img="profic"
          width="200"
          height="250"
          class="rounded-xl"
          elevation="6"
        >
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      profic: require('~/static/images/person.jpg'),
    }
  },
  methods: {
    async getPesertaDetail() {
      try {
        this.user = (
          await this.$axios.get(
            '/api' + '/constituents/' + this.$store.state.peserta.userId
          )
        ).data
      } catch (error) {}
    },
  },
  computed: {},

  mounted() {
    this.getPesertaDetail()
  },
}
</script>
