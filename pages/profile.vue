<template>
  <v-container class="d-flex" fluid>
    <v-card class="d-flex flex-column overflow-hidden" width="400">
      <v-container class="pa-5">
        <v-row justify="center">
          <v-col cols="6">
            <v-card
              class="d-flex justify-center align-center"
              height="167"
              elevation="3"
              rounded="xl"
              active-class=""
            >
              <v-img
                width="100"
                :lazy-src="user.profic"
                :src="user.profic"
              ></v-img>
            </v-card>
            <v-container>
              <v-btn
                v-if="resetPW === true"
                @click="toggleReset()"
                color="primary"
                absolute
                icon
                right
              >
                <v-icon>mdi-arrow-left-thick</v-icon>
              </v-btn>
            </v-container>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col>
            <v-list>
              <!-- Reset Password Mode -->
              <v-list-item v-if="resetPW">
                <v-container>
                  <v-row>
                    <v-col class="d-flex flex-column align-center">
                      <v-card-title class="primary--text">
                        Masukkan password baru
                      </v-card-title>
                      <v-text-field
                        v-model="user.password"
                        :type="hide ? 'password' : 'text'"
                        :rules="[
                          () =>
                            user.password.length >= 8 ||
                            'Masukkan setidaknya 8 karakter!',
                        ]"
                        append-outer-icon="mdi-eye"
                        @click:append-outer="hide = !hide"
                      >
                      </v-text-field>
                      <v-row
                        v-if="user.password.length >= 8 ? true : false"
                        class="mr-3"
                      >
                        <v-col>
                          <v-btn
                            @click="toggleReset()"
                            depressed
                            outlined
                            color="error"
                          >
                            <v-icon>mdi-close-thick</v-icon>
                          </v-btn>
                        </v-col>
                        <v-col>
                          <v-btn
                            @click="newPW()"
                            depressed
                            outlined
                            color="success"
                          >
                            <v-icon>mdi-check-bold</v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-container>
              </v-list-item>
              <!-- End of Reset Password Mode -->
              <!-- Normal Mode -->
              <v-list-item
                v-if="editMode === false && resetPW === false"
                v-for="(item, key) in user.profile"
                :key="key"
              >
                <v-list-item-content
                  class="title"
                  style="border-bottom: 1px solid #eee"
                >
                  <strong class="primary--text subtitle-2">{{ key }}</strong>
                  {{ item }}
                </v-list-item-content>
              </v-list-item>
              <!-- End of Normal Mode -->
              <v-list-item>
                <a
                  v-if="editMode === false"
                  @click="resetPW = true"
                  color="primary"
                  text
                  class="mt-5"
                >
                  Reset Password?
                </a>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
        <v-row>
          <v-col align="center">
            <v-btn :loading="loading" @click="logout()" color="primary" outlined
              >Log out</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      hide: true,
      editMode: false,
      resetPW: false,
      loading: false,
      user: {
        profile: {
          name: '',
          email: '',
        },
        profic: require('@/static/images/admin.jpg'),
        password: '',
      },
    }
  },

  computed: {},

  methods: {
    toggleEdit() {
      this.editMode = !this.editMode
      this.resetPW = false
      this.user.profile.name = this.$auth.user.name
      this.user.profile.email = this.$auth.user.email
    },

    toggleReset() {
      this.resetPW = !this.resetPW
      this.editMode = false
      this.user.password = ''
    },
    async logout() {
      this.loading = true
      await this.$auth.logout('')
      this.loading = true
    },

    async newPW() {
      await this.$axios
        .post('/api' + '/users/reset-password', {
          password: this.user.password,
        })
        .then(() => {
          this.$toast.success('Sukses rubah password!')
          this.toggleReset()
        })
        .catch(() => {
          this.$toast.error('Terjadi kesalahan coba lagi nanti')
        })
    },
  },

  mounted() {
    this.user.profile.name = this.$auth.user.name
    this.user.profile.email = this.$auth.user.email
  },
}
</script>
