<template>
<div style="overflow-x: auto;">
  <Mainheader />
  <img class="center1" src="~/assets/Woordenfabriektext.png" >
  <img class="center2" src="~/assets/radb_img_7.png">
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
  .center1 {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
    width: 800px;
    height: 70px;
  }
  .center2 {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
    width: 500px;
    height: 350px;
  }
  .TitleText  {
    font-family: lato;
    color: #2185D0;
    font-size: 22px;
    font-weight: bold;
    line-height: 1.6;

  }
  .subtitletext {
    font-family: lato;
    color: black;
    font-size: 18px;
    font-weight: bold;
    line-height: 1.6;
  }
  .bodytext {
    font-family: lato;
    color: #00000099;
    font-size: 14px;
    line-height: 1.6;
  }

  .HomeTable  {
    width: 70%;
    margin:auto;
    gap:60px;
  }
  .HomeTable td {
    padding-left: 20px;
    padding-right: 20px;
  }

</style>
