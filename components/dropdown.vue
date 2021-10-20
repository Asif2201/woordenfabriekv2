<template>
  <div class="relative">
    <select class="dropdowntext" v-model="selectedAnswer" >
      <option  value="-1"  selected disabled>Kies</option>
      <option v-for="answer in data" :value="answer.id" :Key="answer.id">{{  answer.name.substring(0,30) }}</option>
    </select>
    <br><br>
</div>
</template>
<script>

export default ({
  props:  {
    data: [],
  },
  data() {
    return  {
      selectedAnswer: -1,
    }
  },
  watch:  {
    selectedAnswer()  {
      this.$emit("AnswerSelected", this.selectedAnswer);
    }
  }
})
</script>
<style scoped>
  .dropdowntext {
    color: grey;
    font-family: Lato;
    font-size: 14px;
    font-style: normal;
    font-weight: bold;
  }
</style>

