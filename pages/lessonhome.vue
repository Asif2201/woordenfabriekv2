<template>
  <div>
    <div class="align-top" v-if="$fetchState.pending">Fetching lessons...</div>
    <div class="align-top" v-else-if="$fetchState.error">An error occurred :(</div>
    <div v-else>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <div class="text-center text-yellow-700">
          <p> &nbsp; </p>
          <p> {{ lessons.vwUsers[0].lessonsubtitle }} </p>
          <p> &nbsp; </p>
        </div>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

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
