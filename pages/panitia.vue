<template>
  <v-container class="d-flex">
    <v-card v-if="showDetail === false" class="py-3 px-2 text-capitalize">
      <v-card-title>{{ title }}</v-card-title>
      <PanitiaList height="350" />
    </v-card>
    <PanitiaDetail v-if="showDetail" />
  </v-container>
</template>

<script>
import PanitiaList from '~/components/table/panitiaList.vue'
import PanitiaDetail from '~/components/panitia/panitiaDetail.vue'
export default {
  components: { PanitiaList, PanitiaDetail },
  data() {
    return {
      title: 'Panitia',
    }
  },
  methods: {
    toggle() {
      this.$store.commit('panitia/showDetail')
    },
  },
  computed: {
    showDetail() {
      return this.$store.state.panitia.showDetail
    },
  },
}
</script>
