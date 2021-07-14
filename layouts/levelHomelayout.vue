<template>
    <div class="align-top" v-if="$fetchState.pending">Fetching lessons...</div>
    <div class="align-top" v-else-if="$fetchState.error">An error occurred :(</div>
    <div v-else class="flex flex-wrap content-start">
      <Mainheader/>
      <div v-for="lesson in currentLevel.vwUsers">
        <div class="bg-green-300 h-14 w-screen flex content-center">
              <hr class="border-0 bg-gray-500 text-gray-500 h-px">
              <hr class="border-0 bg-gray-500 text-gray-500 h-px">
              <hr class="border-0 bg-gray-500 text-gray-500 h-px">
              <span class=" pt-2 ml-6 font-sans  font-bold text-gray-500 text-4xl"> {{ `Level ` + lesson.studentlevelid }} </span>
              <span class=" pt-2 font-mono font-bold text-gray-500 text-4xl"> &nbsp | &nbsp </span>
              <span class=" pt-2 font-mono font-bold text-gray-500 text-4xl">{{ lesson.levelsubtitle }}</span>
        </div>
        <hr class="border-0 bg-gray-500 text-gray-500 h-px">
        <hr class="border-0 bg-gray-500 text-gray-500 h-px">
        <hr class="border-0 bg-gray-500 text-gray-500 h-px">
        <hr class="border-0 bg-gray-500 text-gray-500 h-px">
      </div>
      <div class="LevelIcon">
        <img src="~/assets/path-537-1@1x.png" />
        <div>
          <img src="~/assets/path-538-1@1x.png" />
          <img src="~/assets/component-91---1@1x.png"/>
        </div>
      </div>
      <Nuxt />
    </div>
  </template>
<script>
import { mapGetters } from 'vuex'
import Mainheader from '../components/Mainheader.vue'

export default {
  components: { Mainheader },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
  data() {
    return {
      currentLevel: [],
    }
  },
  async fetch() {
    this.currentLevel = await fetch(
      `http://localhost:3000/v1/userLevels?lessonID=${this.$route.query.studentlessonID}&OnlyCurrent=true`
    ).then(res => res.json())
  },
}
</script>
<style scoped>
  .LevelIcon  {
    background-color: transparent;
    height: 49px;
    position: absolute;
    right: calc(20% - 55px);
    top: 0px;
    width: 114px;
    float: right;
    z-index: 100;
  }
</style>
