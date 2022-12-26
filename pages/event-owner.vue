<template>
  <v-container class="d-flex">
    <v-card class="py-3 px-2 text-capitalize" outlined>
      <v-card-title>{{ title }}</v-card-title>
      <eventOwnerList height="350" />
    </v-card>
  </v-container>
</template>

<script>
import eventOwnerList from '~/components/table/eventOwnerList.vue'
export default {
  data() {
    return {
      title: 'Event Owner',
      data: [],
    }
  },
  components: {
    eventOwnerList,
  },
  computed: {},
}
</script>
