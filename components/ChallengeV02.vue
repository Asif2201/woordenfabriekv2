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
                      <input class="questionwordsClicked" v-model="Object.UserAnswer" />
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
                    <input class="questionwordsClicked" v-model="Object.UserAnswer" />
                  </template>
                </td>
              </tr>
              <tr>
              <td> &nbsp; </td>
              <td>
                &nbsp;
              </td>
              </tr>
              <br>
            </template>
          <tr>
              <td>
                <KlaarButton @challengeCompleted="challengeCompleted()" />
              </td>
              <td> &nbsp; </td>
              <td> &nbsp; </td>
              <td> &nbsp; </td>
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

    const headers = { "cache-control": "no-store, max-age=0" }
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
          QuestionObjectList[i].UserAnswer = '';
          QuestionObjectList[i].answerConfirmed = false;
          QuestionObjectList[i].answerCorrect = false;
      }
      this.TotalQuestions = this.Challenge1.LearningQuestions.length;

      return QuestionObjectList;
    },

    challengeCompleted: function() {
      var PostString = '';
      var newPropertyID = '';
      var PostObject = {};
      for (var i = 0; i < this.Challenge2.length; i++) {
        this.EvaluateAnswer(i);
        PostObject = {};

        PostObject.id = this.Challenge2[i].id;
        PostObject.studentid = this.$store.state.Lessons[this.$store.state.currentDisplayLesson].studentid;
        PostObject.LessonID = this.$store.state.Lessons[this.$store.state.currentDisplayLesson].lessonid;
        PostObject.LevelID = this.Level;

        newPropertyID = this.Challenge2[i].UserAnswer;
        PostObject.userAnswer = newPropertyID;
        PostObject.answerCorrect = this.Challenge2[i].answerCorrect ? 'Yes' : 'No';
        PostObject.feedbackType = this.Challenge2[i].feedbackType;
        PostObject.Explanation = 'No explanation requested';

        PostString = JSON.stringify(PostObject);

        console.log(PostString);

        this.$axios.post('/UpdateStudentAnswers', PostString, {headers: {
          'content-type': 'application/json',},})
        .then((response) => {
          console.log('Ok');
        }, (error) => {
          console.log(error);
        });
        PostString = '';
      }

      if(this.Challenge2[0].feedbackType === 2) {
        this.ShowResult = true;
      }
      else {
        this.ShowResult = true;
      }
      this.forceRerender();
      this.$emit('challenge-completed', this.TotalCorrect, this.TotalQuestions);
    },
    EvaluateAnswer: function(index)  {
      this.Challenge2[index].answerCorrect = true;
      this.Challenge2[index].answer = this.Challenge2[index].UserAnswer.trim();
      this.Challenge2[index].answer = this.Challenge2[index].UserAnswer.toLowerCase();
      this.Challenge2[index].UserAnswer = this.Challenge2[index].UserAnswer.trim();
      this.Challenge2[index].UserAnswer = this.Challenge2[index].UserAnswer.toLowerCase();
      if(this.Challenge2[index].answer !== this.Challenge2[index].UserAnswer)  {
        this.Challenge2[index].answerCorrect = false;
      }
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
    border:solid 1px grey;
  }
   .explainbox {
    border:solid 1px orange;
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
  .tablecontainerV02 {
    text-align: center;
  }
</style>
