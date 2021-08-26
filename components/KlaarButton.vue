<template>
  <div>
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
  font: normal normal bold 20px/25px Lato;
  letter-spacing: 0px;
  color: #FFFFFF;
  opacity: 1;
  background: #2185D0 0% 0% no-repeat padding-box;
  border-radius: 4px;
  width: 100px;
  height: 32px;
  top: 740px;
  left: 880px;
  clear: left;
}

</style>

