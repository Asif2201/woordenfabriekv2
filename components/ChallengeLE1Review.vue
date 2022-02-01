<template>
  <div  v-if="$fetchState.pending">Fetching lessons...</div>
  <div  v-else-if="$fetchState.error">{{ $fetchState.error }}</div>
  <div v-else>
      <div class="LE1Container">
        <table :key="tablechanged" class="LE1Table">
          <tbody>
            <template v-for="(Object, ObjIndex) in Challenge2">
              <tr>
                <td>
                  <span class="questionwords">
                    {{ Object.Question }}
                  </span>
                  <br>
                  <span v-if="Object.studentCorrect == 'Yes'" class="questionwordsCorrect">
                      {{ Object.AnswerFeedback }}
                  </span>
                  <span v-if="Object.studentCorrect != 'Yes'" class="questionwordsInCorrect">
                      {{ Object.AnswerFeedback }}
                  </span>
                </td>
                <td>
                    <LEButtons :Disabled="true" :data="AnswerOptions" :SelectedButton="Object.studentAnswer" @AnswerSelected="answerSelected(ObjIndex, $event)" />
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
      tablechanged:0,
      Challenge1: [],
      Challenge2: [],
      knipWords: [],
      AllquestionsAnswered: false,
      ShowResult: false,
      ResultKey: 0,
      TotalCorrect: 0,
      TotalQuestions: 0,
      AnswerOptions: [],
    }
  },
  watch: {
    Challenge1()  {
      this.Challenge2 = this.JSONtoObj();
    }
  },
  async fetch() {
    const ChallengeID = this._props.Challenge;
    this.AnswerOptions.push({id:0, name:'Waar'});
    this.AnswerOptions.push({id:1, name:'Deels waar'});
    this.AnswerOptions.push({id:2, name:'Niet waar'});
    const StudentID = this.$store.state.Lessons[this.$store.state.currentDisplayLesson].studentid
    const  URLAPI =`${this.$config.baseURL}/ChallengeQuestionsAll?challengeType=LE1&challengelevelid=\'${ChallengeID}\'&Student_ID=\'${StudentID}\'`
    const  URLAPI1 =`${this.$config.baseURL}/ChallengeQuestionsAll?challengeType=C01&challengelevelid=\'${ChallengeID}\'&Student_ID=\''`;
    const headers = { "cache-control": "no-store, max-age=0" };
    console.log(URLAPI);
    const resp1 = await this.$axios.get(URLAPI1, { headers });
    const resp = await this.$axios.get(URLAPI, { headers });
    this.Challenge1 = await resp.data;

  },
  methods:  {
    forceRerender() {
      this.ResultKey += 1;
    },
    JSONtoObj()  {
      var QuestionObjectList = [];
      for (var i = 0; i < this.Challenge1.LearningQuestions.length; i++) {
          QuestionObjectList.push(this.Challenge1.LearningQuestions[i]);
          QuestionObjectList[i].UserAnswer = -1;
          QuestionObjectList[i].answerConfirmed = false;
          QuestionObjectList[i].answerCorrect = false;
      }
      this.TotalQuestions = this.Challenge1.LearningQuestions.length;
      return QuestionObjectList;
    },
    answerSelected(Index, answer) {
      this.Challenge2[Index].UserAnswer = answer;
      this.tablechanged++;
    },

  }
}
</script>
<style scoped>

</style>
