<template>
  <div>
  <LessonHeader :key="HeaderKey"/>
  <div class="align-top" v-if="$fetchState.pending">Fetching lessons...</div>
  <div class="align-top" v-else-if="$fetchState.error">An error occurred :(</div>
  <div v-else class="flex" :key="ChallengeIndex">
    <div>
    <div class="relative w-full h-20 bg-black text-white w-screen z-index:0">
        <p> &nbsp; </p>
        <span class="text-gray-300 text-xl font-sans ml-6"> {{ Challenges1.Challenge[ChallengeIndex].ChallengeTitle }}</span><p></p>
        <span class="text-gray-500 text-lg font-sans ml-6"> {{ Challenges1.Challenge[ChallengeIndex].ChallengeSubtitle }}</span>
      <p> &nbsp; </p>
      </div>
    <div v-if="Challenges1.Challenge[ChallengeIndex].ChallengeTypeID === 'K01'">
      <ChallengeK1 :Challenge="Challenges1.Challenge[ChallengeIndex].challengeid" :Level ="currentLevel" :LessonID ="LessonID" @challenge-completed="completeChallenge" />
    </div>
    <div v-if="Challenges1.Challenge[ChallengeIndex].ChallengeTypeID === 'C01'">
      <ChallengeC01 :Challenge="Challenges1.Challenge[ChallengeIndex].challengeid" :Level ="currentLevel" :LessonID ="LessonID" @challenge-completed="completeChallenge" />
    </div>
    <div v-if="Challenges1.Challenge[ChallengeIndex].ChallengeTypeID === 'K02'">
      <ChallengeK02 :Challenge="Challenges1.Challenge[ChallengeIndex].challengeid" :Level ="currentLevel" :LessonID ="LessonID" @challenge-completed="completeChallenge" />
    </div>
    <div v-if="Challenges1.Challenge[ChallengeIndex].ChallengeTypeID === 'K03'">
      <ChallengeK03 :Challenge="Challenges1.Challenge[ChallengeIndex].challengeid" :Level ="currentLevel" :LessonID ="LessonID" @challenge-completed="completeChallenge" />
    </div>
    <div v-if="Challenges1.Challenge[ChallengeIndex].ChallengeTypeID === 'V01'">
      <ChallengeV01 :Challenge="Challenges1.Challenge[ChallengeIndex].challengeid" :Level ="currentLevel" :LessonID ="LessonID" @challenge-completed="completeChallenge" />
    </div>
    <div v-if="Challenges1.Challenge[ChallengeIndex].ChallengeTypeID === 'V02'">
      <ChallengeV02 :Challenge="Challenges1.Challenge[ChallengeIndex].challengeid" :Level ="currentLevel" :LessonID ="LessonID" @challenge-completed="completeChallenge" />
    </div>
    <div v-if="Challenges1.Challenge[ChallengeIndex].ChallengeTypeID === 'H01'">
      <ChallengeH01 :Challenge="Challenges1.Challenge[ChallengeIndex].challengeid" :Level ="currentLevel" :LessonID ="LessonID" @challenge-completed="completeChallenge" />
    </div>
    <hr>

    <button class="helpbutton inline-block" v-on:click="ToggleshowHelpText">  ?  </button>
    <label class="inline-block align-middle text-green-300 mr-8 ml-6" v-show="helptextvisible" > {{ Challenges1.Challenge[ChallengeIndex].HelpText }} </label>
    <template v-if="challengeCompleted">
    <modalChallenge v-show="isModalVisible" @close="closeModal">
      <template v-slot:header>
        Challenge Completed!
      </template>
      <template v-slot:body>
        {{ `You answered ` + totalCorrect + ` out of ` + totalQuestions + ` questions correctly. ` }}
      </template>
      <template v-slot:footer>
        Lets move to the next challenge.
      </template>
    </modalChallenge>
    </template>
    </div>
  </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import modalChallenge from '../components/modalChallenge.vue';
import Default from '../layouts/default.vue';


export default {
  props:  [
    'currentLevel',
    'LessonID'
  ],
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
  components: {
      modalChallenge,
    Default,
    },
  data() {
    return {
      Challenges1: [],
      ChallengeIndex: 0,
      isModalVisible: false,
      challengeCompleted: false,
      totalCorrect: 0,
      totalQuestions: 0,
      currentLevel1: '',
      helptextvisible: false,
      HeaderKey: 0,
    }
  },
  watch: {
    Challenges1()  {
      this.GetCurrentChallenge();
    }
  },
  async fetch() {
    this.currentLevel1 = this._props.currentLevel;
    this.Challenges1 = await fetch(
      `${this.$config.baseURL}/Challenges?LevelID=${this.currentLevel1}`
    ).then(res => res.json())
  },
  methods:  {
    showModal() {
      this.isModalVisible = true;
    },
    GetCurrentChallenge() {
      let current = 0;
      for(var i = 0; i < this.Challenges1.Challenge.length; i++)  {
        if(this.Challenges1.Challenge[i].IsCurrent === 'Yes')  {
          current = i;
        }
      }
      console.log(current);
      this.ChallengeIndex = current;
    },
    closeModal()  {
      if(this.ChallengeIndex === this.Challenges1.Challenge.length -1)  {
        this.LevelCompleted('1');
      this.ChallengeIndex = 0;
      }
      else  {
        const progress = Math.round(((this.ChallengeIndex + 1) / this.Challenges1.Challenge.length)* 100) / 100;
        this.LevelCompleted(progress);
      }
      this.HeaderKey += 1;
      this.isModalVisible = false;
      this.ChallengeIndex += 1;
    },
    ToggleshowHelpText()  {
      this.helptextvisible = !this.helptextvisible;
    },
    completeChallenge(totalCorrect, totalQuestions) {
      var PostString = '';
      var newPropertyID = '';

      PostString = '{ '
      newPropertyID = this.Challenges1.Challenge[this.ChallengeIndex].challengeid;
      PostString += `"'` + newPropertyID + `'"  : "challengeID",`;
      newPropertyID = this.Challenges1.Challenge[this.ChallengeIndex].StudentLevelID +`L`;
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

      this.challengeCompleted = true;
      this.isModalVisible = true;
      this.totalCorrect = totalCorrect;
      this.totalQuestions = totalQuestions;
    },
    LevelCompleted(CompletionProgress)  {
        let PostString = `{ `
        let newPropertyID;

        newPropertyID = this.Challenges1.Challenge[0].TheLevelID;
        PostString += `"'` + newPropertyID + `'"  : "LevelID",`;
        const d = new Date();
        newPropertyID = this.formatDate(d);
        PostString += `"'` + newPropertyID + `'"  : "CompletionDate",`;
        newPropertyID = CompletionProgress + 'P';
        PostString += `"'` + newPropertyID + `'"  : "OverallProgress",`;
        newPropertyID = this.LessonID + `L`;
        PostString += `"'` + newPropertyID + `'"  : "LessonID",`;
        if(CompletionProgress === '1')  {
          newPropertyID = 'No'
        }
        else  {
          newPropertyID = 'Yes'
        }
        PostString += `"'` + newPropertyID + `'"  : "IsCurrent" }`;

        this.$axios.post('/UpdateStudentLevels', PostString, {headers: {
          'content-type': 'application/json',},})
        .then((response) => {
          console.log(response);
        }, (error) => {
          console.log(error);
        });
        if(CompletionProgress === '1')  {
          this.$nuxt.$options.router.push({ path: `lessonhome?studentlessonID=${this._props.LessonID}` } );
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
