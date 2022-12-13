<template>
  <v-container class="d-flex">
    <v-card class="py-3 px-2 text-capitalize" outlined>
      <v-card-title>{{ title }}</v-card-title>
      <eocard />
    </v-card>
  </v-container>
</template>

<script>
import eocard from '~/components/eo/eocard.vue'
export default {
  data() {
    return {
      title: 'Event Owner',
    }
  },
  components: {
    eocard,
  },
  computed: {},
}
</script>
