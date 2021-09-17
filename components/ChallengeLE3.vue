<template>
  <div class="align-top" v-if="$fetchState.pending">Fetching lessons...</div>
  <div class="align-top" v-else-if="$fetchState.error">An error occurred :(</div>
  <div v-else>
      <div class="relative ml-20 mt-5">
        <span class="LE3Heading">
          Eerdere evaluaties
        </span>
        <br><br><br><br>
        <table class="table-fixed w-full align-center ">
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
                    <LEAnswers :data="AnswerOptions" :SelectedButton="Object.studentAnswer" />
                </td>
            </tr>

          </template>
        </tbody>
      </table>

  <br>
  <br>
        <table class="table-auto w-full align-center">
          <thead>
            <tr>
              <th class="w-1/5 ..."></th>
              <th class="w-3/5 ..."></th>
              <th class="w-1/5 ..."></th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(Object, ObjIndex) in Challenge3">
              <tr>
                <td>
                  <span class="questionwords">
                        Previous conclusion
                  </span>
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
                  <p style="explainbox"> {{ Object.studentAnswer }} </p>
                </td>
                <td>
                  &nbsp;
                </td>`
                <td>
                  &nbsp;
                </td>
              </tr>

          </template>

        </tbody>
        </table>

        <br>
        <span class="LE3Heading">
          Nieuwe conclusie
        </span>
        <table class="table-auto w-full align-center">
          <thead>
            <tr>
              <th class="w-1/5 ..."></th>
              <th class="w-3/5 ..."></th>
              <th class="w-1/5 ..."></th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(Object, ObjIndex) in Challenge5">
              <tr>
                <td>
                  <span class="paragraphheading">
                      {{ Object.Question }}
                  </span>
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
                <td>
                  &nbsp;
                </td>
                <td>
                  &nbsp;
                </td>
              </tr>
              <tr>
                <td>
                 <br>
                  <textarea v-model="Object.UserAnswer" placeholder="geed je antwoord hier" style="explainbox" rows="6" cols="60"> </textarea>
                </td>
                <td>
                  &nbsp;
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
      Challenge3: [],
      Challenge4: [],
      Challenge5: [],
      forceRenderVariable: [],
      AllquestionsAnswered: false,
      ShowResult: false,
      ResultKey: 0,
      TotalCorrect: 0,
      TotalQuestions: 0,
      lAnswerExplanation: '',
      AnswerOptions: [],

    }
  },
  watch: {
    Challenge1()  {
      this.Challenge2 = this.JSONtoObj('1');
      this.Challenge3 = this.JSONtoObj('2');
    },
    Challenge4()  {
      this.Challenge5 = this.JSONtoObj2();
    }
  },
  async fetch() {
    const ChallengeID = this._props.Challenge;
    this.AnswerOptions.push({id:0, name:'Waar'});
    this.AnswerOptions.push({id:1, name:'Deel waar'});
    this.AnswerOptions.push({id:2, name:'Niet waar'});
    this.Challenge1 = await fetch(
      `${this.$config.baseURL}/StudentLEAnswers?StudentID=S1`
    ).then(res => res.json())
    this.Challenge4 = await fetch(
      `${this.$config.baseURL}/ChallengeQuestionsLE3?ChallengeID=${ChallengeID}`
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
            QuestionObjectList[i].UserAnswer = '';
      }
      this.TotalQuestions = this.Challenge4.LearningQuestions.length;
      return QuestionObjectList;
    },
    challengeCompleted: function() {
      var PostString = '';
      var newPropertyID = '';
      for (var i = 0; i < this.Challenge5.length; i++) {
        this.EvaluateAnswer(i);

        PostString = '{ '
        newPropertyID = this.Challenge5[i].id;
        PostString += `"'` + newPropertyID + `'"  : "id",`;
        PostString += `"'S1'" : "studentID",`;
        newPropertyID = this.LessonID + `L`;
        PostString += `"'` + newPropertyID + `'": "LessonID",`;
        newPropertyID = this.Level;
        PostString += `"'` + newPropertyID + `'": "LevelID",`;
        newPropertyID = this.Challenge5[i].UserAnswer;
        PostString += `"'` + newPropertyID + `'": "userAnswer",`;
        newPropertyID = this.Challenge5[i].answerCorrect ? 'Yes' : 'No';
        PostString += `"'` + newPropertyID + `'": "answerCorrect", `;
        newPropertyID = this.Challenge5[i].feedbackType + `F`;
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
  .questionwords {
    color: black;
    font-family: var(--font-family-lato);
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    white-space: wrap;
    line-height: 100%;
  }
  .LE3Heading {
    color:pink;
    font-family: lato;
    font-size: 18px;
    font-weight: bold;
  }
  .paragraphheading {
    color: black;
    font-family: var(--font-family-lato);
    font-size: 18px;
    font-style: normal;
    font-weight: bold;

  }
  .explainbox {
    border:solid 1px orange;
    resize: none;
    float: right;
    font-family: var(--font-family-lato);
    font-size: 14px;
    font-style: normal;

  }
</style>
