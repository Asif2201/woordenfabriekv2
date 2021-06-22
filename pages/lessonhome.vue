<template>
  <div class="align-top" v-if="$fetchState.pending">Fetching lessons...</div>
  <div class="align-top" v-else-if="$fetchState.error">An error occurred :(</div>
  <div v-else>
    <div class="relative h-64 m-8 overflow-hidden rounded-lg bg-indigo-500">
    <div class="absolute z-30 flex w-full h-full">
      <div class="relative z-30 w-5/6 px-6 py-8 text-gray md:py-10 md:w-1/2">
        <h2 class="text-2xl">{{ lessons.vwUsers[0].lessonsubtitle }}</h2>
        <span></span>
      </div>
      <div class="absolute top-0 right-0 flex w-full h-full">
        <div class="w-1/3 h-full bg-blue-500"></div>
        <div class="relative w-1/3">
          <svg
            fill="currentColor"
            viewBox="0 0 100 100"
            class="absolute inset-y-0 z-20 h-full text-blue-500"
          >
            <polygon id="diagonal" points="0,0 100,0 50,100 0,100"></polygon>
          </svg>
          <svg
            fill="currentColor"
            viewBox="0 0 100 100"
            class="absolute inset-y-0 z-10 h-full ml-6 text-gray opacity-50"
          >
            <polygon points="0,0 100,0 50,100 0,100"></polygon>
          </svg>
        </div>
      </div>
    </div>
    <div class="absolute top-0 right-0 block w-9/12 h-full">
      <img
        alt="Snowy mountain lake"
        class="object-cover min-w-full h-full"
        src="https://source.unsplash.com/random" />
    </div>
    </div>
    <div class="relative h-8 m-8 overflow-hidden rounded-lg bg-gray-500 text-white text-center">
      <nuxt-link :to="{ path: `/challengehome?studentlessonID=` + this.$route.query.studentlessonID }" >
                Continue with learning challenge
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment';

export default {
    layout: 'lessonhomelayout',
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
  data() {
    return {
      lessons: []
    }
  },
  async fetch() {
    this.lessons = await fetch(
      `http://localhost:3000/v1/userLessons?lessonID=${this.$route.query.studentlessonID}`
    ).then(res => res.json())
  },
  methods:  {
    dateTime(value) {
      if(moment(value).format('YYYY-MM-DD') !== 'Invalid date')  {
        return moment(value).format('YYYY-MM-DD');
      }
      else  {
        return value;
      }
    },
  }
};

</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
