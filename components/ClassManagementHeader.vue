<template>
    <div id="HeadingPanel" class="LevelHeadingPanel">
      <span class="LevelTitle">
        {{  Title1 + ' |'  }}
      </span>
      <span class="LevelSubtitle">
        {{ Title2 }}
      </span>
    </div>
</template>
<script>
export default {
  props:  [
    'Title1',
    'Title2',
  ],
}
</script>
<style scoped>
  .LevelHeadingPanel  {
    padding-left: 200px;
    height: 44px;
  }
  .LevelTitle {
    font: lato;
    font-weight: bold;
    font-size: 36px;
    color: #E03997;
  }
  .LevelSubtitle {
    font: lato;
    font-weight: bold;
    font-size: 36px;
    color:#2185D0;
  }

</style>
