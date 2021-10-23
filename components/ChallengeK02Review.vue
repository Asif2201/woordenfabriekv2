<template>
  <div class="align-top" v-if="$fetchState.pending">Fetching lessons...</div>
  <div class="align-top" v-else-if="$fetchState.error">An error occurred :(</div>
  <div v-else class="tablecontainer">
    <template v-for="(Object, ObjIndex) in Challenge2" >
        <p class="T2_Introduction">
            {{  Object.introduction }}
        </p>
        <table class="T2_Table">
          <tbody>
              <tr>
                <td>
                    <span class="selectedmorfeem">
                      {{ Object.Morfeem1 }}
                    </span>
                    <span v-if="Object.Morfeem2 != Object.word" class="questionwords">
                      {{ Object.Morfeem2 }}
                    </span>
                    <span v-if="Object.Morfeem3 != Object.word" class="questionwords">
                      {{ Object.Morfeem3 }}
                    </span>
                    <span v-if="Object.Morfeem4 != Object.word" class="questionwords">
                      {{ Object.Morfeem4 }}
                    </span>
                    <br>
                    <input value="0" :class="answerClass(ObjIndex, 1, 0)" name="M1" type="radio" id="M11" v-model="Object.UserAnswer1">
                    <label :class="answerClass(ObjIndex, 1, 0)" for="M11"> {{ Object.answer1.split(";")[0].replace("*", "")}} </label>
                    <br>
                    <input value="1" :class="answerClass(ObjIndex, 1, 1)" name="M1" type="radio" id="M12" v-model="Object.UserAnswer1">
                    <label :class="answerClass(ObjIndex, 1, 1)" for="M12"> {{ Object.answer1.split(";")[1].replace("*", "")}} </label>
                    <br>
                    <input value="2" :class="answerClass(ObjIndex, 1, 2)" name="M1" type="radio" id="M13" v-model="Object.UserAnswer1">
                    <label :class="answerClass(ObjIndex, 1, 2)" for="M13"> {{ Object.answer1.split(";")[2].replace("*", "")}} </label>
                </td>
                <td v-show="Object.Morfeem2.length > 0">
                    <span v-if="Object.Morfeem2 != Object.word" class="questionwords">
                      {{ Object.Morfeem1 }}
                    </span>
                    <span class="selectedmorfeem">
                      {{ Object.Morfeem2 }}
                    </span>
                    <span v-if="Object.Morfeem3 != Object.word" class="questionwords">
                      {{ Object.Morfeem3 }}
                    </span>
                    <span v-if="Object.Morfeem4 != Object.word" class="questionwords">
                      {{ Object.Morfeem4 }}
                    </span>
                    <br>
                    <input value="0" :class="answerClass(ObjIndex, 2, 0)" name="M2" type="radio" id="M21" v-model="Object.UserAnswer2">
                    <label :class="answerClass(ObjIndex, 2, 0)" for="M21"> {{ Object.answer2.split(";")[0].replace("*", "")}} </label>
                    <br>
                    <input value="1" :class="answerClass(ObjIndex, 2, 1)" name="M2" type="radio" id="M22" v-model="Object.UserAnswer2">
                    <label :class="answerClass(ObjIndex, 2, 1)" for="M22"> {{ Object.answer2.split(";")[1].replace("*", "")}} </label>
                    <br>
                    <input value="2" :class="answerClass(ObjIndex, 2, 2)" name="M2" type="radio" id="M23" v-model="Object.UserAnswer2">
                    <label :class="answerClass(ObjIndex, 2, 2)" for="M23"> {{ Object.answer2.split(";")[2].replace("*", "")}} </label>

                </td>
              </tr>
              <tr>
                <td v-show="Object.Morfeem3.length > 0">
                    <span v-if="Object.Morfeem3 != Object.word" class="questionwords">
                      {{ Object.Morfeem1 + Object.Morfeem2 }}
                    </span>
                    <span class="selectedmorfeem">
                      {{ Object.Morfeem3 }}
                    </span>
                    <span v-if="Object.Morfeem4 != Object.word" class="questionwords">
                      {{ Object.Morfeem4}}
                    </span>
                    <br>
                    <input value="0" :class="answerClass(ObjIndex, 3, 0)" name="M3" type="radio" id="M31" v-model="Object.UserAnswer3">
                    <label :class="answerClass(ObjIndex, 3, 0)" for="M31"> {{ Object.answer3.split(";")[0].replace("*", "")}} </label>
                    <br>
                    <input value="1" :class="answerClass(ObjIndex, 3, 1)" name="M3" type="radio" id="M32" v-model="Object.UserAnswer3">
                    <label :class="answerClass(ObjIndex, 3, 1)" for="M32"> {{ Object.answer3.split(";")[1].replace("*", "")}} </label>
                    <br>
                    <input value="2" :class="answerClass(ObjIndex, 3, 2)"  name="M3" type="radio" id="M33" v-model="Object.UserAnswer3">
                    <label :class="answerClass(ObjIndex, 3, 2)"  for="M33"> {{ Object.answer3.split(";")[2].replace("*", "")}} </label>

                </td>
                <td v-show="Object.Morfeem4.length > 0">
                    <span v-if="Object.Morfeem4 != Object.word" class="questionwords">
                      {{ Object.Morfeem1 + Object.Morfeem2 + Object.Morfeem3 }}
                    </span>
                    <span class="selectedmorfeem">
                      {{  Object.Morfeem4}}
                    </span>
                    <br>
                    <input value="0" :class="answerClass(ObjIndex, 4, 0)" name="M4" type="radio" id="M41" v-model="Object.UserAnswer4">
                    <label :class="answerClass(ObjIndex, 4, 0)" for="M41"> {{ Object.answer4.split(";")[0].replace("*", "")}} </label>
                    <br>
                    <input value="1" :class="answerClass(ObjIndex, 4, 1)" name="M4" type="radio" id="M42" v-model="Object.UserAnswer4">
                    <label :class="answerClass(ObjIndex, 4, 1)" for="M42"> {{ Object.answer4.split(";")[1].replace("*", "")}} </label>
                    <br>
                    <input value="2" :class="answerClass(ObjIndex, 4, 2)" name="M4" type="radio" id="M43" v-model="Object.UserAnswer4">
                    <label :class="answerClass(ObjIndex, 4, 2)" for="M43"> {{ Object.answer4.split(";")[2].replace("*", "")}} </label>

                </td>

              </tr>
        </tbody>
        </table>

    </template>
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
  errorCaptured: function(err) {
    console.log('Error caught: ', err.message);
    this.fetch();
    return false;
  },
  async fetch() {
    const ChallengeID = this._props.Challenge;
    const StudentID = this.$store.state.Lessons[this.$store.state.currentDisplayLesson].studentid
    const  URLAPI =`${this.$config.baseURL}/ChallengeQuestionsAll?challengeType=K02&challengelevelid=\'${ChallengeID}\'&Student_ID=\'${StudentID}\'`
    const  URLAPI1 =`${this.$config.baseURL}/ChallengeQuestionsAll?challengeType=K02&challengelevelid=\'${ChallengeID}\'&Student_ID=\''`
    const headers = { "cache-control": "no-store, max-age=0" }
    console.log(URLAPI);
    const resp1 = await this.$axios.get(URLAPI1, { headers });

    const resp = await this.$axios.get(URLAPI, { headers });
    this.Challenge1 = await resp.data;

  },
  methods:  {
    answerClass(QuestionIndex, index, optionindex)  {
      const propertyToCheck = "correctAnswer" + index;
      const propertyToCheck2 = "UserAnswer" + index;
      if(this.Challenge2[QuestionIndex][propertyToCheck] === optionindex)  {
        return 'answeroptionsCorrect';
      }
      else if(this.Challenge2[QuestionIndex][propertyToCheck2] == optionindex) {
        return 'answeroptionsWrong';
      } else  {
        return 'answeroptions';
      }
    },
    UserAnswerCheck(QuestionIndex, index, optionindex)  {
      const propertyToCheck = "UserAnswer" + index;
      if(this.Challenge2[QuestionIndex][propertyToCheck] == optionindex)  {
        return(true);
      }
      else{
        return(false);
      }
    },
    forceRerender() {
      this.ResultKey += 1;
    },
    FindCorrectAnswerIndex(SearchString)  {
      const X = SearchString;
      const Y = X.split(";");
      for (var j = 0; j < Y.length;j++) {
        if(Y[j].includes("*"))  {
          return j;
        }
      }
      return 0;
    },

    JSONtoObj()  {
      var QuestionObjectList = [];

      for (var i = 0; i < this.Challenge1.LearningQuestions.length; i++) {
          QuestionObjectList.push(this.Challenge1.LearningQuestions[i]);
          console.log(QuestionObjectList[i]);
          QuestionObjectList[i].correctAnswer4 = -1;
          QuestionObjectList[i].correctAnswer3 = -1;
          QuestionObjectList[i].correctAnswer2 = -1;
          QuestionObjectList[i].correctAnswer1 = -1;

          QuestionObjectList[i].UserAnswer1 = QuestionObjectList[i].studentAnswer.split("-")[0] ;

          QuestionObjectList[i].correctAnswer1 = this.FindCorrectAnswerIndex(QuestionObjectList[i].answer1);
          if(QuestionObjectList[i].answer2) {
              QuestionObjectList[i].UserAnswer2 = QuestionObjectList[i].studentAnswer.split("-")[1];
              QuestionObjectList[i].correctAnswer2 = this.FindCorrectAnswerIndex(QuestionObjectList[i].answer2);
          } else {
              QuestionObjectList[i].UserAnswer2 = -1;
          }
          if(QuestionObjectList[i].answer3) {
            QuestionObjectList[i].UserAnswer3 = QuestionObjectList[i].studentAnswer.split("-")[2];
            QuestionObjectList[i].correctAnswer3 = this.FindCorrectAnswerIndex(QuestionObjectList[i].answer3);
          } else {
            QuestionObjectList[i].UserAnswer3 = -1;
          }
          if(QuestionObjectList[i].answer4) {
            QuestionObjectList[i].UserAnswer4 = QuestionObjectList[i].studentAnswer.split("-")[3];
            QuestionObjectList[i].correctAnswer4 = this.FindCorrectAnswerIndex(QuestionObjectList[i].answer4);

          } else {
            QuestionObjectList[i].UserAnswer4 = -1;
          }
          QuestionObjectList[i].answerCorrect = false;
      }
      this.TotalQuestions = this.Challenge1.LearningQuestions.length;
      console.log(QuestionObjectList);
      return QuestionObjectList;
    }
  }
}
</script>
<style scoped>
  .questionwords {
    color: black;
    font-family: Lato;
    font-size: 14px;
    font-style: normal;
    font-weight: bold;
  }
  .selectedmorfeem {
    color: blue;
    font-family: Lato;
    font-size: 14px;
    font-style: normal;
    font-weight: bold;
  }
  .T2_Introduction  {
    color: grey;
    font-family: Lato;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    padding-top: 20px;
    width: 70%;
    padding-left: 30px;
    text-align: justify;
  }
  .T2_Table {
    width: 80%;
    padding: 20px;
    margin-top:20px;
    margin-left:200px;
    height: 300px;
    table-layout: fixed;
  }
  .T2_Table tr  {
    height: 150px;
  }
  .T2_Table th, td  {
    text-align: left;
    color: black;
    line-height: 1.6;
  }
  .tablecontainer {
    text-align: center;
    height: 300px;
  }
  .answeroptions {
    color: lightgray;
    font-family: Lato;
    font-size: 12px;
    font-style: normal;
    font-weight: bold;
    height: 10px;
    width: 10px;
    pointer-events: none;
  }
  .answeroptionsCorrect {
    color: green;
    font-family: Lato;
    font-size: 12px;
    font-style: normal;
    font-weight: bold;
    height: 10px;
    width: 10px;
    pointer-events: none;
  }
  .answeroptionsWrong {
    color: red;
    font-family: Lato;
    font-size: 12px;
    font-style: normal;
    font-weight: bold;
    height: 10px;
    width: 10px;
    pointer-events: none;
  }
  .klaarButton {
    font: normal normal bold 20px/25px Lato;
    letter-spacing: 0px;
    color: #FFFFFF;
    opacity: 1;
    background: #2185D0 0% 0% no-repeat padding-box;
    border-radius: 4px;
    width: 100px;
    height: 32px;
    top: 440px;
    left: 880px;
    clear: left;
    cursor:pointer;
}
</style>
