<template>
  <div>
    <div class="align-top" v-if="$fetchState.pending">Fetching lessons...</div>
    <div class="align-top" v-else-if="$fetchState.error">An error occurred :(</div>
    <div v-else>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <p> &nbsp </p>
      <Challenge :currentChallenge="challenges.vwUsers[0].challengeid"/>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Challenge from '../components/Challenge.vue';

export default {
  components: { Challenge },
  layout: 'challengeHomelayout',
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
  data() {
    return {
      challenges: [],
    }
  },
  async fetch() {
    console.log(this.$route.query.studentlessonID)
    this.challenges = await fetch(
      `http://localhost:3000/v1/userChallenge?lessonID=${this.$route.query.studentlessonID}&OnlyCurrent=true`
    ).then(res => res.json())
  },

};

</script>
