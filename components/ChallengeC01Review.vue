<template>
  <div class="align-top" v-if="$fetchState.pending">Fetching lessons...</div>
  <div class="align-top" v-else-if="$fetchState.error">{{ $fetchState.error }}</div>
  <div v-else>
      <div class="relative ml-20 mt-10">
        <table class="table-fixed w-full align-center">
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
    }
  },

  async fetch() {
    const ChallengeID = this._props.Challenge;

    this.AnswerOptions.push({id:0, name:'Waar'});
    this.AnswerOptions.push({id:1, name:'Deels waar'});
    this.AnswerOptions.push({id:2, name:'Niet waar'});

    this.Challenge2 = await fetch(
      `${this.$config.baseURL}/ChallengeQuestionsAll?challengeType=C01&challengelevelid=\'${ChallengeID}\'`
    ).then(res => res.json())
    console.log(ChallengeID);
  },
  methods:  {

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
</style>
