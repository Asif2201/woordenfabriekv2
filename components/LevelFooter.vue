<template>
    <div id="Footer" class="FooterPanel">
      <button class="PrevNext" @click="MovePrev">
        &#8249;
      </button>
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;

      <template v-for="(challenge,index) in UserChallenges">
        <span v-if="index === currentDisplayChallenge" class="dotCurrent" :key="challenge.studentlevelID"> </span>
        <span v-else-if="challenge.IsCompleted === 'Yes'" class="dotDone" :key="challenge.studentlevelID"></span>
        <span v-else class="dotPending" :key="challenge.studentlevelID"> </span>
        &nbsp;
      </template>
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;

      <button class="PrevNext" @click="MoveNext">
        &#8250;
      </button>
  </div>

</template>

<script>
export default {
  computed: {
    UserChallenges()  {

      const x = this.$store.state.Lessons.currentDisplayLesson;
      const y = this.$store.state.Lessons[x].currentDisplayLevel;
      return this.$store.state.Lessons[x].Levels[y].Challenges;
    },
    currentDisplayChallenge() {
      const x = this.$store.state.Lessons.currentDisplayLesson;
      const y = this.$store.state.Lessons[x].currentDisplayLevel;
      return this.$store.state.Lessons[x].Levels[y].currentDisplayChallenge;
    }
  },
  methods: {
    MoveNext()  {
      this.$emit("ScrollClick", "next");
    },
    MovePrev()  {
       this.$emit("ScrollClick", "prev");
    }
  }
}
</script>
<style scoped>
  .FooterPanel  {
    top: 1147px;
    height: 52px;
    text-align: center;
  }
  .PrevNext {
    font: lato;
    font-weight:200;
    font-size: 64px;
    color: #767676;


  }
  .dotCurrent {
  height: 21px;
  width: 21px;
  border-radius: 50%;
  display: inline-block;
  border: 2px solid #2185D0;

}
  .dotDone {
  height: 21px;
  width: 21px;
  background-color: #2185D0;
  border-radius: 50%;
  display: inline-block;
  border: 2px solid #2185D0;


  }
.dotPending {
  height: 21px;
  width: 21px;
  background-color: #E0E1E2;
  border-radius: 50%;
  display: inline-block;
  border: 2px solid #E0E1E2;


}
</style>
