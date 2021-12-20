<template>
  <div  v-if="$fetchState.pending">Fetching lessons...</div>
  <div  v-else-if="$fetchState.error">An error occurred :(</div>
  <div v-else>
      <div>
        <table class="CA3Table">
          <thead>
            <tr>
              <th >
                &nbsp;
              </th>
              <th>
                <span class="CA3QuestionsClicked">
                  {{ Challenge2[0].cat1label.replace('*', '') }}
                </span>
              </th>
              <th>
                <span class="CA3QuestionsClicked">
                    {{ Challenge2[0].cat2label.replace('*', '') }}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(Object, ObjIndex) in Challenge2">
              <tr>
                <td>
                      <span class="CA3Questions">
                        {{ Object.word }}
                      </span>
                  </td>
                  <td>
                    <input class="CA3QuestionsClicked" type="radio" :name="'wordtype_' + ObjIndex" value="Cat1" v-model="Object.studentAnswer">
                    <label for="one" class="CA3QuestionsClicked">  </label>
                  </td>
                  <td>
                    <input class="CA3QuestionsClicked" type="radio" :name="'wordtype_' + ObjIndex" value="Cat2" v-model="Object.studentAnswer">
                    <label for="one" class="CA3QuestionsClicked">  </label>
                  </td>
                  <td>
                    <div>
                        <p v-show="Object.studentCorrect=='Yes'" class="text-blue">
                          <img src="~/assets/correct.png" width="40" height="40" />
                        </p>
                        <p v-show="Object.studentCorrect=='No'" class="text-blue">
                          <img src="~/assets/incorrect.png" width="40" height="40" />
                        </p>
                      </div>
                  </td>
              </tr>
            </template>

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
  errorCaptured: function(err) {
    console.log('Error caught: ', err.message);
    this.fetch();
    return false;
  },
  watch: {
    Challenge1()  {
      this.Challenge2 = this.JSONtoObj();
    }
  },
  async fetch() {
    const ChallengeID = this._props.Challenge;
    const StudentID = this.$store.state.Lessons[this.$store.state.currentDisplayLesson].studentid
    const  URLAPI =`${this.$config.baseURL}/ChallengeQuestionsAll?challengeType=CA3&challengelevelid=\'${ChallengeID}\'&Student_ID=\'${StudentID}\'`
    const  URLAPI1 =`${this.$config.baseURL}/ChallengeQuestionsAll?challengeType=CA3&challengelevelid=\'${ChallengeID}\'&Student_ID=\''`
    const headers = { "cache-control": "no-store, max-age=0" }
    console.log(URLAPI);
    const resp1 = await this.$axios.get(URLAPI1, { headers });
    const resp = await this.$axios.get(URLAPI, { headers });
    this.Challenge1 = await resp.data;
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

</style>
