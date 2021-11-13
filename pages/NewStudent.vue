<template>
  <div>
    <Mainheader />
    <br>
    <br>
    <br>
    <br>
    <ClassManagementHeader :Title1="'Docent'" :Title2="'klassenmanagement'" />
    <br>
    <div v-if="$fetchState.pending">Fetching lessons...</div>
    <div v-else-if="$fetchState.error">An error occurred :(</div>
    <div v-else class="grid-container">
      <div key="selectedClass" class="grid-child">
        <div align="left" class="shadowPanel">
          <br>
          <span align="left" class="ColumnHeading2">
            Studenten toevoegen
          </span>
          <br>
          <br>
          <br>
          <table :key="tablechanged">
            <tr v-for="(n, i) in 5" :key="n">
              <td>
                <span class="fieldlabel">
                  Klas
                </span>
                <br>
                <div class="classList">
                  <select id="classselect" style="width:400px" v-model="selectedClass[i]">
                    <option :key="lesson.ID" v-for="lesson in Challenge1.vwUsers" v-bind:value="lesson.ID">
                      {{ lesson.Naam }}
                    </option>
                  </select>
                </div>
              </td>
              <td>
                <span class="fieldlabel">
                  Naam
                </span>
                <br>
                <input class="fieldInput" v-model="l_Naam[i]">
              </td>
              <td>
                <br>
                <template v-if="l_Ok[i]">
                  <button class="Okbtn" @click="IndexWis(i)"> Wis </button>
                </template>
                <template v-else>
                  <button class="Okbtn" @click="IndexOk(i)"> Ok </button>
                </template>
              </td>
            </tr>
          </table>
          <br>
          <br>
          <br>
          <div align="center">
            <button class="savebtn" @click="SaveNewStudents"> Save </button>
            <button class="savebtn" @click="CloseNewStudent"> Close </button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      selectedClass: [],
      l_Naam: [],
      l_Ok: [],
      Challenge1: [],
      tablechanged:0,
   }
  },
  computed: {
    userRole() {
      return this.$store.state.userRole;
    },
    userEmail() {
      return this.$store.state.userEmail;
    },
    TeacherID() {
      return this.$store.state.TeacherID;
    },
  },
  async fetch() {
    var response;
    var URLforAPI = '';
    if(this.userRole === 'Researcher')  {
      URLforAPI = `${this.$config.baseURL}/classes`;
    }
    else {
      URLforAPI = `${this.$config.baseURL}/classes?UserID=\'${this.userEmail}\'`;
    }
    response = await fetch(URLforAPI);
    this.Challenge1 = await response.json();
  },
  methods:  {
    SaveNewStudents() {
      var PostString = '';
      var PostObject={};
      for(var i=0; i < this.l_Ok.length; i++) {
        if(this.l_Ok[i]) {
          PostObject = {};
          PostObject.pID = '-1';
          PostObject.pname = this.l_Naam[i];
          PostObject.pClassID = this.selectedClass[i];
          PostObject.pDelete = 0;
          PostString = JSON.stringify(PostObject);

          this.$axios.post('/UpdateStudent', PostString, {headers: {
            'content-type': 'application/json',},})
          .then((response) => {
            console.log(response);
          }, (error) => {
            console.log(error);
          });
        }
        PostString = '{ '
      }


    },
    IndexOk(index) {
      this.l_Ok[index] = true;
      this.tablechanged++;
    },
    IndexWis(index) {
      this.l_Ok[index] = false;
      this.selectedClass[index] = -1;
      this.l_Naam[index] = '';
      this.tablechanged--;
    },
    CloseNewStudent() {
      this.$router.push({path: 'Classmanagement'});
    }
  }
};

</script>

<style>



#students {
  font-family: Lato;
  border-collapse: collapse;
  width: 100%;
}

#students td, #students th {
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding: 8px;
}

#students tr:nth-child(even){background-color: #f2f2f2;}

#students tr:hover {background-color: #ddd;}

#students th {
  padding-top: 8px;
  padding-bottom: 8px;
  text-align: left;
  background-color: white;
  color: grey;
  font-size: 12px;
  font-family: Lato;
}
#students td {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 4px;
  padding-right: 4px;
  text-align: left;
  background-color: white;
  color: black;
  font-size: 12px;
  font-family: Lato;
}
</style>
