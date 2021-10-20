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
                      {{ Object.context }}
                    </div>
                </td>
                <template v-if="Object.BeforeWord==='Yes'">
                  <td class="w-1/3 lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                    <div class="questionwords">
                      <input class="text-base font-lato" v-model="Object.UserAnswer" />
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
                      <input class="text-base font-lato" v-model="Object.UserAnswer" />
                    </div>
                  </td>
                </template>
                <td v-show="ShowResult" :key="ResultKey">

                </td>
            </tr>
          </div>
          <tr>

              <td>
                <KlaarButton @challengeCompleted="challengeCompleted()" />
              </td>
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
      `${this.$config.baseURL}/ChallengeQuestionsAll?challengeType=V02&challengelevelid=\'${ChallengeID}\'`
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
          QuestionObjectList[i].UserAnswer = '';
          QuestionObjectList[i].answerConfirmed = false;
          QuestionObjectList[i].answerCorrect = false;
      }
      this.TotalQuestions = this.Challenge1.LearningQuestions.length;

      return QuestionObjectList;
    },

    challengeCompleted: function() {
      var PostString = '';
      var newPropertyID = '';
      var PostObject = {};
      for (var i = 0; i < this.Challenge2.length; i++) {
        this.EvaluateAnswer(i);
        PostObject = {};

        PostObject.id = this.Challenge2[i].id;
        PostObject.studentID = 'S1';
        PostObject.LessonID = this.LessonID;
        PostObject.LevelID = this.Level;

        newPropertyID = this.Challenge2[i].UserAnswer;
        PostObject.userAnswer = newPropertyID;
        PostObject.answerCorrect = this.Challenge2[i].answerCorrect ? 'Yes' : 'No';
        PostObject.feedbackType = this.Challenge2[i].feedbackType;
        PostObject.Explanation = 'No Explanation requested';

        PostString = JSON.stringify(PostObject);

        console.log(PostString);

        this.$axios.post('/UpdateStudentAnswers', PostString, {headers: {
          'content-type': 'application/json',},})
        .then((response) => {
          console.log('Ok');
        }, (error) => {
          console.log(error);
        });
        PostString = '';
      }

      if(this.Challenge2[0].feedbackType === 2) {
        this.ShowResult = true;
      }
      else {
        this.ShowResult = true;
      }
      this.forceRerender();
      this.$emit('challenge-completed', this.TotalCorrect, this.TotalQuestions);
    },
    EvaluateAnswer: function(index)  {
      this.Challenge2[index].answerCorrect = true;
      this.Challenge2[index].answer = this.Challenge2[index].UserAnswer.trim();
      this.Challenge2[index].answer = this.Challenge2[index].UserAnswer.toLowerCase();
      this.Challenge2[index].UserAnswer = this.Challenge2[index].UserAnswer.trim();
      this.Challenge2[index].UserAnswer = this.Challenge2[index].UserAnswer.toLowerCase();
      if(this.Challenge2[index].answer !== this.Challenge2[index].UserAnswer)  {
        this.Challenge2[index].answerCorrect = false;
      }
    },
  },

}
</script>
<style scoped>
  .questionwords {
    color: black;
    font-family: var(--font-family-lato);
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
  }
</style>
