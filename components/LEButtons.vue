<template>
  <div class="relative">
    <button @click ="selectedAnswer = 0" class="buttonWaar">{{ data[0].name  }}</button>
    <button @click ="selectedAnswer = 1 " class="buttondeelWaar"> {{ data[1].name }}</button>
    <button @click ="selectedAnswer = 2" class="buttonOnWaar"> {{ data[2].name }}</button>
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
  watch:  {
    selectedAnswer()  {
      this.$emit("AnswerSelected", this.selectedAnswer);
    }
  },

})

</script>

<style scoped>
.buttonWaar {
  text-align: center;
  font: normal normal bold 14px/17px Lato;
  letter-spacing: 0px;
  color: #FFFFFF;
  opacity: 1;
  background-color: #2185D0;
  display: inline-block;
  padding: 4px 4px;
  transition-duration: 0.4s;
  border-radius: 4px;
  width: 91px;
  height: 36px;
}
.buttonWaar:hover {
  background-color: white;
  color: #2185D0;
}
.buttonWaar:active {
  background-color: #333;
  border-color: red;
  color: #eee;
}
.buttonWaar:focus {
  outline: none;
  box-shadow: 0 0 0 3px red;
}

.buttonOnWaar {
  text-align: center;
  font: normal normal bold 14px/17px Lato;
  letter-spacing: 0px;
  color: #FFFFFF;
  opacity: 1;
  background-color: #DB2828;
  display: inline-block;
  padding: 4px 4px;
  transition-duration: 0.4s;
  border-radius: 4px;
  width: 91px;
  height: 36px;
}
.buttonOnWaar:hover {
  background-color: white;
  color: #DB2828;
}
.buttonOnWaar:active {
  background-color: #333;
  border-color: #333;
  color: #eee;
}
.buttonOnWaar:focus {
  outline: none;
  box-shadow: 0 0 0 3px red;
}

.buttondeelWaar {
  text-align: center;
  font: normal normal bold 14px/17px Lato;
  letter-spacing: 0px;
  color: #FFFFFF;
  opacity: 1;
  background-color: #6435C9;
  display: inline-block;
  padding: 4px 4px;
  transition-duration: 0.4s;
  border-radius: 4px;
  width: 91px;
  height: 36px;
}
.buttondeelWaar:hover {
  background-color: white;
  color: #6435C9;
}
.buttondeelWaar:active {
  background-color: green;
  border-color: #333;
  color: #eee;
}
.buttondeelWaar:focus {
  outline: none;
  box-shadow: 0 0 0 3px red;
}

</style>

