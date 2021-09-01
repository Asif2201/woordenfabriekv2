<template>
  <div class="relative">
    <select class="form-control text-blue-600 text-md" v-model="selectedAnswer" >
      <option  value=""  selected disabled>Kies</option>
      <option v-for="answer in data" :value="answer.id" :Key="answer.id"> {{  answer.name.substring(0,30) }} </option>
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
      selectedAnswer: 0,
    }
  },
  watch:  {
    selectedAnswer()  {
      this.$emit("AnswerSelected", this.selectedAnswer);
    }
  }
})
</script>

