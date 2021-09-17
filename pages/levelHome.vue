<template>
  <div>
    <Mainheader />
    <LessonHeader :key="HeaderKey" @LevelClick="GotoLevel($event)"/>
    <div class="align-top" v-if="$fetchState.pending">Fetching Challenges...</div>
    <div class="align-top" v-else-if="$fetchState.error">An error occurred :(</div>
    <div v-else class="ChallengePanel">
    <LevelHeader :key="RenderLevel" :LevelID="UserLevels[$store.state.Lessons[$store.state.Lessons.currentDisplayLesson].currentDisplayLevel].Levelid" :LevelTitle="UserLevels[$store.state.Lessons[$store.state.Lessons.currentDisplayLesson].currentDisplayLevel].leveltitle" />
    <Level  :key="RenderLevel" @LevelComplete()="showModal()" />
     <modalLevelEnd :Top="'300px'" :Left="'600px'" :width="'400px'" :height="'300px'" :key=isModalVisible v-show="isModalVisible" @close="closeModal">
    <template v-slot:header>
      Image comes here
    </template>
    <template v-slot:body>
      Dit Level is Af
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
    var lv = this.UserLevels[this.currentLevelPointer].studentlevelid;
    for(var i = 0; i < this.UserLevels.length;i++)  {
      lv = this.UserLevels[i].studentlevelid;
      this.Challenges1 = await fetch(
        `${this.$config.baseURL}/Challenges?LevelID=${this.UserLevels[i].Levelid}`
      ).then(res => res.json())
      this.$store.commit({ type:'storeChallenges', challenges: this.Challenges1.Challenge, slid: sl, lvlid:lv });
    }
  },
  computed: {
    CurrentLesson() {
      return this.$store.state.Lessons[this.$store.state.Lessons.currentDisplayLesson];
    },
    UserLevels()  {
      return this.$store.state.Lessons[this.$store.state.Lessons.currentDisplayLesson].Levels;
    },
    currentLevelPointer() {
      return this.$store.state.Lessons[this.$store.state.Lessons.currentDisplayLesson].currentDisplayLevel;
    },
    currentDisplayChallenge() {
      const x = this.$store.state.Lessons.currentDisplayLesson;
      const y = this.$store.state.Lessons[x].currentDisplayLevel;
      return this.$store.state.Lessons[x].Levels[y].currentDisplayChallenge;
    }
  },
  methods:  {
    PrevNextChallenge(dir)  {
        const sl = this.UserLevels[0].studentlessonid;
        const lv = this.UserLevels[this.$store.state.Lessons[this.$store.state.Lessons.currentDisplayLesson].currentDisplayLevel].studentlevelid;
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
      this.$router.push({ path: `lessonhome?studentlessonID=` + this.$route.query.studentlessonID });
    }
  }



};

</script>
<style scoped>
  .ChallengePanel  {
    left: 128px;
    width: 1480px;
    position: fixed;
    top: 240px;

  }

</style>
