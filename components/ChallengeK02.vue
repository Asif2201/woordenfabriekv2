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
                    <template class="questionwords" v-if="Object.answer1">
                      <dropdown :data="convertToDropDownData(Object.answer1,1, ObjIndex)" @AnswerSelected="answerSelected(ObjIndex, $event,1)" />
                    </template>
                  </div>
                </td>
                <td class="w-1/3 lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                  <div class="questionwords">
                    <span>
                      {{ Object.Morfeem2 }}
                    </span>
                    <template v-if="Object.answer2" class="questionwords">
                      <dropdown :data="convertToDropDownData(Object.answer2,2, ObjIndex)" @AnswerSelected="answerSelected(ObjIndex, $event,2)" />
                    </template>
                  </div>
                </td>
                <td class="w-1/3 lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                  <div v-if="Object.Morfeem3" class="questionwords">
                    <span>
                      {{ Object.Morfeem3 }}
                    </span>
                    <template v-if="Object.answer3" class="questionwords">
                      <dropdown :data="convertToDropDownData(Object.answer3,3, ObjIndex)" @AnswerSelected="answerSelected(ObjIndex, $event,3)" />
                    </template>
                  </div>
                </td>
                <td v-show="ShowResult" :key="ResultKey">
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
          <tr class="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
              <td> &nbsp; </td>
              <td> &nbsp; </td>
              <td> &nbsp; </td>
              <td>
                <div>
                  <button v-on:click="challengeCompleted()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold border border-blue-700 rounded">
                    Klaar
                  </button>
                 </div>
              </td>
          </tr>
        </tbody>
        </table>

      </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import dropdown from './dropdown.vue';

export default {
  components: { dropdown },
  props:  [
    'Challenge',
    'Level',
    'LessonID'
  ],
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
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
      `${this.$config.baseURL}/v1/ChallengeQuestionsK02?ChallengeID=${ChallengeID}`
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
          QuestionObjectList[i].correctAnswer3 = -1;
          QuestionObjectList[i].correctAnswer2 = -1;
          QuestionObjectList[i].correctAnswer1 = -1;
          QuestionObjectList[i].UserAnswer1 = 0;
          QuestionObjectList[i].UserAnswer2 = 0;
          if(QuestionObjectList[i].answer3) {
            QuestionObjectList[i].UserAnswer3 = 0;
          } else {
            QuestionObjectList[i].UserAnswer3 = -1;
          }
          QuestionObjectList[i].answerConfirmed = false;
          QuestionObjectList[i].answerCorrect = false;
      }
      this.TotalQuestions = this.Challenge1.LearningQuestions.length;

      return QuestionObjectList;
    },
    answerSelected(Index, answer, WhichOne) {
      if(WhichOne === 1)  {
        this.Challenge2[Index].UserAnswer1 = answer;
      }
      else if(WhichOne === 2) {
        this.Challenge2[Index].UserAnswer2 = answer;
      }
      else {
        this.Challenge2[Index].UserAnswer3 = answer;

      }
    },
    convertToDropDownData(strData, whichOne, Index) {

      var DropDownOptions = [];
      var DropDownOption = new Object();
      const dataarray = strData.split(";");
      for(var i=0; i < dataarray.length;i++)  {
        if(dataarray[i].indexOf('*') >= 0) {
          if(whichOne === 1)  {
            this.Challenge2[Index].correctAnswer1 = i;
          }
          else if(whichOne === 2) {
            this.Challenge2[Index].correctAnswer2 = i;
          }
          else  {
            this.Challenge2[Index].correctAnswer3 = i;

          }
          DropDownOption.id = i;
          DropDownOption.name = dataarray[i].replace('*', '');
          DropDownOptions.push(DropDownOption);
          DropDownOption = new Object();
        }
        else  {
          DropDownOption.id = i;
          DropDownOption.name = dataarray[i];
          DropDownOptions.push(DropDownOption);
          DropDownOption = new Object();
        }
      }

      return DropDownOptions;
    },

    challengeCompleted: function() {
      var PostString = '';
      var newPropertyID = '';
      for (var i = 0; i < this.Challenge2.length; i++) {
        this.EvaluateAnswer(i);

        PostString = '{ '
        newPropertyID = this.Challenge2[i].id;
        PostString += `"'` + newPropertyID + `'"  : "id",`;
        PostString += `"'S1'" : "studentID",`;
        newPropertyID = this.LessonID + `L`;
        PostString += `"'` + newPropertyID + `'": "LessonID",`;
        newPropertyID = this.Level;
        PostString += `"'` + newPropertyID + `'": "LevelID",`;
        newPropertyID = this.Challenge2[i].UserAnswer1 + '-' + this.Challenge2[i].UserAnswer2;
        if(this.Challenge2[i].answer3)  {
          newPropertyID += '-' + this.Challenge2[i].UserAnswer3;
        }
        PostString += `"'` + newPropertyID + `'": "userAnswer",`;
        newPropertyID = this.Challenge2[i].answerCorrect ? 'Yes' : 'No';
        PostString += `"'` + newPropertyID + `'": "answerCorrect" }`;
        this.$axios.post('/UpdateStudentAnswers', PostString, {headers: {
          'content-type': 'application/json',},})
        .then((response) => {
          console.log('Ok');
        }, (error) => {
          console.log(error);
        });
        PostString = '';
      }

      this.ShowResult = true;
      this.forceRerender();
      this.$emit('challenge-completed', this.TotalCorrect, this.TotalQuestions);
    },
    EvaluateAnswer: function(index)  {
      this.Challenge2[index].answerCorrect = true;
      if(this.Challenge2[index].correctAnswer1 !== this.Challenge2[index].UserAnswer1)  {
        this.Challenge2[index].answerCorrect = false;
      }
      if(this.Challenge2[index].correctAnswer2 !== this.Challenge2[index].UserAnswer2)  {
        this.Challenge2[index].answerCorrect = false;
      }
      if(this.Challenge2[index].answer3)  {
        if(this.Challenge2[index].correctAnswer3 !== this.Challenge2[index].UserAnswer3)  {
          this.Challenge2[index].answerCorrect = false;
        }
      }
      if(this.Challenge2[index].answerCorrect === true) {
        this.TotalCorrect += 1;
      }

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
</style>
