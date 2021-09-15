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
                <template v-if="Object.BeforeWord==='Yes'">
                  <td class="w-1/3 lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                    <div class="questionwords">
                      <span class="answer"> {{ Object.UserAnswer1 }} </span>
                    </div>
                  </td>
                  <td v-if="Object.MorfeemList2" class="w-1/3 lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                    <div class="questionwords">
                      <span class="answer"> {{ Object.UserAnswer2 }} </span>
                    </div>
                  </td>
                </template>
                <td class="w-1/3 lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                  <div class="questionwords">
                    <span>
                      {{ Object.word }}
                    </span>
                  </div>
                </td>
                <template v-if="Object.BeforeWord==='No'">
                  <td class="w-1/3 lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                    <div class="questionwords">
                      <span class="answer"> {{ Object.UserAnswer1 }} </span>
                    </div>
                  </td>
                  <td v-if="Object.MorfeemList2" class="w-1/3 lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                    <div class="questionwords">
                      <span class="answer"> {{ Object.UserAnswer2 }} </span>
                    </div>
                  </td>
                </template>
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
          </div>
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
      `${this.$config.baseURL}/ChallengeQuestionsV01?ChallengeID=${ChallengeID}`
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
          QuestionObjectList[i].correctAnswer2 = -1;
          QuestionObjectList[i].correctAnswer1 = -1;
          const tempAnswer = QuestionObjectList[i].studentAnswer.split('-');
          const dataarray1 = QuestionObjectList[i].MorfeemList.split(";");
          if(tempAnswer.length > 1) {
            QuestionObjectList[i].UserAnswer1 = dataarray1[tempAnswer[0]].replace('*', '');
          }
          if(QuestionObjectList[i].MorfeemList2) {
            const dataarray3 = QuestionObjectList[i].MorfeemList2.split(";");
            QuestionObjectList[i].UserAnswer2 = dataarray3[tempAnswer[1]].replace('*', '');
          } else {
            QuestionObjectList[i].UserAnswer2 = '';
          }
          QuestionObjectList[i].answerCorrect = false;
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
    font-size: 14px;
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
