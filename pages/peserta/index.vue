<template>
  <v-container>
    <v-col>
      <v-row>
        <v-card class="py-3 px-2 text-capitalize" outlined>
          <v-card-title> Peserta </v-card-title>
          <pesertaList height="330" />
        </v-card>
      </v-row>
      <v-row class="mt-9">
        <v-card class="d-flex" @click="show = !show" :ripple="false">
          <v-card-title class="text-capitalize text-h5 font-weight-bold">
            Program
          </v-card-title>
          <v-icon absolute right> mdi-chevron-down</v-icon>
        </v-card>
      </v-row>
      <v-row v-if="show" class="mt-5 d-flex flex-column">
        <programList />
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import pesertaList from '~/components/peserta/pesertaList.vue'
import programList from '~/components/program/programList.vue'
export default {
  components: { pesertaList, programList },
  data() {
    return {
      show: false,
    }
  },
  methods: {},
}
</script>
