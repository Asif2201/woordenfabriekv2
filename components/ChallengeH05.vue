<template>
  <div  v-if="$fetchState.pending">Fetching lessons...</div>
  <div  v-else-if="$fetchState.error">An error occurred :(</div>
  <div v-else>
      <div class="H05Container">
        <table class="H05Table">
          <tbody>
            <template v-for="(Object, ObjIndex) in Challenge2">
              <tr>
                <template v-for="(char, index) in Object.word">
                  <td :key="forceRenderVariable[ObjIndex][index]">
                    <div :class="{ questionwords : !forceRenderVariable[ObjIndex][index], questionwordsClicked : forceRenderVariable[ObjIndex][index] }" >
                        <span v-on:click="morphemeClick(ObjIndex, index, $event);">
                          {{ char }}
                        </span>
                    </div>
                  </td>
                </template>
            </tr>
          </template>
            <tr>
              <td>&nbsp;</td>
              <td>
                 <br>
                  <textarea v-model="lAnswerExplanation" placeholder="leg jouw antwoord uit" class="explainbox" rows="6" cols="100"> </textarea>
              </td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          </tbody>
        </table>
        <div class="H05Klaar">
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

  created() {
    this.initWordGrid();
  },
  data() {
    return {
      Challenge1: [],
      Challenge2: [],
      forceRenderVariable: [],
      isKlaar: false,
      ShowResult: false,
      ResultKey: 0,
      TotalCorrect: 0,
      TotalQuestions: 0,
      lAnswerExplanation: '',

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
    const  URLAPI =`${this.$config.baseURL}/ChallengeQuestionsAll?challengeType=H05&challengelevelid=\'${ChallengeID}\'&Student_ID=\'${StudentID}\'`
    console.log(URLAPI);

    const headers = { "cache-control": "no-store, max-age=0" }
    const resp = await this.$axios.get(URLAPI, { headers });
    this.Challenge1 = await resp.data;
  },
  methods:  {
    initWordGrid()  {
      console.clear();
      for (var i = 0; i <= 10; i++) {
        this.forceRenderVariable.push([]);
        for (var j = 0; j <= 7; j++) {
          this.forceRenderVariable[i].push(false);
        }
      }
    },
    splitWord(word)  {
      if (word) {
        word = word.replace('*', '');
        return word.split(';');
      } else  {
        return '';
      }
    },
    JSONtoObj()  {
      var QuestionObjectList = [];
      for (var i = 0; i < this.Challenge1.LearningQuestions.length; i++) {
          QuestionObjectList.push(this.Challenge1.LearningQuestions[i]);
          QuestionObjectList[i].word = this.splitWord(QuestionObjectList[i].wordlist);
          QuestionObjectList[i].UserAnswerList = '';
          QuestionObjectList[i].answerConfirmed = false;
          QuestionObjectList[i].answerCorrect = false;
      }
      this.TotalQuestions = this.Challenge1.LearningQuestions.length;
      return QuestionObjectList;
    },
    morphemeClick: function(word, char, event) {
      this.forceRenderVariable[word].splice(this.Challenge2[word].UserAnswerList, 1, false);
      this.Challenge2[word].UserAnswerList = char;
      this.forceRenderVariable[word].splice(this.Challenge2[word].UserAnswerList, 1, true);
      this.isKlaar = true;

    },
    IsClicked(word, char) {
      return(this.Challenge2[word].UserAnswerList= char);
    },

    challengeCompleted: function() {
      var PostString = '';
      var PostObject = {};
      if(this.isKlaar)  {
        for (var i = 0; i < this.Challenge2.length; i++) {
          this.EvaluateAnswer(i);

          PostObject = {};

          PostObject.id = this.Challenge2[i].id;
          PostObject.studentid = this.$store.state.Lessons[this.$store.state.currentDisplayLesson].studentid;
          PostObject.LessonID = this.$store.state.Lessons[this.$store.state.currentDisplayLesson].lessonid;
          PostObject.LevelID = this.Level;
          PostObject.userAnswer = this.Challenge2[i].UserAnswerList;
          PostObject.answerCorrect = this.Challenge2[i].answerCorrect ? 'Yes' : 'No';
          PostObject.feedbackType = this.Challenge2[i].feedbackType;
          PostObject.Explanation = this.lAnswerExplanation;

          PostString = JSON.stringify(PostObject);

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
          this.ShowResult = true;
        }
        this.$emit('challenge-completed', this.TotalCorrect, this.TotalQuestions);
      }
    },
    EvaluateAnswer: function(index)  {
      var correctanswer = '';
      const x = this.Challenge2[index].wordlist.split(';');
      for(var i = 0;i < x.length; i++)  {
        if(x[i].indexOf('*') > 0) {
          correctanswer = x[i];
        }
      }
      if(this.Challenge2[index].UserAnswerList = correctanswer) {
        this.Challenge2[index].answerCorrect = true;
        this.TotalCorrect += 1;
      }
    }
  },

}
</script>
<style scoped>

</style>
