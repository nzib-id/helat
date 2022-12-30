<template>
  <v-container class="d-flex">
    <v-card class="py-3 px-2 text-capitalize" outlined>
      <v-card-title> Peserta </v-card-title>
      <pesertaList />
    </v-card>
  </v-container>
</template>

<script>
import pesertaList from '~/components/peserta/pesertaList.vue'
export default {
  components: { pesertaList },
}
</script>
