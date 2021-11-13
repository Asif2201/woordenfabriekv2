<template>
<div style="overflow-x: auto;">
  <Mainheader />
  <img class="HomeImage1" src="~/assets/Woordenfabriektext.png" >
  <img class="HomeImage2" src="~/assets/radb_img_7.png">
  <div>
    <table class="HomeTable">
      <thead>
        <th>
          <span class="TitleText">
            <td>Wat is een Morfeem?</td>
          </span>
        </th>
        <th >
        </th>
        <th>
          <span class="TitleText">
            <td>Wat heb je eraan?</td>
          </span>
        </th>
      </thead>
      <tbody>
        <tr>
          <td>
            &nbsp;
          </td>
          <td>
            &nbsp;
          </td>
        </tr>

        <tr>
          <td>
            <span class="subtitletext">
                Morfemen zijn stukjes woord met een eigen betekenis, die deel uitmaken van een langer woord.
            </span>
          </td>
          <td>
          </td>
          <td>
            <span class="subtitletext">
              Morfemen helpen je om de betekenis van een woord snel te ontdekken
            </span>
          </td>
        </tr>
        <tr>
        <td>
            <span class="bodytext">
              Er dreigt een wereldwijd tekort aan mondkapjes, steriele handschoenen en andere beschermende kleding. Daarvoor heeft de Wereldgezondheidsorganisatie (WHO) vrijdag gewaarschuwd. Volgens het hoofd van het VN-agentschap, Tedros Adhanom Ghebreyesus, verspreidt zijn organisatie zoveel mogelijk medische apparatuur,
            </span>
        </td>
        <td>
        </td>
        <td>
          <span class="bodytext">
            Er dreigt een wereldwijd tekort aan mondkapjes, steriele handschoenen en andere beschermende kleding. Daarvoor heeft de Wereldgezondheidsorganisatie (WHO) vrijdag gewaarschuwd. Volgens het hoofd van het VN-agentschap, Tedros Adhanom Ghebreyesus, verspreidt zijn organisatie zoveel mogelijk medische apparatuur,
          </span>
        </td>
      </tr>
    </tbody>
    </table>
  </div>
  <br><br>

</div>
</template>

<script>

export default {
  data() {
    return {
      tempLessons: []
    }
  },
  computed: {
    userEmail() {
      console.log(this.$store.state.userEmail);
      return this.$store.state.userEmail;
    }
  },

}

</script>

<style>

</style>
