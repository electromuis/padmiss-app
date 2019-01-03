import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'

import Vue from 'vue'
import VueOnsen from 'vue-onsenui'
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'

Vue.use(VueOnsen)
Vue.use(VueLocalStorage)
Vue.use(VueMoment, {
  moment,
})

import App from './App.vue'
import VueLocalStorage from 'vue-localstorage'
import Scores from './components/Scores'
import MyScores from './components/MyScores'

Vue.config.productionTip = false

export const globalApp = new Vue({
  data: {
    loginData: null,
    pages: ['Scores', 'Login'],
    pageStack: [Scores]
  },
  methods: {
    initialize: function () {
      let loginData = Vue.localStorage.get('loginData', null)
      if (loginData !== null) {
        this.loginData = Vue.localStorage.get('loginData', null)
        this.pages = ['My scores', 'Scores', 'Settings']
        this.pageStack = [MyScores]
      }
    },
    login: function (data) {
      this.loginData = data
      Vue.localStorage.set('loginData', data)

      this.pages = ['My scores', 'Scores', 'Settings']
      this.pageStack = [MyScores]
    },
    logout: function () {
      this.loginData = null
      this.playerId = null
      this.pages = ['Scores', 'Login']
      this.pageStack = [Scores]
    }
  }
})

new Vue({
  localStorage: {
    loginData: {
      type: Object,
      default: null
    }
  },
  render: h => h(App)
}).$mount('#app')

globalApp.initialize()
