<template>
  <div class="align-top" v-if="$fetchState.pending">Fetching lessons...</div>
  <div class="align-top" v-else-if="$fetchState.error">An error occurred :(</div>
  <div v-else>
      <div class="relative ml-20 mt-10">
        <table class="table-fixed w-full align-center">
          <thead>
            <tr>
              <td>
                <span>
                </span>
              </td>
              <td>
                <span>
                  Morfeem
                </span>
              </td>
              <td>
                <span>
                  Non-Morfeem
                </span>
              </td>
              <td>
                <span  v-show="Challenge2[0].showMultiMorfeem === 'True'">
                  Multi-Morfeem
                </span>
              </td>
            </tr>
          </thead>
          <tbody>
            <div v-for="(Object, ObjIndex) in Challenge2" v-bind:key="Object.id">
              <tr>
                  <td>
                    <div class="questionwords">
                        <span>
                          {{ Object.word }}
                        </span>
                    </div>
                  </td>
                  <td>
                    <input type="radio" value="Morfeem" v-model="Object.UserAnswer">
                    <label for="one"> Selecteer categorie </label>
                  </td>
                  <td>
                    <input type="radio" value="Non-Morfeem" v-model="Object.UserAnswer">
                    <label for="one"> Selecteer categorie </label>
                  </td>
                  <template v-if="Object.showMultiMorfeem === 'True'">
                    <td>
                      <input type="radio" value="Multi-Morfeem" v-model="Object.UserAnswer">
                      <label for="one"> Selecteer categorie </label>
                    </td>
                  </template>
                  <td> &nbsp;  &nbsp; </td>
              </tr>
            </div>
        </tbody>
        </table>
        <div  class=buttondefault-4ZAul6>
            <button v-on:click="challengeCompleted()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
               Klaar
            </button>
        </div>
      </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  props:  [
    'Challenge',
    'Level',
    'LessonID'
  ],
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
  created() {
    this.initWordGrid();
  },
  data() {
    return {
      Challenge1: [],
      Challenge2: [],
      forceRenderVariable: [],
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

    this.Challenge1 = await fetch(
      `${this.$config.baseURL}/ChallengeQuestionsCA3?ChallengeID=${ChallengeID}`
    ).then(res => res.json())
  },
  methods:  {
    initWordGrid()  {
      console.clear();
      for (var i = 0; i <= 10; i++) {
        this.forceRenderVariable.push([]);
        for (var j = 0; j <= 7; j++) {
          this.forceRenderVariable[i].push(false);
        }
      }
    },
    splitWord(word)  {
      if (word) {
        return word.split(';');
      } else  {
        return '';
      }
    },
    JSONtoObj()  {
      var QuestionObjectList = [];
      for (var i = 0; i < this.Challenge1.LearningQuestions.length; i++) {
          QuestionObjectList.push(this.Challenge1.LearningQuestions[i]);
          QuestionObjectList[i].UserAnswer = '';
          QuestionObjectList[i].answerCorrect = false;
      }
      this.TotalQuestions = this.Challenge1.LearningQuestions.length;
      return QuestionObjectList;
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
        newPropertyID = this.Challenge2[i].UserAnswer;
        PostString += `"'` + newPropertyID + `'": "userAnswer",`;
        newPropertyID = this.Challenge2[i].answerCorrect ? 'Yes' : 'No';
        PostString += `"'` + newPropertyID + `'": "answerCorrect", `;
        newPropertyID = this.Challenge2[i].feedbackType + `F`;
        PostString += `"'` + newPropertyID + `'": "feedbackType" }`;

        this.$axios.post('/UpdateStudentAnswers', PostString, {headers: {
          'content-type': 'application/json',},})
        .then((response) => {
          console.log('Ok');
        }, (error) => {
          console.log(error);
        });
        console.log(PostString);
        PostString = '';
      }
      if(this.Challenge2[0].feedbackType === 2) {
              this.ShowResult = true;
      }
      else {
        this.ShowResult = true;
      }
      this.$emit('challenge-completed', this.TotalCorrect, this.TotalQuestions);
    },
    EvaluateAnswer: function(index)  {
      let answerIsCorrect = true;
      const choices = ["Morfeem", "Non-Morfeem", "Multi-Morfeem"];
      let UserChoice =-1;

      UserChoice = choices.indexOf(this.Challenge2[index].UserAnswer);
      if(UserChoice === this.Challenge2.answer) {
        this.Challenge2[index].answerCorrect = true;
        this.TotalCorrect += 1;
      }
    }
  },

}
</script>
<style scoped>
  .questionwords {
    color: grey;
    font-family: var(--font-family-lato);
    font-size: var(--font-size-l);
    font-style: normal;
    font-weight: 700;
  }
  .questionwordsClicked {
    color: green;
    font-family: var(--font-family-lato);
    font-size: var(--font-size-l);
    font-style: normal;
    font-weight: 700;
  }
</style>
