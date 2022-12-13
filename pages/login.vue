<template>
  <v-container class="d-flex align-center justify-center" fluid fill-height>
    <v-card
      class="d-flex flex-column justify-center pa-16"
      width="100%"
      height="100%"
    >
      <v-card-title class="title mb-9">Login</v-card-title>
      <v-form class="d-flex flex-column">
        <v-row justify="center">
          <v-col cols="7">
            <v-text-field placeholder="Username" v-model="form.username">
            </v-text-field>
            <v-text-field
              placeholder="Password"
              v-model="form.password"
              :type="hide ? 'password' : 'text'"
              :append-icon="hide ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append="hide = !hide"
            ></v-text-field>
            <v-btn
              color="primary"
              class="mt-9 rounded-lg"
              large
              depressed
              block
              @click="login()"
            >
              Login
            </v-btn>
          </v-col>
        </v-row>
        <v-row class="overline font-weight-bold my-9" justify="center">
          <v-card-title class="text--disabled">- Atau -</v-card-title>
        </v-row>
        <v-row justify="center">
          <v-btn class="rounded-lg pa-0 ma-0" depressed outlined x-large>
            <v-row class="pa-5" justify="center" align="center">
              <v-col cols="2"><google /></v-col>
              <v-col class="subtitle-1 text-none" cols="10">
                Login with Google
              </v-col>
            </v-row>
          </v-btn>
        </v-row>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import google from '~/components/icons/google.vue'
export default {
  name: 'loginPage',
  layout: 'auth',
  components: { google },
  data() {
    return {
      hide: true,
      form: {
        username: '',
        password: '',
      },
    }
  },
  methods: {
    async login() {
      try {
        const params = new FormData()
        params.append('username', this.form.username)
        params.append('password', this.form.password)

        const login = await this.$auth.loginWith('local', {
          data: params,
        })
        this.$toast.success('Halo, ' + this.$auth.user.name)
      } catch (error) {
        if (error.response.status === 400) {
          this.$toast.error('Password atau username salah')
        }
      }
    },
  },
  mounted() {
    let input = document.querySelector('form')
    input.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault()
        this.login()
      }
    })
  },
  computed: {},
  components: {
    google,
  },
}
</script>
