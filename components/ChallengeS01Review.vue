<template>
  <div class="align-top" v-if="$fetchState.pending">Fetching lessons...</div>
  <div class="align-top" v-else-if="$fetchState.error">An error occurred :(</div>
  <div v-else>
      <div class="relative ml-20 mt-10">
        <table class="table-fixed w-full align-center">
            <thead>
            <tr>
              <th class="w-1/5 ..."></th>
              <th class="w-3/5"></th>
              <th class="w-1/5 ..."></th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(Object, ObjIndex) in Challenge2">
              <tr>
                <td> &nbsp;  &nbsp; </td>
                  <td>
                    <template v-for="(char, index) in Object.word">
                      <span :class="{ questionwords : !forceRenderVariable[ObjIndex][index], questionwordsClicked : forceRenderVariable[ObjIndex][index] }" >
                        {{  '      ' + char + '      '}}
                      </span>
                    </template>
                  </td>
                  <td> &nbsp;  &nbsp; </td>
              </tr>
              <tr>
                <td> &nbsp;  &nbsp; </td>
                  <td>
                    <template v-for="(char, index) in Object.UserAnswerList">
                      <span>
                        {{ char + '  |  ' }}
                      </span>
                    </template>
                  </td>
                  <td> &nbsp;  &nbsp; </td>
            </tr>
            <tr>
              <td> &nbsp; </td>
              <td> &nbsp; </td>
              <td> &nbsp; </td>
            </tr>
          </template>
          <tr>
              <td> &nbsp; </td>
              <td> &nbsp; </td>
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
      `${this.$config.baseURL}/ChallengeQuestionsS01?ChallengeID=${ChallengeID}`
    ).then(res => res.json())
  },
  methods:  {

    splitWord(word)  {
      console.log(word);
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
        QuestionObjectList[i].word = this.splitWord(QuestionObjectList[i].MorfemeList);
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
      console.log(QuestionObjectList);
      return QuestionObjectList;
    },
  },

}
</script>
<style scoped>
  .questionwords {
    color: grey;
    font-family: var(--font-family-lato);
    font-size: var(--font-size-l);
    font-style: normal;
    font-weight: 700;
  }
  .questionwordsClicked {
    color: green;
    font-family: var(--font-family-lato);
    font-size: var(--font-size-l);
    font-style: normal;
    font-weight: 700;
  }
  th, td {
    padding: 10px;
  }
</style>
