<template>
  <div class="align-top" v-if="$fetchState.pending">Fetching lessons...</div>
  <div class="align-top" v-else-if="$fetchState.error">{{ $fetchState.error }}</div>
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
                </td>
                <td>
                      <LEButtons :Disabled="true" :data="AnswerOptions" :SelectedButton="Object.studentAnswer" @AnswerSelected="answerSelected(ObjIndex, $event)" />
                </td>
                <td>
                  <div>
                    <p v-show="Object.studentCorrect == 'Yes'" class="text-blue">
                      <img src="~/assets/correct.png" width="40" height="40" />
                    </p>
                    <p v-show="Object.studentCorrect != 'Yes'" class="text-blue">
                      <img src="~/assets/incorrect.png" width="40" height="40" />
                    </p>
                    <span class="answerfeedback">
                      {{ Object.AnswerFeedback }}
                    </span>
                </div>
                </td>
            </tr>
            <tr>
              <td> &nbsp; </td>
              <td> &nbsp; </td>
              <td> &nbsp; </td>
            </tr>
            <tr>
              <td> &nbsp;</td>
              <td> &nbsp; </td>
              <td> &nbsp; </td>
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
  .questionwords {
    color: var(--grey);
    font-family: lato;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
  }
  .answerfeedback {
    color: var(--grey);
    font-family: lato;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
  }
  .center {
    margin: auto;
    width: 60%;
    padding: 10px;
  }
  .LE1Container {
    position: relative;
    margin-left: 100px;
    margin-top:20px;
  }
  .LE1Table {
    table-layout: fixed;
    width: 100%;
    margin-top: 40px;
  }
  .LE1Table td:nth-of-type(1) {
    width: 700px;
  }


</style>
