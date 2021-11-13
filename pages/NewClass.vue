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
            Nieuwe klas aanmaken
          </span>
          <br>
          <br>
          <br>
          <div align="left">
            <span class="fieldlabel">
              Onderwijs
            </span>
            <br>
            <select class="fieldInput" v-model="lOnderwijs">
              <option value='VWO'> VWO </option>
              <option value='HAVO/VWO'> HAVO/VWO </option>
              <option value='HAVO'> HAVO </option>
              <option value='VMBO-t/HAVO'> VMBO-t/HAVO </option>
              <option value='VMBO-t'> VMBO-t/HAVO </option>
              <option value='VMBO gemengd'> VMBO gemengd </option>
              <option value='VMBO kader'> VMBO kader </option>
              <option value='VMBO basis'> VMBO basis </option>
              <option value='Basisonderwijs'> Basisonderwijs </option>
            </select>
            <br>
            <span class="fieldlabel">
              Jaar
            </span>
            <br>
            <select class="fieldInput" v-model="lJaar">
              <option value='4e klas'> 4e klas </option>
              <option value='3e klas'> 3e klas </option>
              <option value='2e klas'> 2e klas </option>
              <option value='brugklas'> brugklas </option>
              <option value='groep 8'> groep 8 </option>
              <option value='groep 7'> groep 7 </option>
            </select>
            <br>
            <span class="fieldlabel">
              Naam
            </span>
            <br>
            <input class="fieldInput" v-model="lNaam">
            <br>
            <br>
            <div align="center">
              <button class="savebtn" @click="SaveNewClass"> Save </button>
              <button class="savebtn" @click="CloseNewClass"> Close </button>
            </div>

          </div>
        </div>
      </div>
      <div class="grid-child">
        <div align="right">
          <button class="newClassbtnRight" @click="AddNewStudent">
            + nieuwe student
          </button>

        </div>
        <br>
        <div align="left">
          <table  id="students">
            <tr>
              <th> StudentID </th>
              <th> Name </th>
              <th> Current Lesson </th>
              <th> Average Rating </th>
            </tr>
            <template v-for="student in selectedStudents">
              <tr :key="student.ID">
                  <td> {{ student.UserID }} </td>
                  <td> {{ student.name }} </td>
                  <td> Current Lesson </td>
                  <td> Average Rating </td>
              </tr>
            </template>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      selectedClass: -1,
      Challenge1: [],
      Challenge2:[],
      Students: [],
      lOnderwijs: '',
      lJaar: 0,
      lNaam: '',
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
    selectedStudents()  {
      var x = Number(this.selectedClass);
      if(x === -1) {
        return this.Students.vwUsers;
      }
      else  {
        return this.Students.vwUsers.filter(function(el) { return el.Class === Number(x); });
      }
    }
  },
  watch: {
    Challenge1()  {
      this.Challenge2 = this.Challenge1;
      var x = [];
      x.ID = -1;
      x.Naam = 'All Classes';
      x.Ondewijs = '';
      x.TeacherID = this.Challenge1.vwUsers[0].TeacherID;
      x.UserID = this.Challenge1.vwUsers[0].TeacherID;
      x.jaar  = -1;
      this.Challenge2.vwUsers.push(x);
      this.Challenge2.vwUsers.sort((firstItem, secondItem) => firstItem.ID - secondItem.ID);
    }
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
    URLforAPI = `${this.$config.baseURL}/students?TeacherID=\'${this.Challenge1.vwUsers[0].TeacherID}\'`;
    response = await fetch(URLforAPI);
    this.Students = await response.json();
  },
  methods:  {
    SaveNewClass() {
      var PostString = '{ '

      var PostObject = {};

      PostObject.pID = '-1';
      PostObject.pOndewijs = this.lOnderwijs;
      PostObject.pJaar = this.lJaar;
      PostObject.pNaam = this.lNaam;
      PostObject.pDelete = '0';
      PostObject.pTeacherID = this.TeacherID;

      PostString = JSON.stringify(PostObject);

      console.log(PostString);

      this.$axios.post('/UpdateClass', PostString, {headers: {
        'content-type': 'application/json',},})
      .then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });


    },
    AddNewStudent() {

    },
    CloseNewClass() {
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
  text-align: left;
  background-color: white;
  color: black;
  font-size: 12px;
  font-family: Lato;
}
</style>
