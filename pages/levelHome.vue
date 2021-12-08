<template>
  <div>
    <Mainheader />
    <LessonHeader :key="HeaderKey" :DisplayLesson="$store.state.currentDisplayLesson" @LevelClick="GotoLevel($event)"/>
    <div v-if="$fetchState.pending">Fetching Challenges...</div>
    <div v-else-if="$fetchState.error">An error occurred :(</div>
    <div :key="RenderLevel"  v-else class="ChallengePanel">
      <template v-if="currentChallengeType.ChallengeTypeID != 'LE3'">
        <LevelHeader  :key="RenderLevel" :LevelID="UserLevels[$store.state.Lessons[$store.state.currentDisplayLesson].currentDisplayLevel].Levelid" :LevelTitle="UserLevels[$store.state.Lessons[$store.state.currentDisplayLesson].currentDisplayLevel].leveltitle" />
      </template>
      <Level  :key="RenderLevel" @LevelComplete()="showModal()" @ScrollClick="PrevNextChallenge($event)" />
      <modalLevelEnd :Top="'300px'" :Left="'600px'" :width="'400px'" :height="'300px'" :key=isModalVisible v-show="isModalVisible" @close="closeModal">
        <template v-slot:header>
          Image comes here
        </template>
        <template v-slot:body>
          Level voltooid!
        </template>
        <template v-slot:footer>
        </template>
      </modalLevelEnd>
      <LevelFooter :key="RenderFooter"  @ScrollClick="PrevNextChallenge($event)" />
    </div>
  </div>
</template>
<script>
import Levels from '../components/Level.vue';
import modalChallenge from '../components/modalChallenge.vue';

export default {
  components: { Levels, modalChallenge },
  data() {
    return {
      levels: [],
      HeaderKey: 0,
      DisplayChallengeIndex: 0,
      RenderLevel: 0,
      RenderFooter: 0,
      isModalVisible: false,
    }
  },
  async fetch() {
    const sl = this.UserLevels[0].studentlessonid;
    var lv;

    var response;
    var URLforAPI = '';
    for(var i = 0; i < this.UserLevels.length;i++)  {
      lv = this.UserLevels[i].studentlevelid;
      URLforAPI = `${this.$config.baseURL}/Challenges?StudentLevelID=${lv}`;
      console.log(URLforAPI);
      response = await fetch(URLforAPI);
      this.Challenges1 = await response.json();
      this.$store.commit({ type:'storeChallenges', challenges: this.Challenges1.Challenge, slid: sl, lvlid:lv });
    }
  },
  computed: {
    CurrentLesson() {
      return this.$store.state.Lessons[this.$store.state.currentDisplayLesson];
    },
    UserLevels()  {
      return this.$store.state.Lessons[this.$store.state.currentDisplayLesson].Levels;
    },
    currentLevelPointer() {
      return this.$store.state.Lessons[this.$store.state.currentDisplayLesson].currentDisplayLevel;
    },
    currentDisplayChallenge() {
      const x = this.$store.state.currentDisplayLesson;
      const y = this.$store.state.Lessons[x].currentDisplayLevel;
      return this.$store.state.Lessons[x].Levels[y].currentDisplayChallenge;
    },
    currentChallengeType()  {
      const x = this.$store.state.currentDisplayLesson;
      const y = this.$store.state.Lessons[x].currentDisplayLevel;
      const z = this.$store.state.Lessons[x].Levels[y].currentDisplayChallenge;
      return this.$store.state.Lessons[x].Levels[y].Challenges[z];
    }
  },
  methods:  {
    PrevNextChallenge(dir)  {
        const sl = this.UserLevels[0].studentlessonid;
        const lv = this.UserLevels[this.$store.state.Lessons[this.$store.state.currentDisplayLesson].currentDisplayLevel].studentlevelid;
        this.$store.commit({ type:'UpdateCurrentChallengePointer', dir: dir, slid: sl, lvlid:lv });
        this.RenderLevel++;
        this.RenderFooter++;

    },
    GotoLevel(levelID) {
      const sl = this.UserLevels[0].studentlessonid;
      this.$store.commit({ type:'UpdateCurrentLevelPointer', LevelID: levelID, slid: sl });
      this.HeaderKey++;
      this.RenderLevel++;
      this.RenderFooter++;

    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal()  {
      this.isModalVisible = false;
      const index = this.$store.state.currentDisplayLesson;
      this.$router.push({ path: `lessonhome?studentlessonID=` + this.$route.query.studentlessonID  + `&index=${index}`});
    }
  }



};

</script>
<style scoped>


</style>
