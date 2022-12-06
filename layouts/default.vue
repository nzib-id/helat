<template>
  <v-app>
    <v-container fluid fill-height class="pa-0">
      <v-col
        class="pa-0 ma-0 align-self-start overflow-hidden"
        style="height: 100%"
      >
        <v-row class="" no-gutters>
          <v-col>
            <v-toolbar flat outlined height="102" style="z-index: 1">
              <v-row justify="end" align="center" class="">
                <v-col cols="9" align="center" class="" justify="center">
                  <searchBar />
                </v-col>
                <v-col cols="1" class="" align="center">
                  <notification />
                </v-col>
              </v-row>
            </v-toolbar>
          </v-col>
        </v-row>
        <v-row no-gutters style="height: 100%">
          <v-col cols="2"><drawer /></v-col>
          <v-col cols="10"><Nuxt /></v-col>
        </v-row>
      </v-col>
    </v-container>
  </v-app>
</template>

<script>
import searchBar from '~/components/header/searchBar.vue'
import drawer from '~/components/drawer.vue'
import notification from '~/components/header/notification.vue'
export default {
  name: 'DefaultLayout',
  components: {
    searchBar,
    drawer,
    notification,
  },
}
</script>
