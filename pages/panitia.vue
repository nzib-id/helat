<template>
  <v-container>
    <v-card outlined>
      <v-card-title> {{ user }} </v-card-title>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      user: this.$store.state.userData.user,
    }
  },
}
</script>
