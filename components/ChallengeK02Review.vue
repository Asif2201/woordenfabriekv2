<template>
  <div  v-if="$fetchState.pending">Fetching lessons...</div>
  <div  v-else-if="$fetchState.error">An error occurred :(</div>
  <div v-else class="tablecontainer">
    <template v-for="(Object, ObjIndex) in Challenge2" >
        <p class="T2_Introduction">
            <span v-html="Object.introduction"></span>
        </p>
        <table class="T2_Table">
          <tbody>
              <tr>
                <td>
                    <span class="questionwordsClicked">
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
                    <span class="questionwordsClicked">
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
                    <span class="questionwordsClicked">
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
                    <span class="questionwordsClicked">
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




</style>
