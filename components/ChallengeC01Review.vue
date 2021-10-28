<template>
  <div class="align-top" v-if="$fetchState.pending">Fetching lessons...</div>
  <div class="align-top" v-else-if="$fetchState.error">{{ $fetchState.error }}</div>
  <div v-else>
      <div class="C01Container">
        <span class="C01Heading">
          {{ Heading }}
        </span>
        <table class="C01Table">
          <thead/>
          <tbody>
            <div v-for="Object in Challenge2.LearningQuestions" :key="Object.id">
              <tr>
                <td class="w-3/5">
                  <div class="questionwords">
                    <span>
                      {{ Object.Sentence }}
                    </span>
                  </div>
                </td>
                <td class="w-1/5"> &nbsp; </td>
                <td class="w-1/5 questionwords ml-20">
                  <div class="cursor not-allowed">
                      <span>
                        {{ AnswerOptions[Object.studentAnswer].name }}
                      </span>
                  </div>
                </td>
                <td> &nbsp;  &nbsp; </td>
            </tr>
            <tr>
              <td> &nbsp; </td>
              <td> &nbsp; </td>
              <td> &nbsp; </td>
              <td> &nbsp; </td>
              <td> &nbsp; </td>
            </tr>
            <tr>
              <td> &nbsp; </td>
              <td> &nbsp; </td>
              <td> &nbsp; </td>
              <td> &nbsp; </td>
              <td> &nbsp; </td>
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
  .questionwords {
    color: var(--grey);
    font-family: lato;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
  }
  .C01Heading {
    color: black;
    font-family: lato;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    padding-left: 250px;
  }
  .C01Container {
    position: relative;
    margin-left: 20px;
    margin-top:20px;
  }
  .C01Table {
    table-layout: fixed;
    width: 100%;
    margin-top: 40px;
  }
</style>
