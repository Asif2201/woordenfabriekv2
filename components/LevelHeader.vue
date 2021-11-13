<template>
    <div id="HeadingPanel" class="LevelHeadingPanel">
      <span class="LevelTitle">
        {{ 'Level ' + LevelID  }}
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


</style>
