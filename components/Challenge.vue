<template>
  <div class="align-top" v-if="$fetchState.pending">Fetching lessons...</div>
  <div class="align-top" v-else-if="$fetchState.error">An error occurred :(</div>
  <div v-else>
    <div v-for="Object in LearningObjects1.LearningObjects">
      <div class="group-745-TdZx3J">
        <div class="rectangle-533-qI9Ebe"></div>
        <div class="v1-verwissel-de-er-de-betekenis-qI9Ebe lato-bold-white-28px">
          <span class="span0-iddOTT h1"> {{ Object.learningobjecttitle }}</span>
        </div>
        <p class="maak-zoveel-mog-ndere-betekenis-qI9Ebe paragraph">
          {{ Object.learningobjectsubtitle }}
        </p>
      </div>
      <div v-if="Object.learningobjecttypeid==='K1XXX'">
        <LearningObjectK1 :learningobject="Object.challenge_x_learningobjectid" />
      </div>
      <hr>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  props:  [
    'currentChallenge'
  ],
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
  data() {
    return {
      LearningObjects1: [],
    }
  },
  async fetch() {
    const currentChallenge = this._props.currentChallenge;
    this.LearningObjects1 = await fetch(
      `http://localhost:3000/v1/LearningObjects?ChallengeID=${currentChallenge}`
    ).then(res => res.json())
  },
}
</script>
