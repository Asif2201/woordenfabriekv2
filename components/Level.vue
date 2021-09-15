<template>
  <div class="bg-white">
    <div class="challengeBox" :key="ChallengeIndex">
    <div>
      <ChallengeHeader :key="ChallengeIndex" :Type="Challenges1[ChallengeIndex].ChallengeTypeID" :Title="Challenges1[ChallengeIndex].ChallengeTitle" :Subtitle="Challenges1[ChallengeIndex].ChallengeSubtitle" />
      <div v-if="Challenges1[ChallengeIndex].ChallengeTypeID === 'K01'">
        <template v-if="Challenges1[ChallengeIndex].IsCompleted === 'Yes'">
          <ChallengeK01Review :key="ChallengeIndex" :Challenge="Challenges1[ChallengeIndex].LevelChallengeID" :Level ="UserLevels[currentLevelPointer].studentlevelid" :LessonID ="$store.state.Lessons.currentDisplayLesson" @challenge-completed="completeChallenge" />
        </template>
        <template v-else>
          <ChallengeK1 :key="ChallengeIndex" :Challenge="Challenges1[ChallengeIndex].LevelChallengeID" :Level ="UserLevels[currentLevelPointer].studentlevelid" :LessonID ="$store.state.Lessons.currentDisplayLesson" @challenge-completed="completeChallenge" />
        </template>
      </div>
      <div v-if="Challenges1[ChallengeIndex].ChallengeTypeID === 'C01'">
        <ChallengeC01  :key="ChallengeIndex" :Challenge="Challenges1[ChallengeIndex].LevelChallengeID" :Level ="UserLevels[currentLevelPointer].studentlevelid" :LessonID ="$store.state.Lessons.currentDisplayLesson" @challenge-completed="completeChallenge" />
      </div>
      <div v-if="Challenges1[ChallengeIndex].ChallengeTypeID === 'K02'">
        <template v-if="Challenges1[ChallengeIndex].IsCompleted === 'Yes'">
          <ChallengeK02Review  :key="ChallengeIndex" :Challenge="Challenges1[ChallengeIndex].LevelChallengeID" :Level ="UserLevels[currentLevelPointer].studentlevelid" :LessonID ="$store.state.Lessons.currentDisplayLesson" @challenge-completed="completeChallenge" />
        </template>
        <template v-else>
          <ChallengeK02  :key="ChallengeIndex" :Challenge="Challenges1[ChallengeIndex].LevelChallengeID" :Level ="UserLevels[currentLevelPointer].studentlevelid" :LessonID ="$store.state.Lessons.currentDisplayLesson" @challenge-completed="completeChallenge" />
        </template>
      </div>
      <div v-if="Challenges1[ChallengeIndex].ChallengeTypeID === 'K03'">
        <template v-if="Challenges1[ChallengeIndex].IsCompleted === 'Yes'">
          <ChallengeK03Review :key="ChallengeIndex" :Challenge="Challenges1[ChallengeIndex].LevelChallengeID" :Level ="UserLevels[currentLevelPointer].studentlevelid" :LessonID ="$store.state.Lessons.currentDisplayLesson" @challenge-completed="completeChallenge" />
        </template>
        <template v-else>
          <ChallengeK03 :key="ChallengeIndex" :Challenge="Challenges1[ChallengeIndex].LevelChallengeID" :Level ="UserLevels[currentLevelPointer].studentlevelid" :LessonID ="$store.state.Lessons.currentDisplayLesson" @challenge-completed="completeChallenge" />
        </template>
      </div>
      <div v-if="Challenges1[ChallengeIndex].ChallengeTypeID === 'V01'">
        <template v-if="Challenges1[ChallengeIndex].IsCompleted === 'Yes'">
          <ChallengeV01Review :key="ChallengeIndex" :Challenge="Challenges1[ChallengeIndex].LevelChallengeID" :Level ="UserLevels[currentLevelPointer].studentlevelid" :LessonID ="$store.state.Lessons.currentDisplayLesson" @challenge-completed="completeChallenge" />
        </template>
        <template v-else>
          <ChallengeV01 :key="ChallengeIndex" :Challenge="Challenges1[ChallengeIndex].LevelChallengeID" :Level ="UserLevels[currentLevelPointer].studentlevelid" :LessonID ="$store.state.Lessons.currentDisplayLesson" @challenge-completed="completeChallenge" />
        </template>
      </div>
      <div v-if="Challenges1[ChallengeIndex].ChallengeTypeID === 'V02'">
        <template v-if="Challenges1[ChallengeIndex].IsCompleted === 'Yes'">
          <ChallengeV02Review :key="ChallengeIndex" :Challenge="Challenges1[ChallengeIndex].LevelChallengeID" :Level ="UserLevels[currentLevelPointer].studentlevelid" :LessonID ="$store.state.Lessons.currentDisplayLesson" @challenge-completed="completeChallenge" />
        </template>
        <template v-else>
          <ChallengeV02 :key="ChallengeIndex" :Challenge="Challenges1[ChallengeIndex].LevelChallengeID" :Level ="UserLevels[currentLevelPointer].studentlevelid" :LessonID ="$store.state.Lessons.currentDisplayLesson" @challenge-completed="completeChallenge" />
        </template>
      </div>
      <div v-if="Challenges1[ChallengeIndex].ChallengeTypeID === 'H01'">
        <template v-if="Challenges1[ChallengeIndex].IsCompleted === 'Yes'">
          <ChallengeH01Review :key="ChallengeIndex" :Challenge="Challenges1[ChallengeIndex].LevelChallengeID" :Level ="UserLevels[currentLevelPointer].studentlevelid" :LessonID ="$store.state.Lessons.currentDisplayLesson" @challenge-completed="completeChallenge" />
        </template>
        <template v-else>
          <ChallengeH01 :key="ChallengeIndex" :Challenge="Challenges1[ChallengeIndex].LevelChallengeID" :Level ="UserLevels[currentLevelPointer].studentlevelid" :LessonID ="$store.state.Lessons.currentDisplayLesson" @challenge-completed="completeChallenge" />
        </template>
      </div>
      <div v-if="Challenges1[ChallengeIndex].ChallengeTypeID === 'H02'">
        <template v-if="Challenges1[ChallengeIndex].IsCompleted === 'Yes'">
          <ChallengeH02Review :key="ChallengeIndex" :Challenge="Challenges1[ChallengeIndex].LevelChallengeID" :Level ="UserLevels[currentLevelPointer].studentlevelid" :LessonID ="$store.state.Lessons.currentDisplayLesson" @challenge-completed="completeChallenge" />
        </template>
        <template v-else>
          <ChallengeH02 :key="ChallengeIndex" :Challenge="Challenges1[ChallengeIndex].LevelChallengeID" :Level ="UserLevels[currentLevelPointer].studentlevelid" :LessonID ="$store.state.Lessons.currentDisplayLesson" @challenge-completed="completeChallenge" />
        </template>
      </div>
      <div v-if="Challenges1[ChallengeIndex].ChallengeTypeID === 'H05'">
        <template v-if="Challenges1[ChallengeIndex].IsCompleted === 'Yes'">
          <ChallengeH05Review :key="ChallengeIndex" :Challenge="Challenges1[ChallengeIndex].LevelChallengeID" :Level ="UserLevels[currentLevelPointer].studentlevelid" :LessonID ="$store.state.Lessons.currentDisplayLesson" @challenge-completed="completeChallenge" />
        </template>
        <template v-else>
          <ChallengeH05 :key="ChallengeIndex" :Challenge="Challenges1[ChallengeIndex].LevelChallengeID" :Level ="UserLevels[currentLevelPointer].studentlevelid" :LessonID ="$store.state.Lessons.currentDisplayLesson" @challenge-completed="completeChallenge" />
        </template>
      </div>
      <div v-if="Challenges1[ChallengeIndex].ChallengeTypeID === 'CA3'">
        <ChallengeCA3 :key="ChallengeIndex" :Challenge="Challenges1[ChallengeIndex].LevelChallengeID" :Level ="UserLevels[currentLevelPointer].studentlevelid" :LessonID ="$store.state.Lessons.currentDisplayLesson" @challenge-completed="completeChallenge" />
      </div>
      <div v-if="Challenges1[ChallengeIndex].ChallengeTypeID === 'S01'">
        <template v-if="Challenges1[ChallengeIndex].IsCompleted === 'Yes'">
          <ChallengeS01Review :key="ChallengeIndex" :Challenge="Challenges1[ChallengeIndex].LevelChallengeID" :Level ="UserLevels[currentLevelPointer].studentlevelid" :LessonID ="$store.state.Lessons.currentDisplayLesson" @challenge-completed="completeChallenge" />
        </template>
        <template v-else>
          <ChallengeS01 :key="ChallengeIndex" :Challenge="Challenges1[ChallengeIndex].LevelChallengeID" :Level ="UserLevels[currentLevelPointer].studentlevelid" :LessonID ="$store.state.Lessons.currentDisplayLesson" @challenge-completed="completeChallenge" />
        </template>
      </div>
      <div v-if="Challenges1[ChallengeIndex].ChallengeTypeID === 'LE1'">
        <ChallengeLE1 :key="ChallengeIndex" :Challenge="Challenges1[ChallengeIndex].LevelChallengeID" :Level ="UserLevels[currentLevelPointer].studentlevelid" :LessonID ="$store.state.Lessons.currentDisplayLesson" @challenge-completed="completeChallenge" />
      </div>
      <div v-if="Challenges1[ChallengeIndex].ChallengeTypeID === 'LE2'">
        <ChallengeLE2 :key="ChallengeIndex" :Challenge="Challenges1[ChallengeIndex].LevelChallengeID" :Level ="UserLevels[currentLevelPointer].studentlevelid" :LessonID ="$store.state.Lessons.currentDisplayLesson" @challenge-completed="completeChallenge" />
      </div>
      <div v-if="Challenges1[ChallengeIndex].ChallengeTypeID === 'LE3'">
        <ChallengeLE3 :key="ChallengeIndex" :Challenge="Challenges1[ChallengeIndex].LevelChallengeID" :Level ="UserLevels[currentLevelPointer].studentlevelid" :LessonID ="$store.state.Lessons.currentDisplayLesson" @challenge-completed="completeChallenge" />
      </div>
      <br>
      <div class="footerbox">
      <button class="ml-10 hover:bg-gray-500 bg-gray-300 px-4 py-4 font-bold text-black" v-on:click="ToggleshowHelpText">  ?  </button>
      <p class="text-blue-500 text-xs font-lato ml-8" v-show="helptextvisible" > {{ Challenges1[ChallengeIndex].HelpText }} </p>
      <div v-if="Challenges1[ChallengeIndex].IsCompleted === 'Yes'" :key="isModalVisible" class="ChallengeResult">
        <template v-if="Challenges1[ChallengeIndex].feedbackType === 2">
          <ChallengeFooter :Correct="Challenges1[ChallengeIndex].TotalCorrect" :Total="Challenges1[ChallengeIndex].TotalQuestions" :Missed=0 />
        </template>
      </div>
      </div>
    </div>
  </div>
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
    Challenges1() {
      const x = this.$store.state.Lessons.currentDisplayLesson;
      const y = this.$store.state.Lessons[x].currentDisplayLevel;
      return this.$store.state.Lessons[x].Levels[y].Challenges;
    },
    ChallengeIndex()  {
      const x = this.$store.state.Lessons.currentDisplayLesson;
      const y = this.$store.state.Lessons[x].currentDisplayLevel;
      return this.$store.state.Lessons[x].Levels[y].currentDisplayChallenge;
    }
  },

  methods:  {
    showModal() {
      this.isModalVisible = true;
    },

    ToggleshowHelpText()  {
      this.helptextvisible = !this.helptextvisible;
    },
    completeChallenge(totalCorrect, totalQuestions) {
      var PostString = '';
      var newPropertyID = '';
      const x = this.$store.state.Lessons.currentDisplayLesson;

      PostString = '{ ';
      newPropertyID = this.Challenges1[this.ChallengeIndex].challengeid;
      PostString += `"'` + newPropertyID + `'"  : "challengeID",`;
      newPropertyID = this.Challenges1[this.ChallengeIndex].StudentLevelID +`L`;
      PostString += `"'` + newPropertyID + `'"  : "studentlevelID",`;
      newPropertyID = totalCorrect;
      PostString += `"'` + newPropertyID + `'"  : "totalCorrect",`;
      PostString += `"'Yes'" : "IsCompleted",`;
      PostString += `"'No'" : "IsCurrent" }`;
      this.$axios.post('/UpdateStudentChallenges', PostString, {headers: {
        'content-type': 'application/json',},})
      .then((response) => {
        console.log('Ok');
      }, (error) => {
        console.log(error);
      });
      PostString = `{ `;
      const CompletionProgress = Math.round(((this.ChallengeIndex + 1) / this.Challenges1.length)* 100) / 100;
      newPropertyID = this.Challenges1[0].TheLevelID;
      PostString += `"'` + newPropertyID + `'"  : "LevelID",`;
      const d = new Date();
      newPropertyID = this.formatDate(d);
      PostString += `"'` + newPropertyID + `'"  : "CompletionDate",`;
      newPropertyID = CompletionProgress + 'P';
      PostString += `"'` + newPropertyID + `'"  : "OverallProgress",`;
      newPropertyID = this.CurrentLesson.studentlessonid + `L`;
      PostString += `"'` + newPropertyID + `'"  : "LessonID",`;
      if(CompletionProgress < 1)  {
        newPropertyID = 'Yes'
      }
      else  {
        newPropertyID = 'No'
      }
      PostString += `"'` + newPropertyID + `'"  : "IsCurrent" }`;
      this.$axios.post('/UpdateStudentLevels', PostString, {headers: {
        'content-type': 'application/json',},})
      .then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });
      const y = this.currentLevelPointer;

      this.$store.state.Lessons[x].Levels[y].Challenges[this.ChallengeIndex].IsCompleted = 'Yes';
      this.challengeCompleted = true;
      this.isModalVisible = true;
      this.totalCorrect = totalCorrect;
      this.totalQuestions = totalQuestions;
      this.HeaderKey += 1;
      if(CompletionProgress===1)  {
        this.$emit('LevelComplete()');
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
    display: flex;
    width:70%;
    height: 575px;
  }
  .footerbox  {
    position: absolute;
    top: 540px;
    width:100%;
  }
  .ChallengeResult  {
    position:absolute;
    left: 1300px;
    top: 5px;
  }
</style>
