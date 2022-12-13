<template>
  <v-navigation-drawer permanent height="100%" width="100%">
    <v-list style="height: 50%">
      <v-list-item class="my-5">
        <v-avatar class="white--text mr-2" color="primary" size="48">
          <v-img src="https://i.pravatar.cc/900"></v-img>
        </v-avatar>
        <v-list-item-content>
          <v-list-item-title
            class="subtitle-1 text-capitalize font-weight-bold"
          >
            {{ name }}
          </v-list-item-title>
          <v-list-item-subtitle class="caption secondary--text">
            EO Manager
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn
            max-height="25"
            max-width="25"
            fab
            class="rounded-lg"
            elevation="false"
            x-small
          >
            <v-icon>mdi-dots-horizontal</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
      <v-list-item-group active-class="primary--text font-weight-bold">
        <v-list-item
          v-for="(value, index) in drawer"
          :to="value.to"
          :key="index"
        >
          <v-list-item-icon>
            <v-icon>{{ value.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> {{ value.name }} </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-list style="border-top: 1px dashed #ddd">
      <v-list-item
        to="/profile"
        active-class="font-weight-bold primary-background"
      >
        <v-list-item-icon>
          <v-icon>mdi-account-circle-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title> Profil </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      name: '',
    }
  },
  computed: {
    drawer() {
      return this.$store.state.drawer
    },
  },
  mounted() {
    this.name = this.$auth.user.name
  },
}
</script>
