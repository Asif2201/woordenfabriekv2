<template>
  <div class="align-top" v-if="$fetchState.pending">Fetching lessons...</div>
  <div class="align-top" v-else-if="$fetchState.error">An error occurred :(</div>
  <div v-else>
      <div class="relative ml-10 mt-5">
        <table class="table-fixed w-full align-center">
          <thead>
            <tr>
              <th class="w=2/5">
                &nbsp;
              </th>
              <th class="w=1/5">
                <span class="questionwordsClicked">
                  Morfeem
                </span>
              </th>
              <th class="w=1/5">
                <span class="questionwordsClicked">
                  Non-Morfeem
                </span>
              </th>
              <th class="w=1/5">
                &nbsp;
                <span class="questionwordsClicked" v-show="Challenge2[0].showMultiMorfeem === 'True'">
                  Multi-Morfeem
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(Object, ObjIndex) in Challenge2">
              <tr>
                <td>
                      <span class="questionwords">
                        {{ Object.word }}
                      </span>
                  </td>
                  <td>
                    <input type="radio" :name="'wordtype_' + ObjIndex" value="Morfeem" v-model="Object.UserAnswer">
                    <label for="one" class="questionwordsClicked"> Selecteer categorie </label>
                  </td>
                  <td>
                    <input type="radio" :name="'wordtype_' + ObjIndex" value="Non-Morfeem" v-model="Object.UserAnswer">
                    <label for="one" class="questionwordsClicked"> Selecteer categorie </label>
                  </td>
                  <td v-show=" Challenge2[0].showMultiMorfeem ===  'True' ">
                    <input type="radio" :name="'wordtype_' + ObjIndex" value="Multi-Morfeem" v-model="Object.UserAnswer">
                    <label for="one" class="questionwordsClicked"> Selecteer categorie </label>
                  </td>
              </tr>
            </template>
              <tr>

              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td><KlaarButton @challengeCompleted="challengeCompleted()" /></td>

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
        PostString += `"'` + newPropertyID + `'": "feedbackType", `;
        PostString += `"'No Explanation requested'": "Explanation" }`;

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
    font-family: lato;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
  }
  .questionwordsClicked {
    color: darkgrey;
    font-family: lato;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
  }
  th, td {
    padding: 25px;
    text-align: center;
  }
</style>
