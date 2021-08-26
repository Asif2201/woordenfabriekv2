<template>
  <div class="align-top" v-if="$fetchState.pending">Fetching lessons...</div>
  <div class="align-top" v-else-if="$fetchState.error">An error occurred :(</div>
  <div v-else>
      <div class="relative ml-20 mt-10">
        <table class="table-auto w-full align-center">
          <thead>
            <tr>
              <th class="w-1/5 ..."></th>
              <th class="w-3/5 ..."></th>
              <th class="w-1/5 ..."></th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(Object, ObjIndex) in Challenge2">
              <tr>
                <td>
                  &nbsp;
                </td>
                <td>
                  <span class="paragraphheading">
                        {{ Object.Question }}
                  </span>
                </td>
                <td>
                  &nbsp;
                </td>
              </tr>
              <tr>
                <td>
                  &nbsp;
                </td>
                <td>
                  &nbsp;
                </td>
                <td>
                  &nbsp;
                </td>
              </tr>
              <tr>
                <td>
                  &nbsp;
                </td>
                <td class="align-right">
                  <br>
                  <textarea v-model="Object.UserAnswer" placeholder="geed je antwoord hier" style="explainbox" rows="6" cols="60"> </textarea>
                </td>`
                <td>
                  &nbsp;
                </td>
              </tr>
              <tr>
                <td>
                  &nbsp;
                </td>
                <td>
                  &nbsp;
                </td>
                <td>
                  &nbsp;
                </td>
              </tr>

          </template>
            <tr>
              <td>
                  &nbsp;
                </td>
              <td>
                &nbsp;
              </td>
              <td>
                <KlaarButton @challengeCompleted="challengeCompleted()" />
              </td>
            </tr>
        </tbody>
        </table>

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
      lAnswerExplanation: '',
    }
  },
  watch: {
    Challenge1()  {
      this.Challenge2 = this.JSONtoObj();
    }
  },
  async fetch() {
    const ChallengeID = this._props.Challenge;
    console.log(`Challenge ID for API:  ${ChallengeID}`);

    this.Challenge1 = await fetch(
      `${this.$config.baseURL}/ChallengeQuestionsLE2?ChallengeID=${ChallengeID}`
    ).then(res => res.json())
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
          QuestionObjectList[i].answerConfirmed = false;
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
        newPropertyID = this.lAnswerExplanation;
        PostString += `"'` + newPropertyID + `'": "AnswerExplanation" }`;

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


      if(answerIsCorrect) {
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
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    white-space: wrap;
    line-height: 200%;
  }
  .questionwordsClicked {
    color: green;
    font-family: var(--font-family-lato);
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 200%;

  }
  .paragraphheading {
    color: black;
    font-family: var(--font-family-lato);
    font-size: 22px;
    font-style: normal;
    font-weight: bold;

  }
  .explainbox {
    border:solid 1px orange;
    resize: none;
    float: right;
  }
</style>
