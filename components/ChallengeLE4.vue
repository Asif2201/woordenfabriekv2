<template>
  <div  v-if="$fetchState.pending">Fetching lessons...</div>
  <div  v-else-if="$fetchState.error">An error occurred :(</div>
  <div v-else>
      <div class="LE2Container">
        <br><br>
        <span class="LE3Heading"> Eerdere antwoorden </span>
        <table class="LE2Table">
          <tbody>
            <template v-for="(Object, ObjIndex) in Challenge2">
              <tr>
                <td>
                  <span class="questionwords">
                        {{ Object.Question }}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <span class="explainbox"> {{ Object.UserAnswer }} </span>
                </td>
              </tr>
          </template>
        </tbody>
        </table>
        <span class="LE3Heading"> Nieuwe conclusie </span>
        <table class="LE2Table">
          <tbody>
            <template v-for="(Object, ObjIndex) in Challenge5">
              <tr>
                <td>
                  <span class="questionwords">
                        {{ Object.Question }}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <textarea v-model="Object.UserAnswer" placeholder="geef je antwoord hier" class="explainbox" rows="6" cols="60"> </textarea>
                </td>
              </tr>
          </template>
        </tbody>
        </table>

      </div>
      <KlaarButton :isKlaar="isKlaar" @challengeCompleted="challengeCompleted()" />
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
      Challenge3: [],
      Challenge4: [],
      Challenge5: [],
      isKlaar: false,
      ShowResult: false,
      ResultKey: 0,
      TotalCorrect: 0,
      TotalQuestions: 0,
      lAnswerExplanation: '',
      tablechanged: 0,
    }
  },
  watch: {
    Challenge1()  {
      this.Challenge2 = this.JSONtoObj('2');
    },
    Challenge4()  {
      this.Challenge5 = this.JSONtoObj2();
    }
  },
  async fetch() {
    const ChallengeID = this._props.Challenge;

    const StudentID = this.$store.state.Lessons[this.$store.state.currentDisplayLesson].studentid;
    const lessonid = this.$store.state.Lessons[this.$store.state.currentDisplayLesson].lessonid;

    const  URLAPI =`${this.$config.baseURL}/StudentLEAnswers?StudentID=\'${StudentID}\'&LessonID=\'${lessonid}\'`
    const headers = { "cache-control": "no-store, max-age=0" }
    const resp = await this.$axios.get(URLAPI, { headers });
    this.Challenge1 = await resp.data;
    const  URLAPI2 =`${this.$config.baseURL}/ChallengeQuestionsAll?challengeType=LE4&challengelevelid=\'${ChallengeID}\'&Student_ID=\'${StudentID}\'`
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



    challengeCompleted: function() {
      var PostString = '';
      var newPropertyID = '';
      var PostObject = {};
      for (var i = 0; i < this.Challenge5.length; i++) {
        this.EvaluateAnswer(i);
        PostObject = {};

        PostObject.id = this.Challenge5[i].id;
        PostObject.studentid = this.$store.state.Lessons[this.$store.state.currentDisplayLesson].studentid;
        PostObject.LessonID = this.$store.state.Lessons[this.$store.state.currentDisplayLesson].lessonid;
        PostObject.LevelID = this.Level;

        newPropertyID = this.Challenge5[i].UserAnswer;
        PostObject.userAnswer = newPropertyID;
        PostObject.answerCorrect = this.Challenge5[i].answerCorrect ? 'Yes' : 'No';
        PostObject.feedbackType = this.Challenge5[i].feedbackType;
        PostObject.Explanation = 'No Explanation requested';

        PostString = JSON.stringify(PostObject);

        console.log(PostString);

        this.$axios.post('/UpdateStudentAnswers', PostString, {headers: {
          'content-type': 'application/json',},})
        .then((response) => {
          console.log('Ok');
        }, (error) => {
          console.error(error);
        });
        PostString = '';
      }
      if(this.Challenge5[0].feedbackType === 2) {
              this.ShowResult = true;
      }
      else {
        this.ShowResult = true;
      }
      this.$emit('challenge-completed', this.TotalCorrect, this.TotalQuestions);
    },
    EvaluateAnswer: function(index)  {
      let answerIsCorrect = true;

      if(answerIsCorrect) {
        this.Challenge5[index].answerCorrect = true;
        this.TotalCorrect += 1;
      }
    }
  },

}
</script>
<style scoped>

</style>
