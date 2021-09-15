<template>
  <div class="align-top" v-if="$fetchState.pending">Fetching lessons...</div>
  <div class="align-top" v-else-if="$fetchState.error">An error occurred :(</div>
  <div v-else>
      <div class="relative ml-20 mt-10 overflow-x-auto">
        <table class="border-collapse w-full">
          <thead/>
          <tbody>
            <div v-for="(Object, ObjIndex) in Challenge2" :key="Object.id">
              <tr class="bg-white w-full lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                <td class="w-1/3 lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                  <div class="questionwords">
                    <span>
                      {{ Object.Morfeem1 }}
                    </span>
                    <p> &nbsp; </p>
                    <template  v-if="Object.answer1">
                      <span class="answer"> {{ Object.UserAnswer1 }} </span>
                    </template>
                  </div>
                </td>
                <td class="w-1/3 lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                  <div class="questionwords">
                    <span>
                      {{ Object.Morfeem2 }}
                    </span>
                    <p> &nbsp; </p>
                    <template v-if="Object.answer2">
                      <span class="answer"> {{ Object.UserAnswer2 }} </span>
                    </template>
                  </div>
                </td>
                <td class="w-1/3 lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                  <div v-if="Object.Morfeem3" class="questionwords">
                    <span>
                      {{ Object.Morfeem3 }}
                    </span>
                    <p> &nbsp; </p>
                    <template v-if="Object.answer3">
                      <span class="answer"> {{ Object.UserAnswer3 }} </span>
                    </template>
                  </div>
                </td>
                <td>

                </td>
            </tr>
          </div>
          <tr>
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
      `${this.$config.baseURL}/ChallengeQuestionsK03?ChallengeID=${ChallengeID}`
    ).then(res => res.json())
  },
  methods:  {
    forceRerender() {
      this.ResultKey += 1;
    },
    JSONtoObj()  {
      var QuestionObjectList = [];
      for (var i = 0; i < this.Challenge1.LearningQuestions.length; i++) {
          QuestionObjectList.push(this.Challenge1.LearningQuestions[i]);
          const strdata = QuestionObjectList[i].studentAnswer.split("-");
          QuestionObjectList[i].UserAnswer1 = strdata[0];
          QuestionObjectList[i].UserAnswer2 = strdata[1];
          QuestionObjectList[i].UserAnswer3 = strdata[2];
      }
      this.TotalQuestions = this.Challenge1.LearningQuestions.length;

      return QuestionObjectList;
    },

  },

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
  .answer {
    color: blue;
    font-family: Lato;
    font-size: 14px;
    font-style: normal;
    font-weight: bold;
  }
</style>
