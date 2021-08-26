<template>
      <div>
        <p> &nbsp; </p>
        <span class="text-green-300 text-md font-lato font-bold ml-6"> {{ Correct + ` goed | ` }}</span>
        <span class="text-red-300 text-md font-lato font-bold"> {{ Total - (Correct+Missed) + ` fout`}}</span>
      </div>

</template>
<script>

export default ({
  props:  {
    Correct: 0,
    Total: 0,
    Missed: 0,
    HelpText: '',
  },

})

</script>
<style scoped>


</style>
