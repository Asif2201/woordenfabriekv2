<template>
  <div  v-if="$fetchState.pending">Fetching lessons...</div>
  <div  v-else-if="$fetchState.error">An error occurred :(</div>
  <div v-else>
      <div class="H02Container">
        <table class="H02Table">
          <tbody>
            <template v-for="(Object, ObjIndex) in Challenge2">
              <tr>

                <td>
                  <span class="paragraphheading">
                        {{ Object.ParagraphHeading }}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <template v-for="(char, index) in Object.paragraphwords">
                    <span :class="{ correctAnswer: isCorrect(ObjIndex, index), questionwords : !forceRenderVariable[ObjIndex][index], questionwordsClicked : forceRenderVariable[ObjIndex][index] }" >
                        <span>
                          {{ char }}
                        </span>
                    </span>
                  </template>
                </td>
              </tr>


              <tr>

                <td class="questionwords">
                  <br>
                  <p> {{ Object.AnswerExplanation }} </p>
                </td>

              </tr>
              <tr>

                <td>
                   <span class="referenceanswer">
                    Antwoordmodel:
                  </span>
                  <br>
                  <span class="referenceanswer" v-html="Object.feedback">
                  </span>
                </td>
              </tr>
          </template>

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
  errorCaptured: function(err) {
    console.log('Error caught: ', err.message);
    this.fetch();
    return false;
  },
  async fetch() {
    const ChallengeID = this._props.Challenge;
    const StudentID = this.$store.state.Lessons[this.$store.state.currentDisplayLesson].studentid
    const  URLAPI =`${this.$config.baseURL}/ChallengeQuestionsAll?challengeType=H02&challengelevelid=\'${ChallengeID}\'&Student_ID=\'${StudentID}\'`
    const  URLAPI1 =`${this.$config.baseURL}/ChallengeQuestionsAll?challengeType=H02&challengelevelid=\'${ChallengeID}\'&Student_ID=\''`
    const headers = { "cache-control": "no-store, max-age=0" }
    console.log(URLAPI);
    const resp1 = await this.$axios.get(URLAPI1, { headers });
    const resp = await this.$axios.get(URLAPI, { headers });
    this.Challenge1 = await resp.data;
  },
  methods:  {
    splitWord(word)  {
      if (word) {
        word = word.replaceAll('[', '');
        word = word.replaceAll(']', '');
        return word.split(' ');
      } else  {
        return '';
      }
    },
    JSONtoObj()  {
      var QuestionObjectList = [];
      for (var i = 0; i < this.Challenge1.LearningQuestions.length; i++) {
        QuestionObjectList.push(this.Challenge1.LearningQuestions[i]);
        QuestionObjectList[i].paragraphwords = this.splitWord(QuestionObjectList[i].paragraph);
        QuestionObjectList[i].UserAnswerList = QuestionObjectList[i].studentAnswer;
        this.forceRenderVariable.push([]);
        for(var j=0;j < QuestionObjectList[i].paragraphwords.length;j++)  {
          if(QuestionObjectList[i].UserAnswerList.includes(j))  {
            this.forceRenderVariable[i].push(true);
          }
          else  {
            this.forceRenderVariable[i].push(false);
          }
        }
        const checkCorrect = QuestionObjectList[i].paragraph.split(' ');
        for(j=0;j < checkCorrect.length;j++)  {
          if(checkCorrect[j].includes("[")) {
            QuestionObjectList[i].correctAnswer = j;
          }
        }
      }
      this.TotalQuestions = this.Challenge1.LearningQuestions.length;
      return QuestionObjectList;
    },

    isCorrect(QuestionIndex, WordIndex) {
      if(this.Challenge2[QuestionIndex].correctAnswer == WordIndex)  {
        return true;
      } else  {
        return false;
      }
    }

  },

}
</script>
<style scoped>



</style>
