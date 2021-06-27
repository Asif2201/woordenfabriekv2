<template>
  <div class="align-top" v-if="$fetchState.pending">Fetching lessons...</div>
  <div class="align-top" v-else-if="$fetchState.error">An error occurred :(</div>
  <div v-else class="flex" >
    <div v-for="Object in Challenges1.Challenge">
      <div class="relative w-full h-20 bg-black text-white w-screen z-index:0">
          <p> &nbsp </p>
          <span class="text-gray-300 text-xl font-sans ml-6"> {{ Object.ChallengeTitle }}</span><p></p>
          <span class="text-gray-500 text-lg font-sans ml-6"> {{ Object.ChallengeSubtitle }}</span>
        <p>&nbsp</p>
        </div>
      <div v-if="true">
        <ChallengeK1 :Challenge="Object.challenge_x_levelid" />
      </div>
      <hr>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  props:  [
    'currentLevel'
  ],
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
  data() {
    return {
      Challenges1: [],
    }
  },
  async fetch() {
    const currentLevel = this._props.currentLevel;
    this.Challenges1 = await fetch(
      `http://localhost:3000/v1/Challenges?LevelID=${currentLevel}`
    ).then(res => res.json())
  },
}
</script>
