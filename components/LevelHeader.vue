<template>
    <div id="HeadingPanel" class="LevelHeadingPanel">
      <span class="LevelTitle">
        {{ 'Level ' + LevelID + ' |'  }}
      </span>
      <span class="LevelSubtitle">
        {{ LevelTitle }}
      </span>
    </div>
</template>
<script>
export default {
  props:  [
    'LevelID',
    'LevelTitle',
  ],
}
</script>
<style scoped>

  .LevelHeadingPanel  {
    left: 128px;
    height: 44px;
  }
  .LevelTitle {
    font: lato;
    font-weight: bold;
    font-size: 24px;
    color: #E03997;
  }
  .LevelSubtitle {
    font: lato;
    font-weight: bold;
    font-size: 24px;
    color:#2185D0;
  }

</style>
