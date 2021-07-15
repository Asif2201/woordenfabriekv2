<template>
  <div>
    <Mainheader />
    <div class="align-top" v-if="$fetchState.pending">Fetching lessons...</div>
    <div class="align-top" v-else-if="$fetchState.error">An error occurred :(</div>
    <div v-else>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <Level :currentLevel="levels.vwUsers[0].Levelid" :LessonID = "this.$route.query.studentlessonID" />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Levels from '../components/Level.vue';

export default {
  components: { Levels },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
  data() {
    return {
      Levels: [],
    }
  },
  async fetch() {
    console.log(this.$route.query.studentlessonID)
    this.levels = await fetch(
      `${this.$config.baseURL}/userLevels?lessonID=${this.$route.query.studentlessonID}&OnlyCurrent=Yes`
    ).then(res => res.json())
  },

};

</script>
