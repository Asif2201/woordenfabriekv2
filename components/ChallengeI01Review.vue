<template>
  <div class="align-top" v-if="$fetchState.pending">Fetching lessons...</div>
  <div class="align-top" v-else-if="$fetchState.error">An error occurred :(</div>
  <div v-else>
      <div class="relative ml-20 mt-5">
        <table class="table-auto w-full align-center">
          <thead>
            <tr>
              <th class="w-4/5 ..."></th>
              <th class="w-1/5 ..."></th>
            </tr>
          </thead>
          <tbody class="border-black">
            <template v-for="(Object, ObjIndex) in Challenge2">
              <tr>
                <td>
                  <span class="voorbeeldzin">
                    {{ Object.voorbeeldzin }}
                  </span>
                </td>
                <td>
                  &nbsp;
                </td>
              </tr>
              <tr>
                <td>
                  <template v-for="(char, index) in Object.paragraphwords">
                    <span class="questionwords" >
                        <span>
                          {{ char }}
                        </span>
                    </span>

                    <span class="questionwordsClicked">
                      {{ Object.UserAnswerList[index] }}
                    </span>
                  </template>
                  <br>
                  <br>
                  <span class="referenceanswer">
                      Aantwoordmodel: {{ Object.answerlist }}
                    </span>
                </td>
                <td>
                  &nbsp;
                </td>
              </tr>
              <tr>

                <td>
                  &nbsp;
                </td>
                <td>
                  &nbsp;
                </td>
              </tr>

          </template>
            <tr>
              <td>
                &nbsp;
              </td>
              <td>
              </td>
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
      lAnswerExplanation: '',
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
    const  URLAPI =`${this.$config.baseURL}/ChallengeQuestionsAll?challengeType=I01&challengelevelid=\'${ChallengeID}\'&Student_ID=\'${StudentID}\'`
    const  URLAPI1 =`${this.$config.baseURL}/ChallengeQuestionsAll?challengeType=I01&challengelevelid=\'${ChallengeID}\'&Student_ID=\''`
    const headers = { "cache-control": "no-store, max-age=0" }
    console.log(URLAPI);
    const resp1 = await this.$axios.get(URLAPI1, { headers });

    const resp = await this.$axios.get(URLAPI, { headers });
    this.Challenge1 = await resp.data;
  },
  methods:  {
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
          console.log(QuestionObjectList[i]);

          QuestionObjectList[i].paragraphwords = QuestionObjectList[i].Question.split('_');
          QuestionObjectList[i].UserAnswerList = QuestionObjectList[i].studentAnswer.split(';');
      }
      this.TotalQuestions = this.Challenge1.LearningQuestions.length;
      return QuestionObjectList;
    },



  },

}
</script>
<style scoped>
  .questionwords {
    color: grey;
    font-family: lato;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    white-space: wrap;

  }
  .voorbeeldzin {
    color: black;
    font-family: lato;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    white-space: wrap;

  }
  .questionwordsClicked {
    color: blue;
    font-family: lato;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
  }
  .referenceanswer {
    color: green;
    font-family: lato;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
  }
  .paragraphheading {
    color: black;
    font-family: lato;
    font-size: 14px;
    font-style: bold;

  }
  .explainbox {
    border:solid 1px orange;
    resize: none;
    float: right;
  }
</style>
