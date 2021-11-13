<template>
  <div class="align-top" v-if="$fetchState.pending">Fetching lessons...</div>
  <div class="align-top" v-else-if="$fetchState.error">An error occurred :(</div>
  <div v-else>
      <div class="S01Container">
        <table class="S01Table">
          <tbody>
            <template v-for="(Object, ObjIndex) in Challenge2">
              <tr>
                <td>
                  <span class="explanation">
                    {{ Object.Explanation }}
                  </span>
                </td>
                <td>
                  <template v-for="(char, index) in Object.word">
                    <span :class="{ word1: getClass(ObjIndex, index, 1), word2: getClass(ObjIndex, index,2), word3: getClass(ObjIndex, index,3) }" >
                      &nbsp; {{   char }} &nbsp;
                    </span>
                  </template>
                </td>

              </tr>
              <tr>
                <td> &nbsp;  &nbsp; </td>
                  <td>
                    <span class="feedback">
                    {{ Object.feedback }}
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
    const  URLAPI =`${this.$config.baseURL}/ChallengeQuestionsAll?challengeType=S01&challengelevelid=\'${ChallengeID}\'&Student_ID=\'${StudentID}\'`
    const  URLAPI1 =`${this.$config.baseURL}/ChallengeQuestionsAll?challengeType=S01&challengelevelid=\'${ChallengeID}\'&Student_ID=\''`
    const headers = { "cache-control": "no-store, max-age=0" }
    const resp1 = await this.$axios.get(URLAPI1, { headers });
    const resp = await this.$axios.get(URLAPI, { headers });
    this.Challenge1 = await resp.data;
  },
  methods:  {
    getClass(QuestionIndex, WordIndex, classindex)  {
      switch (classindex)  {
        case 1:
          if(!this.forceRenderVariable[QuestionIndex][WordIndex])  {
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
        word = word.replaceAll('[', '');
        word = word.replaceAll(']', '');
        return word.split(';');
      } else  {
        return '';
      }
    },
    JSONtoObj()  {
      var QuestionObjectList = [];
      for (var i = 0; i < this.Challenge1.LearningQuestions.length; i++) {
        QuestionObjectList.push(this.Challenge1.LearningQuestions[i]);
        QuestionObjectList[i].word = this.splitWord(QuestionObjectList[i].MorfemeList.replaceAll(' ', ''));
        QuestionObjectList[i].UserAnswerList = this.splitWord(QuestionObjectList[i].studentAnswer);
        this.forceRenderVariable.push([]);
        for(var j=0;j < QuestionObjectList[i].word.length;j++)  {
          if(QuestionObjectList[i].UserAnswerList.includes(QuestionObjectList[i].word[j]))  {
            this.forceRenderVariable[i].push(true);
          }
          else  {
            this.forceRenderVariable[i].push(false);
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
