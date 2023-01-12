<template>
  <v-container>
    <v-col>
      <v-row>
        <v-btn class="subtitle-1 text-capitalize" to="/peserta" text exact-path>
          <v-icon color="red" class="mr-3 text--black"
            >mdi-arrow-left-thick</v-icon
          >
          <v-card-title class="text-capitalize text-h5 font-weight-bold">{{
            program.name
          }}</v-card-title>
        </v-btn>
      </v-row>
      <v-row>
        <v-list>
          <v-container rounded>
            <v-row>
              <v-col class="d-flex flex-column align-center">
                <v-card-subtitle class="my-1 subtitle-1 text--secondary"
                  >lorem ipsum doplor sitamet this is a placeholder text you can
                  place</v-card-subtitle
                >
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="4" v-for="(item, key) in program.detail" :key="key">
                <v-card
                  class="d-flex flex-column align-center text--disabled"
                  outlined
                >
                  <v-card-subtitle
                    class="pb-2 text--disabled"
                    v-if="key === 'date'"
                  >
                    Tanggal dibuat:
                  </v-card-subtitle>
                  <v-card-subtitle
                    class="pb-2 text--disabled"
                    v-if="key === 'creator'"
                  >
                    Dibuat oleh:
                  </v-card-subtitle>
                  <v-card-subtitle
                    class="pb-2 text--disabled"
                    v-if="key === 'candidateName'"
                  >
                    Event Owner:
                  </v-card-subtitle>
                  <v-card-title class="pt-0">{{ item }}</v-card-title>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-list>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      programId: '',
      program: {},
    }
  },

  methods: {
    async getProgramDetail() {
      try {
        const { data } = await this.$axios.get(
          '/api' + '/programs/' + this.programId
        )
        console.log(data)
        const candidate = await this.$axios.get(
          '/api' + '/users/userid/' + data.candidate_userid
        )
        const creator = await this.$axios.get(
          '/api' + '/users/userid/' + data.created_by
        )

        this.program = {
          name: data.program_name,
          description: data.description,
          detail: {
            date: data.created_at.slice(0, 10),
            candidateName: candidate.data.name,
            creator: creator.data.name,
          },
        }
      } catch (error) {}
    },
  },

  mounted() {
    this.programId = this.$store.state.program.programId
    this.getProgramDetail()
  },
}
</script>
