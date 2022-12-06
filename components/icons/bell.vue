<template>
  <v-img :src="bell"></v-img>
</template>

<script>
export default {
  data() {
    return {
      bell: require('~/static/icons/bell.svg'),
    }
  },
}
</script>
