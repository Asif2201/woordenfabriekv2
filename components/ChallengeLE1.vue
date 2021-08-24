<template>
  <div class="align-top" v-if="$fetchState.pending">Fetching lessons...</div>
  <div class="align-top" v-else-if="$fetchState.error">{{ $fetchState.error }}</div>
  <div v-else>
      <div class="relative ml-20 mt-10">
        <table class="table-fixed w-full align-center">
          <thead/>
          <tbody>
            <div v-for="(Object, ObjIndex) in Challenge2" :key="Object.id">
              <tr>
                <td class="w-1/3">
                  <div class="questionwords">
                    <span>
                      {{ Object.Question }}
                    </span>
                  </div>
                </td>
                <td class="w-1/3"> &nbsp; </td>
                <td class="w-1/3 questionwords ml-20">
                  <div>
                      <LEButtons :data="AnswerOptions" :SelectedButton="Challenge2.UserAnswer" @AnswerSelected="answerSelected(ObjIndex, $event)" />
                  </div>
                </td>
                <td> &nbsp;  &nbsp; </td>
                <td v-show="ShowResult" :key="ResultKey">
                  <div class="object-scale-down">
                    <p v-show="Object.answerCorrect" class="text-blue">
                      <img src="~/assets/correct.jpeg" />
                    </p>
                    <p v-show="!Object.answerCorrect" class="text-blue">
                      <img src="~/assets/incorrect.jpeg" />
                    </p>
                  </div>
                </td>
            </tr>
            <tr>
              <td> &nbsp; </td>
              <td> &nbsp; </td>
              <td> &nbsp; </td>
              <td> &nbsp; </td>
              <td> &nbsp; </td>
            </tr>
            <tr>
              <td> &nbsp; </td>
              <td> &nbsp; </td>
              <td> &nbsp; </td>
              <td> &nbsp; </td>
              <td> &nbsp; </td>
            </tr>
          </div>
        </tbody>
        </table>
        <br><br>
        <div class="center">
            <KlaarButton @challengeCompleted="challengeCompleted()" />
        </div>
      </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Dropdown from './dropdown.vue';

export default {
  props:  [
    'Challenge',
    'Level',
    'LessonID'
  ],
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
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
    console.log(ChallengeID);
    this.AnswerOptions.push({id:0, name:'Waar'});
    this.AnswerOptions.push({id:1, name:'Deel waar'});
    this.AnswerOptions.push({id:2, name:'Niet waar'});
    this.Challenge1 = await fetch(
      `${this.$config.baseURL}/ChallengeQuestionsLE1?ChallengeID=${ChallengeID}`
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
    },

    challengeCompleted: function() {
      var PostString = '';
      var newPropertyID = '';
      for (var i = 0; i < this.Challenge2.length; i++) {
        this.EvaluateAnswer(i);

        PostString = '{ '
        newPropertyID = this.Challenge2[i].id;
        PostString += `"'` + newPropertyID + `'"  : "id",`;
        PostString += `"'S1'" : "studentID",`;
        newPropertyID = this.LessonID + `L`;
        PostString += `"'` + newPropertyID + `'": "LessonID",`;
        newPropertyID = this.Level;
        PostString += `"'` + newPropertyID + `'": "LevelID",`;
        newPropertyID = 0;
        PostString += `"'` + newPropertyID + `'": "userAnswer",`;
        newPropertyID = this.Challenge2[i].answerCorrect ? 'Yes' : 'No';
        PostString += `"'` + newPropertyID + `'": "answerCorrect",`;
        newPropertyID = this.Challenge2[i].feedbackType + `F`;
        PostString += `"'` + newPropertyID + `'": "feedbackType" }`;


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
    text-align: left;
    font: normal normal bold 24px/30px Lato;
    letter-spacing: 0px;
    color: #000000DE;
  }
  .center {
    margin: auto;
    width: 60%;
    padding: 10px;
  }
</style>
