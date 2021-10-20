<template>
  <div class="align-top" v-if="$fetchState.pending">Fetching lessons...</div>
  <div class="align-top" v-else-if="$fetchState.error">An error occurred :(</div>
  <div v-else>
      <div class="relative ml-20 mt-10">
        <table class="table-auto w-full align-center">
          <thead>
            <tr>
              <th class="w-4/5 ..."></th>
              <th class="w-1/5 ..."></th>
            </tr>
          </thead>
          <tbody class="border-black">
            <template v-for="(Object, ObjIndex) in Challenge2">
              <tr>
                <td>
                   <span class="voorbeeldzin">
                    {{ Object.voorbeeldzin }}
                  </span>
                </td>
                <td>
                  &nbsp;
                </td>
              </tr>
              <tr>
                <td>
                  <template v-for="(char, index) in Object.paragraphwords">
                    <span class="questionwords" >
                        <span>
                          {{ char }}
                        </span>
                    </span>
                    <template v-if="index+1 < Object.paragraphwords.length">
                      <input v-model="Object.UserAnswerList" class="questionwordsClicked">
                    </template>
                  </template>
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
              </tr>

          </template>
            <br>
            <br>
            <tr>
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
    console.log('ChallengeID: I01' + ChallengeID)
    this.Challenge1 = await fetch(
      `${this.$config.baseURL}/ChallengeQuestionsAll?challengeType=I01&challengelevelid=\'${ChallengeID}\'`
    ).then(res => res.json())
  },
  methods:  {
    splitWord(word)  {
      if (word) {
        return word.split('_');
      } else  {
        return '';
      }
    },
    JSONtoObj()  {
      var QuestionObjectList = [];
      for (var i = 0; i < this.Challenge1.LearningQuestions.length; i++) {
          QuestionObjectList.push(this.Challenge1.LearningQuestions[i]);
          QuestionObjectList[i].paragraphwords = this.splitWord(QuestionObjectList[i].Question);
          QuestionObjectList[i].UserAnswerList = [];
          QuestionObjectList[i].answerConfirmed = false;
          QuestionObjectList[i].answerCorrect = false;
      }
      this.TotalQuestions = this.Challenge1.LearningQuestions.length;
      return QuestionObjectList;
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
        PostObject.userAnswer = this.Challenge2[i].UserAnswerList
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
    font-family: lato;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    white-space: wrap;
    line-height: 200%;
  }
  .voorbeeldzin {
    color: lightgray;
    font-family: lato;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    white-space: wrap;
    line-height: 200%;
  }
  .questionwordsClicked {
    color: blue;
    font-family: lato;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 200%;
    border:solid 1px orange;


  }
  .paragraphheading {
    color: black;
    font-family: lato;
    font-size: 16px;
    font-style: bold;

  }
  .explainbox {
    border:solid 1px orange;
    resize: none;
    float: right;
  }
</style>
