<template>
<div style="overflow-x: auto;">
  <Mainheader />
  <img class="HomeImage1" src="~/assets/Woordenfabriektext.png" >
  <template v-if="userEmail != ''">
    <span class="HomeTitleText">
      Startpagina |
    </span>
    <span :class="{ HomeTitleText2: UserRole != 'Student', HomeTitleText3: UserRole == 'Student'}">
      {{ UserRole }}
    </span>
  </template>
  <img class="HomeImage2" src="~/assets/home.png">
  <div>
    <table class="HomeTable">
      <thead>
        <th>
          <td>
          <span class="TitleText">
            Wat is een Morfeem?
          </span>
          </td>
        </th>
        <th >
        </th>
        <th>
          <td>
          <span class="TitleText">
            Wat heb je eraan?
          </span>
          </td>
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
      return this.$store.state.userEmail;
    },
    UserRole()  {
      if(this.$store.state.userRole === 'Student')  {
        return 'Student'
      }
      else  {
        return 'Docent';
      }
    }
  }
}

</script>

<style>

</style>
