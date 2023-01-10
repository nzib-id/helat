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
        <v-card
          class="mb-5 pa-5"
          style="border-left: 6px solid #eb4335"
          elevation="2"
          to="#"
          :ripple="false"
        >
          <v-card-title class="text-capitalize">
            {{ item.program_name }}
          </v-card-title>
          <v-card-text>{{ item.candidate_name }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      programList: [],
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
  },

  mounted() {
    this.getProgramList()
  },
}
</script>
