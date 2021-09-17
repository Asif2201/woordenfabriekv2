<template>
<div>
  <Mainheader />
  <p v-if="$fetchState.pending">Fetching Lessons...</p>
  <p v-else-if="$fetchState.error">An error occurred :(</p>
  <div class="flex align-center justify-center w-full">
      <img class="object-contain align-middle ..." src="~/assets/Woordenfabriektext.png" width=600 height=80 >
  </div>
  <br><br><br>
  <img class="object-contain h-80 w-full ..." src="~/assets/component-85---1@1x.png">
  <div class="flex align-center justify-center w-full">
  <br> <br>
  <table class="HomeTable">
    <thead>
      <th class="w-2/5">
        <span class="TitleText">
          <td>Wat is een Morfeem?</td>
        </span>
      </th>
      <th class="w-1/5">
      </th>
      <th class="w-2/5">
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

  <div class="flex align-center justify-center w-full">
    <button @click="ResetData" style="color:red"> &#9888; X  &#9888; </button>
    <br>
    <button @click="LoadData" style="color:green">  &#9432; Load Lesson data &#9432; </button>

  </div>
</div>
</template>

<script>

export default {
  data() {
    return {
      tempLessons: []
    }
  },
  async fetch() {
    const urlAPI = `${this.$config.baseURL}/userLessons?studentEmail=jaap@appalot.com`;
    this.tempLessons = await fetch(
      urlAPI
    ).then(res => res.json())
  },
  methods:  {
    ResetData() {
      this.$axios.post('/ResetData', {headers: {
        'content-type': 'application/json',},})
      .then((response) => {
        console.log('Ok');
      }, (error) => {
        console.log(error);
      });
      alert('Reset complete')
    },
    LoadData()  {
      this.$fetch();
      this.$store.commit('initialiseLessons', this.tempLessons);
      alert('Data load complete')

    }
  }
}

</script>

<style>
  .TitleText  {
    font-family: lato;
    color: #2185D0;
    font-size: 24px;
    font-weight: bold;
    line-height: 1.6;

  }
  .subtitletext {
    font-family: lato;
    color: black;
    font-size: 20px;
    font-weight: bold;
    line-height: 1.6;
  }
  .bodytext {
    font-family: lato;
    color: #00000099;
    font-size: 16px;
    line-height: 1.6;
  }

  .HomeTable  {
    width: 70%;
    margin:auto;
  }

</style>
