<template>
  <div  v-if="$fetchState.pending">Fetching challenges...</div>
  <div  v-else-if="$fetchState.error">An error occurred :(</div>
  <div v-else>
      <div style="overflow-x: auto;">
        <table class="K01_Table" key="OkKey">
          <tbody>
            <template v-for="(Object, ObjIndex) in Challenge2">
              <tr>
                <td>
                  <span class="questionwordsK1">
                      {{ Object.studentAnswer }}
                  </span>
                </td>
                 <td>
                  <span class="feedback">
                      {{ Object.feedback }}
                  </span>
                </td>
                <td>
                    <template v-if="Object.answerCorrect">
                      <img src="~/assets/correct.png" width="35" height="35" />
                    </template>
                    <template v-if="!Object.answerCorrect">
                      <img src="~/assets/incorrect.png" width="35" height="35" />
                    </template>
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
  data() {
    return {
      Challenge1: [],
      Challenge2: [],
      knipWords: [],
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
  errorCaptured: function(err) {
    console.log('Error caught: ', err.message);
    this.fetch();
    return false;
  },
  async fetch() {
    const ChallengeID = this._props.Challenge;
    const StudentID = this.$store.state.Lessons[this.$store.state.currentDisplayLesson].studentid
    const  URLAPI =`${this.$config.baseURL}/ChallengeQuestionsAll?challengeType=K1&challengelevelid=\'${ChallengeID}\'&Student_ID=\'${StudentID}\'`
    const  URLAPI1 =`${this.$config.baseURL}/ChallengeQuestionsAll?challengeType=K1&challengelevelid=\'${ChallengeID}\'&Student_ID=\''`
    const headers = { "cache-control": "no-store, max-age=0" }


    console.log(URLAPI);
    const resp1 = await this.$axios.get(URLAPI1, { headers });

    const resp = await this.$axios.get(URLAPI, { headers });
    this.Challenge1 = await resp.data;

  },
  methods:  {
    splitWord(word)  {
      if (word) {
        return word.split('');
      } else  {
        return '';
      }
    },
    forceRerender() {
      this.ResultKey += 1;
    },
    JSONtoObj()  {
      var QuestionObjectList = [];
      for (var i = 0; i < this.Challenge1.LearningQuestions.length; i++) {
          QuestionObjectList.push(this.Challenge1.LearningQuestions[i]);
          QuestionObjectList[i].word = this.splitWord(QuestionObjectList[i].word);
          if(QuestionObjectList[i].studentCorrect === 'Yes')  {
            QuestionObjectList[i].answerCorrect = true;
          }
          else  {
            QuestionObjectList[i].answerCorrect = false;

          }

      }
      this.TotalQuestions = this.Challenge1.LearningQuestions.length;
      return QuestionObjectList;
    },

  }

}
</script>
<style scoped>


</style>
