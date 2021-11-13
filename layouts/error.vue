<template>
<div style="overflow-x: auto;">
  <Mainheader />
  <img class="HomeImage1" src="~assets/Woordenfabriektext.png" >
  <div>
    <span class="subtitletex HomeImage2">
        <br><br><br>
          Er is een fout opgetreden
        <br><br><br>
        &nbsp; &nbsp;<NuxtLink to="/">Go to home page</NuxtLink>
     </span>

  </div>

</div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'error' // you can set a custom layout for the error page
  }
</script>
