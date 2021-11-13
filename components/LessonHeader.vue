<template>
  <div id="Lessonheader" class="LessonHeaderPanel">
    <div class="LessonTitleDiv">
      <span class="LessonTitle">
        {{ 'Les ' + CurrentLesson.lessonnumber + ' |'  }}
      </span>
      <span class="LessonSubtitle">
        {{ CurrentLesson.lessontitle }}
      </span>
    </div>
    <table class="LessonHeaderTable" >
      <tbody>
        <tr>
          <template v-for="(level, index) in UserLevels">
            <td>
                <template id="notevaluation" v-if="level.isevaluationchallenge==='No'">
                    <template  id="completedstars" v-if="level.completionprogress===1">
                      <StarRating :value="`${level.earnedstars}`"></StarRating>
                      <button v-if="CurrentLesson.currentDisplayLevel === index" class="CurrentButtonText" @click="GotoLevel(level.Levelid)">
                        {{ ` Level ` + (index+1)  }}
                      </button>
                      <button v-else class="NotCurrentButtonText" @click="GotoLevel(level.Levelid)">
                        {{ ` Level ` + (index+1)  }}
                      </button>
                    </template>
                    <template v-else id="nostars">
                      <StarRating value="0"></StarRating>
                      <div class=button
                      <button v-if="CurrentLesson.currentDisplayLevel === index" class="CurrentButtonText" @click="GotoLevel(level.Levelid)">
                        {{ ` Level ` + (index+1)  }}
                      </button>
                      <button v-else class="NotCurrentButtonText" @click="GotoLevel(level.Levelid)">
                        {{ ` Level ` + (index+1) }}
                      </button>
                    </template>
                  </template>
                  <template v-else id="yesevaluation">
                   <template v-if="level.completionprogress===1" id="yesevaluationcompleted">
                      <StarRating :value="`${level.earnedstars}`"></StarRating>
                      <button v-if="CurrentLesson.currentDisplayLevel === index" class="CurrentButtonText" @click="GotoLevel(level.Levelid)">
                        Bonus
                      </button>
                      <button v-else class="NotCurrentButtonText" @click="GotoLevel(level.Levelid)">
                          Bonus
                      </button>
                    </template>
                    <template v-else id="yesevaluationnotcompleted">
                      <StarRating value="0"></StarRating>
                      <button v-if="CurrentLesson.currentDisplayLevel === index" class="CurrentButtonText" @click="GotoLevel(level.Levelid)">
                        Bonus
                    </button>
                    <button v-else class="NotCurrentButtonText" @click="GotoLevel(level.Levelid)">
                        Bonus
                    </button>
                    </template>
                  </template>
            </td>
          </template>

         </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props:  {
    DisplayLesson: 0,

  },
  computed: {
    CurrentLesson() {
      return this.$store.state.Lessons[this._props.DisplayLesson];
    },
    UserLevels()  {
      return this.$store.state.Lessons[this._props.DisplayLesson].Levels;
    },
  },
  methods:  {
    GotoLevel(LevelID)  {
      this.$emit("LevelClick", LevelID);

    }
  }
}
</script>
<style scoped>

</style>
