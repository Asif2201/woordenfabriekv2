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
                  <span class="V01Context">
                    {{ Object.context}}
                  </span>
                <td>
                  <div v-if="Object.MorfeemList !== null" class="questionwords">
                      <dropdown :data="convertToDropDownData(Object.MorfeemList,1, ObjIndex)" @AnswerSelected="answerSelected(ObjIndex, $event,1)" />
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
                      <dropdown :data="convertToDropDownData(Object.MorfeemList2,2, ObjIndex)" @AnswerSelected="answerSelected(ObjIndex, $event,2)" />
                    </div>
                </td>
                <td>
                  <div v-if="Object.MorfeemList3 !== null" class="questionwords">
                      <dropdown :data="convertToDropDownData(Object.MorfeemList3,3, ObjIndex)" @AnswerSelected="answerSelected(ObjIndex, $event,3)" />
                    </div>
                </td>
            </tr>
            <tr>

              <td>
                 &nbsp;
              </td>
              <td>
                <br>
                  <textarea v-model="Object.explanation" placeholder="leg jouw antwoord uit" class="explainbox" rows="6" cols="100"> </textarea>
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
              <td>
                <div>
                <button v-on:click ="challengeCompleted()" class="klaarButton"> Klaar </button>
                </div>
              </td>
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
  async fetch() {
    const ChallengeID = this._props.Challenge;
    const StudentID = this.$store.state.Lessons[this.$store.state.currentDisplayLesson].studentid
    const  URLAPI =`${this.$config.baseURL}/ChallengeQuestionsAll?challengeType=V01&challengelevelid=\'${ChallengeID}\'&Student_ID=\'${StudentID}\'`
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
          QuestionObjectList[i].correctAnswer1 = -1;
          QuestionObjectList[i].UserAnswer1 = -1;
          QuestionObjectList[i].correctAnswer2 = -1;
          QuestionObjectList[i].UserAnswer2 = -1;

          QuestionObjectList[i].correctAnswer3 = -1;
          QuestionObjectList[i].UserAnswer3 = -1;

          QuestionObjectList[i].answerConfirmed = false;
          QuestionObjectList[i].answerCorrect = false;
          QuestionObjectList[i].explanation = '';
      }
      this.TotalQuestions = this.Challenge1.LearningQuestions.length;

      return QuestionObjectList;
    },
    answerSelected(Index, answer, WhichOne) {
      switch(WhichOne)  {
        case 1:
          this.Challenge2[Index].UserAnswer1 = answer;
          break;
        case 2:
          this.Challenge2[Index].UserAnswer2 = answer;
          break;
        case 3:
          this.Challenge2[Index].UserAnswer3 = answer;
          break;
      }
    },
    convertToDropDownData(strData, whichOne, Index) {
      var DropDownOptions = [];
      var DropDownOption = new Object();
      const dataarray = strData.split(";");
      for(var i=0; i < dataarray.length;i++)  {
        if(dataarray[i].indexOf('*') >= 0) {
          console.log(Index+ 'correctAnswer-' + i);
          if(whichOne === 1)  {
            this.Challenge2[Index].correctAnswer1 = i;
          }
          if(whichOne === 2)  {
            this.Challenge2[Index].correctAnswer2 = i;
          }
          if(whichOne === 3)  {
            this.Challenge2[Index].correctAnswer3 = i;
          }
          DropDownOption.id = i;
          DropDownOption.name = dataarray[i].replace('*', '');
          DropDownOptions.push(DropDownOption);
          DropDownOption = new Object();
        }
        else {
          DropDownOption.id = i;
          DropDownOption.name = dataarray[i];
          DropDownOptions.push(DropDownOption);
          DropDownOption = new Object();
        }
      }
      return DropDownOptions;
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

        newPropertyID = this.Challenge2[i].UserAnswer1 + ';' + this.Challenge2[i].UserAnswer2 + ';' + this.Challenge2[i].UserAnswer3;
        PostObject.userAnswer = newPropertyID;
        PostObject.answerCorrect = this.Challenge2[i].answerCorrect ? 'Yes' : 'No';
        PostObject.feedbackType = this.Challenge2[i].feedbackType;
        PostObject.Explanation = this.Challenge2[i].explanation;

        PostString = JSON.stringify(PostObject);

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
      if(this.Challenge2[index].correctAnswer1 !== this.Challenge2[index].UserAnswer1)  {
        this.Challenge2[index].answerCorrect = false;
      }
      if(this.Challenge2[index].correctAnswer2 !== this.Challenge2[index].UserAnswer2)  {
        this.Challenge2[index].answerCorrect = false;
      }
      if(this.Challenge2[index].correctAnswer3 !== this.Challenge2[index].UserAnswer3)  {
        this.Challenge2[index].answerCorrect = false;
      }
    },
  },

}
</script>
<style scoped>
  .questionwords {
    color: grey;
    font-family: lato;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
  }
  .V01Context {
    color: grey;
    font-family: lato;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
  }
  .right {
    margin-right: 20px;
    float: right;
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
  .V01_Table td:nth-child(1) {
    width: 300px;
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
 .explainbox {
    border:solid 1px orange;
    resize: none;
    float: left;
    font-family: lato;
    font-size: 12px;
    font-style: normal;
  }
</style>
