<template>
  <div  v-if="$fetchState.pending">Fetching lessons...</div>
  <div  v-else-if="$fetchState.error">An error occurred :(</div>
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
                      <input class="text-base font-lato" v-model="Object.UserAnswer1" />
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
                      <input  class="text-base font-lato" v-model="Object.UserAnswer2" />
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
                      <input class="text-base font-lato" v-model="Object.UserAnswer3" />
                    </template>
                  </div>
                </td>
                <td v-show="ShowResult" :key="ResultKey">

                </td>
            </tr>
          </div>
          <tr class="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
              <td> &nbsp; </td>
              <td> &nbsp; </td>
              <td> &nbsp; </td>
              <td>
                  <KlaarButton @challengeCompleted="challengeCompleted()" />

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
    const StudentID = this.$store.state.Lessons[this.$store.state.currentDisplayLesson].studentid
    const  URLAPI =`${this.$config.baseURL}/ChallengeQuestionsAll?challengeType=K03&challengelevelid=\'${ChallengeID}\'&Student_ID=\'${StudentID}\'`

    console.log(URLAPI);
    this.Challenge1 = await fetch(
      URLAPI
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
          QuestionObjectList[i].UserAnswer1 = '';
          QuestionObjectList[i].UserAnswer2 = '';
          QuestionObjectList[i].UserAnswer3 = '';
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

        newPropertyID = this.Challenge2[i].UserAnswer1 + '-' + this.Challenge2[i].UserAnswer2 + '-' + this.Challenge2[i].UserAnswer3;
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
      console.log(this.Challenge2[index]);
      if(this.Challenge2[index].answer1 !== this.Challenge2[index].UserAnswer1)  {
        this.Challenge2[index].answerCorrect = false;
      }
      if(this.Challenge2[index].answer2 !== this.Challenge2[index].UserAnswer2)  {
        this.Challenge2[index].answerCorrect = false;
      }
      if(this.Challenge2[index].answer3 !== this.Challenge2[index].UserAnswer3)  {
        this.Challenge2[index].answerCorrect = false;
      }
      if(this.Challenge2[index].answerCorrect === true) {
        this.TotalCorrect += 1;
      }

    },
  },

}
</script>
<style scoped>

</style>
