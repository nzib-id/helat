<template>
  <v-container class="ma-0 pa-0">
    <v-row class="ma-5">
      <v-col v-for="(value, key) in data" :key="key">
        <v-card class="py-3 px-2 text-capitalize" outlined>
          <v-card-title class="ma-0 pb-0">
            {{ value.name }}
          </v-card-title>
          <v-card-title class="display-1 font-weight-bold">
            <span>{{ value.value }}</span>
          </v-card-title>
          <v-card-subtitle>{{ value.type }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="ma-5">
      <v-col>
        <statistikcard />
      </v-col>
    </v-row>
    <v-row class="ma-5">
      <v-col cols="8">
        <v-card class="py-3 px-2 text-capitalize" outlined>
          <kandidatcard />
        </v-card>
      </v-col>
      <v-col>
        <v-card outlined>
          <v-card-title>Chart</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import statistikcard from '~/components/dashboard/statistikcard.vue'
import kandidatcard from '~/components/kandidat/kandidatcard.vue'
export default {
  name: 'IndexPage',
  auth: false,
  data() {
    return {}
  },
  components: {
    statistikcard,
    kandidatcard,
  },
  computed: {
    data() {
      return this.$store.getters['dashboard/localeString']
    },
  },
  mounted() {},
}
</script>
