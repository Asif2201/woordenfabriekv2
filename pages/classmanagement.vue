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
        <div align="right">
          <button class="newClassbtnRight" @click="AddNewClass">
            + nieuwe klas
          </button>
        </div>
        <div align="left">
          <span class="ColumnHeading">
            Classes
          </span>
          <br>
          <div class="classList4">
            <select id="classselect" style="width:400px" v-model="selectedClass">
              <option :key="lesson.ID" v-for="lesson in Challenge2.vwUsers" v-bind:value="lesson.ID">
                {{ lesson.Naam }}
              </option>
            </select>
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
              <th>  </th>
            </tr>
            <template v-for="student in selectedStudents">
              <tr :key="student.ID">
                  <td> {{ student.UserID }} </td>
                  <td> {{ student.name }} </td>
                  <td> {{ student.CurrentLesson }} </td>
                  <td> {{ student.AvgRating }} </td>
                  <td> <button @click="DeleteData(student.ID)" class="btnResetData"> Delete data </button> </td>
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
   }
  },
  computed: {
    userRole() {
      return this.$store.state.userRole;
    },
    userEmail() {
      return this.$store.state.userEmail;
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

    this.$store.commit('setTeacherID', this.Challenge1.vwUsers[0].TeacherID);
    URLforAPI = `${this.$config.baseURL}/students?TeacherID=\'${this.Challenge1.vwUsers[0].TeacherID}\'`;
    response = await fetch(URLforAPI);
    this.Students = await response.json();
  },
  methods:  {
    AddNewClass() {
      this.$router.push({path: 'NewClass'});
    },
    AddNewStudent() {
      this.$router.push({path: 'NewStudent'});
    },
    DeleteData(pStudentID)  {
      const message = 'Are you sure? all student answers will be deleted!!!';
      if( confirm(message) )  {
        const PostObject = {};

        PostObject.StudentID = pStudentID;
        const PostString = JSON.stringify(PostObject);

        this.$axios.post('/ResetData', PostString, {headers: {
          'content-type': 'application/json',},})
        .then((response) => {
          console.log('Ok');
        }, (error) => {
          console.log(error);
        });
      }

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
