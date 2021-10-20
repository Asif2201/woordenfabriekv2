<template>
  <div class="align-top" v-if="$fetchState.pending">Fetching lessons...</div>
  <div class="align-top" v-else-if="$fetchState.error">An error occurred :(</div>
  <div v-else>
      <div class="relative ml-10 mt-5">
        <table class="table-fixed w-full align-center">
          <thead>
            <tr>
              <th class="w=2/5">
                &nbsp;
              </th>
              <th class="w=1/5">
                <span class="questionwordsClicked">
                  {{ Challenge2[0].cat1label.replace('*', '') }}
                </span>
              </th>
              <th class="w=1/5">
                <span class="questionwordsClicked">
                    {{ Challenge2[0].cat2label.replace('*', '') }}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(Object, ObjIndex) in Challenge2">
              <tr>
                <td>
                      <span class="questionwords">
                        {{ Object.word }}
                      </span>
                  </td>
                  <td>
                    <input class="questionwordsClicked" type="radio" :name="'wordtype_' + ObjIndex" value="Cat1" v-model="Object.studentAnswer">
                    <label for="one" class="questionwordsClicked"> Selecteer categorie </label>
                  </td>
                  <td>
                    <input class="questionwordsClicked" type="radio" :name="'wordtype_' + ObjIndex" value="Cat2" v-model="Object.studentAnswer">
                    <label for="one" class="questionwordsClicked"> Selecteer categorie </label>
                  </td>
                  <td>
                    <div>
                        <p v-show="Object.answerCorrect" class="text-blue">
                          <img src="~/assets/correct.png" width="40" height="40" />
                        </p>
                        <p v-show="!Object.answerCorrect" class="text-blue">
                          <img src="~/assets/incorrect.png" width="40" height="40" />
                        </p>
                      </div>
                  </td>
              </tr>
            </template>
            <tr>

              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>

              </tr>

        </tbody>
        </table>

      </div>
  </div>
</template>
<script>
export default {
  props:  [
    'Challenge',
    'Level',
    'LessonID'
  ],
  created() {
    this.initWordGrid();
  },
  data() {
    return {
      Challenge1: [],
      Challenge2: [],
      forceRenderVariable: [],
      AllquestionsAnswered: false,
      ShowResult: false,
      ResultKey: 0,
      TotalCorrect: 0,
      TotalQuestions: 0,
    }
  },
  watch: {
    Challenge1()  {
      this.Challenge2 = this.JSONtoObj();
    }
  },
  async fetch() {
    const ChallengeID = this._props.Challenge;
    this.Challenge1 = await fetch(
      `${this.$config.baseURL}/ChallengeQuestionsAll?challengeType=CA3&challengelevelid=\'${ChallengeID}\'`
    ).then(res => res.json())
  },
  methods:  {
    initWordGrid()  {
      for (var i = 0; i <= 10; i++) {
        this.forceRenderVariable.push([]);
        for (var j = 0; j <= 7; j++) {
          this.forceRenderVariable[i].push(false);
        }
      }
    },
    splitWord(word)  {
      if (word) {
        return word.split(';');
      } else  {
        return '';
      }
    },
    JSONtoObj()  {
      var QuestionObjectList = [];
      for (var i = 0; i < this.Challenge1.LearningQuestions.length; i++) {
          QuestionObjectList.push(this.Challenge1.LearningQuestions[i]);
          QuestionObjectList[i].answerCorrect = false;
      }
      this.TotalQuestions = this.Challenge1.LearningQuestions.length;
      return QuestionObjectList;
    },




  },

}
</script>
<style scoped>
  .questionwords {
    color: green;
    font-family: lato;
    font-size: 14px;
    font-style: normal;
    font-weight: 800;
  }
  .questionwordsClicked {
    color: darkgrey;
    font-family:lato;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    pointer-events: none;
  }
  th, td {
    padding: 15px;
    text-align: center;
  }
</style>
