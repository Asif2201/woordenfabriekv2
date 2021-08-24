<template>
  <div class="relative">
    <button @click ="$emit('challengeCompleted')" class="klaarButton"> Klaar </button>
</div>
</template>

<script>

export default ({
  props:  {
    data: [],

  },
  data() {
    return  {
      selectedAnswer: 0,
    }
  },

})

</script>

<style scoped>
.klaarButton {
  font: normal normal bold 22px/27px Lato;
  letter-spacing: 0px;
  color: #FFFFFF;
  opacity: 1;
  background: #2185D0 0% 0% no-repeat padding-box;
  border-radius: 4px;
  width: 160px;
  height: 62px;
}

</style>

