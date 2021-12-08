<template>
  <div v-if="$fetchState.pending">Fetching lessons...</div>
  <div v-else-if="$fetchState.error">{{ $fetchState.error }}</div>
  <div v-else>
      <div class="C01Container">
        <span class="C01Heading">
          {{ Heading }}
        </span>
        <table class="C01Table">
          <tbody>
            <div v-for="Object in Challenge2.LearningQuestions" :key="Object.id">
              <tr>
                <td>
                    <span class="questionwords">
                      {{ Object.Sentence }}
                    </span>
                </td>
                 <td>
                    <LEButtons :Disabled="true" :data="AnswerOptions" :SelectedButton="Object.studentAnswer" @AnswerSelected="answerSelected(ObjIndex, $event)" />
                </td>
              </tr>
          </div>
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
      Challenge2: [],
      AnswerOptions: [],
      Heading: 'Dit zijn je antwoorden. Er volgen nu opdrachten waarin je ontdekt of je antwoorden kloppen',
    }
  },
  errorCaptured: function(err) {
    console.log('Error caught: ', err.message);
    this.fetch();
    return false;
  },
  async fetch() {
    const ChallengeID = this._props.Challenge;
    const StudentID = this.$store.state.Lessons[this.$store.state.currentDisplayLesson].studentid

    this.Challenge2 = [];

    this.AnswerOptions.push({id:0, name:'Waar'});
    this.AnswerOptions.push({id:1, name:'Deels waar'});
    this.AnswerOptions.push({id:2, name:'Niet waar'});

    const headers = { "cache-control": "no-store, max-age=0" }
    const  URLAPI =`${this.$config.baseURL}/ChallengeQuestionsAll?challengeType=C01&challengelevelid=\'${ChallengeID}\'&Student_ID=\'${StudentID}\'`
    const  URLAPI1 =`${this.$config.baseURL}/ChallengeQuestionsAll?challengeType=C01&challengelevelid=\'${ChallengeID}\'&Student_ID=\''`

    console.log(URLAPI);
    const resp1 = await this.$axios.get(URLAPI1, { headers });
    const resp = await this.$axios.get(URLAPI, { headers });
    this.Challenge2 = await resp.data;
/*    this.Challenge2 = await fetch(
      URLAPI
    ).then(res => res.json()) */

  },

}
</script>
<style scoped>

</style>
