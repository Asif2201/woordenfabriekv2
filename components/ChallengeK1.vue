<template>
  <div  v-if="$fetchState.pending">Fetching challenges...</div>
  <div  v-else-if="$fetchState.error">An error occurred :(</div>
  <div v-else>
      <div class="K01Container">
        <table class="K01_Table" :key=  "OkKey">
          <tbody>
            <template v-for="(Object, ObjIndex) in Challenge2">
              <tr>
                <td colspan="2">
                    <span class="questionwordsK1" v-for="(char, index) in Object.word" v-on:click="morphemeClick(ObjIndex, index+1, $event);">
                      {{ char }} &nbsp;
                    </span>
                </td>
               <td>
                    <button class="WisButton" v-on:click="morphemeClickWis(ObjIndex)">
                      Wis
                    </button>
                </td>
            </tr>
          </template>

        </tbody>
        </table>
        <div class="K01Klaar">
          <KlaarButton :isKlaar="isKlaar" @challengeCompleted="challengeCompleted()" />
        </div>
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
      isKlaar: false,
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
    const StudentID = this.$store.state.Lessons[this.$store.state.currentDisplayLesson].studentid
    const  URLAPI =`${this.$config.baseURL}/ChallengeQuestionsAll?challengeType=K1&challengelevelid=\'${ChallengeID}\'&Student_ID=\'${StudentID}\'`

    const headers = { "cache-control": "no-store, max-age=0" }
    const resp = await this.$axios.get(URLAPI, { headers });
    this.Challenge1 = await resp.data;

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
      if(char > 0 && char <= this.Challenge2[word].word.length)  {
        if(this.Challenge2[word].word[char] !== '|' && this.Challenge2[word].word[char-1] !== '|')  {
          this.Challenge2[word].word.splice(char, 0, '|');
        }
      }
      this.isKlaar=true;
      for(var i=0; i < this.Challenge2.length;i++)  {
        if(this.Challenge2[i].word.indexOf('|') < 0)  {
          this.isKlaar = false;
        }
      }
    },

    morphemeClickWis: function(word, event) {
      let index = this.Challenge2[word].word.indexOf('|');
      while(index>0)  {
        this.Challenge2[word].word.splice(index,1);
        index = this.Challenge2[word].word.indexOf('|');
      }
      this.isKlaar = false;
      this.Challenge2[word].answerConfirmed = false;
      this.OkKey++;

    },
    challengeCompleted: function() {
      var PostString = '';
      var PostObject = {};

      if(this.isKlaar) {
        for (var i = 0; i < this.Challenge2.length; i++) {
          this.EvaluateAnswer(i);
          PostObject = {};

          PostObject.id = this.Challenge2[i].id;
          PostObject.studentid = this.$store.state.Lessons[this.$store.state.currentDisplayLesson].studentid;
          PostObject.LessonID = this.$store.state.Lessons[this.$store.state.currentDisplayLesson].lessonid;
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
      }
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


</style>
