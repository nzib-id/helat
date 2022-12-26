<template>
  <v-container>
    <v-row class="">
      <v-card-title class="text-capitalize">
        <v-btn @click="back()" color="primary" small icon class="mr-3">
          <v-icon>mdi-arrow-left-thick</v-icon>
        </v-btn>
        {{ user.volunteer_name }}
      </v-card-title>
    </v-row>
    <v-row>
      <v-col cols="5">
        <v-list>
          <v-list-item v-for="(item, key) in user" :key="key">
            <v-list-item-content>
              <v-card class="pa-4" outlined rounded="pill"
                >{{ key }} : {{ item }}</v-card
              >
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
    back() {
      this.$store.commit('panitia/showDetail')
    },
    async getPanitiaDetail() {
      try {
        this.user = (
          await this.$axios.get(
            '/api' + '/volunteer/volunteer/' + this.$store.state.panitia.userId
          )
        ).data
      } catch (error) {}
    },
  },
  computed: {
    showDetail() {
      return this.$store.state.panitia.showDetail
    },
  },

  mounted() {
    this.getPanitiaDetail()
  },
}
</script>
