<template>
  <v-container class="ma-0 pa-0">
    <v-row class="ma-5">
      <v-col v-for="(item, key) in items" :key="key">
        <v-card class="py-3 px-2 text-capitalize" outlined>
          <v-card-title class="ma-0 pb-0">
            {{ item.name }}
          </v-card-title>
          <v-card-title class="display-1 font-weight-bold">
            <span>{{ item.value.toLocaleString('id') }}</span>
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
          <v-tabs v-model="tabs" class="" slider-size="0">
            <v-tab
              active-class="black--text"
              class="subtitle-1 font-weight-bold text-capitalize"
              v-for="(item, index) in tabItems"
              :key="index"
            >
              {{ item }}
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tabs">
            <v-tab-item transition="slide-x-transition">
              <EventOwnerList height="200" />
            </v-tab-item>
            <v-tab-item transition="slide-x-transition">
              <PanitiaList height="200" />
            </v-tab-item>
          </v-tabs-items>
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
import EventOwnerList from '~/components/table/eventOwnerList.vue'
import PanitiaList from '~/components/table/panitiaList.vue'

export default {
  name: 'IndexPage',
  components: {
    statistikcard,
    EventOwnerList,
    PanitiaList,
  },
  data() {
    return {
      tabs: null,
      tabItems: ['Event Owner', 'Panitia', 'Peserta'],
      items: [
        {
          name: 'Event Owner',
          value: 0,
          type: 'orang',
        },
        {
          name: 'Panitia',
          value: 0,
          type: 'orang',
        },
        {
          name: 'Peserta',
          value: 0,
          type: 'orang',
        },
        {
          name: 'Event',
          value: 0,
          type: 'Events',
        },
      ],
    }
  },

  methods: {},

  computed: {
    async getEO() {
      try {
        await this.$axios
          .get('/api' + '/candidates/')
          .then((response) => (this.items[0].value = response.data.count))
      } catch (error) {
        console.log(error)
      }
    },
    async getPanitia() {
      try {
        await this.$axios
          .get('/api' + '/volunteer/')
          .then((response) => (this.items[1].value = response.data.count))
      } catch (error) {
        console.log(error)
      }
    },
    async getPeserta() {
      try {
        await this.$axios
          .get('/api' + '/constituents/')
          .then((response) => (this.items[2].value = response.data.count))
      } catch (error) {
        console.log(error)
      }
    },
    async getEvent() {
      try {
        await this.$axios
          .get('/api' + '/campaigns/')
          .then((response) => (this.items[3].value = response.data.count))
      } catch (error) {
        console.log(error)
      }
    },
  },
  mounted() {
    this.getEO
    this.getPanitia
    this.getPeserta
    this.getEvent
  },
}
</script>
