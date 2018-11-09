<template>
  <div id="app">
    <v-ons-splitter>
      <v-ons-splitter-side swipeable width="150px" collapse="" side="left":open.sync="openSide">
        <v-ons-page>
          <v-ons-list>
            <v-ons-list-item v-for="page in globalApp.pages" tappable modifier="chevron" @click="openPage(page)">
              <div class="center">{{ page }}</div>
            </v-ons-list-item>
          </v-ons-list>
        </v-ons-page>
      </v-ons-splitter-side>

      <v-ons-splitter-content>
        <v-ons-navigator swipeable :page-stack="globalApp.pageStack" @push-page="pushPage"></v-ons-navigator>
      </v-ons-splitter-content>
    </v-ons-splitter>
  </div>
</template>

<script>

import Scores from './components/Scores.vue'
import Login from './components/Login.vue'
import Settings from './components/Settings.vue'
import MyScores from './components/MyScores.vue'

import {globalApp} from './main'

let components = {
  'Scores': Scores,
  'Login': Login,
  'Settings': Settings,
  'MyScores': MyScores
}

export default {
  name: 'app',
  data() {
      return {
        openSide: false,
        globalApp: globalApp
      };
  },
  mounted() {
    globalApp.initialize();
  },
  methods: {
    openPage(page) {
      globalApp.pageStack = [components[page]]
      this.openSide = false
    },
    pushPage(event) {
      console.log("pushing");
      globalApp.pageStack.push(event)
    }
  },
  components: {
      Scores,
      Login
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
