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
              </tr>
              <tr>
                <td>
                  <template v-if="Object.BeforeWord==='Yes'">
                      <input class="questionwordsClicked" v-model="Object.UserAnswer" @input="checkText(ObjIndex)" />
                      <span class="questionwords">
                        {{ Object.word }}
                      </span>
                  </template>
                </td>
              </tr>
              <tr>
                <td>
                  <template v-if="Object.BeforeWord==='No'">
                     <span class="questionwords">
                        {{ Object.word }}
                    </span>
                    <input class="questionwordsClicked" v-model="Object.UserAnswer" @input="checkText(ObjIndex)" />
                  </template>
                </td>
              </tr>
              <tr>
                <td colspan="1">
                  &nbsp;
                </td>
              </tr>
            </template>
        </tbody>
        </table>
        <div class="V02Klaar" :key="ResultKey">
          <KlaarButton :isKlaar="enableKlaarButton()" @challengeCompleted="challengeCompleted()" />
        </div>
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
      isKlaar1: [],
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
    enableKlaarButton() {
      if(this.isKlaar1.includes(false))  {
        return false;
      } else  {
        return true;
      }
    },
    checkText(index)  {
      this.isKlaar1[index] = true;
      this.ResultKey++;
    },
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
          this.isKlaar1[i] = false;
          QuestionObjectList[i].answer = QuestionObjectList[i].answer.replaceAll('[', '');
          QuestionObjectList[i].answer = QuestionObjectList[i].answer.replaceAll(']', '');
      }
      this.TotalQuestions = this.Challenge1.LearningQuestions.length;

      return QuestionObjectList;
    },

    challengeCompleted: function() {
      var PostString = '';
      var newPropertyID = '';
      var PostObject = {};
      if(!this.isKlaar1.includes(false))  {
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
      }
    },
    EvaluateAnswer: function(index)  {

      this.Challenge2[index].answerCorrect = false;
      this.Challenge2[index].answer = this.Challenge2[index].UserAnswer.trim();
      this.Challenge2[index].answer = this.Challenge2[index].UserAnswer.toLowerCase();
      this.Challenge2[index].UserAnswer = this.Challenge2[index].UserAnswer.trim();
      this.Challenge2[index].UserAnswer = this.Challenge2[index].UserAnswer.toLowerCase();
      if(this.Challenge2[index].answer == this.Challenge2[index].UserAnswer)  {
        this.Challenge2[index].answerCorrect = true;
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
    color: darkgray;
    font-family: lato;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    border: dotted 1px lightgray;
    padding: 2px;
    width: 40px;
  }
   .questionwordsClicked:focus {
    outline:none;
  }
   .explainbox {
    border:solid 1px orange;
    resize: none;
    float: left;
    font-family: lato;
    font-size: 12px;
    font-style: normal;
    padding: 4px;

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
  .TV02_Table tr  {
    line-height: 1.6;
  }
  .tablecontainerV02 {
    text-align: center;
  }
   .V02Klaar  {
    margin-top: 40px;
    margin-left: 600px;
  }
</style>
