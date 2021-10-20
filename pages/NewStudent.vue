<template>
  <div>
    <Mainheader />
    <br>
    <br>
    <br>
    <br>
    <ClassManagementHeader :Title1="'Docent'" :Title2="'klassenmanagement'" />
    <br>
    <div class="align-top" v-if="$fetchState.pending">Fetching lessons...</div>
    <div class="align-top" v-else-if="$fetchState.error">An error occurred :(</div>
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
                <span class="fieldlabel">
                  E-mail
                </span>
                <br>
                <input class="fieldInput" v-model="l_Email[i]">
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
      l_Email: [],
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
          PostObject.pemail = this.l_Email[i];
          PostObject.pClassID = this.selectedClass[i];
          PostObject.pDelete = 0;
          PostString = JSON.stringify(PostObject);

          console.log(PostString);

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
      this.l_Email[index] = '';
      this.tablechanged--;
    },
    CloseNewStudent() {
      this.$router.push({path: 'Classmanagement'});
    }
  }
};

</script>

<style>
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 180px;
  padding-top:60px;
  width: 80%;
}
.shadowPanel  {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    margin-left: 200px;

}
.ColumnHeading2  {
  font-family: Lato;
  font-size: 24px;
  font-weight: bolder;
  color: grey;
  padding-top: 20px;
  padding-left: 50px;

}
.fieldlabel  {
  font-family: Lato;
  font-size: 12px;
  color: grey;
  line-height: 200%;
  padding-left: 10px;

}
.fieldInput {
  font-family: Lato;
  font-size: 14px;
  color: grey;
  margin-left: 10px;
  padding-top: 5px;
  padding-bottom: 5px;;
  width: 250px;
}
.classList  {
  font-family: Lato;
  font-size: 14px;
  color: grey;
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 5px;

}

.savebtn {
  background-color: lightblue;
  font-family: Lato;
  font-size: 14px;
  color:white;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 10px;
}

.Okbtn {
  background-color: lightblue;
  font-family: Lato;
  font-size: 12px;
  color:white;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 5px;
  margin-top: 5px;
  margin-left:10px;
  margin-right:10px;


}

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
