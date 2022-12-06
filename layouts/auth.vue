<template>
  <v-app>
    <v-container class="ma-0 pa-0" fluid fill-height>
      <v-row no-gutters style="height: 100%">
        <v-col cols="4" class="ma-0 pa-0">
          <v-img :src="image" eager height="100%"></v-img>
        </v-col>
        <v-col cols="8"><Nuxt /></v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'authLayout',
  data() {
    return {
      image: require('~/static/images/background.png'),
    }
  },
}
</script>
