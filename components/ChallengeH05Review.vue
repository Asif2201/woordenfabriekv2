<template>
  <div  v-if="$fetchState.pending">Fetching lessons...</div>
  <div  v-else-if="$fetchState.error">An error occurred :(</div>
  <div v-else>
      <div class="H05Container">
        <table class="H05Table">
          <tbody>
            <template v-for="(Object, ObjIndex) in Challenge2">
              <tr>
                <template v-for="(char, index) in Object.word">
                  <td :key="forceRenderVariable[ObjIndex][index]">
                    <div :class="{ word1: getClass(ObjIndex, index, 1), word2: getClass(ObjIndex, index,2), word3: getClass(ObjIndex, index,3) }" >
                        <span>
                          {{ char }}
                        </span>
                    </div>
                  </td>
                </template>
                <td>
                  <div>
                    <p v-show="Object.studentCorrect=='Yes'">
                      <img src="~/assets/correct.png" width="40" height="40" />
                    </p>
                    <p v-show="Object.studentCorrect=='No'">
                      <img src="~/assets/incorrect.png" width="40" height="40" />
                    </p>
                  </div>
                </td>
            </tr>
            <tr>
              <td>
                &nbsp;
              </td>
              <td>
                  <span class="word1" v-html="Object.AnswerExplanation">
                    {{ Object.AnswerExplanation }}
                  </span>
              </td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td colspan="4">
                  <p class="word2">
                    {{ Object.answerlist }}
                  </p>
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
    const  URLAPI =`${this.$config.baseURL}/ChallengeQuestionsAll?challengeType=H05&challengelevelid=\'${ChallengeID}\'&Student_ID=\'${StudentID}\'`
    const  URLAPI1 =`${this.$config.baseURL}/ChallengeQuestionsAll?challengeType=H05&challengelevelid=\'${ChallengeID}\'&Student_ID=\''`
    const headers = { "cache-control": "no-store, max-age=0" }
    console.log(URLAPI);
    const resp1 = await this.$axios.get(URLAPI1, { headers });
    const resp = await this.$axios.get(URLAPI, { headers });
    this.Challenge1 = await resp.data;
  },
  methods:  {
    getClass(QuestionIndex, WordIndex, classindex)  {
      switch (classindex)  {
        case 1:
          if(!this.forceRenderVariable[QuestionIndex][WordIndex] && this.Challenge2[QuestionIndex].correctAnswer != WordIndex)  {
            return true;
          }
          else  {
            return false;
          }
        case 2:
          if(this.forceRenderVariable[QuestionIndex][WordIndex] && this.Challenge2[QuestionIndex].studentCorrect=='Yes')  {
            return true;
          }
          else  {
            return false;
          }
        case 3:
          if(this.forceRenderVariable[QuestionIndex][WordIndex] && this.Challenge2[QuestionIndex].studentCorrect=='No')  {
            return true;
          }
          else  {
            return false;
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
        QuestionObjectList[i].word = this.splitWord(QuestionObjectList[i].wordlist);
        QuestionObjectList[i].UserAnswerList = QuestionObjectList[i].studentAnswer;
        this.forceRenderVariable.push([]);
        for(var j=0;j < QuestionObjectList[i].word.length;j++)  {
          if(QuestionObjectList[i].word[j] === QuestionObjectList[i].UserAnswerList)  {
            this.forceRenderVariable[i].push(true);
          }
          else  {
            this.forceRenderVariable[i].push(false);
          }
          if(QuestionObjectList[i].word[j].includes('*')) {
            QuestionObjectList[i].correctAnswer = j;
            QuestionObjectList[i].word[j] = QuestionObjectList[i].word[j].replaceAll('*', '');
          }
        }
      }
      this.TotalQuestions = this.Challenge1.LearningQuestions.length;
      return QuestionObjectList;
    },

  },

}
</script>
<style scoped>


</style>
