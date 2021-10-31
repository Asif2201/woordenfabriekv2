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
                    <input value="0" class="answeroptions" name="M1" type="radio" id="M11" v-model="Object.UserAnswer1" @click="AnswerClicked()">
                    <label class="answeroptions" for="M11"> {{ Object.answer1.split(";")[0].replace("*", "")}} </label>
                    <br>
                    <input value="1" class="answeroptions" name="M1" type="radio" id="M12" v-model="Object.UserAnswer1" @click="AnswerClicked()">
                    <label class="answeroptions" for="M12"> {{ Object.answer1.split(";")[1].replace("*", "")}} </label>
                    <br>
                    <input value="2" class="answeroptions" name="M1" type="radio" id="M13" v-model="Object.UserAnswer1" @click="AnswerClicked()">
                    <label class="answeroptions" for="M13"> {{ Object.answer1.split(";")[2].replace("*", "")}} </label>
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
                    <input value="0" class="answeroptions" name="M2" type="radio" id="M21" v-model="Object.UserAnswer2" @click="AnswerClicked()">
                    <label  class="answeroptions" for="M21"> {{ Object.answer2.split(";")[0].replace("*", "")}} </label>
                    <br>
                    <input value="1" class="answeroptions" name="M2" type="radio" id="M22" v-model="Object.UserAnswer2" @click="AnswerClicked()">
                    <label class="answeroptions" for="M22"> {{ Object.answer2.split(";")[1].replace("*", "")}} </label>
                    <br>
                    <input value="2" class="answeroptions" name="M2" type="radio" id="M23" v-model="Object.UserAnswer2" @click="AnswerClicked()">
                    <label class="answeroptions" for="M23"> {{ Object.answer2.split(";")[2].replace("*", "")}} </label>
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
                    <input value="0" class="answeroptions" name="M3" type="radio" id="M31" v-model="Object.UserAnswer3" @click="AnswerClicked()">
                    <label class="answeroptions" for="M31"> {{ Object.answer3.split(";")[0].replace("*", "")}} </label>
                    <br>
                    <input value="1" class="answeroptions" name="M3" type="radio" id="M32" v-model="Object.UserAnswer3" @click="AnswerClicked()">
                    <label class="answeroptions" for="M32"> {{ Object.answer3.split(";")[1].replace("*", "")}} </label>
                    <br>
                    <input value="2" class="answeroptions"  name="M3" type="radio" id="M33" v-model="Object.UserAnswer3" @click="AnswerClicked()">
                    <label class="answeroptions"  for="M33"> {{ Object.answer3.split(";")[2].replace("*", "")}} </label>
                </td>
                <td v-show="Object.Morfeem4.length > 0">
                    <span v-if="Object.Morfeem4 != Object.word" class="questionwords">
                      {{ Object.Morfeem1 + Object.Morfeem2 + Object.Morfeem3 }}
                    </span>
                    <span class="selectedmorfeem">
                      {{  Object.Morfeem4}}
                    </span>
                    <br>
                    <input value="0" class="answeroptions" name="M4" type="radio" id="M41" v-model="Object.UserAnswer4" @click="AnswerClicked()">
                    <label class="answeroptions" for="M41"> {{ Object.answer4.split(";")[0].replace("*", "")}} </label>
                    <br>
                    <input value="1" class="answeroptions" name="M4" type="radio" id="M42" v-model="Object.UserAnswer4" @click="AnswerClicked()">
                    <label class="answeroptions" for="M42"> {{ Object.answer4.split(";")[1].replace("*", "")}} </label>
                    <br>
                    <input value="2" class="answeroptions" name="M4" type="radio" id="M43" v-model="Object.UserAnswer4" @click="AnswerClicked()">
                    <label class="answeroptions" for="M43"> {{ Object.answer4.split(";")[2].replace("*", "")}} </label>
                </td>
              </tr>
        </tbody>
        </table>

    </template>
    <div>
      <KlaarButton :isKlaar="isKlaar" @challengeCompleted="challengeCompleted()" />
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
      Challenge1: [],
      Challenge2: [],
      knipWords: [],
      isKlaar: false,
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
    const StudentID = this.$store.state.Lessons[this.$store.state.currentDisplayLesson].studentid
    const  URLAPI =`${this.$config.baseURL}/ChallengeQuestionsAll?challengeType=K02&challengelevelid=\'${ChallengeID}\'&Student_ID=\'${StudentID}\'`
    const headers = { "cache-control": "no-store, max-age=0" }
    const resp = await this.$axios.get(URLAPI, { headers });
    this.Challenge1 = await resp.data;
  },
  methods:  {
    forceRerender() {
      this.ResultKey += 1;
    },
    AnswerClicked() {
      this.isKlaar = true;
      for(var i = 0; i < this.Challenge2.length; i++)  {
        if(this.Challenge2[i].UserAnswer1 < 0) {
          this.isKlaar = false;
          break;
        }
        if(this.Challenge2[i].answer2 != ';;;' && this.Challenge2[i].UserAnswer2 < 0)  {
          this.isKlaar = false;
          break;
        }
        if(this.Challenge2[i].answer3 != ';;;' && this.Challenge2[i].UserAnswer3 < 0)  {
          this.isKlaar = false;
          break;
        }
        if(this.Challenge2[i].answer4 != ';;;' && this.Challenge2[i].UserAnswer4 < 0)  {
          this.isKlaar = false;
          break;
        }
      }
    },
    FindCorrectAnswerIndex(SearchString)  {
      const X = SearchString;
      const Y = X.split(";");
      for (var j = 0; j < Y.length;j++) {
        if(Y[j].includes("*"))  {
          return j;
        }
      }
    },
    JSONtoObj()  {
      var QuestionObjectList = [];
      for (var i = 0; i < this.Challenge1.LearningQuestions.length; i++) {
          QuestionObjectList.push(this.Challenge1.LearningQuestions[i]);
          QuestionObjectList[i].correctAnswer4 = -1;
          QuestionObjectList[i].correctAnswer3 = -1;
          QuestionObjectList[i].correctAnswer2 = -1;
          QuestionObjectList[i].correctAnswer1 = -1;
          QuestionObjectList[i].UserAnswer1 = -1;
          QuestionObjectList[i].correctAnswer1 = this.FindCorrectAnswerIndex(QuestionObjectList[i].answer1);

          if(QuestionObjectList[i].answer2) {
              QuestionObjectList[i].UserAnswer2 = -1;
              QuestionObjectList[i].correctAnswer2 = this.FindCorrectAnswerIndex(QuestionObjectList[i].answer2);
          } else {
              QuestionObjectList[i].UserAnswer2 = -1;
          }
          if(QuestionObjectList[i].answer3) {
            QuestionObjectList[i].UserAnswer3 = -1;
            QuestionObjectList[i].correctAnswer3 = this.FindCorrectAnswerIndex(QuestionObjectList[i].answer3);
          } else {
            QuestionObjectList[i].UserAnswer3 = -1;
          }
          if(QuestionObjectList[i].answer4) {
            QuestionObjectList[i].UserAnswer4 = -1;
            QuestionObjectList[i].correctAnswer4 = this.FindCorrectAnswerIndex(QuestionObjectList[i].answer4);

          } else {
            QuestionObjectList[i].UserAnswer4 = -1;
          }
          QuestionObjectList[i].answerCorrect = false;
      }
      this.TotalQuestions = this.Challenge1.LearningQuestions.length;
      return QuestionObjectList;
    },

    challengeCompleted: function() {
      var PostString = '';
      var PostObject = {};
      var newPropertyID = '';
      if(this.isKlaar)  {
        for (var i = 0; i < this.Challenge2.length; i++) {
          this.EvaluateAnswer(i);
          PostObject = {};

          PostObject.id = this.Challenge2[i].id;
          PostObject.studentid = this.$store.state.Lessons[this.$store.state.currentDisplayLesson].studentid;
          PostObject.LessonID = this.$store.state.Lessons[this.$store.state.currentDisplayLesson].lessonid;
          PostObject.LevelID = this.Level;

          newPropertyID = this.Challenge2[i].UserAnswer1;
          if(this.Challenge2[i].answer2)  {
            newPropertyID += '-' + this.Challenge2[i].UserAnswer2;
          }
          if(this.Challenge2[i].answer3)  {
            newPropertyID += '-' + this.Challenge2[i].UserAnswer3;
          }
          if(this.Challenge2[i].answer4)  {
            newPropertyID += '-' + this.Challenge2[i].UserAnswer4;
          }
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
      }
    },
    EvaluateAnswer: function(index)  {
      this.Challenge2[index].answerCorrect = true;
      if(this.Challenge2[index].correctAnswer1 !== this.Challenge2[index].UserAnswer1)  {
        this.Challenge2[index].answerCorrect = false;
      }
      if(this.Challenge2[index].correctAnswer2 !== this.Challenge2[index].UserAnswer2)  {
        this.Challenge2[index].answerCorrect = false;
      }
      if(this.Challenge2[index].answer3)  {
        if(this.Challenge2[index].correctAnswer3 !== this.Challenge2[index].UserAnswer3)  {
          this.Challenge2[index].answerCorrect = false;
        }
      }
      if(this.Challenge2[index].answer4)  {
        if(this.Challenge2[index].correctAnswer4 !== this.Challenge2[index].UserAnswer4)  {
          this.Challenge2[index].answerCorrect = false;
        }
      }
      if(this.Challenge2[index].answerCorrect === true) {
        this.TotalCorrect += 1;
      }

    },
  },

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
    color: black;
    font-family: Lato;
    font-size: 12px;
    font-style: normal;
    font-weight: bold;
    height: 10px;
    width: 10px;
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
