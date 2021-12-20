<template>
      <div class="ChallengeHeaderPanel">
        <div class="ChalllengeTextPanel">
          <span class="ChallengeTitle"> {{ Type }}</span>
          <span class="ChallengeTitle2"> {{ `| ` + Title }}</span>
          <p></p>
          <span class="ChallengeSubTitle" v-html="Subtitle"> </span>
        </div>
        <div class="ChallengeImageContainer">
          <img :src="require(`../assets/radb_icon_${this.Type.substring(0,1)}.png`)" alt="Challenge Image" width="332" height="125">
        </div>
        <br style="clear:both" />
      </div>

</template>
<script>

export default ({
  props:  {
    Type: '',
    Title: '',
    Subtitle: ''
  },

})

</script>
<style scoped>

</style>
