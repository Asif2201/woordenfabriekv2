<template>
  <div :key="renderKey" id="ChallengeContents" class="challengeBox">
      <template v-if="Challenges1[ChallengeIndex].ChallengeTypeID !== 'LE3'">
        <ChallengeHeader :key="HeaderKey" :Type="Challenges1[ChallengeIndex].ChallengeTypeID" :Title="Challenges1[ChallengeIndex].ChallengeTitle" :Subtitle="Challenges1[ChallengeIndex].ChallengeSubtitle" />
      </template>
      <div v-if="Challenges1[ChallengeIndex].ChallengeTypeID === 'K01'">
        <template v-if="Challenges1[ChallengeIndex].IsCompleted === 'Yes'">
          <ChallengeK01Review :key="ChallengeIndex" :Challenge="Challenges1[ChallengeIndex].LevelChallengeID" :Level ="UserLevels[currentLevelPointer].studentlevelid" :LessonID ="$store.state.currentDisplayLesson" @challenge-completed="completeChallenge" />
        </template>
        <template v-else>
          <ChallengeK1 :key="ChallengeIndex" :Challenge="Challenges1[ChallengeIndex].LevelChallengeID" :Level ="UserLevels[currentLevelPointer].studentlevelid" :LessonID ="$store.state.currentDisplayLesson" @challenge-completed="completeChallenge" />
        </template>
      </div>
      <div v-if="Challenges1[ChallengeIndex].ChallengeTypeID === 'C01'">
        <template v-if="Challenges1[ChallengeIndex].IsCompleted === 'Yes'">
          <ChallengeC01Review  :key="ChallengeIndex" :Challenge="Challenges1[ChallengeIndex].LevelChallengeID" :Level ="UserLevels[currentLevelPointer].studentlevelid" :LessonID ="$store.state.currentDisplayLesson" @challenge-completed="completeChallenge" />
        </template>
        <template v-else>
          <ChallengeC01  :key="ChallengeIndex" :Challenge="Challenges1[ChallengeIndex].LevelChallengeID" :Level ="UserLevels[currentLevelPointer].studentlevelid" :LessonID ="$store.state.currentDisplayLesson" @challenge-completed="completeChallenge" />
        </template>
      </div>
      <div v-if="Challenges1[ChallengeIndex].ChallengeTypeID === 'K02'">
        <template v-if="Challenges1[ChallengeIndex].IsCompleted === 'Yes'">
          <ChallengeK02Review  :key="ChallengeIndex" :Challenge="Challenges1[ChallengeIndex].LevelChallengeID" :Level ="UserLevels[currentLevelPointer].studentlevelid" :LessonID ="$store.state.currentDisplayLesson" @challenge-completed="completeChallenge" />
        </template>
        <template v-else>
          <ChallengeK02 :key="ChallengeIndex" :Challenge="Challenges1[ChallengeIndex].LevelChallengeID" :Level ="UserLevels[currentLevelPointer].studentlevelid" :LessonID ="$store.state.currentDisplayLesson" @challenge-completed="completeChallenge" />
        </template>
      </div>
      <div v-if="Challenges1[ChallengeIndex].ChallengeTypeID === 'K03'">
        <template v-if="Challenges1[ChallengeIndex].IsCompleted === 'Yes'">
          <ChallengeK03Review :key="ChallengeIndex" :Challenge="Challenges1[ChallengeIndex].LevelChallengeID" :Level ="UserLevels[currentLevelPointer].studentlevelid" :LessonID ="$store.state.currentDisplayLesson" @challenge-completed="completeChallenge" />
        </template>
        <template v-else>
          <ChallengeK03 :key="ChallengeIndex" :Challenge="Challenges1[ChallengeIndex].LevelChallengeID" :Level ="UserLevels[currentLevelPointer].studentlevelid" :LessonID ="$store.state.currentDisplayLesson" @challenge-completed="completeChallenge" />
        </template>
      </div>
      <div v-if="Challenges1[ChallengeIndex].ChallengeTypeID === 'V01'">
        <template v-if="Challenges1[ChallengeIndex].IsCompleted === 'Yes'">
          <ChallengeV01Review :key="ChallengeIndex" :Challenge="Challenges1[ChallengeIndex].LevelChallengeID" :Level ="UserLevels[currentLevelPointer].studentlevelid" :LessonID ="$store.state.currentDisplayLesson" @challenge-completed="completeChallenge" />
        </template>
        <template v-else>
          <ChallengeV01 :key="ChallengeIndex" :Challenge="Challenges1[ChallengeIndex].LevelChallengeID" :Level ="UserLevels[currentLevelPointer].studentlevelid" :LessonID ="$store.state.currentDisplayLesson" @challenge-completed="completeChallenge" />
        </template>
      </div>
      <div v-if="Challenges1[ChallengeIndex].ChallengeTypeID === 'V02'">
        <template v-if="Challenges1[ChallengeIndex].IsCompleted === 'Yes'">
          <ChallengeV02Review :key="ChallengeIndex" :Challenge="Challenges1[ChallengeIndex].LevelChallengeID" :Level ="UserLevels[currentLevelPointer].studentlevelid" :LessonID ="$store.state.currentDisplayLesson" @challenge-completed="completeChallenge" />
        </template>
        <template v-else>
          <ChallengeV02 :key="ChallengeIndex" :Challenge="Challenges1[ChallengeIndex].LevelChallengeID" :Level ="UserLevels[currentLevelPointer].studentlevelid" :LessonID ="$store.state.currentDisplayLesson" @challenge-completed="completeChallenge" />
        </template>
      </div>
      <div v-if="Challenges1[ChallengeIndex].ChallengeTypeID === 'H01'">
        <template v-if="Challenges1[ChallengeIndex].IsCompleted === 'Yes'">
          <ChallengeH01Review :key="ChallengeIndex" :Challenge="Challenges1[ChallengeIndex].LevelChallengeID" :Level ="UserLevels[currentLevelPointer].studentlevelid" :LessonID ="$store.state.currentDisplayLesson" @challenge-completed="completeChallenge" />
        </template>
        <template v-else>
          <ChallengeH01 :key="ChallengeIndex" :Challenge="Challenges1[ChallengeIndex].LevelChallengeID" :Level ="UserLevels[currentLevelPointer].studentlevelid" :LessonID ="$store.state.currentDisplayLesson" @challenge-completed="completeChallenge" />
        </template>
      </div>
      <div v-if="Challenges1[ChallengeIndex].ChallengeTypeID === 'H02'">
        <template v-if="Challenges1[ChallengeIndex].IsCompleted === 'Yes'">
          <ChallengeH02Review :key="ChallengeIndex" :Challenge="Challenges1[ChallengeIndex].LevelChallengeID" :Level ="UserLevels[currentLevelPointer].studentlevelid" :LessonID ="$store.state.currentDisplayLesson" @challenge-completed="completeChallenge" />
        </template>
        <template v-else>
          <ChallengeH02 :key="ChallengeIndex" :Challenge="Challenges1[ChallengeIndex].LevelChallengeID" :Level ="UserLevels[currentLevelPointer].studentlevelid" :LessonID ="$store.state.currentDisplayLesson" @challenge-completed="completeChallenge" />
        </template>
      </div>
      <div v-if="Challenges1[ChallengeIndex].ChallengeTypeID === 'H05'">
        <template v-if="Challenges1[ChallengeIndex].IsCompleted === 'Yes'">
          <ChallengeH05Review :key="ChallengeIndex" :Challenge="Challenges1[ChallengeIndex].LevelChallengeID" :Level ="UserLevels[currentLevelPointer].studentlevelid" :LessonID ="$store.state.currentDisplayLesson" @challenge-completed="completeChallenge" />
        </template>
        <template v-else>
          <ChallengeH05 :key="ChallengeIndex" :Challenge="Challenges1[ChallengeIndex].LevelChallengeID" :Level ="UserLevels[currentLevelPointer].studentlevelid" :LessonID ="$store.state.currentDisplayLesson" @challenge-completed="completeChallenge" />
        </template>
      </div>
      <div v-if="Challenges1[ChallengeIndex].ChallengeTypeID === 'CA3'">
        <template v-if="Challenges1[ChallengeIndex].IsCompleted === 'Yes'">
          <ChallengeCA3Review :key="ChallengeIndex" :Challenge="Challenges1[ChallengeIndex].LevelChallengeID" :Level ="UserLevels[currentLevelPointer].studentlevelid" :LessonID ="$store.state.currentDisplayLesson" @challenge-completed="completeChallenge" />
        </template>
        <template v-else>
          <ChallengeCA3 :key="ChallengeIndex" :Challenge="Challenges1[ChallengeIndex].LevelChallengeID" :Level ="UserLevels[currentLevelPointer].studentlevelid" :LessonID ="$store.state.currentDisplayLesson" @challenge-completed="completeChallenge" />
        </template>
      </div>
      <div v-if="Challenges1[ChallengeIndex].ChallengeTypeID === 'S01'">
        <template v-if="Challenges1[ChallengeIndex].IsCompleted === 'Yes'">
          <ChallengeS01Review :key="ChallengeIndex" :Challenge="Challenges1[ChallengeIndex].LevelChallengeID" :Level ="UserLevels[currentLevelPointer].studentlevelid" :LessonID ="$store.state.currentDisplayLesson" @challenge-completed="completeChallenge" />
        </template>
        <template v-else>
          <ChallengeS01 :key="ChallengeIndex" :Challenge="Challenges1[ChallengeIndex].LevelChallengeID" :Level ="UserLevels[currentLevelPointer].studentlevelid" :LessonID ="$store.state.currentDisplayLesson" @challenge-completed="completeChallenge" />
        </template>
      </div>
      <div v-if="Challenges1[ChallengeIndex].ChallengeTypeID === 'LE1'">
        <template v-if="Challenges1[ChallengeIndex].IsCompleted === 'Yes'">
          <ChallengeLE1Review :key="ChallengeIndex" :Challenge="Challenges1[ChallengeIndex].LevelChallengeID" :Level ="UserLevels[currentLevelPointer].studentlevelid" :LessonID ="$store.state.currentDisplayLesson" @challenge-completed="completeChallenge" />
        </template>
        <template v-else>
          <ChallengeLE1 :key="ChallengeIndex" :Challenge="Challenges1[ChallengeIndex].LevelChallengeID" :Level ="UserLevels[currentLevelPointer].studentlevelid" :LessonID ="$store.state.currentDisplayLesson" @challenge-completed="completeChallenge" />
        </template>
      </div>
      <div v-if="Challenges1[ChallengeIndex].ChallengeTypeID === 'LE2'">
        <ChallengeLE2 :key="ChallengeIndex" :Challenge="Challenges1[ChallengeIndex].LevelChallengeID" :Level ="UserLevels[currentLevelPointer].studentlevelid" :LessonID ="$store.state.currentDisplayLesson" @challenge-completed="completeChallenge" />
      </div>
      <div v-if="Challenges1[ChallengeIndex].ChallengeTypeID === 'LE3'">
        <ChallengeLE3 :key="ChallengeIndex" :Challenge="Challenges1[ChallengeIndex].LevelChallengeID" :Level ="UserLevels[currentLevelPointer].studentlevelid" :LessonID ="$store.state.currentDisplayLesson" @challenge-completed="completeChallenge" />
      </div>
      <div v-if="Challenges1[ChallengeIndex].ChallengeTypeID === 'I01'">
        <template v-if="Challenges1[ChallengeIndex].IsCompleted === 'Yes'">
          <ChallengeI01Review :key="ChallengeIndex" :Challenge="Challenges1[ChallengeIndex].LevelChallengeID" :Level ="UserLevels[currentLevelPointer].studentlevelid" :LessonID ="$store.state.currentDisplayLesson" @challenge-completed="completeChallenge" />
        </template>
        <template v-else>
          <ChallengeI01 :key="ChallengeIndex" :Challenge="Challenges1[ChallengeIndex].LevelChallengeID" :Level ="UserLevels[currentLevelPointer].studentlevelid" :LessonID ="$store.state.currentDisplayLesson" @challenge-completed="completeChallenge" />
        </template>
      </div>

        <button class="btnHelp" v-on:click="ToggleshowHelpText">  ?  </button>
        <modalChallenge :Top="'700px'" :Left="'200px'" :width="'500px'" :height="'100px'" :key=helptextvisible v-show="helptextvisible" @close="closeModal">
          <template v-slot:header>
          </template>
          <template v-slot:body>
            {{ Challenges1[ChallengeIndex].HelpText }}
          </template>
          <template v-slot:footer>
          </template>
        </modalChallenge>
        <button v-show="Challenges1[ChallengeIndex].IsCompleted === 'Yes'" class="btnNext" v-on:click="GotoNextChallenge">  Volgende </button>
      </div>
</template>
<script>
import modalChallenge from '../components/modalChallenge.vue';
import Default from '../layouts/default.vue';


export default {
  components: {
      modalChallenge,
      Default,
    },
  data() {
    return {
      isModalVisible: false,
      challengeCompleted: false,
      totalCorrect: 0,
      totalQuestions: 0,
      helptextvisible: false,
      HeaderKey: 0,
      renderKey: 0,
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
    Challenges1() {
      const x = this.$store.state.currentDisplayLesson;
      const y = this.$store.state.Lessons[x].currentDisplayLevel;
      return this.$store.state.Lessons[x].Levels[y].Challenges;
    },
    ChallengeIndex()  {
      const x = this.$store.state.currentDisplayLesson;
      const y = this.$store.state.Lessons[x].currentDisplayLevel;
      return this.$store.state.Lessons[x].Levels[y].currentDisplayChallenge;
    }
  },

  methods:  {
    closeModal() {
      this.helptextvisible = false;
    },

    ToggleshowHelpText()  {
      this.helptextvisible = !this.helptextvisible;
    },
    GotoNextChallenge() {
      if(this.Challenges1[this.ChallengeIndex].IsLastChallenge == -1) {
        this.$emit('LevelComplete()');
      }
      else  {
        this.$emit("ScrollClick", "next");
      }
    },
    completeChallenge(totalCorrect, totalQuestions) {
      var PostString = '';
      var PostObject = {};

      const x = this.$store.state.currentDisplayLesson;

      PostObject = {};

      PostObject.challengeID = this.Challenges1[this.ChallengeIndex].challengeid;
      PostObject.studentlevelID = this.Challenges1[this.ChallengeIndex].StudentLevelID;
      PostObject.totalCorrect = totalCorrect;
      PostObject.IsCompleted = 'Yes';
      PostObject.IsCurrent = 'No';

      PostString = JSON.stringify(PostObject);

      console.log(PostString);

      this.$axios.post('/UpdateStudentChallenges', PostString, {headers: {
        'content-type': 'application/json',},})
      .then((response) => {
        console.log('Ok');
      }, (error) => {
        console.log(error);
      });

      PostObject = {};
      const CompletionProgress = Math.round(((this.ChallengeIndex + 1) / this.Challenges1.length)* 100) / 100;

      PostObject.LevelID = this.Challenges1[0].TheLevelID;
      const d = new Date();
      PostObject.CompletionDate = this.formatDate(d);
      PostObject.OverallProgress = CompletionProgress;
      PostObject.LessonID = this.CurrentLesson.studentlessonid;
      if(CompletionProgress < 1)  {
        PostObject.IsCurrent = 'Yes';
      } else  {
        PostObject.IsCurrent = 'No';
      }
      PostString = JSON.stringify(PostObject);
      console.log(PostString);

      this.$axios.post('/UpdateStudentLevels', PostString, {headers: {
        'content-type': 'application/json',},})
      .then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });
      const y = this.currentLevelPointer;

      this.$store.state.Lessons[x].Levels[y].Challenges[this.ChallengeIndex].IsCompleted = 'Yes';
      this.$store.state.Lessons[x].Levels[y].Challenges[this.ChallengeIndex].IsCurrent = 'No';

      if(CompletionProgress===1)  {
        this.isModalVisible = true;
        this.totalCorrect = totalCorrect;
        this.totalQuestions = totalQuestions;
        this.renderKey++;
      }
      else{
        this.$store.state.Lessons[x].Levels[y].Challenges[this.ChallengeIndex+1].IsCurrent = 'Yes';
        this.totalCorrect = totalCorrect;
        this.totalQuestions = totalQuestions;
        this.renderKey++;
      }
    },

    formatDate(date) {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

      if (month.length < 2)
          month = '0' + month;
      if (day.length < 2)
          day = '0' + day;

      return [year, month, day].join('-');
    }
  }
}
</script>
<style scoped>
  .right {
    margin-right: 20px;
    float: right;
  }
  .challengeBox {
    width:98%;
    height: 600px;
    background-color: white;
    position: relative;
  }

  .btnHelp  {
    position: absolute;
    left:    0;
    bottom:   0;
    background-color: lightgray;
    font-weight: bold;
    color: black;
    font-family: lato;
    padding-left: 6px;
    padding-right: 6px;
    padding-bottom: 4px;
    padding-top:4px;
    font-size:18px;
  }
  .btnNext  {
    position: absolute;
    right:    0;
    bottom:   0;
    background-color: rgb(187, 115, 127);
    font-weight: bold;
    color: white;
    font-family: lato;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 8px;
    padding-top:8px;
    font-size:24px;


  }
  .btnHelp:hover  {
    background-color: darkgray;
  }
</style>
