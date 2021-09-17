<template>
  <div class="align-top" v-if="$fetchState.pending">Fetching lessons...</div>
  <div class="align-top" v-else-if="$fetchState.error">An error occurred :(</div>
  <div v-else class="tablecontainer">
        <table class="challengetable">
          <tbody>
            <template v-for="(Object, ObjIndex) in Challenge2" >
              <tr>
                <td>
                    <span class="questionwords">
                      {{ Object.Morfeem1 }}
                    </span>
                    <br>
                    <template v-if="Object.answer1">
                      <span class="answer"> {{ Object.UserAnswer1 }} </span>
                    </template>
                </td>
                <td>
                    <span class="questionwords">
                      {{ Object.Morfeem2 }}
                    </span>
                    <br>
                    <template v-if="Object.answer2">
                      <span class="answer"> {{ Object.UserAnswer2 }} </span>
                    </template>
                </td>
                <td>
                  <template v-if="Object.Morfeem3">
                    <span class="questionwords">
                      {{ Object.Morfeem3 }}
                    </span>
                    <br>
                    <template v-if="Object.answer3">
                      <span class="answer"> {{ Object.UserAnswer3 }} </span>
                    </template>
                  </template>
                </td>
                <td  :key="ResultKey">
                  <div class="object-scale-down">
                    <p v-show="Object.answerCorrect" class="text-blue">
                      <img src="~/assets/correct.png" />
                    </p>
                    <p v-show="!Object.answerCorrect" class="text-blue">
                      <img src="~/assets/incorrect.png" />
                    </p>
                  </div>
                </td>
            </tr>
          </template>
          <tr>
              <td> &nbsp; </td>
              <td> &nbsp; </td>
              <td> &nbsp; </td>
              <td> &nbsp; </td>
          </tr>
        </tbody>
        </table>

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

    this.Challenge1 = await fetch(
      `${this.$config.baseURL}/ChallengeQuestionsK02?ChallengeID=${ChallengeID}`
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
          QuestionObjectList[i].correctAnswer3 = -1;
          QuestionObjectList[i].correctAnswer2 = -1;
          QuestionObjectList[i].correctAnswer1 = -1;
          const tempAnswer = QuestionObjectList[i].studentAnswer.split('-');
          const dataarray1 = QuestionObjectList[i].answer1.split(";");
          const dataarray2 = QuestionObjectList[i].answer2.split(";");

          if(tempAnswer.length > 1) {
            QuestionObjectList[i].UserAnswer1 = dataarray1[tempAnswer[0]].replace('*', '');
            QuestionObjectList[i].UserAnswer2 = dataarray2[tempAnswer[1]].replace('*', '');
          }
          if(QuestionObjectList[i].answer3) {
            const dataarray3 = QuestionObjectList[i].answer3.split(";");
            QuestionObjectList[i].UserAnswer3 = dataarray3[tempAnswer[2]].replace('*', '');
          } else {
            QuestionObjectList[i].UserAnswer3 = '';
          }
          QuestionObjectList[i].answerCorrect = false;
      }
      this.TotalQuestions = this.Challenge1.LearningQuestions.length;

      return QuestionObjectList;
    },


  },

}
</script>
<style scoped>
  .questionwords {
    color: black;
    font-family: Lato;
    font-size: 16px;
    font-style: normal;
    font-weight: bold;
  }
  .challengetable {
    width: 80%;
    padding: 20px;
    margin-top:20px;
    margin-left:30px
  }
  .challengetable th, td  {
    text-align: left;
    color: black;
    line-height: 1.6;
  }
  .tablecontainer {
    text-align: center;
  }
  .answer {
    color: blue;
    font-family: Lato;
    font-size: 14px;
    font-style: normal;
    font-weight: bold;
  }

</style>
