<template>
  <div class="hello">
    <v-ons-navigator
            :page-stack="pageStack"
            :options="{animation: 'slide'}"
            @push="pageStack.push($event)"
    >
      <v-ons-page>
       Hello, login plz
        <v-ons-list>
          <v-ons-list-item>
            <v-ons-list-item>
              <v-ons-input class="input" v-model="email" placeholder="email@domain.com" type="email"></v-ons-input>
            </v-ons-list-item>
            <v-ons-list-item>
              <v-ons-input class="input" v-model="password" placeholder="****" type="password"></v-ons-input>
            </v-ons-list-item>
            <v-ons-list-item>
              <v-ons-button modifier="large" @click="handleClick($event)">Login</v-ons-button>
            </v-ons-list-item>
          </v-ons-list-item>
        </v-ons-list>
     </v-ons-page>
    </v-ons-navigator>
  </div>
</template>

<script>
import axios from 'axios';
import {globalApp} from '../main'

export default {
  name: 'Login',
  data () {
      return {
          'email': '',
          'password': ''
      }
  },
  methods: {
    'handleClick': function (e) {
      let self = this
      axios
        .post('https://api.padmiss.com/authenticate', {
          'email': self.email,
          'password': self.password
        })
        .then((response) => {
          if(response.data.success && response.data.success === true) {
            globalApp.login(response.data)
          } else {
            this.$ons.notification.toast('Wrong login', { timeout: 1000, animation: 'fall' })
          }
        })
    }
  },
  components: {

  }
}
</script>

<style>
  .input {
    width: 100%;
  }

  .input input {
    padding: 5px;
  }
</style>
