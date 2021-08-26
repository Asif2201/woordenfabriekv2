<template>
  <div class="relative">
    <button  :class="[isFirst ? 'buttonAnswer' : 'buttonOther']">{{ data[0].name }}</button>
    <button  :class="[isSecond ? 'buttonAnswer' : 'buttonOther']"> {{   data[1].name }}</button>
    <button  :class="[isThird ? 'buttonAnswer' : 'buttonOther']"> {{ data[2].name }}</button>
</div>
</template>

<script>

export default ({
  props:  {
    data: [],
    SelectedButton: String,
  },

  data() {
    return  {
      selectedAnswer: 0,
      whichButton: this.SelectedButton,
    }
  },
  computed: {
      isFirst() {
        if (this.whichButton === '0') {
          return true;
        }
        else  {
          return false;
        }
      } ,
      isSecond()  {
        if (this.whichButton === '1') {
          return true;
        }
        else  {
          return false;
        }
      },
      isThird() {
        if (this.whichButton === '2') {
          return true;
        }
        else  {
          return false;
        }
      },
  }

})

</script>

<style scoped>
.buttonAnswer {
  text-align: center;
  font: normal normal bold 14px/17px Lato;
  letter-spacing: 0px;
  color: gray;
  opacity: 1;
  background-color: black;
  display: inline-block;
  padding: 4px 4px;
  transition-duration: 0.4s;
  border-radius: 4px;
  width: 91px;
  height: 36px;
  cursor: not-allowed;
}

.buttonOther {
  text-align: center;
  font: normal normal bold 14px/17px Lato;
  letter-spacing: 0px;
  color: grey;
  opacity: 1;
  background-color: lightgrey;
  display: inline-block;
  padding: 4px 4px;
  transition-duration: 0.4s;
  border-radius: 4px;
  width: 91px;
  height: 36px;
  cursor: not-allowed;

}


</style>

