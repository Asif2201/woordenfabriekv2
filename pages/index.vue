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
            Wat is de Woordenfabriek?
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
                In de Woordenfabriek ontdek je hoe woorden in elkaar zitten qua betekenis en structuur. Woorden bestaan uit betekenisvolle stukjes en die kun je op creatieve manieren met elkaar combineren. Op die manier kun je allerlei verschillende boodschappen verwoorden.
            </span>
          </td>
          <td>
          </td>
          <td>
            <span class="subtitletext">
              De Woordenfabriek helpt je om zelf woorden te maken en om nog onbekende woorden te begrijpen. Je komt in je leven telkens woorden tegen die je nog niet kende. Die woorden bevatten vaak enkele betekenisvolle stukjes die je al wel hebt leren kennen. Die kennis kun je inzetten om te ontdekken wat de betekenis van het woord is.
            </span>
          </td>
        </tr>
        <br><br>
        <template v-if="userEmail == ''">
        <tr>
        <td colspan="3" style="text-align:center">
            <span class="bodytext">
              Als u als leerkracht gebruik wilt maken van de Woordenfabriek, stuurt u dan een e-mail naar <a href="mailto:woordenfabriek@ru.nl?subject=Woordenfabriek toegangsverzoek "> woordenfabriek@ru.nl </a>
            </span>
        </td>
      </tr>
        </template>
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
      return this.$store.state.userRole === 'Student' ? 'Student'
            : this.$store.state.userRole === 'Teacher' ? 'Docent'
            : this.$store.state.userRole === 'Researcher' ? 'Researcher'
            : 'Admin';
    }
  }
}

</script>

<style>

</style>
