<template>
      <div class="ChallengeHeaderPanel">
        <div class="ChalllengeTextPanel">
          <span class="text-pink-300 text-xl font-lato font-bold"> {{ Type }}</span>
          <span class="text-white-300 text-xl font-lato font-bold"> {{ `| ` + Title }}</span>
          <p></p>
          <span class="text-gray-500 text-lg font-lato"> {{ Subtitle }}</span>
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
</style>
