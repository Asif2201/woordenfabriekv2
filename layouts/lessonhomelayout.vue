<template>
  <div>
    <Mainheader />
    <LessonHeader />
    <Nuxt />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  data() {
    return {
      lessons: [],
      levels: [],
      currentLevel: null
    }
  },
}
</script>
