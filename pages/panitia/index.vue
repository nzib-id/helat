<template>
  <v-container class="d-flex">
    <v-card class="py-3 px-2 text-capitalize" outlined>
      <v-card-title>{{ title }}</v-card-title>
      <PanitiaList height="330" />
    </v-card>
  </v-container>
</template>

<script>
import PanitiaList from '~/components/panitia/panitiaList.vue'
export default {
  components: { PanitiaList },
  data() {
    return {
      title: 'Panitia',
    }
  },
  mounted() {},
}
</script>
