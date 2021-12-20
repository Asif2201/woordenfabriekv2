<template>
  <div>
  <Mainheader />
  <LessonHeader :key="$route.query.index" :DisplayLesson="$route.query.index" />
  <div  v-if="$fetchState.pending">Fetching lessons...</div>
  <div  v-else-if="$fetchState.error">An error occurred :(</div>
  <div v-else class="LessonHomeContainer" :key="MessageToShow">
    <div class="LessonHomeContents">
      <img :src="require(`../assets/radb_Lev1.${WhichImage()}.svg`)"  width="557" height="349" >
    </div>
     <div v-if="levels.vwUsers[IndexOfCurrent].completionprogress !== 100" class="LessonNav">
      <nuxt-link :to="{ path: `/levelhome?studentlessonID=` + this.$route.query.studentlessonID }" >
                {{ MessageToShow }}
      </nuxt-link>
    </div>
  </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {

  data() {
    return {
      levels: [],
      IndexOfCurrent: 0,
      levelProgressKey: 0,
      ImageIndex: 1,
      MessageToShow: 'Start de les'
    }
  },
  watch: {
    levels() {
      this.IndexOfCurrent = 0;
      this.MessageToShow = 'Start de les';
      for(var i = 0; i < this.levels.vwUsers.length; i++) {
        if(this.levels.vwUsers[i].iscurrent === 'Yes') {
          this.IndexOfCurrent = i;
        }
        if(this.levels.vwUsers[i].completionprogress != 0)  {
          this.MessageToShow = 'Doorgaan'
        }
      }
    }
  },
  async fetch() {
    this.$store.commit('setCurrentDisplayLesson', this.$route.query.index);
    const URLforAPI = `${this.$config.baseURL}/userLevels?studentlessonid=${this.$route.query.studentlessonID}`;

    const response = await fetch(URLforAPI);
    this.levels = await response.json();
    this.$store.commit({ type:'storeLevels', levels: this.levels.vwUsers, slid: this.$route.query.studentlessonID });
  },
  methods:  {
    dateTime(value) {
      if(moment(value).format('YYYY-MM-DD') !== 'Invalid date')  {
        return moment(value).format('YYYY-MM-DD');
      }
      else  {
        return value;
      }
    },
    WhichImage()  {
      var X = Math.floor(Math.random() * 5) ;
      if(X===0) {
        X++;
      }
      return X
    }
  }
};

</script>

<style>

</style>
