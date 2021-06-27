<template>
  <div>
    <Mainheader />
    <div class="align-top" v-if="$fetchState.pending">Fetching lessons...</div>
    <div class="align-top" v-else-if="$fetchState.error">An error occurred :(</div>
    <div v-else class="align-middle w-screen">
    <hr>
    <hr>
    <table class="flex-nowrap table-fixed w-full bg-white font-bold text-lg text-gray-500 font-mono" >
      <thead/>
      <tbody>
        <tr class="h-20 ">
          <td class="w-2/6 pl-4">
            <span class="mt-2">
              {{ 'Les ' + lessons.vwUsers[0].studentlessonid + ' |'  }}
            </span>
            <span class="text-pink-500 font-extrabold">
              {{ lessons.vwUsers[0].lessontitle }}
            </span>
          </td>
          <td class=" w-2/6 pb-2 absolute ">
            <div class="flex flex-row w-full py-1">
              <template v-for="level in levels.vwUsers">
                  <div class=" w-full ">
                    <div v-if="!level.iscurrent && level.completionprogress!==100" class="px-4">
                      <StarRating value="`${level.earnedstars}`"></StarRating>
                    </div>
                    <div v-else class="px-4">
                      <StarRating value="0"></StarRating>
                    </div>
                    <button v-if="level.iscurrent" class="bg-pink-500 text-white text-md font-bold font-mono px-8  mt-2  rounded">
                      {{ ` Level ` + level.studentlevelid }}
                    </button>
                    <button v-else class="bg-gray-200 text-white text-md font-bold font-mono px-8  mt-2  rounded">
                      {{ ` Level ` + level.studentlevelid }}
                    </button>
                  </div>
              </template>
            </div>
           </td>
          <td class=" border border-green-600 w=1/6 float-right mr-20">
            <div class="align-middle ">
            <template v-for="lesson in currentLevel.vwUsers">
              <div class="text-right">
                <span class="text-xs font-semibold inline-block text-gray-600">
                  {{ `Voortgang huidige level ` + lesson.completionprogress * 100 + `%`}}
                </span>
              </div>
              <div class="h-6 w-full bg-gray-300">
                <div v-if="lesson.completionprogress ===0">
                  <div class="h-full bg-gray-800" style="width:0%">
                    0%
                  </div>
                </div>
                <div v-else-if="lesson.completionprogress ===25">
                  <div class="h-full bg-gray-800" style="width:25%">
                    25%
                  </div>
                </div>
                <div v-else-if="lesson.completionprogress ===50">
                  <div class="h-full bg-gray-800" style="width:50%">
                    50%
                  </div>
                </div>
                <div v-else-if="lesson.completionprogress ===75">
                  <div class="h-full bg-gray-800" style="width:75%">
                    75%
                  </div>
                </div>
                <div v-else>
                  <div class="h-full bg-gray-800" style="width:100%">
                    100%
                  </div>
                </div>
              </div>
            </template>
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
      levels: [],
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
    this.levels = await fetch(
      `http://localhost:3000/v1/userLevels?lessonID=${this.$route.query.studentlessonID}`
    ).then(res => res.json())
  },
}
</script>
