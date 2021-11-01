<template>
  <div class="align-top" v-if="$fetchState.pending">Fetching lessons...</div>
  <div class="align-top" v-else-if="$fetchState.error">An error occurred :(</div>
  <div v-else>
    <div class="relative ml-20 mt-10">
        <table class="V01_Table" key="OkKey">
          <thead/>
          <tbody>
            <template v-for="(Object, ObjIndex) in Challenge2">
              <tr>
                <td>
                  <span class="V01Context">
                    {{ Object.context}}
                  </span>
                <td>
                <td>
                  <div v-if="Object.MorfeemList !== null" :class="{ word2: getClass(0, Object.studentAnswerList[0],2), word3: getClass(0, Object.studentAnswerList[0],3) }">
                      {{ Object.MorfeemList.split(';')[Object.studentAnswerList[0]].replaceAll('*', '') }} <br>
                  </div>
                  <span v-if="!getClass(0,Object.studentAnswerList[0],2)" class="word2">
                        {{ Object.correctAnswer1 }}
                  </span>

                </td>
               <td>
                  <div class="questionwords">
                    <span>
                      {{ Object.word }}
                    </span>
                  </div>
                </td>
                <td>
                  <div v-if="Object.MorfeemList2 !== null" :class="{ word2: getClass(1, Object.studentAnswerList[1],2), word3: getClass(1, Object.studentAnswerList[1],3) }">
                      {{ Object.MorfeemList2.split(';')[Object.studentAnswerList[1]].replaceAll('*', '') }} <br>
                  </div>
                  <span v-if="!getClass(1,Object.studentAnswerList[1],2)" class="word2">
                        {{ Object.correctAnswer2 }}
                      </span>
                </td>
                <td>
                  <div v-if="Object.MorfeemList3 !== null" :class="{ word2: getClass(2, Object.studentAnswerList[2],2), word3: getClass(2, Object.studentAnswerList[2],3) }">
                      {{ Object.MorfeemList3.split(';')[Object.studentAnswerList[2]].replaceAll('*', '') }} <br>
                    </div>
                    <span v-if="!getClass(2,Object.studentAnswerList[2],2)" class="word2">
                        {{ Object.correctAnswer3 }}
                      </span>
                </td>
            </tr>
            <tr>
              <td> &nbsp;  &nbsp; </td>
              <td> &nbsp;  &nbsp; </td>
              <td> &nbsp;  &nbsp; </td>
              <td colspan="2">
                <br>
                  <span class="V01explanation">
                    {{ Object.AnswerExplanation }}
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
      knipWords: [],
      ResultKey: 0,
      TotalCorrect: 0,
      TotalQuestions: 0,
      forceRenderVariable: [],
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
    const  URLAPI =`${this.$config.baseURL}/ChallengeQuestionsAll?challengeType=V01&challengelevelid=\'${ChallengeID}\'&Student_ID=\'${StudentID}\'`
    const  URLAPI1 =`${this.$config.baseURL}/ChallengeQuestionsAll?challengeType=V01&challengelevelid=\'${ChallengeID}\'&Student_ID=\''`
    const headers = { "cache-control": "no-store, max-age=0" }
    const resp1 = await this.$axios.get(URLAPI1, { headers });
    const resp = await this.$axios.get(URLAPI, { headers });
    this.Challenge1 = await resp.data;
  },
  methods:  {
    forceRerender() {
      this.ResultKey += 1;
    },
    getClass(QuestionIndex, WordIndex, classindex)  {
      switch (classindex)  {
        case 2:
          if(this.forceRenderVariable[QuestionIndex][WordIndex])  {
            return true;
          }
          else  {
            return false;
          }
        case 3:
          if(!this.forceRenderVariable[QuestionIndex][WordIndex])  {
            return true;
          }
          else  {
            return false;
          }
      }
    },
    JSONtoObj()  {
      var QuestionObjectList = [];
      var x = [];
      var j =0;
      for (var i = 0; i < this.Challenge1.LearningQuestions.length; i++) {
          QuestionObjectList.push(this.Challenge1.LearningQuestions[i]);
          QuestionObjectList[i].studentAnswerList = QuestionObjectList[i].studentAnswer.split(';');
          this.forceRenderVariable.push([]);
          this.forceRenderVariable.push([]);
          this.forceRenderVariable.push([]);
          if(QuestionObjectList[i].MorfeemList != null) {
            x = QuestionObjectList[i].MorfeemList.split(';');
            for(j=0;j < x.length;j++)  {
              if(x[j].includes('*'))  {
                QuestionObjectList[i].correctAnswer1 = x[j];
              }
              if(x[j].includes('*') && QuestionObjectList[i].studentAnswerList[0] == j)  {
                this.forceRenderVariable[0].push(true);
              }
              else  {
                this.forceRenderVariable[0].push(false);
              }
            }
          }
          if(QuestionObjectList[i].MorfeemList2 != null) {
            x = QuestionObjectList[i].MorfeemList2.split(';');
            for( j=0;j < x.length;j++)  {
              if(x[j].includes('*'))  {
                QuestionObjectList[i].correctAnswer2 = x[j];
              }
              if(x[j].includes('*') && QuestionObjectList[i].studentAnswerList[1] == j)  {
                this.forceRenderVariable[1].push(true);
              }
              else  {
                this.forceRenderVariable[1].push(false);
              }
            }
          }
          if(QuestionObjectList[i].MorfeemList3 != null) {
            x = QuestionObjectList[i].MorfeemList3.split(';');
            for(j=0;j < x.length;j++)  {
              if(x[j].includes('*'))  {
                QuestionObjectList[i].correctAnswer3 = x[j];
              }
              if(x[j].includes('*') && QuestionObjectList[i].studentAnswerList[2] == j)  {
                this.forceRenderVariable[2].push(true);
              }
              else  {
                this.forceRenderVariable[2].push(false);
              }
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
  .questionwords {
    color: grey;
    font-family: lato;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
  }
  .V01explanation {
    color: blue;
    font-family: lato;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
  }
   .V01_Table {
    width:70%;
    table-layout: fixed;
  }
  .V01_Table tr {
    height:  50px;
  }
  .V01_Table td {
    width: 200px;
  }
  .V01_Table td:nth-child(1) {
    width: 400px;
  }

.V01Context {
    color: black;
    font-family: lato;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
  }

  .word1 {
    color: grey;
    font-family: lato;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
  }
  .word2 {
    color: green;
    font-family: lato;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    text-decoration:  none;
  }
  .word3 {
    color: red;
    font-family: lato;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    text-decoration: line-through;
  }
</style>
