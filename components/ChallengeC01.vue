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
                <td class="w-3/5">
                  <div class="questionwords">
                    <span>
                      {{ Object.Sentence }}
                    </span>
                  </div>
                </td>
                <td class="w-1/5"> &nbsp; </td>
                <td class="w-1/5 questionwords ml-20">
                  <div v-if="Object.answerConfirmed" class="cursor not-allowed">
                      <dropdown :data="AnswerOptions" />
                  </div>
                  <div v-else>
                        <dropdown :data="AnswerOptions" @AnswerSelected="answerSelected(ObjIndex, $event)" />
                  </div>
                </td>
                <td> &nbsp;  &nbsp; </td>

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
            </tr>
          </div>
            <tr>
                          <td> <KlaarButton @challengeCompleted="challengeCompleted()" /></td>
            </tr>
        </tbody>
        </table>

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
    ...mapGetters(['isAuthenticated', 'loggedInUser']),

    userEmail() {
      return this.$store.state.userEmail;
    },

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
      isKlaar: false,
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
      `${this.$config.baseURL}/ChallengeQuestionsAll?challengeType=C01&challengelevelid=\'${ChallengeID}\'`
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
      for (var i = 0; i < this.Challenge2.length; i++) {
        if(this.Challenge2.UserAnswer < 0)  {
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

      for (var i = 0; i < this.Challenge2.length; i++) {
        PostObject = {};
        this.EvaluateAnswer(i);

        PostObject.id = this.Challenge2[i].id;
        PostObject.studentID = 'S1';
        PostObject.LessonID = this.LessonID;
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
</style>
