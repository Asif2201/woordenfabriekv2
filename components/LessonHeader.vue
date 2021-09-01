<template>
  <div>
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
                  <div v-if="level.isevaluationchallenge==='No'" class=" w-full " v-bind:key="level.studentlevelID">
                    <div v-if="level.completionprogress===1" class="px-4">
                      <StarRating :value="`${level.earnedstars}`"></StarRating>
                    </div>
                    <div v-else class="px-4">
                      <StarRating value="0"></StarRating>
                    </div>
                    <button v-if="level.iscurrent==='Yes'" class="bg-pink-500 text-white text-md font-bold font-mono px-8  mt-2  rounded">
                      {{ ` Level ` + level.studentlevelid }}
                    </button>
                    <button v-else class="bg-gray-200 text-white text-md font-bold font-mono px-8  mt-2  rounded">
                      {{ ` Level ` + level.studentlevelid }}
                    </button>
                  </div>
                  <div v-else class="w-full" v-bind:key="level.studentlevelID">
                   <div v-if="level.completionprogress===1">
                      <StarRating :value="`${level.earnedstars}`"></StarRating>
                    </div>
                    <div v-else>
                      <StarRating value="0"></StarRating>
                    </div>
                    <button v-if="level.iscurrent==='Yes'" class="bg-pink-500 text-white text-md font-bold font-mono px-8  mt-2  rounded">
                        Bonus
                    </button>
                    <button v-else class="bg-gray-200 text-white text-md font-bold font-mono px-8  mt-2  rounded">
                        Bonus
                    </button>
                  </div>
              </template>
            </div>
           </td>
          <td class=" border border-green-600 w=1/6 float-right mr-20">
            <div v-if="currentLevel.vwUsers[0].completionprogress === 1" class="align-middle ">
              <span class="text-xs font-semibold inline-block text-gray-600">
                 Lesson Completed
                </span>
            </div>
            <div v-else class="align-middle " >
            <template v-for="level in currentLevel.vwUsers">
              <div class="text-right" v-bind:key="level.studentlevelID">
                <span class="text-xs font-semibold inline-block text-gray-600">
                  {{ `Voortgang huidige level ` + level.completionprogress * 100 + `%`}}
                </span>
              </div>
              <div class="h-6 w-full bg-gray-300 rounded" v-bind:key="level.studentlevelID">
                  <div class="h-6 bg-gray-800 rounded" v-bind:style="{ width: level.completionprogress * 100 + '%' }">
                    {{ level.completionprogress * 100 + '%' }}
                  </div>
              </div>
            </template>
           </div>

          </td>
         </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      lessons: [],
      levels: [],
      currentLevel: null
    }
  },
  async fetch() {
    this.lessons = await fetch(
      `${this.$config.baseURL}/userLessons?lessonID=${this.$route.query.studentlessonID}`
    ).then(res => res.json())
    this.currentLevel = await fetch(
      `${this.$config.baseURL}/userLevels?lessonID=${this.$route.query.studentlessonID}&OnlyCurrent=Yes`
    ).then(res => res.json())
    this.levels = await fetch(
      `${this.$config.baseURL}/userLevels?lessonID=${this.$route.query.studentlessonID}`
    ).then(res => res.json())
  },
}
</script>
