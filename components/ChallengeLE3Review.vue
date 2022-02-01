<template>
  <div  v-if="$fetchState.pending">Fetching lessons...</div>
  <div  v-else-if="$fetchState.error">An error occurred :(</div>
  <div v-else>
      <div class="LE1Container">
        <br><br>
        <span class="LE3Heading"> Eerdere antwoorden </span>
        <table :key="tablechanged" class="LE3Table">
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
        <span class="LE3Heading"> Nieuwe conclusie </span>
        <table :key="tablechanged" class="LENewQuestionTable">
          <tbody>
            <template v-for="(Object, ObjIndex) in Challenge5">
              <tr>
                <td>
                  <span class="questionwords">
                    {{ Object.Question }}
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

  created() {
    this.initWordGrid();
  },
  data() {
    return {
      Challenge1: [],
      Challenge2: [],
      Challenge3: [],
      Challenge4: [],
      Challenge5: [],
      forceRenderVariable: [],
      isKlaar: false,
      ShowResult: false,
      ResultKey: 0,
      TotalCorrect: 0,
      TotalQuestions: 0,
      lAnswerExplanation: '',
      AnswerOptions: [],
      tablechanged: 0,
    }
  },
  watch: {
    Challenge1()  {
      this.Challenge2 = this.JSONtoObj('1');
    },
    Challenge4()  {
      this.Challenge5 = this.JSONtoObj2();
    }
  },
  async fetch() {
    const ChallengeID = this._props.Challenge;
    this.AnswerOptions.push({id:0, name:'Waar'});
    this.AnswerOptions.push({id:1, name:'Deels waar'});
    this.AnswerOptions.push({id:2, name:'Niet waar'});

    const StudentID = this.$store.state.Lessons[this.$store.state.currentDisplayLesson].studentid;
    const lessonid = this.$store.state.Lessons[this.$store.state.currentDisplayLesson].lessonid;

    const  URLAPI =`${this.$config.baseURL}/StudentLEAnswers?StudentID=\'${StudentID}\'&LessonID=\'${lessonid}\'`
    const headers = { "cache-control": "no-store, max-age=0" }
    const resp = await this.$axios.get(URLAPI, { headers });
    this.Challenge1 = await resp.data;
    const  URLAPI2 =`${this.$config.baseURL}/ChallengeQuestionsAll?challengeType=LE3&challengelevelid=\'${ChallengeID}\'&Student_ID=\'${StudentID}\'`
    console.log(URLAPI2);
    const resp2 = await this.$axios.get(URLAPI2, { headers });
    this.Challenge4 = await resp2.data;
  },
  methods:  {
    initWordGrid()  {
      console.clear();
      for (var i = 0; i <= 10; i++) {
        this.forceRenderVariable.push([]);
        for (var j = 0; j <= 70; j++) {
          this.forceRenderVariable[i].push(false);
        }
      }
    },
    JSONtoObj(whichLE)  {
      var QuestionObjectList = [];
      for (var i = 0; i < this.Challenge1.LearningQuestions.length; i++) {
          if (this.Challenge1.LearningQuestions[i].ChallengeQuestionID.substring(0,3) === 'LE' + whichLE)  {
            QuestionObjectList.push(this.Challenge1.LearningQuestions[i]);
          }
      }
      return QuestionObjectList;
    },
    JSONtoObj2()  {
      var QuestionObjectList = [];
      for (var i = 0; i < this.Challenge4.LearningQuestions.length; i++) {
            QuestionObjectList.push(this.Challenge4.LearningQuestions[i]);
            QuestionObjectList[i].UserAnswer = -1;
      }
      this.TotalQuestions = this.Challenge4.LearningQuestions.length;
      return QuestionObjectList;
    },



  },

}
</script>
