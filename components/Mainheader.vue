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
                  <nuxt-link v-on:click.native="closeSidebarPanel()" :to="{ path: `lessonhome?studentlessonID=` + lesson.studentlessonid  + `&index=${index}`}" >
                    Les {{ lesson.lessonnumber }}
                  </nuxt-link>
                </td>
              </template>
              <template v-else>
                <td class="sidebar-table-column">
                  <nuxt-link v-on:click.native="closeSidebarPanel()" :to="{ path: `lessonhome?studentlessonID=` + lesson.studentlessonid  + `&index=${index}`, force:true }" >
                    Les {{ lesson.lessonnumber }}
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
        this.closeSidebarPanel();
      }
  },

}
</script>
<style scoped>

 </style>
