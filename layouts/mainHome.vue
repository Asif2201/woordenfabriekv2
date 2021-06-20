<template>
  <div>

    <table class="table-fixed w-full bg-gray-100 text-sm text-gray-500 font-mono " >
      <thead/>
      <tbody>
        <tr class="break-words">
          <td class="w-1/10 pl-4  pb-4 pt-4 ...">
          <router-link to="/" > Menu </router-link>
          </td>
          <td class="w-1/2 pb-4 pt-4 ...">
          <a href="#" class="block.."> De Woordenfabriek - een leeromgeving van Radboud Universiteit Nijmegen </a>
          </td>
          <td class="float-right w-2/5 pb-4 pt-4  ,,," >
          <div v-if="isAuthenticated" class="block"> Jaap </div>
          <div v-else >
            <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
              <nuxt-link to="/login"> log in </nuxt-link>
            </button>
          </div>
          </td>
        </tr>
      </tbody>
    </table>
    <Nuxt />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  }
}
</script>
