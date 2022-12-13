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
            >
              <v-img src="https://i.pravatar.cc/900"></v-img>
            </v-card>
            <v-container>
              <v-btn
                v-if="resetPW == false"
                @click="toggleEdit()"
                color="primary"
                absolute
                icon
                right
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                v-else
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
        <v-row>
          <v-col>
            <v-list>
              <!-- Edit Mode -->
              <v-list-item
                v-if="editMode"
                v-for="(item, key) in user"
                :key="key"
              >
                <v-text-field v-model="user[key]" :label="key" clearable>
                </v-text-field>
              </v-list-item>
              <v-container v-if="editMode">
                <v-row>
                  <v-col align="end">
                    <v-btn
                      @click="toggleEdit()"
                      depressed
                      outlined
                      color="error"
                    >
                      <v-icon>mdi-close-thick</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col>
                    <v-btn
                      @click="newUserData()"
                      depressed
                      outlined
                      color="success"
                    >
                      <v-icon>mdi-check-bold</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>

              <!-- End of Edit Mode -->
              <!-- Reset Password Mode -->
              <v-list-item v-if="resetPW">
                <v-container>
                  <v-row>
                    <v-col class="d-flex flex-column align-center">
                      <v-card-title class="primary--text">
                        Masukkan password baru
                      </v-card-title>
                      <v-text-field
                        v-model="password"
                        :type="hide ? 'password' : 'text'"
                        :rules="[
                          () =>
                            password.length >= 8 ||
                            'Masukkan setidaknya 8 karakter!',
                        ]"
                        append-outer-icon="mdi-eye"
                        @click:append-outer="hide = !hide"
                      >
                      </v-text-field>
                      <v-row
                        v-if="password.length >= 8 ? true : false"
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
                v-for="(item, key) in user"
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
            <v-btn @click="logout()" color="primary" outlined>Log out</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import wave from '~/components/decoration/wave.vue'
export default {
  components: { wave },
  data() {
    return {
      hide: true,
      editMode: false,
      resetPW: false,
      user: {
        name: '',
        email: '',
      },
      profpic: '',
      password: '',
    }
  },

  computed: {},

  methods: {
    toggleEdit() {
      this.editMode = !this.editMode
      this.resetPW = false
    },

    toggleReset() {
      this.resetPW = !this.resetPW
      this.editMode = false
      this.password = ''
    },
    async logout() {
      await this.$auth.logout('')
      this.$toast.success('Berhasil logout!')
    },

    async newUserData() {
      const params = new FormData()
      params.append('name', this.user.name)
      params.append('is_candidate', this.hide)
      params.append('uri_profpic', this.profpic)

      await this.$axios
        .put(
          '/users/me',
          {
            data: params,
          },
          { headers: { 'Content-Type': 'application/json' } }
        )
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    },

    async newPW() {
      await this.$axios
        .post('/users/reset-password', {
          password: this.password,
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
    this.user.name = this.$auth.user.name
    this.user.email = this.$auth.user.email
    this.profpic = this.$auth.user.uri_profic
  },
}
</script>
