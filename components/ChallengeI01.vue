<template>
  <div  v-if="$fetchState.pending">Fetching lessons...</div>
  <div  v-else-if="$fetchState.error">An error occurred :(</div>
  <div v-else>
      <div class="I01Container">
        <table class="I01Table">
          <tbody>
            <template v-for="(Object, ObjIndex) in Challenge2">
              <tr>
                <td>
                   <span class="voorbeeldzin" v-html="Object.voorbeeldzin">
                  </span>
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
                      <input v-model="Object.UserAnswerList" class="I01Textbox"  @input="checkText(ObjIndex)">
                    </template>
                  </template>
                </td>
              </tr>
          </template>
        </tbody>
        </table>
        <div class="I01Klaar" :key="ResultKey">
          <KlaarButton :isKlaar="enableKlaarButton()" @challengeCompleted="challengeCompleted()" />
        </div>
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
      ShowResult: false,
      ResultKey: 0,
      TotalCorrect: 0,
      TotalQuestions: 0,
      lAnswerExplanation: '',
      isKlaar1: [],
    }
  },
  watch: {
    Challenge1()  {
      this.Challenge2 = this.JSONtoObj();
    },
  },
  async fetch() {
    const ChallengeID = this._props.Challenge;
    const StudentID = this.$store.state.Lessons[this.$store.state.currentDisplayLesson].studentid
    const  URLAPI =`${this.$config.baseURL}/ChallengeQuestionsAll?challengeType=I01&challengelevelid=\'${ChallengeID}\'&Student_ID=\'${StudentID}\'`

    const headers = { "cache-control": "no-store, max-age=0" }
    const resp = await this.$axios.get(URLAPI, { headers });
    this.Challenge1 = await resp.data;

  },
  methods:  {
    enableKlaarButton() {
      if(this.isKlaar1.includes(false))  {
        return false;
      } else  {
        return true;
      }
    },
    checkText(index)  {
      this.isKlaar1[index] = true;
      this.ResultKey++;
    },
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
          this.isKlaar1[i] = false;
      }
      this.TotalQuestions = this.Challenge1.LearningQuestions.length;
      return QuestionObjectList;
    },


    challengeCompleted: function() {
      var PostString = '';
      var PostObject = {};
      if(!this.isKlaar1.includes(false))  {
        for (var i = 0; i < this.Challenge2.length; i++) {
          this.EvaluateAnswer(i);

          PostObject = {};

          PostObject.id = this.Challenge2[i].id;
          PostObject.studentid = this.$store.state.Lessons[this.$store.state.currentDisplayLesson].studentid;
          PostObject.LessonID = this.$store.state.Lessons[this.$store.state.currentDisplayLesson].lessonid;
          PostObject.LevelID = this.Level;
          PostObject.userAnswer = this.Challenge2[i].UserAnswerList
          PostObject.answerCorrect = this.Challenge2[i].answerCorrect ? 'Yes' : 'No';
          PostObject.feedbackType = this.Challenge2[i].feedbackType;
          PostObject.Explanation = this.lAnswerExplanation;

          PostString = JSON.stringify(PostObject);

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
      }
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

</style>
