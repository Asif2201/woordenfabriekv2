<template>
  <div class="align-top" v-if="$fetchState.pending">Fetching lessons...</div>
  <div class="align-top" v-else-if="$fetchState.error">An error occurred :(</div>
  <div v-else>
      <div class="group-744-TdZx3J">
        <div v-for="Object in LearningObjects1.LearningQuestions">
          <div class="lato-bold-sonic-silver-24px"> {{ Object.word }} </div>
          <div class="buttondisabled-TdZx3J">
            <div class="rectangle-452-zNJv6s"></div>
            <div class="group-152-zNJv6s">
              <div class="group-151-WHNI9D">
                <div class="ok-IpPccX lato-bold-nobel-12px">OK</div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  props:  [
    'learningobject'
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
    const learningobjectid = this._props.learningobject;
    console.log(learningobjectid)
    this.LearningObjects1 = await fetch(
      `http://localhost:3000/v1/LearningQuestions?LearningObjectID=${learningobjectid}`
    ).then(res => res.json())
  },
}
</script>
