<template>
  <div class="align-top" v-if="$fetchState.pending">Fetching lessons...</div>
  <div class="align-top" v-else-if="$fetchState.error">An error occurred :(</div>
  <div v-else>
      <div class="tablecontainer">
        <table class="TV02_Table">
          <thead/>
          <tbody>
            <template v-for="(Object, ObjIndex) in Challenge2">
              <tr>
                <td>
                    <span class="questionwords">
                      {{ Object.context }}
                    </span>
                </td>
                <td>
                  <template v-if="Object.BeforeWord==='Yes'">
                      <span class="questionwordsClicked">
                      {{ Object.studentAnswer }}
                    </span>
                    <span class="questionwords">
                      {{ Object.word }}
                    </span>
                  </template>
                </td>
                <td>
                <template v-if="Object.BeforeWord==='No'">
                    <span class="questionwords">
                    {{ Object.word }}
                  </span>
                  <span class="questionwordsClicked">
                    {{ Object.studentAnswer }}
                  </span>
                  </template>
              </td>
                <td>
                   <span class="feedback">
                        {{ Object.answer }}
                  </span>
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
      AllquestionsAnswered: false,
      ShowResult: false,
      ResultKey: 0,
      TotalCorrect: 0,
      TotalQuestions: 0,
      lAnswerExplanation: [],
    }
  },
  watch: {
    Challenge1()  {
      this.Challenge2 = this.JSONtoObj();
    }
  },
  async fetch() {
    const ChallengeID = this._props.Challenge;
    const StudentID = this.$store.state.Lessons[this.$store.state.currentDisplayLesson].studentid
    const  URLAPI =`${this.$config.baseURL}/ChallengeQuestionsAll?challengeType=V02&challengelevelid=\'${ChallengeID}\'&Student_ID=\'${StudentID}\'`
    console.log(URLAPI);
    const  URLAPI1 =`${this.$config.baseURL}/ChallengeQuestionsAll?challengeType=V02&challengelevelid=\'${ChallengeID}\'&Student_ID=\''`
    const headers = { "cache-control": "no-store, max-age=0" }
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
          QuestionObjectList[i].answerConfirmed = false;
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
    color: darkgray;
    font-family: lato;
    font-size: 14px;
    font-weight: bolder;
  }
  .questionwordsClicked {
    color: blue;
    font-family: lato;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 200%;
  }
   .explainbox {
    resize: none;
    float: left;
    font-family: lato;
    font-size: 12px;
    font-style: normal;
  }
  .TV02_Table {
    width: 100%;
    padding: 10px;
    margin-top:20px;
    margin-left:100px;
    table-layout: fixed;
  }

  .TV02_Table th, td  {
    text-align: left;
    color: black;
  }
.TV02_Table td:nth-child(1)  {
    width: 400px;

  }

  .tablecontainerV02 {
    text-align: center;
  }
  .feedback {
    color: green;
    font-family: lato;
    font-size: 14px;
    font-weight: bolder;
  }
</style>
