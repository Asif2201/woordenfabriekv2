<template>
  <div class="align-top" v-if="$fetchState.pending">Fetching lessons...</div>
  <div class="align-top" v-else-if="$fetchState.error">{{ $fetchState.error }}</div>
  <div v-else id="MainHeader" class="w-full height=64px">
    <nav class="main-nav">
      <Burger>
      </Burger>
    </nav>
    <Sidebar>
      <table class="sidebar-table">
        <tr class="sidebar-table-row">
          <td class="sidebar-table-column">
            <nuxt-link v-on:click.native="closeSidebarPanel()" to="" >
                Home
            </nuxt-link>
          </td>
        </tr>
        <template v-for="lesson in lessons.vwUsers">
          <tr class="sidebar-table-row">
            <td class="sidebar-table-column">
              <nuxt-link v-on:click.native="closeSidebarPanel()" :to="{ path: `lessonhome?studentlessonID=` + lesson.studentlessonid }" >
                Les {{ lesson.studentlessonid}}
              </nuxt-link>
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
      lessons: []
    }
  },
  async fetch() {
      this.lessons = await fetch(
        `${this.$config.baseURL}/userLessons?studentEmail=${this.$store.state.userEmail}`
      ).then(res => res.json())
    },
  components: {
    Burger,
    Sidebar
  },
  computed: {
    isBurgerActive() {
      return this.$store.state.Menu.isNavOpen;
    }
  },
  methods: {
      closeSidebarPanel()  {
        this.$store.commit('Menu/toggleNav');
      },
  },

}
</script>
<style scoped>
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
 </style>
