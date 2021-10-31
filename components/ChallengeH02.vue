<template>
  <div class="align-top" v-if="$fetchState.pending">Fetching lessons...</div>
  <div class="align-top" v-else-if="$fetchState.error">An error occurred :(</div>
  <div v-else>
      <div class="relative ml-20 mt-10">
        <table class="table-auto w-full align-center">
          <thead>
            <tr>
              <th class="w-1/5 ..."></th>
              <th class="w-3/5 ..."></th>
              <th class="w-1/5 ..."></th>
            </tr>
          </thead>
          <tbody class="border-black">
            <template v-for="(Object, ObjIndex) in Challenge2">
              <tr>
                <td>
                  &nbsp;
                </td>
                <td>
                  <span class="paragraphheading">
                        {{ Object.ParagraphHeading }}
                  </span>
                </td>
                <td>
                  &nbsp;
                </td>
              </tr>

              <tr>
                <td>
                  &nbsp;
                </td>
                <td>
                  <template v-for="(char, index) in Object.paragraphwords">
                    <span :class="{ questionwords : !forceRenderVariable[ObjIndex][index], questionwordsClicked : forceRenderVariable[ObjIndex][index] }" >
                        <span v-on:click="morphemeClick(ObjIndex, index, $event);">
                          {{ char }}
                        </span>
                    </span>
                  </template>
                </td>
                <td>
                  &nbsp;
                </td>
              </tr>

              <tr>
                <td>
                  &nbsp;
                </td>
                <td class="questionwords">
                </td>
                <td>
                  &nbsp;
                </td>
              </tr>

              <tr>
                <td>
                  &nbsp;
                </td>
                <td class="questionswords">
                  <br>
                  <textarea v-model="lAnswerExplanation" placeholder="leg jouw antwoord uit" class="explainbox" rows="4" cols="60"> </textarea>
                </td>
                <td>
                  &nbsp;
              </td>
              </tr>
          </template>
        </tbody>
        </table>
        <div class="H02Klaar">
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
    const  URLAPI =`${this.$config.baseURL}/ChallengeQuestionsAll?challengeType=H02&challengelevelid=\'${ChallengeID}\'&Student_ID=\'${StudentID}\'`
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
        for (var j = 0; j <= 70; j++) {
          this.forceRenderVariable[i].push(false);
        }
      }
    },
    splitWord(word)  {
      if (word) {
        word = word.replaceAll('[', '');
        word = word.replaceAll(']', '');
        return word.split(' ');
      } else  {
        return '';
      }
    },
    JSONtoObj()  {
      var QuestionObjectList = [];
      for (var i = 0; i < this.Challenge1.LearningQuestions.length; i++) {
          QuestionObjectList.push(this.Challenge1.LearningQuestions[i]);
          QuestionObjectList[i].paragraphwords = this.splitWord(QuestionObjectList[i].paragraph);
          QuestionObjectList[i].UserAnswerList = '';
          QuestionObjectList[i].answerConfirmed = false;
          QuestionObjectList[i].answerCorrect = false;
          this.forceRenderVariable.push([]);
          for(var j=0;j < QuestionObjectList[i].paragraphwords.length;j++)  {
            if(QuestionObjectList[i].UserAnswerList.includes(j))  {
              this.forceRenderVariable[i].push(true);
            }
            else  {
              this.forceRenderVariable[i].push(false);
            }
        }

      }
      this.TotalQuestions = this.Challenge1.LearningQuestions.length;
      return QuestionObjectList;
    },
    morphemeClick: function(word, char, event) {
      this.forceRenderVariable[word].splice(this.Challenge2[word].UserAnswerList, 1, false);
      this.Challenge2[word].UserAnswerList = char;
      this.forceRenderVariable[word].splice(this.Challenge2[word].UserAnswerList, 1, true);
      if(this.Challenge2[word].UserAnswerList != '')  {
        this.isKlaar = true;
      }
    },
    IsClicked(word, char) {
      return(this.Challenge2[word].UserAnswerList.includes(char));
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
      let answerIsCorrect = true;

      if(answerIsCorrect) {
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
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    white-space: wrap;
    line-height: 200%;
  }
  .questionwordsClicked {
    color: blue;
    font-family: lato;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 200%;

  }
  .paragraphheading {
    color: black;
    font-family: lato;
    font-size: 16px;
    font-style: bold;

  }
  .explainbox {
    border:solid 1px orange;
    resize: none;
    float: left;
    font-family: lato;
    font-size: 12px;
    font-style: normal;
    padding: 4px;
  }
  .H02Klaar {
    margin-left: 500px;
    margin-top: 40px;
  }
</style>
