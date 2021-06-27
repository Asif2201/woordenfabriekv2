<template>
  <div>
    <table class="table-fixed w-full bg-gray-200 shadow-lg text-gray-500 font-mono " >
      <thead/>
      <tbody>
        <tr>
          <td class="w-1/10 pl-6 pb-4 mt-1  ...">
            <nuxt-link to="/" > Menu </nuxt-link>
          </td>
          <td class="w-1/2  mt-1 ...">
          <a href="#" class="block.."> De Woordenfabriek - een leeromgeving van Radboud Universiteit Nijmegen </a>
          </td>
          <td class="float-right w-2/5 mt-1 " >
            <div v-if="isAuthenticated" class="block pb-4"> Jaap </div>
            <div v-else class="block" >
              <button class=" mt-2 bg-gray-400 hover:bg-gray-200 text-gray-500 font-bold py-2 px-4 rounded">
                <nuxt-link to="/login"> log in </nuxt-link>
              </button>
            </div>
          </td>
        </tr>
        </tbody>
    </table>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
}
</script>
