<template>
  <div>
    <div class="align-top" v-if="$fetchState.pending">Fetching lessons...</div>
    <div class="align-top" v-else-if="$fetchState.error">An error occurred :(</div>
    <div v-else>
    <table class="table-fixed w-full bg-gray-100 text-sm text-gray-500 font-mono " >
      <thead/>
      <tbody>
        <tr class="break-words">
          <td class="w-1/10 pl-4  pb-4 pt-4 ...">
            <nuxt-link to="/" > Menu </nuxt-link>
          </td>
          <td class="w-1/2 pb-4 pt-4 ...">
            <a href="#" class="block.."> De Woordenfabriek - een leeromgeving van Radboud Universiteit Nijmegen </a>
          </td>
          <td class="float-right w-2/5 pb-4 pt-4  ,,," >
            <div v-if="isAuthenticated" class="block"> Jaap </div>
            <div v-else >
              <nuxt-link to="/login"> log in </nuxt-link>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <hr>
    <table class="table-fixed w-full bg-gray-200 text-sm text-gray-500 font-mono " >
      <thead/>
      <tbody>
        <tr>
          <td class="w-2/5 pl-4  pb-4 pt-4 ...">
            {{ lessons.vwUsers[0].studentlessonid + '|' + lessons.vwUsers[0].lessontitle }}
          </td>
          <div v-for="lesson in lessons.vwUsers">
          <td class="w-4/25 pb-4 pt-4 ...">
              <div class="relative pt-1">
                <div class="flex mb-2 items-center justify-between">
                  <StarRating rating='3'></StarRating>
                </div>
                <div class="text-right">
                  <span class="text-xs font-semibold inline-block text-pink-600">
                    {{ lesson.completionprogress * 100 + `%`}}
                  </span>
                </div>
                <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-pink-200">
                  <div style="width:50%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"></div>
                </div>
             </div>
           </td>
          </div>
          <!-- <td class="w-1/10"></td> -->
         </tr>
      </tbody>
    </table>
    </div>
    <Nuxt />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import StarRating from '../components/StarRating.vue'

export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  data() {
    return {
      lessons: []
    }
  },
  async fetch() {
    this.lessons = await fetch(
      `http://localhost:3000/v1/userLessons?lessonID=${this.$route.query.studentlessonID}`
    ).then(res => res.json())
  },


}
</script>
