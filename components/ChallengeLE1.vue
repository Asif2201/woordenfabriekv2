<template>
  <div class="align-top" v-if="$fetchState.pending">Fetching lessons...</div>
  <div class="align-top" v-else-if="$fetchState.error">{{ $fetchState.error }}</div>
  <div v-else>
      <div class="relative ml-20 mt-10">
        <table :key="tablechanged" class="table-fixed w-full align-center ">
          <thead>
            <tr>
              <th class="w-3/5 ..."></th>
              <th class="w-2/5 ..."></th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(Object, ObjIndex) in Challenge2">
              <tr>
                <td>
                  <span class="questionwords">
                    {{ Object.Question }}
                  </span>`
                </td>
                <td>
                      <LEButtons :data="AnswerOptions" :SelectedButton="Object.UserAnswer" @AnswerSelected="answerSelected(ObjIndex, $event)" />

                </td>
            </tr>
            <tr>
              <td> &nbsp; </td>
              <td> &nbsp; </td>
            </tr>
            <tr>
              <td> &nbsp; </td>
              <td> &nbsp; </td>
            </tr>
          </template>
             <tr>
              <td> &nbsp; </td>
              <td> &nbsp; </td>
            </tr>
             <tr>
              <td> &nbsp; </td>
              <td> &nbsp; </td>
            </tr>
            <tr>
              <td>
                <KlaarButton @challengeCompleted="challengeCompleted()" />
              </td>
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
    this.AnswerOptions.push({id:1, name:'Deel waar'});
    this.AnswerOptions.push({id:2, name:'Niet waar'});
    this.Challenge1 = await fetch(
      `${this.$config.baseURL}/ChallengeQuestionsAll?challengeType=LE1&challengelevelid=\'${ChallengeID}\'`
    ).then(res => res.json())

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

    challengeCompleted: function() {
      var PostString = '';
      var newPropertyID = '';
      var PostObject = {};
      for (var i = 0; i < this.Challenge2.length; i++) {
        this.EvaluateAnswer(i);
        PostObject = {};

        PostObject.id = this.Challenge2[i].id;
        PostObject.studentID = 'S1';
        PostObject.LessonID = this.LessonID;
        PostObject.LevelID = this.Level;

        newPropertyID = this.Challenge2[i].UserAnswer;
        PostObject.userAnswer = newPropertyID;
        PostObject.answerCorrect = this.Challenge2[i].answerCorrect ? 'Yes' : 'No';
        PostObject.feedbackType = this.Challenge2[i].feedbackType;
        PostObject.Explanation = 'No Explanation requested';

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
  .questionwords {
    color: var(--grey);
    font-family: lato;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
  }
  .center {
    margin: auto;
    width: 60%;
    padding: 10px;
  }
</style>
