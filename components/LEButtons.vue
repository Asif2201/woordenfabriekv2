<template>
  <div class="relative">
    <button :disabled="isDisabled" @click ="selectedAnswer(0)" class="buttonWaar" :class="{ selectedB:isSelected(0) }" > {{ data[0].name  }}</button>
    <button :disabled="isDisabled" @click ="selectedAnswer(1)" class="buttondeelWaar" :class="{ selectedB:isSelected(1) }" > {{ data[1].name }}</button>
    <button :disabled="isDisabled" @click ="selectedAnswer(2)" class="buttonOnWaar" :class="{ selectedB:isSelected(2) }" > {{ data[2].name }}</button>
</div>
</template>

<script>

export default ({
  props:  {
    data: [],
    SelectedButton: Number,
    Disabled: Boolean
  },
  computed: {
    isDisabled() {
      return this.$props['Disabled'];
    }
  },
  methods:  {
    selectedAnswer: function (whichButton, event)  {
      this.$emit("AnswerSelected", whichButton);
    },
    isSelected(index) {
      if(this.$props['SelectedButton'] == index)  {
        return true;
      } else{
        return false;
      }
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

.selectedB  {
  background-color: black;
}
</style>

