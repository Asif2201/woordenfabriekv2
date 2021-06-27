<template>
  <div class="w-full">

      <img class="object-contain h-80 w-full ..." src="~/assets/woordenfabriektext.png">
      <img class="object-contain h-80 w-full ..." src="~/assets/component-85---1@1x.png">
       <div class="text-center text-yellow-700">
          <p> &nbsp; </p>
          <Lessons />
      </div>
   </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'mainHome',
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
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

.component-85-1-TdZx3J {
  background-color: transparent;
  height: 349px;
  left: 690px;
  object-fit: cover;
  position: absolute;
  top: 325px;
  width: 557px;
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
