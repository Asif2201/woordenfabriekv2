<template>
  <div>
  <Mainheader />
  <LessonHeader/>
  <div class="align-top" v-if="$fetchState.pending">Fetching lessons...</div>
  <div class="align-top" v-else-if="$fetchState.error">An error occurred :(</div>
  <div v-else class="ml-96 content-center">
    <br><br><br>
    <img :src="require(`../assets/radb_img_Lev${levels.vwUsers[IndexOfCurrent].studentlevelid}.png`)"  width="557" height="349" >
    <div v-if="levels.vwUsers[IndexOfCurrent].completionprogress !== 100" class=" justify-items-center relative h-8 m-8 w-1/2 overflow-hidden rounded text-black text-center font-bold align-middle">
      <nuxt-link :to="{ path: `/levelhome?studentlessonID=` + this.$route.query.studentlessonID }" >
                Continue with Lesson
      </nuxt-link>
    </div>
  </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment';

export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },

  data() {
    return {
      levels: [],
      IndexOfCurrent: 0,
      levelProgressKey: 0,
    }
  },
  watch: {
    levels() {
      for(var i = 0; i < this.levels.vwUsers.length; i++) {
        if(this.levels.vwUsers[i].iscurrent === 'Yes') {
          this.IndexOfCurrent = i;
        }
      }
    }
  },
  async fetch() {

    this.levels = await fetch(
      `${this.$config.baseURL}/userLevels?lessonID=${this.$route.query.studentlessonID}`
    ).then(res => res.json());
    this.$store.commit({ type:'storeLevels', levels: this.levels.vwUsers, slid: this.levels.vwUsers[0].studentlessonID });
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
  }
};

</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
