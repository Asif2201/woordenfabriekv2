<template>
  <div>
    <nuxt-link to="/" >
      <img src="~/assets/Mainheader.png" width="1940" height="64">
    </nuxt-link>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
}
</script>
