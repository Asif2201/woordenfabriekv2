<template>
  <div class="align-top" v-if="$fetchState.pending">Fetching challenges...</div>
  <div class="align-top" v-else-if="$fetchState.error">An error occurred :(</div>
  <div v-else>
      <div class="relative ml-20 mt-10">
        <table class="K01_Table" key="OkKey">
          <thead/>
          <tbody>
            <template v-for="(Object, ObjIndex) in Challenge2">
              <tr>
                <td>
                  <div class="questionwords">
                      {{ Object.studentAnswer }}
                  </div>
                </td>
                <td>
                  <div>
                    <p v-show="Object.answerCorrect" class="text-blue">
                      <img src="~/assets/correct.png" width="40" height="40" />
                    </p>
                    <p v-show="!Object.answerCorrect" class="text-blue">
                      <img src="~/assets/incorrect.png" width="40" height="40" />
                    </p>
                  </div>
                </td>
                <td>
                  <div class="feedback">
                      {{ Object.feedback }}
                  </div>
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
    }
  },
  watch: {
    Challenge1()  {
      this.Challenge2 = this.JSONtoObj();
    }
  },
  async fetch() {
    const ChallengeID = this._props.Challenge;
      this.Challenge1 = await fetch(
      `${this.$config.baseURL}/ChallengeQuestionsAll?challengeType=K1&challengelevelid=\'${ChallengeID}\'`
    ).then(res => res.json())
  },
  methods:  {
    splitWord(word)  {
      if (word) {
        return word.split('');
      } else  {
        return '';
      }
    },
    forceRerender() {
      this.ResultKey += 1;
    },
    JSONtoObj()  {
      var QuestionObjectList = [];
      for (var i = 0; i < this.Challenge1.LearningQuestions.length; i++) {
          QuestionObjectList.push(this.Challenge1.LearningQuestions[i]);
          QuestionObjectList[i].word = this.splitWord(QuestionObjectList[i].word);
          if(QuestionObjectList[i].studentCorrect === 'Yes')  {
            QuestionObjectList[i].answerCorrect = true;
          }
          else  {
            QuestionObjectList[i].answerCorrect = false;

          }

      }
      this.TotalQuestions = this.Challenge1.LearningQuestions.length;
      return QuestionObjectList;
    },

  }

}
</script>
<style scoped>
  .questionwords {
    color: grey;
    font-family: lato;
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
  }
  .feedback {
    color: grey;
    font-family: lato;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
  }


  .K01_Table {
    width:80%;
    table-layout: fixed;
  }
  .K01_Table tr {
    height:  60px;
  }
   .K01_Table td {
    vertical-align:initial;
    width: 60px;
  }
  .K01_Table td:first-child {
    width: 500px;
    vertical-align: center;
  }

  .K01_Table td:last-child {
    width: 500px;
    vertical-align: top;

  }
</style>
