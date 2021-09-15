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
                    <span v-for="(char, index) in Object.word" v-on:click="morphemeClick(ObjIndex, index, $event);">
                      {{ char }}
                    </span>
                  </div>
                </td>
                <td>
                  <div v-if="Object.answerConfirmed">
                    <button class="bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed">
                      OK
                    </button>
                  </div>
                  <div v-else class="">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" v-on:click="morphemeClickOk(ObjIndex)">
                      OK
                    </button>
                  </div>
                </td>
                <td> &nbsp;  &nbsp; </td>
                <td>
                  <div v-if="!Object.answerConfirmed" class="">
                    <button class="bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed">
                        Wis
                    </button>
                  </div>
                  <div v-else class="">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" v-on:click="morphemeClickWis(ObjIndex)">
                      Wis
                    </button>
                  </div>
                </td>
                <td> &nbsp;  &nbsp; </td>
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
          QuestionObjectList[i].answerConfirmed = false;
          QuestionObjectList[i].answerCorrect = false;
      }
      this.TotalQuestions = this.Challenge1.LearningQuestions.length;
      return QuestionObjectList;
    },
    morphemeClick: function(word, char, event) {
      if(this.Challenge2[word].word[char] !== '|')  {
        this.Challenge2[word].word.splice(char, 0, '|');
      }
    },
    morphemeClickOk: function(word, event) {
      this.Challenge2[word].answerConfirmed = true;
      this.AllquestionsAnswered = true;
      for (var i = 0; i < this.Challenge2.length; i++) {
        if(!this.Challenge2[i].answerConfirmed)  {
          this.AllquestionsAnswered = false;
        }
      }
    },
    morphemeClickWis: function(word, event) {
      this.Challenge2[word].answerConfirmed = false;
      let index = this.Challenge2[word].word.indexOf('|');
      while(index>0)  {
        this.Challenge2[word].word.splice(index,1);
        index = this.Challenge2[word].word.indexOf('|');
      }
      this.AllquestionsAnswered = false;
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
        newPropertyID = this.Challenge2[i].word.join("");
        PostString += `"'` + newPropertyID + `'": "userAnswer",`;
        newPropertyID = this.Challenge2[i].answerCorrect ? 'Yes' : 'No';
        PostString += `"'` + newPropertyID + `'": "answerCorrect", `;
        newPropertyID = this.Challenge2[i].feedbackType + `F`;
        PostString += `"'` + newPropertyID + `'": "feedbackType", `;
        PostString += `"'No Explanation requested'": "Explanation" }`;


        this.$axios.post('/UpdateStudentAnswers', PostString, {headers: {
          'content-type': 'application/json',},})
        .then((response) => {
          console.log('Ok');
        }, (error) => {
          console.log(error);
        });
        console.log(PostString);
        PostString = '';
      }

      if(this.Challenge2[0].feedbackType === 2) {
        this.ShowResult = true;
      }
      else {
        this.ShowResult = false;
      }
      this.forceRerender();
      this.$emit('challenge-completed', this.TotalCorrect, this.TotalQuestions);
    },
    EvaluateAnswer: function(index)  {
      let useranswer = '';
      let correctAnswer = '';

      correctAnswer = this.Challenge2[index].answer;
      useranswer = this.Challenge2[index].word.join("");
      if(correctAnswer === useranswer) {
        this.Challenge2[index].answerCorrect = true;
        this.TotalCorrect += 1;
      }
    }
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
  .right {
    margin-right: 20px;
    float: right;
  }
</style>
