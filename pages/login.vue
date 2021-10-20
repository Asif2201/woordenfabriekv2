<template>
  <div class="flex h-screen">
    <p v-if="$fetchState.pending">Fetching Lessons...</p>
    <p v-else-if="$fetchState.error">An error occurred :(</p>
    <div class="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
      <h2 class="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl xl:text-bold">Log in</h2>
      <div class="mt-12">
        <form @submit.prevent="Login">
          <div>
              <div class="text-sm font-bold text-gray-700 tracking-wide">Email Address</div>
              <input v-model = "username" name="username" class="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="jaap@appalot.com">
          </div>
          <div class="mt-8">
              <div class="flex justify-between items-center">
                  <div class="text-sm font-bold text-gray-700 tracking-wide">
                      Password
                  </div>
                  <div>
                      <a class="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800
                      cursor-pointer">
                          Forgot Password?
                      </a>
                  </div>
              </div>
              <input v-model = "password" name="password" class="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="Enter your password">
          </div>
          <div class="mt-10">
              <button type="submit" class="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
              font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
              shadow-lg">
                  Log In
              </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Notification from '~/components/Notification'

export default {
  middleware: 'guest',

  components: {
    Notification,
  },

  data() {
    return {
      username: '',
      password: '',
      error: null,
      tempLessons: []

    }
  },
  computed: {
    userEmail() {
      return this.$store.state.userEmail;
    }
  },
  async fetch() {
    if(this.userEmail !== '') {
      const urlAPI = `${this.$config.baseURL}/userLessons?studentemail=\'${this.userEmail}\'`;
      this.tempLessons = await fetch(
        urlAPI
      ).then(res => res.json())
      this.$store.commit('initialiseLessons', this.tempLessons);

    }
  },
  methods: {
    Login() {
      if(this.$store.getters.isValidEmail(this.username)) {
        this.$store.commit('setUserEmail', this.username);
        this.$fetch();
        this.$router.push("/");
      }
      else{
        alert('Invalid User')
      }
    }
  }
}
</script>
