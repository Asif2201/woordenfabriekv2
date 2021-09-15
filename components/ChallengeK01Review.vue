<template>
  <div class="align-top" v-if="$fetchState.pending">Fetching challenges...</div>
  <div class="align-top" v-else-if="$fetchState.error">An error occurred :(</div>
  <div v-else>
      <div class="relative ml-20 mt-10">
        <table class="table-auto w-full align-center">
          <thead/>
          <tbody>
            <div v-for="(Object, ObjIndex) in Challenge2" :key="Object.id">
              <tr>
                <td class="w-2/3">
                  <div class="questionwords">
                    <span v-for="(char, index) in Object.studentAnswer">
                      {{ char }}
                    </span>
                  </div>
                </td>
                <td> &nbsp;  &nbsp; </td>
                <td> &nbsp;  &nbsp; </td>
                <td> &nbsp;  &nbsp; </td>
                <td> &nbsp;  &nbsp; </td>
                <td>
                  <div class="object-scale-down">
                    <p v-show="Object.answerCorrect" class="text-blue">
                      <img src="~/assets/correct.jpeg" />
                    </p>
                    <p v-show="!Object.answerCorrect" class="text-blue">
                      <img src="~/assets/incorrect.jpeg" />
                    </p>
                  </div>
                </td>
            </tr>
            <tr>
              <td> &nbsp; </td>
              <td> &nbsp; </td>
              <td> &nbsp; </td>
              <td> &nbsp; </td>
              <td> &nbsp; </td>
              <td> &nbsp; </td>
            </tr>

          </div>
          <tr>
              <td> &nbsp; </td>
              <td> &nbsp; </td>
              <td> &nbsp; </td>
              <td> &nbsp; </td>
              <td> &nbsp; </td>
              <td> &nbsp; </td>
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
      `${this.$config.baseURL}/ChallengeQuestions?ChallengeID=${ChallengeID}`
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
    color: var(--grey);
    font-family: var(--font-family-lato);
    font-size: var(--font-size-l);
    font-style: normal;
    font-weight: 700;
  }
  .right {
    margin-right: 20px;
    float: right;
  }
</style>
