<template>
  <div id="Lessonheader" class="LessonHeaderPanel">
    <table class="LessonHeaderTable" >
      <tbody>
        <tr>
          <td class="w-2/6 align-top pt-4">
            <span class="LessonTitle">
              {{ 'Les ' + CurrentLesson.studentlessonid + ' |'  }}
            </span>
            <span class="LessonSubtitle">
              {{ CurrentLesson.lessontitle }}
            </span>
          </td>
          <td class="w-2/6 align-top">
            <div class="LevelsBar">
              <template v-for="(level, index) in UserLevels">
                  <div id="notevaluation" v-if="level.isevaluationchallenge==='No'" class=" w-full " v-bind:key="level.studentlevelID">
                    <div  id="completedstars" v-if="level.completionprogress===1" class="w-full px-1">
                      <StarRating :value="`${level.earnedstars}`"></StarRating>
                      <button v-if="CurrentLesson.currentDisplayLevel === index" class="CurrentButtonText" @click="GotoLevel(level.Levelid)">
                        {{ ` Level ` + level.studentlevelid }}
                      </button>
                      <button v-else class="NotCurrentButtonText" @click="GotoLevel(level.Levelid)">
                        {{ ` Level ` + level.studentlevelid  }}
                      </button>
                    </div>
                    <div v-else id="nostars" class="w-full px-1">
                      <StarRating value="0"></StarRating>
                      <button v-if="CurrentLesson.currentDisplayLevel === index" class="CurrentButtonText" @click="GotoLevel(level.Levelid)">
                        {{ ` Level ` + level.studentlevelid }}
                      </button>
                      <button v-else class="NotCurrentButtonText" @click="GotoLevel(level.Levelid)">
                        {{ ` Level ` + level.studentlevelid }}
                      </button>
                    </div>
                  </div>
                  <div v-else id="yesevaluation" class="w-full" v-bind:key="level.studentlevelID">
                   <div v-if="level.completionprogress===1" id="yesevaluationcompleted" class="w-full">
                      <StarRating :value="`${level.earnedstars}`"></StarRating>
                      <button v-if="CurrentLesson.currentDisplayLevel === index" class="CurrentButtonText" @click="GotoLevel(level.Levelid)">
                        Bonus
                      </button>
                      <button v-else class="NotCurrentButtonText" @click="GotoLevel(level.Levelid)">
                          Bonus
                      </button>
                    </div>
                    <div v-else id="yesevaluationnotcompleted" class="w-full px-1">
                      <StarRating value="0"></StarRating>
                      <button v-if="CurrentLesson.currentDisplayLevel === index" class="CurrentButtonText" @click="GotoLevel(level.Levelid)">
                        Bonus
                    </button>
                    <button v-else class="NotCurrentButtonText" @click="GotoLevel(level.Levelid)">
                        Bonus
                    </button>
                    </div>
                  </div>
              </template>
            </div>
           </td>
          <td class=" border border-green-600 w=1/6 float-right mr-20">
          </td>
         </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  computed: {
    CurrentLesson() {
      return this.$store.state.Lessons[this.$store.state.Lessons.currentDisplayLesson];
    },
    UserLevels()  {
      return this.$store.state.Lessons[this.$store.state.Lessons.currentDisplayLesson].Levels;
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
  .LessonHeaderPanel  {
    display: flex;
    vertical-align: top;
    justify-content: center;
    width: 100%;
    height: 124px;
    background-color: white;
  }
  .LessonHeaderTable  {
    width: 95%;
    margin:auto;
  }
  .LessonTitle {
    font: lato;
    font-weight: bold;
    font-size: 36px;
    color: #767676;
  }
  .LessonSubtitle {
    font: lato;
    font-weight: bold;
    font-size: 36px;
    color: #E03997;
  }
  .LevelsBar  {
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    display: flex;
    width: 675px;
  }

  .NotCurrentButtonText  {
    font-family: lato;
    font-weight: bold;
    font-size: 17px;
    color: white;
    background-color: #E6E6E6;
    padding-left: 32px;
    padding-right: 32px;
    padding-bottom: 8px;
    padding-top: 8px;
    margin-top: 4px;
    border-radius: 4px;
  }
  .CurrentButtonText  {
    font-family: lato;
    font-weight: bold;
    font-size: 17px;
    color: white;
    background-color: #E03997;
    padding-left: 32px;
    padding-right: 32px;
    padding-bottom: 8px;
    padding-top: 8px;
    margin-top: 4px;
    border-radius: 4px;
  }
  .DisplayLevelButton {
    box-shadow:0 0 0 0px white, 0 0 0 2px #F26700;
  }
</style>
