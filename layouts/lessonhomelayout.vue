<template>
  <div>
    <div class="align-top" v-if="$fetchState.pending">Fetching lessons...</div>
    <div class="align-top" v-else-if="$fetchState.error">An error occurred :(</div>
    <div v-else>
    <table class="flex-nowrap table-fixed w-full bg-gray-200 text-sm text-gray-500 font-mono " >
      <thead/>
      <tbody>
        <tr>
          <td class="w-2/5 pl-4  pb-4 pt-4 ...">
            {{ 'Les ' + lessons.vwUsers[0].studentlessonid + '|' + lessons.vwUsers[0].lessontitle }}
          </td>
          <div v-for="lesson in lessons.vwUsers">
            <td class=" pb-2 pt-2 ...">
              <div class="relative pt-1">
                <div class="flex mb-2 items-center justify-between">
                  <StarRating rating="`${ lesson.earnedstars }`"></StarRating>
                </div>
                <div class="text-right">
                  <span class="text-xs font-semibold inline-block text-pink-600">
                    {{ `Level ` + lesson.studentlevelid + ` ` + lesson.completionprogress * 100 + `%`}}
                  </span>
                </div>
                <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-pink-200">
                  <div v-if="lesson.completionprogress===0" style="width:0%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"></div>
                  <div v-else style="width:100%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"></div>
                </div>
             </div>
           </td>
          </div>
          <td>
          <div v-for="lesson in currentLevel.vwUsers">
            <td class=" pb-2 pt-2 ...">
              <div class="relative pt-1">
                <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-pink-200">
                  <div style="width:0%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"></div>
                </div>
                <div class="text-right">
                  <span class="text-xs font-semibold inline-block text-pink-600">
                    {{ `Level ` + lesson.studentlevelid + ` ` + lesson.completionprogress * 100 + `%`}}
                  </span>
                </div>
             </div>
           </td>
          </div>
          </td>
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
      lessons: [],
      currentLevel: null
    }
  },
  async fetch() {
    this.lessons = await fetch(
      `http://localhost:3000/v1/userLessons?lessonID=${this.$route.query.studentlessonID}`
    ).then(res => res.json())
    this.currentLevel = await fetch(
      `http://localhost:3000/v1/userLevels?lessonID=${this.$route.query.studentlessonID}&OnlyCurrent=true`
    ).then(res => res.json())
  },
}
</script>
