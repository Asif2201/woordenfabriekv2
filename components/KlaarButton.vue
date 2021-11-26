<template>
    <div>
      <div  class="showOnHover">
        <button @click ="$emit('challengeCompleted')" class="klaarButton"> Klaar </button>
      </div>
      <span v-show="!isKlaar" class="hide">
          Je moet een antwoord kiezen voordat je verder kunt gaan
      </span>
    </div>
</template>

<script>

export default ({
  props:  {
    isKlaar: false,

  },
  data() {
    return  {
      selectedAnswer: 0,
    }
  },

})

</script>

<style scoped>


</style>

