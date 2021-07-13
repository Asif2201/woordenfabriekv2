<template>
  <div class="align-top" v-if="$fetchState.pending">Fetching lessons...</div>
  <div class="align-top" v-else-if="$fetchState.error">An error occurred :(</div>
  <div v-else>
    <div class="flex flex-wrap h-64 m-8 w-full content-center rounded bg-gray-100">
      <div class="justify-self-center ">
      <p class="text-center">
      {{ lessons.vwUsers[IndexOfCurrent].lessonsubtitle }}
      </p>
      </div>
    </div>
    <div v-if="lessons.vwUsers[IndexOfCurrent].completionprogress !== 100" class="relative h-8 m-8 overflow-hidden rounded-lg bg-gray-500 text-white text-center">
      <nuxt-link :to="{ path: `/levelhome?studentlessonID=` + this.$route.query.studentlessonID }" >
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
      lessons: [],
      IndexOfCurrent: 0,
    }
  },
  watch: {
    lessons() {
      console.log('X---' + this.lessons.vwUsers.length);
      for(var i = 0; i < this.lessons.vwUsers.length; i++) {
        console.log(this.lessons.vwUsers[i]);
        if(this.lessons.vwUsers[i].iscurrent === 'Yes') {
          this.IndexOfCurrent = i;
        }
      }
    }
  },
  async fetch() {
    this.lessons = await fetch(
      `${this.$config.baseURL}/v1/userLessons?lessonID=${this.$route.query.studentlessonID}`
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
