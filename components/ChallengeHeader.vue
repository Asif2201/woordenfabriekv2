<template>
      <div class="ChallengeHeaderPanel">
        <div class="ChalllengeTextPanel">
          <span class="ChallengeTitle"> {{ Type }}</span>
          <span class="ChallengeTitle2"> {{ `| ` + Title }}</span>
          <p></p>
          <span class="ChallengeSubTitle"> {{ Subtitle }}</span>
        </div>
        <div class="absolute top-0 right-0 h-125 w-332 ...">
          <img :src="require(`../assets/radb_icon_${this.Type.substring(0,1)}.png`)" alt="ChallengeK01" width="332" height="125">
        </div>
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
  .ChallengeHeaderPanel {
    width: 100%;
    position: relative;
    height: 160px;
    background-color: black;
    color: white;
    z-index: 0;
  }
  .ChalllengeTextPanel  {
    padding-top: 1cm;
    padding-left: 1cm;
    height: 34px;
    width: 1000px;
    display: inline-block;
  }
   .ChallengeTitle {
    font: lato;
    font-weight: bold;
    font-size: 24px;
    color: #E03997;
    line-height: 1.6;

  }
  .ChallengeTitle2 {
    font: lato;
    font-weight: bold;
    font-size: 24px;
    color: white;
    line-height: 1.6;

  }
  .ChallengeSubtitle {
    font: lato;
    font-weight: bold;
    font-size: 16px;
    color:white;
    line-height: 1.6;
  }
</style>
