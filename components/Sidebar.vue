<template>
    <div class="sidebar">
        <div class="sidebar-backdrop" @click="closeSidebarPanel" v-if="isPanelOpen"></div>
        <transition name="slide">
            <div v-if="isPanelOpen" class="sidebar-panel">
              <br>
              <br>
              <span class="panelHeading"> Menu </span>
              <br><br><br>
              <slot></slot>
            </div>
        </transition>
    </div>
</template>
<script>
import { mapMutations } from 'vuex'

export default {
    methods: {
      closeSidebarPanel()  {
        this.$store.commit('Menu/toggleNav');
      },
    },
    computed: {
        isPanelOpen() {
            return this.$store.state.Menu.isNavOpen;
        }
    }
}
</script>
<style>
    .slide-enter-active,
    .slide-leave-active
    {
        transition: transform 0.2s ease;
    }
    .slide-enter,
    .slide-leave-to {
        transform: translateX(-100%);
        transition: all 150ms ease-in 0s
    }
    .sidebar-backdrop {
        background-color: rgba(19, 15, 64, .4);
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        cursor: pointer;
    }
    .sidebar-panel {
        overflow-y: auto;
        background-color: black;
        position: fixed;
        left: 0;
        top: 0;
        height: 100vh;
        z-index: 999;
        width: 300px;
    }
    .panelHeading {
      color: white;
      font-family: lato;
      font-weight: bold;
      font-size: 20px;
      padding: 20px 20px 30px 20px;

    }
</style>
