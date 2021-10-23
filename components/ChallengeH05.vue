<template>
  <div class="align-top" v-if="$fetchState.pending">Fetching lessons...</div>
  <div class="align-top" v-else-if="$fetchState.error">An error occurred :(</div>
  <div v-else>
      <div class="relative ml-20">
        <table class="table-fixed w-full align-center space-y-2">
          <thead>
            <tr>
              <th class="w-1/4 ..."> </th>
              <th class="w-1/4 ..."> </th>
              <th class="w-1/4 ..."> </th>
              <th class="w-1/4 ..."> </th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(Object, ObjIndex) in Challenge2">
              <tr>
                <template v-for="(char, index) in Object.word">
                  <td :key="forceRenderVariable[ObjIndex][index]">
                    <div :class="{ questionwords : !forceRenderVariable[ObjIndex][index], questionwordsClicked : forceRenderVariable[ObjIndex][index] }" >
                        <span v-on:click="morphemeClick(ObjIndex, index, $event);">
                          {{ char }}
                        </span>
                    </div>
                  </td>
                </template>
                <td v-show="ShowResult" :key="ResultKey">
                  <div class="object-scale-down">
                    <p v-show="Object.answerCorrect" class="text-blue">
                      <img src="~/assets/correct.png" width="40" height="40" />
                    </p>
                    <p v-show="!Object.answerCorrect" class="text-blue">
                      <img src="~/assets/incorrect.png" width="40" height="40" />
                    </p>
                  </div>
                </td>
            </tr>
          </template>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>
                <button  @click="challengeCompleted()" class="klaarButton" > Klaar </button>
              </td>
              <td>&nbsp;</td>

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
    const StudentID = this.$store.state.Lessons[this.$store.state.currentDisplayLesson].studentid
    const  URLAPI =`${this.$config.baseURL}/ChallengeQuestionsAll?challengeType=H05&challengelevelid=\'${ChallengeID}\'&Student_ID=\'${StudentID}\'`

    console.log(URLAPI);
    this.Challenge1 = await fetch(
      URLAPI
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
        word = word.replace('*', '');
        return word.split(';');
      } else  {
        return '';
      }
    },
    JSONtoObj()  {
      var QuestionObjectList = [];
      for (var i = 0; i < this.Challenge1.LearningQuestions.length; i++) {
          QuestionObjectList.push(this.Challenge1.LearningQuestions[i]);
          QuestionObjectList[i].word = this.splitWord(QuestionObjectList[i].wordlist);
          QuestionObjectList[i].UserAnswerList = '';
          QuestionObjectList[i].answerConfirmed = false;
          QuestionObjectList[i].answerCorrect = false;
      }
      this.TotalQuestions = this.Challenge1.LearningQuestions.length;
      return QuestionObjectList;
    },
    morphemeClick: function(word, char, event) {
      this.forceRenderVariable[word].splice(this.Challenge2[word].UserAnswerList, 1, false);
      this.Challenge2[word].UserAnswerList = char;
      this.forceRenderVariable[word].splice(this.Challenge2[word].UserAnswerList, 1, true);

    },
    IsClicked(word, char) {
      return(this.Challenge2[word].UserAnswerList= char);
    },

    challengeCompleted: function() {
      var PostString = '';
      var PostObject = {};

      for (var i = 0; i < this.Challenge2.length; i++) {
        this.EvaluateAnswer(i);

        PostObject = {};

        PostObject.id = this.Challenge2[i].id;
        PostObject.studentID = 'S1';
        PostObject.LessonID = this.LessonID;
        PostObject.LevelID = this.Level;
        PostObject.userAnswer = this.Challenge2[i].UserAnswerList;
        PostObject.answerCorrect = this.Challenge2[i].answerCorrect ? 'Yes' : 'No';
        PostObject.feedbackType = this.Challenge2[i].feedbackType;
        PostObject.Explanation = this.lAnswerExplanation;

        PostString = JSON.stringify(PostObject);

        console.log(PostString);


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
      var correctanswer = '';
      const x = this.Challenge2[index].wordlist.split(';');
      for(var i = 0;i < x.length; i++)  {
        if(x[i].indexOf('*') > 0) {
          correctanswer = x[i];
        }
      }
      if(this.Challenge2[index].UserAnswerList = correctanswer) {
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
    color: blue;
    font-family: lato;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
  }
  th, td {
    padding: 25px;
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
    top: 740px;
    left: 880px;
    z-index: 100;
    cursor: pointer;
  }
</style>
