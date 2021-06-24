<template>
  <div class="align-top" v-if="$fetchState.pending">Fetching lessons...</div>
  <div class="align-top" v-else-if="$fetchState.error">An error occurred :(</div>
  <div v-else>
    <div v-for="Object in Challenges1.Challenge">
      <div class="group-745-TdZx3J">
        <div class="rectangle-533-qI9Ebe"></div>
        <div class="v1-verwissel-de-er-de-betekenis-qI9Ebe lato-bold-white-28px">
          <span class="span0-iddOTT h1"> {{ Object.ChallengeTitle }}</span>
        </div>
        <p class="maak-zoveel-mog-ndere-betekenis-qI9Ebe paragraph">
          {{ Object.ChallengeSubtitle }}
        </p>
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
