<template>
    <div class="align-top" v-if="$fetchState.pending">Fetching lessons...</div>
    <div class="align-top" v-else-if="$fetchState.error">An error occurred :(</div>
    <div v-else>
      <table class="table-fixed w-full bg-gray-100 text-sm text-gray-500 font-mono " >
      <thead/>
      <tbody>
        <tr class="break-words">
          <td class="w-1/10 pl-4  pb-4 pt-4 ...">
          <nuxt-link to="/" > Menu </nuxt-link>
          </td>
          <td class="w-1/2 pb-4 pt-4 ...">
          <a href="#" class="block.."> De Woordenfabriek - een leeromgeving van Radboud Universiteit Nijmegen </a>
          </td>
          <td class="float-right w-2/5 pb-4 pt-4  ,,," >
          <div v-if="isAuthenticated" class="block"> Jaap </div>
          <div v-else >
            <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
              <nuxt-link to="/login"> log in </nuxt-link>
            </button>
          </div>
          </td>
        </tr>
        </tbody>
      </table>
      <div v-for="lesson in currentLevel.vwUsers">
        <div class="rectangle-570-8DUsak"></div>
        <div class="rectangle-571-Eabc5t">
              <span class="span0-eySr01 lato-bold-cerise-36px"> {{ `Level ` + lesson.studentchallengeid }} </span>
              <span class="span1-eySr01 lato-bold-sonic-silver-36px"> | </span>
              <span class="span2-eySr01 lato-bold-curious-blue-36px-2">{{ lesson.challengesubtitle }}</span>
        </div>
      </div>
      <div class="group-761-Foijvq">
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

export default {
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
      `http://localhost:3000/v1/userChallenge?lessonID=${this.$route.query.studentlessonID}&OnlyCurrent=true`
    ).then(res => res.json())
  },
}
</script>
