<template>
  <div class="align-top" v-if="$fetchState.pending">Fetching lessons...</div>
  <div class="align-top" v-else-if="$fetchState.error">An error occurred :(</div>
  <div v-else>
    <div class="relative ml-20 mt-10">
        <table class="V01_Table" key="OkKey">
          <thead/>
          <tbody>
            <template v-for="(Object, ObjIndex) in Challenge2">
              <tr>
                <td>
                  <div v-if="Object.MorfeemList !== null" class="questionwords">
                      {{ Object.MorfeemList.split(';')[Object.studentAnswerList[0]] }}
                    </div>
                </td>
               <td>
                  <div class="questionwords">
                    <span>
                      {{ Object.word }}
                    </span>
                  </div>
                </td>
                <td>
                  <div v-if="Object.MorfeemList2 !== null" class="questionwords">
                      {{ Object.MorfeemList2.split(';')[Object.studentAnswerList[1]] }}
                    </div>
                </td>
                <td>
                  <div v-if="Object.MorfeemList3 !== null" class="questionwords">
                      {{ Object.MorfeemList3.split(';')[Object.studentAnswerList[2]] }}
                    </div>
                </td>
                <td>
                  <div class="resultimage">
                      <p v-show="Object.studentCorrect==='Yes'" class="text-blue">
                        <img src="~/assets/correct.png" width="40" height="40" />
                      </p>
                      <p v-show="Object.studentCorrect==='No'" class="text-blue">
                        <img src="~/assets/incorrect.png" width="40" height="40" />
                      </p>
                  </div>
                </td>
            </tr>
          </template>
          <tr>
              <td> &nbsp;  &nbsp; </td>
              <td> &nbsp;  &nbsp; </td>
              <td> &nbsp;  &nbsp; </td>
              <td> &nbsp;  &nbsp; </td>

          </tr>
          <tr>
              <td> &nbsp;  &nbsp; </td>
              <td> &nbsp;  &nbsp; </td>
              <td> &nbsp;  &nbsp; </td>
              <td> &nbsp;  &nbsp; </td>
          </tr>
          <tr>
              <td> &nbsp;  &nbsp; </td>
              <td> &nbsp;  &nbsp; </td>
              <td> &nbsp;  &nbsp; </td>
              <td> &nbsp;  &nbsp; </td>
            </tr>
        </tbody>
        </table>
      </div>
  </div>
</template>
<script>
import dropdown from './dropdown.vue';

export default {
  components: { dropdown },
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
    const  URLAPI =`${this.$config.baseURL}/ChallengeQuestionsAll?challengeType=V01&challengelevelid=\'${ChallengeID}\'&Student_ID=\'${StudentID}\'`
    const  URLAPI1 =`${this.$config.baseURL}/ChallengeQuestionsAll?challengeType=V01&challengelevelid=\'${ChallengeID}\'&Student_ID=\''`
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
          QuestionObjectList[i].studentAnswerList = QuestionObjectList[i].studentAnswer.split(';');
          console.log(QuestionObjectList[i].studentAnswerList);
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
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
  }
  .right {
    margin-right: 20px;
    float: right;
  }
  .WisButton  {
    background-color: blue;
    border-radius: 4px;
    color: white;
    padding-right: 12px;
    padding-left: 12px;
    padding-top: 4px;
    padding-bottom: 4px;
    float: right;
    margin-right: 20px;
    font-family: lato;
    font-weight: bold;
  }
  .WisButton:hover  {
    background-color: darkblue; /* Green */
    color: yellow;
  }
  .V01_Table {
    width:50%;
    table-layout: fixed;
  }
  .V01_Table tr {
    height:  50px;
  }
  .V01_Table td {
    width: 200px;
  }
  .klaarButton {
    font: normal normal bold 20px/25px Lato;
    letter-spacing: 0px;
    color: #FFFFFF;
    opacity: 1;
    background: #2185D0 0% 0% no-repeat padding-box;
    border-radius: 4px;
    width: 100px;
    height: 32px;
    top: 740px;
    left: 880px;
    clear: left;
    cursor:pointer;
}

.resultimage  {
    padding-left: 80px;
  }
</style>
