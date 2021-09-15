<template>
  <div class="align-top" v-if="$fetchState.pending">Fetching lessons...</div>
  <div class="align-top" v-else-if="$fetchState.error">An error occurred :(</div>
  <div v-else>
      <div class="relative ml-20 mt-10">
        <table class="table-auto w-full align-center">
          <thead>
            <tr>
              <th class="w-1/5 ..."></th>
              <th class="w-3/5 ..."></th>
              <th class="w-1/5 ..."></th>
            </tr>
          </thead>
          <tbody class="border-black">
            <template v-for="(Object, ObjIndex) in Challenge2">
              <tr>
                <td>
                  &nbsp;
                </td>
                <td>
                  <span class="paragraphheading">
                        {{ Object.ParagraphHeading }}
                  </span>
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
                <td>
                  &nbsp;
                </td>
              </tr>
              <tr>
                <td>
                  &nbsp;
                </td>
                <td>
                  <template v-for="(char, index) in Object.paragraphwords">
                    <span :class="{ questionwords : !forceRenderVariable[ObjIndex][index], questionwordsClicked : forceRenderVariable[ObjIndex][index] }" >
                        <span>
                          {{ char }}
                        </span>
                    </span>
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
                <td>
                  &nbsp;
                </td>
              </tr>
              <tr>
                <td>
                  &nbsp;
                </td>
                <td class = "questionwords">
                  Your explanation
                </td>
                <td>
                  &nbsp;
                </td>
              </tr>

              <tr>
                <td>
                  &nbsp;
                </td>
                <td class="questionwords">
                  <br>
                  <p> {{ lAnswerExplanation }} </p>
                </td>
                <td>
                  &nbsp;
              </td>
              </tr>
          </template>
            <tr>
              <td>
                  &nbsp;
                </td>
              <td>
                &nbsp;
              </td>
              <td>
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

    this.Challenge1 = await fetch(
      `${this.$config.baseURL}/ChallengeQuestionsH02?ChallengeID=${ChallengeID}`
    ).then(res => res.json())
  },
  methods:  {
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
        QuestionObjectList[i].paragraphwords = QuestionObjectList[i].paragraph.split(' ');
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
    font-family: lato;
    font-size: 14px;

  }
</style>
