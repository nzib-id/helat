<template>
  <v-container class="ma-0 pa-0">
    <v-row class="ma-5">
      <v-col v-for="(item, key) in data" :key="key">
        <v-card class="py-3 px-2 text-capitalize" outlined>
          <v-card-title class="ma-0 pb-0">
            {{ item.name }}
          </v-card-title>
          <v-card-title class="display-1 font-weight-bold">
            <span>{{ item.value }}</span>
          </v-card-title>
          <v-card-subtitle>{{ item.type }}</v-card-subtitle>
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
          <eocard />
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
import eocard from '~/components/eo/eocard.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'IndexPage',
  data() {
    return {}
  },
  components: {
    statistikcard,
    eocard,
  },
  computed: {
    ...mapGetters({
      data: 'dashboard/localeString',
    }),
  },
  mounted() {},
}
</script>
