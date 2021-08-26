<template>
      <div class="relative w-full h-20 bg-black text-white w-screen z-index:0">
        <p> &nbsp; </p>
        <span class="text-pink-300 text-xl font-lato font-bold ml-6"> {{ Type }}</span>
        <span class="text-white-300 text-xl font-lato font-bold"> {{ `| ` + Title }}</span>
        <p></p>
        <span class="text-gray-500 text-sm font-lato ml-6"> {{ Subtitle }}</span>
        <p> &nbsp; </p>
        <div class="absolute top-0 right-0 h-125 w-332 ...">
          <img :src="require(`../assets/radb_icon_${this.Type.substring(0,1)}.png`)" alt="ChallengeK01" width="332" height="125">
        </div>
      </div>

</template>
<script>

export default ({
  props:  {
    Type: '',
    Title: '',
    Subtitle: ''
  },

})

</script>
