<template>
  <v-container class="d-flex">
    <v-card class="py-3 px-2 text-capitalize" outlined>
      <v-card-title>{{ title }}</v-card-title>
      <kandidatcard />
    </v-card>
  </v-container>
</template>

<script>
import kandidatcard from '~/components/kandidat/kandidatcard.vue'
export default {
  auth: false,
  components: {
    kandidatcard,
  },
  computed: {
    title() {
      return this.$store.state.title
    },
  },
}
</script>
