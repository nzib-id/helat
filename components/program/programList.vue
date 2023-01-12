<template>
  <v-container class="d-flex">
    <v-row>
      <v-col cols="3" v-if="loading">
        <v-card outlined>
          <v-skeleton-loader
            class="mx-auto"
            max-width="300"
            type="article"
          ></v-skeleton-loader>
        </v-card>
      </v-col>
      <v-col v-else cols="3" v-for="(item, index) in programList" :key="index">
        <v-hover>
          <template v-slot:default="{ hover }">
            <v-card
              @click="getProgramId(item.id)"
              class="pa-5 d-flex flex-column justify-center"
              :hover="true"
              height="175"
              :elevation="hover ? 6 : 3"
              to="/program"
              :ripple="false"
              rounded="lg"
            >
              <v-card-title
                class="subtitle-1 font-weight-medium text-capitalize"
              >
                {{ item.program_name }}
              </v-card-title>
              <v-card-text>{{ item.candidate_name }}</v-card-text>
              <v-btn color="primary" icon absolute large outlined bottom right>
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-card>
          </template>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      programList: [],
      programId: '',
      loading: false,
    }
  },
  methods: {
    async getProgramList() {
      try {
        this.loading = true
        const { data } = await this.$axios.get('/api' + '/programs/')
        let programList = data.data
        programList.forEach(async (item) => {
          const res = await this.$axios.get(
            '/api' + '/users/userid/' + item.candidate_userid
          )
          item['candidate_name'] = res.data.name
        })
        setTimeout(() => {
          this.programList = programList
          this.loading = false
        }, 1500)
      } catch (error) {
        console.log(error)
      }
    },
    getProgramId(id) {
      this.$store.commit('program/getProgramId', id)
    },
  },

  mounted() {
    this.getProgramList()
  },
}
</script>
