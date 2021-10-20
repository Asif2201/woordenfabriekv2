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
                    <span v-for="(char, index) in Object.word" v-on:click="morphemeClick(ObjIndex, index+1, $event);">
                      {{ char }} &nbsp;
                    </span>
                  </div>
                </td>
                <td> &nbsp; &nbsp; &nbsp; &nbsp; </td>
               <td>
                  <div>
                    <button class="WisButton" v-on:click="morphemeClickWis(ObjIndex)">
                      Wis
                    </button>
                  </div>
                </td>
            </tr>
          </template>

          <tr>
              <td>
                <div>
                <button v-on:click ="challengeCompleted()" class="klaarButton"> Klaar </button>
                </div>
               </td>
              <td> &nbsp;  &nbsp; </td>
              <td> &nbsp;  &nbsp; </td>

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
      OkKey: 0,
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
          QuestionObjectList[i].answerConfirmed = false;
          QuestionObjectList[i].answerCorrect = false;
      }
      this.TotalQuestions = this.Challenge1.LearningQuestions.length;
      return QuestionObjectList;
    },
    morphemeClick: function(word, char, event) {
      if(char > 0 && char < this.Challenge2[word].word.length)  {
        if(this.Challenge2[word].word[char] !== '|')  {
          this.Challenge2[word].word.splice(char, 0, '|');
        }
      }
    },

    morphemeClickWis: function(word, event) {
      let index = this.Challenge2[word].word.indexOf('|');
      while(index>0)  {
        this.Challenge2[word].word.splice(index,1);
        index = this.Challenge2[word].word.indexOf('|');
      }
      this.AllquestionsAnswered = false;
      this.Challenge2[word].answerConfirmed = false;
      this.OkKey++;

    },
    challengeCompleted: function() {
      var PostString = '';
      var PostObject = {};

      for (var i = 0; i < this.Challenge2.length; i++) {
        this.EvaluateAnswer(i);
        PostObject = {};

        PostObject.id = this.Challenge2[i].id;
        PostObject.studentID = 'S1';
        PostObject.LessonID = this.LessonID;
        PostObject.LevelID = this.Level;
        PostObject.userAnswer = this.Challenge2[i].word.join("");
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
    color: grey;
    font-family: lato;
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
  }
  .right {
    margin-right: 20px;
    float: right;
  }
  .WisButton  {
    background-color: blue;
    border-radius: 4px;
    color: white;
    padding-right: 12px;
    padding-left: 12px;
    padding-top: 4px;
    padding-bottom: 4px;
    float: right;
    margin-right: 20px;
    font-family: lato;
    font-weight: bold;
  }
  .WisButton:hover  {
    background-color: darkblue; /* Green */
    color: yellow;
  }
  .K01_Table {
    width:50%;
    table-layout: fixed;
  }
  .K01_Table tr {
    height:  50px;
  }
  .K01_Table td:first-child {
    width: 900px;
  }
  .klaarButton {
    font: normal normal bold 20px/25px Lato;
    letter-spacing: 0px;
    color: #FFFFFF;
    opacity: 1;
    background: #2185D0 0% 0% no-repeat padding-box;
    border-radius: 4px;
    width: 100px;
    height: 32px;
    clear: left;
    margin-left: 500px;
    cursor:pointer;
}
</style>
