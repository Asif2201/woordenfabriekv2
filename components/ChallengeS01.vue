<template>
  <div  v-if="$fetchState.pending">Fetching lessons...</div>
  <div  v-else-if="$fetchState.error">An error occurred :(</div>
  <div v-else>
      <div class="S01Container">
        <table class="S01Table">
          <tbody>
            <template v-for="(Object, ObjIndex) in Challenge2">
              <tr>
                <td>
                  <span class="explanation">
                    {{ Object.Explanation }}
                  </span>
                </td>
                <td>
                  <template v-for="(char, index) in Object.word">
                    <span :class="{ questionwords : !forceRenderVariable[ObjIndex][index], questionwordsClicked : forceRenderVariable[ObjIndex][index] }"  v-on:click="morphemeClick(ObjIndex, index, $event);">
                      &nbsp; {{  char }} &nbsp;
                    </span>
                  </template>
                </td>
              </tr>
              <tr>
                <td> &nbsp;  &nbsp; </td>
                  <td>
                    <template v-for="(char, index) in Object.UserAnswerList">
                      <span class ="questionwords">
                        {{ char + '  |  ' }}
                      </span>
                    </template>
                  </td>
              </tr>
            </template>
          </tbody>
        </table>
        <div class="S01Klaar">
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
    const  URLAPI =`${this.$config.baseURL}/ChallengeQuestionsAll?challengeType=S01&challengelevelid=\'${ChallengeID}\'&Student_ID=\'${StudentID}\'`
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
        word = word.replaceAll('[', '');
        word = word.replaceAll(']', '');
        return word.split(';');
      } else  {
        return '';
      }
    },
    JSONtoObj()  {
      var QuestionObjectList = [];
      for (var i = 0; i < this.Challenge1.LearningQuestions.length; i++) {
          QuestionObjectList.push(this.Challenge1.LearningQuestions[i]);
          QuestionObjectList[i].word = this.splitWord(QuestionObjectList[i].MorfemeList.replaceAll(' ', ''));
          QuestionObjectList[i].UserAnswerList = [];
          QuestionObjectList[i].answerConfirmed = false;
          QuestionObjectList[i].answerCorrect = false;
      }
      this.TotalQuestions = this.Challenge1.LearningQuestions.length;
      return QuestionObjectList;
    },
    morphemeClick: function(word, char, event) {
      if(this.IsClicked(word,char))  {
          const whichElement = this.Challenge2[word].UserAnswerList.indexOf(this.Challenge2[word].word[char])
          this.Challenge2[word].UserAnswerList.splice(whichElement, 1);
          this.forceRenderVariable[word].splice(char, 1, false);
      }
      else {
        this.Challenge2[word].UserAnswerList.push(this.Challenge2[word].word[char]);
        this.forceRenderVariable[word].splice(char, 1, true);
      }
      this.isKlaar = true;
      for(var i = 0; i < this.Challenge2.length; i++) {
        if(this.Challenge2[i].UserAnswerList.length === 0)  {
          this.isKlaar = false;
        }
      }
    },
    IsClicked(word, char) {
      return(this.Challenge2[word].UserAnswerList.includes(this.Challenge2[word].word[char]));
    },

    challengeCompleted: function() {
      var PostString = '';
      var newPropertyID = '';
      var PostObject = {};
      if(this.isKlaar)  {
        for (var i = 0; i < this.Challenge2.length; i++) {
          this.EvaluateAnswer(i);

          PostObject = {};

          PostObject.id = this.Challenge2[i].id;
          PostObject.studentid = this.$store.state.Lessons[this.$store.state.currentDisplayLesson].studentid;
          PostObject.LessonID = this.$store.state.Lessons[this.$store.state.currentDisplayLesson].lessonid;
          PostObject.LevelID = this.Level;

          newPropertyID = this.Challenge2[i].UserAnswerList.join(";");
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

        this.ShowResult = true;
        this.$emit('challenge-completed', this.TotalCorrect, this.TotalQuestions);
      }
    },
    EvaluateAnswer: function(index)  {
      let answerIsCorrect = false;
      const answerlist = this.Challenge2[index].feedback.split(";");
      const newArray = answerlist.map(string => string.trim())
      const tempUserAnswer = this.Challenge2[index].UserAnswerList.join("").trim();
      if(newArray.includes(tempUserAnswer)) {
        answerIsCorrect = true;
      }
      if(answerIsCorrect) {
        this.Challenge2[index].answerCorrect = true;
        this.TotalCorrect += 1;
      }
    }
  },

}
</script>

