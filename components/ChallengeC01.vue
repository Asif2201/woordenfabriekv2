<template>
  <div v-if="$fetchState.pending">Fetching lessons...</div>
  <div v-else-if="$fetchState.error">{{ $fetchState.error }}</div>
  <div v-else>
      <div class="C01Container">
        <table :key="tablechanged" class="C01Table">
          <tbody>
            <template v-for="(Object, ObjIndex) in Challenge2">
              <tr>
                <td>
                    <span class="questionwords">
                      {{ Object.Sentence }}
                    </span>
                </td>
                <td>
                    <LEButtons :Disabled="false" :data="AnswerOptions" :SelectedButton="Object.UserAnswer" @AnswerSelected="answerSelected(ObjIndex, $event)" />
                </td>
            </tr>
          </template>
        </tbody>
      </table>
      <div class="C01Klaar">
        <KlaarButton :isKlaar="isKlaar" @challengeCompleted="challengeCompleted()" />
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
  computed: {
    userEmail() {
      return this.$store.state.userEmail;
    },

  },
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
      isKlaar: false,
    }
  },
  errorCaptured: function(err) {
    console.log('Error caught: ', err.message);
    this.fetch();
    return false;
  },
  watch: {
    Challenge1()  {
      if(this.Challenge1.LearningQuestions != undefined)  {
        this.Challenge2 = this.JSONtoObj();
      }
    }
  },
  async fetch() {
    const ChallengeID = this._props.Challenge;
    const StudentID = this.$store.state.Lessons[this.$store.state.currentDisplayLesson].studentid

    this.Challenge1 = [];
    this.AnswerOptions.push({id:0, name:'Waar'});
    this.AnswerOptions.push({id:1, name:'Deels waar'});
    this.AnswerOptions.push({id:2, name:'Niet waar'});

    const  URLAPI =`${this.$config.baseURL}/ChallengeQuestionsAll?challengeType=C01&challengelevelid=\'${ChallengeID}\'&Student_ID=\'${StudentID}\'`
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
      for (var i = 0; i < this.Challenge2.length; i++) {
        if(this.Challenge2[i].UserAnswer < 0)  {
          this.isKlaar = false;
        }
        else  {
          this.isKlaar = true;
        }
      }
    },

    challengeCompleted: function() {
      var PostString;
      var PostObject;
      if(this.isKlaar) {
        for (var i = 0; i < this.Challenge2.length; i++) {
          PostObject = {};
          this.EvaluateAnswer(i);

          PostObject.id = this.Challenge2[i].id;
          PostObject.studentid = this.$store.state.Lessons[this.$store.state.currentDisplayLesson].studentid;
          PostObject.LessonID = this.$store.state.Lessons[this.$store.state.currentDisplayLesson].lessonid;
          PostObject.LevelID = this.Level;
          PostObject.userAnswer = this.Challenge2[i].UserAnswer;
          PostObject.answerCorrect = this.Challenge2[i].answerCorrect ? 'Yes' : 'No';
          PostObject.feedbackType = this.Challenge2[i].feedbackType;
          PostObject.Explanation = 'No explanation required';
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
      let useranswer2 = '';
      let correctAnswer = '';

      this.Challenge2[index].answerCorrect = false;
      correctAnswer = this.Challenge2[index].answer;
      useranswer2 = this.Challenge2[index].UserAnswer;
      if(correctAnswer === useranswer2) {
        this.Challenge2[index].answerCorrect = true;
        this.TotalCorrect += 1;
      }

    }
  },

}
</script>
<style scoped>


</style>
