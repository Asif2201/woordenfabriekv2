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
  clear: left;

}
.showOnHover:hover + .hide {
    display:block;
    color: red;
    font-family: lato;
    font-size: 14px;
    font-style: normal;
    padding-top:10px;
    margin-left:-100px;
  }
  .hide {
    display:none;
  }
</style>

