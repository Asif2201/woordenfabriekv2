<template>
  <div id="Lessonheader" class="LessonHeaderPanel">
    <div class="LessonTitleDiv">
      <span class="LessonTitle">
        {{ 'Les ' + CurrentLesson.lessonid + ' |'  }}
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
  computed: {
    CurrentLesson() {
      return this.$store.state.Lessons[this.$store.state.currentDisplayLesson];
    },
    UserLevels()  {
      return this.$store.state.Lessons[this.$store.state.currentDisplayLesson].Levels;
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
    padding-left: 40px;
    justify-content: center;
    width: 100%;
    height: 124px;
    background-color: white;
  }
  .LessonTitleDiv  {
    padding-top:40px;
    width: 400px;
  }
  .LessonHeaderTable  {
    margin-left:500px;
    padding:0px;
    margin-top:-45px;
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
    display: flex;
  }

  .NotCurrentButtonText  {
    font-family: lato;
    font-weight: bold;
    font-size: 17px;
    color: white;
    background-color: #E6E6E6;
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 8px;
    padding-top: 8px;
    margin-top: 4px;
    border-radius: 4px;
    margin-right: 4px;


  }
  .CurrentButtonText  {
    font-family: lato;
    font-weight: bold;
    font-size: 17px;
    color: white;
    background-color: #E03997;
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 8px;
    padding-top: 8px;
    margin-top: 4px;
    border-radius: 4px;
    margin-right: 4px;
  }
  .DisplayLevelButton {
    box-shadow:0 0 0 0px white, 0 0 0 2px #F26700;
  }
</style>
