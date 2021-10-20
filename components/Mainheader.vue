<template>
  <div id="MainHeader" class="MainHeaderPanel">
    <nav class="main-nav">
      <Burger>
      </Burger>
    </nav>
    <Sidebar>
      <table class="sidebar-table">
        <template v-if="userEmail !== ''">
          <tr class="sidebar-table-row">
            <td class="sidebar-table-column">
              <nuxt-link v-on:click.native="closeSidebarPanel()" to="/" >
                  Home (  {{ userEmail }} )
              </nuxt-link>
            </td>
          </tr>
          <template v-for="(lesson, index) in UserLessons">
            <tr class="sidebar-table-row">
              <template v-if="lesson.overallprogress == 1">
                <td class="sidebar-table-column-completed">
                  <nuxt-link v-on:click.native="closeSidebarPanel()" :to="{ path: `lessonhome?studentlessonID=` + lesson.lessonid  + `&index=${index}`}" >
                    Les {{ index + 1 }}
                  </nuxt-link>
                </td>
              </template>
              <template v-else>
                <td class="sidebar-table-column">
                  <nuxt-link v-on:click.native="closeSidebarPanel()" :to="{ path: `lessonhome?studentlessonID=` + lesson.lessonid  + `&index=${index}`}" >
                    Les {{ index + 1 }}
                  </nuxt-link>
                </td>
              </template>
            </tr>
          </template>
          <tr v-show="!IsStudent" class="sidebar-table-row">
            <td class="sidebar-table-column">
              <nuxt-link v-on:click.native="closeSidebarPanel()" :to="{ path: `classmanagement`}" >
                Klas management
              </nuxt-link>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr class="sidebar-table-row">
            <td class="sidebar-table-column-Login">
              Gebruiker
              <br>
              <input v-model="username" placeholder=" vul gebruikersnaam in" class="userid">
              <br>
              <br>
              wachtwoord
              <br>
              <input v-model="password" type="password" placeholder="vul wachtwoord in" class="password">
              <br>
              <br>
              <button @click="Login"  class="loginbutton"> log in </button>
            </td>
          </tr>
        </template>
      </table>
    </Sidebar>
  </div>
</template>
<script>

import Burger from "./Burger.vue";
import Sidebar from "./Sidebar.vue";

export default {
  data() {
    return {
      lessons: [],
      username: '',
      password:'',
    }
  },
  components: {
    Burger,
    Sidebar
  },
  computed: {
    isBurgerActive() {
      return this.$store.state.Menu.isNavOpen;
    },
    UserLessons() {
      return this.$store.state.Lessons;
    },
    userEmail() {
      return this.$store.state.userEmail;
    },
    IsStudent()  {
      if(this.$store.state.userRole === 'Student')  {
        return true
      }
      else  {
        return false;
      }
    }
  },
  methods: {
      closeSidebarPanel()  {
        this.$store.commit('Menu/toggleNav');
      },
      async Login() {
        var urlAPI = `${this.$config.baseURL}/users?UserID=\'${this.username}\'`;
        var response = await fetch(urlAPI);
        this.tempLessons = await response.json();
        console.log(this.tempLessons);
        if(this.tempLessons.vwUsers.length > 0) {
          this.$store.commit('setUserEmail', this.username);
          this.$store.commit('setUserRole', this.tempLessons.vwUsers[0].UserRole);
          urlAPI = `${this.$config.baseURL}/userLessons?UserID=\'${this.userEmail}\'`;
          response = await fetch(urlAPI);
          this.tempLessons = await response.json();
          this.$store.commit('initialiseLessons', this.tempLessons);
          this.$router.push("/");
        }
        else{
          alert('Invalid User');
        }
      }
  },

}
</script>
<style scoped>
.MainHeaderPanel  {
  width: 1920px;
  height: 64px;
}
.main-nav {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0.8rem;
}
.sidebar-table  {
  border-collapse:separate;
  border-spacing:0 4px;
}
.sidebar-table-column {
  color: #A3A3A3;
  background-color: #4D4C4C;
  width: 300px;
  vertical-align: middle;
  padding-left: 20px;
  font: lato;
  font-weight: bold;
  font-size: 14px;
}
.sidebar-table-column-completed {
  color: green;
  background-color: #4D4C4C;
  width: 300px;
  vertical-align: middle;
  padding-left: 20px;
  font: lato;
  font-weight: bold;
  font-size: 14px;
}
.sidebar-table-column-Login {
  color: white;
  background-color: black;
  width: 300px;
  vertical-align: middle;
  padding-left: 20px;
  font: lato;
  font-weight: bold;
  font-size: 14px;
}
.userid {
  background-color: white;
  color:grey;
  padding: 5px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 3px;
  margin-top: 5px;
}
.password {
  background-color: white;
  color:grey;
  padding: 5px;
  border-radius: 3px;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 5px;
}
.loginbutton  {
  background-color: blue;
  color:white;
  font-size: 12px;
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  text-align: center;
  border-radius: 4px;
}
.sidebar-table-row {
  height: 36px;
}
ul.sidebar-panel-nav {
  list-style-type: none;
  margin: 0;
  padding: 0;
  left: 0;
}
ul.sidebar-panel-nav > li {
  text-align: left;
  padding-top: 20px;
  padding-bottom: 20px;
}

ul.sidebar-panel-nav > li > a {
  color: #A3A3A3;
  text-decoration: none;
  font-size: 14px;
  padding: 8 px 16 px;
  font-family: lato;
  display: block;
}
ul.sidebar-panel-nav > li > a:hover {
  background-color: #7B7B7B;
  color: white;
}
.RadboudBanner  {
  width: 1000px;
  background-color: lightgrey;


}
 </style>
