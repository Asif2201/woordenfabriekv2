<template>
  <div class="align-top" v-if="$fetchState.pending">Fetching lessons...</div>
  <div class="align-top" v-else-if="$fetchState.error">An error occurred :(</div>
  <div v-else>
      <div>
        <table class="CA3Table">
          <thead>
            <tr>
              <th>
                &nbsp;
              </th>
              <th>
                <span class="CA3QuestionsClicked">
                  {{ Challenge2[0].cat1label.replace('*', '') }}
                </span>
              </th>
              <th>
                <span class="CA3QuestionsClicked">
                    {{ Challenge2[0].cat2label.replace('*', '') }}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(Object, ObjIndex) in Challenge2">
              <tr>
                <td>
                    <span class="CA3Questions">
                      {{ Object.word }}
                    </span>
                  </td>
                  <td>
                    <input v-bind:id="'CA0' + ObjIndex" type="radio" :name="'wordtype_' + ObjIndex" value="Cat1" v-model="Object.UserAnswer" @change="AnswerClicked()">
                    <label v-bind:for="'CA0' + ObjIndex" class="CA3QuestionsClicked"> Selecteer categorie </label>
                  </td>
                  <td>
                    <input  v-bind:id="'CA1' + ObjIndex" type="radio" :name="'wordtype_' + ObjIndex" value="Cat2" v-model="Object.UserAnswer" @change="AnswerClicked()">
                    <label v-bind:for="'CA1' + ObjIndex" class="CA3QuestionsClicked"> Selecteer categorie </label>
                  </td>
              </tr>
            </template>
        </tbody>
        </table>
        <div class="CA3Klaar">
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
      ShowResult: false,
      ResultKey: 0,
      TotalCorrect: 0,
      TotalQuestions: 0,
      isKlaar: false,
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
    const  URLAPI =`${this.$config.baseURL}/ChallengeQuestionsAll?challengeType=CA3&challengelevelid=\'${ChallengeID}\'&Student_ID=\'${StudentID}\'`

    const headers = { "cache-control": "no-store, max-age=0" }
    const resp = await this.$axios.get(URLAPI, { headers });
    this.Challenge1 = await resp.data;

  },
  methods:  {
    initWordGrid()  {
      for (var i = 0; i <= 10; i++) {
        this.forceRenderVariable.push([]);
        for (var j = 0; j <= 7; j++) {
          this.forceRenderVariable[i].push(false);
        }
      }
    },
    AnswerClicked() {
      this.isKlaar = true;
      for (var i = 0; i < this.Challenge2.length; i++) {
        if(this.Challenge2.UserAnswer == '')  {
          this.isKlaar = false;
        }
      }
    },
    splitWord(word)  {
      if (word) {
        return word.split(';');
      } else  {
        return '';
      }
    },
    JSONtoObj()  {
      var QuestionObjectList = [];
      for (var i = 0; i < this.Challenge1.LearningQuestions.length; i++) {
          QuestionObjectList.push(this.Challenge1.LearningQuestions[i]);
          QuestionObjectList[i].UserAnswer = '';
          QuestionObjectList[i].answerCorrect = false;
      }
      this.TotalQuestions = this.Challenge1.LearningQuestions.length;
      return QuestionObjectList;
    },

    challengeCompleted: function() {
      var PostString = '';
      var PostObject = {};
      if(this.isKlaar) {
        for (var i = 0; i < this.Challenge2.length; i++) {
          PostObject= {};
          this.EvaluateAnswer(i);
          PostObject.id = this.Challenge2[i].id;
          PostObject.studentid = this.$store.state.Lessons[this.$store.state.currentDisplayLesson].studentid;
          PostObject.LessonID = this.$store.state.Lessons[this.$store.state.currentDisplayLesson].lessonid;
          PostObject.LevelID = this.Level;
          PostObject.userAnswer = this.Challenge2[i].UserAnswer;
          PostObject.answerCorrect = this.Challenge2[i].answerCorrect ? 'Yes' : 'No';
          PostObject.feedbackType = this.Challenge2[i].feedbackType;
          PostObject.Explanation = 'No explanation required';

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
        this.$emit('challenge-completed', this.TotalCorrect, this.TotalQuestions);
      }
    },
    EvaluateAnswer: function(index)  {
      var UserChoice =-1;
      var correctAnswer = -1;
      correctAnswer = this.Challenge2[index].cat1label.includes("*") ? 0 : 1;
      console.log(index + '-' + correctAnswer)
      UserChoice = this.Challenge2[index].UserAnswer == 'Cat1' ? 0 : 1;
      console.log(index + '-' + UserChoice);
      if(UserChoice === correctAnswer) {
        this.Challenge2[index].answerCorrect = true;
        this.TotalCorrect += 1;
      }
    }
  },

}
</script>
<style scoped>

</style>
