<template>
  <div class="hello">
    <v-ons-navigator
            :page-stack="pageStack"
            :options="{animation: 'slide'}"
            @push="pageStack.push($event)"
    >
      <v-ons-page>
        <v-ons-list>
          <v-ons-list-item>
            <v-ons-list-item>
              <v-ons-input class="input" v-model="cardId" placeholder="00000000" type="text"></v-ons-input>
            </v-ons-list-item>
            <v-ons-list-item>
              <v-ons-button modifier="large" @click="save($event)">Save</v-ons-button>
            </v-ons-list-item>
            <v-ons-list-item>
              <v-ons-button modifier="large" @click="logout($event)">Logout</v-ons-button>
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
  name: 'Settings',
  data () {
      return {
        cardId: '',
      }
  },
  methods: {
    save() {
      let self = this
      axios
        .put(
          'https://api.padmiss.com/api/users/' + globalApp.loginData.userId + "/edit", {
            token: globalApp.loginData.token,
            rfidUid: self.cardId,
        })
        .then((response) => {
          if(response.data.success && response.data.success == true) {
            this.$ons.notification.toast('Settings saved', {timeout: 1000, animation: 'fall'})
          } else {
            this.$ons.notification.toast('Saving settings failed', {timeout: 1000, animation: 'fall'})
          }
        })
    },
    logout (e) {
      globalApp.logout()
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

